/* ════════════════════════════════════════════════════════════
   OmniTrace — OmniDB Service (Scalable Schema v3)
   Schema: users → workspaces → products → scans
   ════════════════════════════════════════════════════════════ */

import {
  doc, setDoc, getDoc, updateDoc, deleteDoc,
  collection, query, where, orderBy, getDocs, addDoc,
  serverTimestamp, onSnapshot, increment, limit, Timestamp,
  runTransaction
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

let _Firebase = null;
async function getFirebase() {
  if (!_Firebase) {
    const mod = await import('./firebase.js');
    _Firebase = mod.default;
  }
  return _Firebase;
}

const OmniDB = {

  // ═══════════════════════════════
  //  GLOBAL STATS
  // ═══════════════════════════════

  async getAggregateStats() {
    try {
      const Firebase = await getFirebase();
      const snap = await getDoc(doc(Firebase.db, 'stats', 'global'));
      const data = snap.exists() ? snap.data() : {};

      // No fake data in MVP. If missing, default to 0.
      return {
        items: (data.items || 0),
        scans: (data.scans || 0),
        workspaces: (data.workspaces || 0),
        growth: 0,
        updatedAt: data.updatedAt || null
      };
    } catch (err) {
      return { items: 0, scans: 0, workspaces: 0, growth: 0 };
    }
  },

  async getScanTrends(days = 7) {
    try {
      const Firebase = await getFirebase();
      const q = query(
        collection(Firebase.db, 'scanTrends'),
        orderBy('date', 'desc'),
        limit(days)
      );
      const snap = await getDocs(q);
      const trends = snap.docs.map(d => d.data());
      trends.reverse(); // Oldest first
      return trends; // No fake mock trends in MVP
    } catch (err) {
      return [];
    }
  },

  async _incrementGlobalStat(field, val = 1) {
    try {
      const Firebase = await getFirebase();
      await updateDoc(doc(Firebase.db, 'stats', 'global'), {
        [field]: increment(val),
        updatedAt: serverTimestamp()
      });
    } catch (err) { /* Silent */ }
  },

  // ═══════════════════════════════
  //  SUBSCRIPTION LIFECYCLE
  // ═══════════════════════════════

  async upgradePlan(userId, plan, billing = 'monthly') {
    try {
      const Firebase = await getFirebase();
      const now = new Date();
      const endDate = new Date(now);
      
      if (billing === 'monthly') endDate.setMonth(endDate.getMonth() + 1);
      else endDate.setFullYear(endDate.getFullYear() + 1);

      await updateDoc(doc(Firebase.db, 'users', userId), {
        plan,
        billingCycle: billing,
        planStartDate: Timestamp.fromDate(now),
        planEndDate: Timestamp.fromDate(endDate),
        planStatus: 'active',
        planUpdatedAt: serverTimestamp()
      });

      this.logActivity(userId, 'upgrade', `Upgraded to ${plan.toUpperCase()} plan (${billing})`);
      return { plan, billing, startDate: now, endDate };
    } catch (err) {
      console.error('upgradePlan error:', err);
      throw err;
    }
  },

  async downgradePlan(userId) {
    try {
      const Firebase = await getFirebase();
      await updateDoc(doc(Firebase.db, 'users', userId), {
        plan: 'free',
        planStatus: 'downgraded',
        planUpdatedAt: serverTimestamp()
      });
      this.logActivity(userId, 'downgrade', 'Downgraded to Free plan');
    } catch (err) { throw err; }
  },

  async checkSubscriptionExpiry(userId) {
    try {
      const Firebase = await getFirebase();
      const snap = await getDoc(doc(Firebase.db, 'users', userId));
      if (!snap.exists()) return null;
      const user = snap.data();
      if (!user.planEndDate) return null;

      const now = new Date();
      const endDate = user.planEndDate.toDate();
      const daysLeft = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));

      if (daysLeft <= 0 && user.plan !== 'free') {
        await this.downgradePlan(userId);
        return { expired: true, daysLeft: 0 };
      }

      return { expired: false, daysLeft, endDate };
    } catch (err) { return null; }
  },

  // ═══════════════════════════════
  //  WORKSPACES
  // ═══════════════════════════════

  async getUserWorkspaces(userId) {
    try {
      const Firebase = await getFirebase();
      const q = query(collection(Firebase.db, 'workspaces'), where('members', 'array-contains', userId));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (err) {
      console.error('getUserWorkspaces error:', err);
      return [];
    }
  },

  async getOrCreateWorkspace(userId, userName) {
    try {
      const Firebase = await getFirebase();
      const workspaces = await this.getUserWorkspaces(userId);

      if (workspaces.length > 0) {
        return workspaces[0];
      }

      const workspace = {
        name: `${userName || 'My'}'s Workspace`,
        ownerId: userId,
        members: [userId],
        roles: { [userId]: 'admin' },
        plan: 'free',
        itemCount: 0,
        scanCount: 0,
        createdAt: serverTimestamp()
      };
      const docRef = await addDoc(collection(Firebase.db, 'workspaces'), workspace);
      this._incrementGlobalStat('workspaces', 1);
      return { id: docRef.id, ...workspace };
    } catch (err) {
      console.error('getOrCreateWorkspace error:', err);
      return null;
    }
  },

  // ═══════════════════════════════
  //  ITEMS (REAL CRUD)
  // ═══════════════════════════════

  async createItem(itemData, workspaceId) {
    try {
      const Firebase = await getFirebase();
      const user = Firebase.getCurrentUser();
      if (!user) throw new Error('Not authenticated');

      if (!workspaceId) throw new Error('Workspace ID is required to add an item.');

      // Check workspace permissions
      const wsSnap = await getDoc(doc(Firebase.db, 'workspaces', workspaceId));
      if (!wsSnap.exists()) throw new Error('Workspace not found.');
      const wsData = wsSnap.data();
      
      const role = wsData.roles?.[user.uid];
      if (wsData.ownerId !== user.uid && role !== 'admin' && role !== 'member') {
        throw new Error('Permission denied: You cannot add items to this workspace.');
      }

      const profile = await this.getProfile(user.uid);
      const planLimits = { free: 10, starter: 100, pro: Infinity, enterprise: Infinity };
      const maxItems = planLimits[profile?.plan || 'free'] || 10;
      const wsCount = wsData.itemCount || 0;

      if (wsCount >= maxItems) {
        throw new Error(`Limit Reached: Your ${profile?.plan || 'free'} plan allows ${maxItems} items. Please upgrade.`);
      }

      const item = {
        name: itemData.name,
        description: itemData.description || '',
        category: itemData.category || 'Uncategorized',
        quantity: Number(itemData.quantity) || 1,
        tags: itemData.tags || [],
        imageUrl: itemData.imageUrl || '',
        sku: itemData.sku || this._generateSKU(),
        qrCode: itemData.qrCode || this._generateQRId(),
        workspaceId,
        createdBy: user.uid,
        status: 'active',
        scanCount: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(Firebase.db, 'items'), item);

      const batch = [];
      batch.push(updateDoc(doc(Firebase.db, 'workspaces', workspaceId), {
        itemCount: increment(1)
      }));
      batch.push(updateDoc(doc(Firebase.db, 'users', user.uid), {
        itemCount: increment(1)
      }));
      await Promise.all(batch);

      this.logActivity(user.uid, 'created', `Item "${item.name}" added`);
      this._incrementGlobalStat('items', 1);

      return { id: docRef.id, ...item };
    } catch (err) {
      console.error('createItem error:', err);
      throw err;
    }
  },

  async fetchItemsByWorkspace(workspaceId) {
    try {
      const Firebase = await getFirebase();
      const q = query(
        collection(Firebase.db, 'items'),
        where('workspaceId', '==', workspaceId),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (err) {
      console.error('fetchItems error:', err);
      throw err;
    }
  },

  subscribeItems(workspaceId, onData, onError) {
    getFirebase().then(Firebase => {
      const q = query(
        collection(Firebase.db, 'items'),
        where('workspaceId', '==', workspaceId),
        orderBy('createdAt', 'desc')
      );
      return onSnapshot(q, (snap) => onData(snap.docs.map(d => ({ id: d.id, ...d.data() }))), onError);
    }).catch(onError);
  },

  subscribeItemsByUser(userId, onData, onError) {
    getFirebase().then(async Firebase => {
      const ws = await this.getOrCreateWorkspace(userId, 'User');
      if (ws) {
        const q = query(
          collection(Firebase.db, 'items'),
          where('workspaceId', '==', ws.id),
          orderBy('createdAt', 'desc')
        );
        return onSnapshot(q, (snap) => onData(snap.docs.map(d => ({ id: d.id, ...d.data() }))), onError);
      }
    }).catch(onError);
  },

  async updateItem(itemId, workspaceId, data) {
    try {
      const Firebase = await getFirebase();
      const user = Firebase.getCurrentUser();
      
      const wsSnap = await getDoc(doc(Firebase.db, 'workspaces', workspaceId));
      const wsData = wsSnap.data();
      const role = wsData.roles?.[user.uid];
      if (wsData.ownerId !== user.uid && role !== 'admin' && role !== 'member') {
        throw new Error('Permission denied.');
      }

      await updateDoc(doc(Firebase.db, 'items', itemId), {
        ...data,
        updatedAt: serverTimestamp()
      });
      if (user) this.logActivity(user.uid, 'updated', `Item "${data.name}" updated`);
    } catch (err) { throw err; }
  },

  async deleteItem(itemId, itemName, workspaceId) {
    try {
      const Firebase = await getFirebase();
      const user = Firebase.getCurrentUser();
      if (!user) throw new Error('Not authenticated');

      const wsSnap = await getDoc(doc(Firebase.db, 'workspaces', workspaceId));
      const wsData = wsSnap.data();
      const role = wsData.roles?.[user.uid];
      if (wsData.ownerId !== user.uid && role !== 'admin') {
        throw new Error('Permission denied: Only admins can delete items.');
      }

      await deleteDoc(doc(Firebase.db, 'items', itemId));
      const batch = [];
      if (workspaceId) {
        batch.push(updateDoc(doc(Firebase.db, 'workspaces', workspaceId), {
          itemCount: increment(-1)
        }));
      }
      batch.push(updateDoc(doc(Firebase.db, 'users', user.uid), {
        itemCount: increment(-1)
      }));
      await Promise.all(batch);

      this.logActivity(user.uid, 'deleted', `Item "${itemName}" deleted`);
      this._incrementGlobalStat('items', -1);
    } catch (err) { throw err; }
  },

  async scanItem(qrCode) {
    try {
      const Firebase = await getFirebase();
      const q = query(collection(Firebase.db, 'items'), where('qrCode', '==', qrCode));
      const snap = await getDocs(q);
      if (snap.empty) return null;

      const itemDoc = snap.docs[0];
      const item = { id: itemDoc.id, ...itemDoc.data() };

      await addDoc(collection(Firebase.db, 'scans'), {
        itemId: item.id,
        workspaceId: item.workspaceId,
        qrCode,
        timestamp: serverTimestamp(),
        location: 'Web Scanner'
      });

      await updateDoc(doc(Firebase.db, 'items', item.id), {
        scanCount: increment(1),
        lastScannedAt: serverTimestamp()
      });

      if (item.workspaceId) {
        await updateDoc(doc(Firebase.db, 'workspaces', item.workspaceId), {
          scanCount: increment(1)
        });
      }

      this._incrementGlobalStat('scans', 1);
      this._recordScanTrend();
      this.logActivity(item.createdBy || item.ownerId, 'scanned', `"${item.name}" was scanned`);

      return item;
    } catch (err) {
      console.error('scanItem error:', err);
      throw new Error('Failed to process scan. Please try again.');
    }
  },

  async _recordScanTrend() {
    try {
      const Firebase = await getFirebase();
      const today = new Date().toISOString().split('T')[0];
      const trendRef = doc(Firebase.db, 'scanTrends', today);
      const snap = await getDoc(trendRef);
      if (snap.exists()) {
        await updateDoc(trendRef, { count: increment(1) });
      } else {
        await setDoc(trendRef, { date: today, count: 1, products: 1 });
      }
    } catch (err) { /* Silent */ }
  },

  // ═══════════════════════════════
  //  ACTIVITY
  // ═══════════════════════════════

  async logActivity(userId, action, details) {
    try {
      const Firebase = await getFirebase();
      await addDoc(collection(Firebase.db, 'activities'), {
        userId, action, details,
        createdAt: serverTimestamp()
      });
    } catch (err) { console.error('Activity log error:', err); }
  },

  subscribeActivity(userId, onData, onError) {
    getFirebase().then(Firebase => {
      const q = query(
        collection(Firebase.db, 'activities'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(20)
      );
      return onSnapshot(q, (snap) => onData(snap.docs.map(d => ({ id: d.id, ...d.data() }))), onError);
    }).catch(onError);
  },

  // ═══════════════════════════════
  //  USER PROFILE
  // ═══════════════════════════════

  async getProfile(userId) {
    try {
      const Firebase = await getFirebase();
      const snap = await getDoc(doc(Firebase.db, 'users', userId));
      if (!snap.exists()) return null;
      return { id: snap.id, ...snap.data() };
    } catch (err) { throw err; }
  },

  async updateProfile(userId, data) {
    try {
      const Firebase = await getFirebase();
      await updateDoc(doc(Firebase.db, 'users', userId), data);
    } catch (err) { throw err; }
  },

  // ═══════════════════════════════
  //  PAYMENTS
  // ═══════════════════════════════

  async createPayment(paymentData) {
    try {
      const Firebase = await getFirebase();
      const payment = {
        userId: paymentData.userId,
        plan: paymentData.plan,
        amount: paymentData.amount,
        couponCode: paymentData.couponCode || '',
        billingCycle: paymentData.billingCycle || 'monthly',
        razorpayOrderId: paymentData.razorpayOrderId || '',
        razorpayPaymentId: paymentData.razorpayPaymentId || '',
        status: paymentData.status || 'pending',
        currency: 'INR',
        createdAt: serverTimestamp()
      };
      const docRef = await addDoc(collection(Firebase.db, 'payments'), payment);
      return { id: docRef.id, ...payment };
    } catch (err) { throw err; }
  },

  async updatePaymentStatus(paymentId, status, razorpayPaymentId) {
    try {
      const Firebase = await getFirebase();
      await updateDoc(doc(Firebase.db, 'payments', paymentId), {
        status, razorpayPaymentId: razorpayPaymentId || '', updatedAt: serverTimestamp()
      });
    } catch (err) { throw err; }
  },

  async getPayments(userId) {
    try {
      const Firebase = await getFirebase();
      const q = query(collection(Firebase.db, 'payments'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (err) { return []; }
  },

  // ═══════════════════════════════
  //  HELPERS
  // ═══════════════════════════════

  _generateSKU() { return 'SKU-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase(); },
  _generateQRId() { return 'OT-' + crypto.randomUUID().split('-')[0].toUpperCase(); }
};

window.OmniDB = OmniDB;
export default OmniDB;
