/* ════════════════════════════════════════════════════════════
   OmniTrace — Coupon Service (Real-time Validation)
   ════════════════════════════════════════════════════════════ */

import {
  doc, getDoc, collection, query, where, getDocs, addDoc,
  updateDoc, deleteDoc, serverTimestamp, orderBy
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

let _Firebase = null;
async function getFirebase() {
  if (!_Firebase) {
    const mod = await import('./firebase.js');
    _Firebase = mod.default;
  }
  return _Firebase;
}

const CouponService = {

  async validateCoupon(code, plan, billing) {
    try {
      const Firebase = await getFirebase();
      const q = query(
        collection(Firebase.db, 'coupons'),
        where('code', '==', code.toUpperCase()),
        where('active', '==', true)
      );
      const snap = await getDocs(q);

      if (snap.empty) {
        return { valid: false, error: 'Invalid coupon code.' };
      }

      const couponDoc = snap.docs[0];
      const coupon = { id: couponDoc.id, ...couponDoc.data() };

      // Check expiry
      if (coupon.expiresAt && coupon.expiresAt.toDate() < new Date()) {
        return { valid: false, error: 'This coupon has expired.' };
      }

      // Check usage limit
      if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
        return { valid: false, error: 'This coupon has reached its usage limit.' };
      }

      // Check plan eligibility
      if (coupon.applicablePlans && coupon.applicablePlans.length > 0 && !coupon.applicablePlans.includes(plan)) {
        return { valid: false, error: `This coupon is not valid for the ${plan} plan.` };
      }

      // Calculate discount
      const basePrice = this._getBasePrice(plan, billing);
      const discountAmount = Math.round(basePrice * (coupon.discount / 100));
      const finalPrice = basePrice - discountAmount;

      return {
        valid: true,
        coupon: {
          id: coupon.id,
          code: coupon.code,
          discount: coupon.discount,
          discountAmount,
          finalPrice
        }
      };
    } catch (err) {
      console.error('Coupon validation error:', err);
      return { valid: false, error: 'Failed to validate coupon. Please try again.' };
    }
  },

  async recordUsage(couponId, userId) {
    try {
      const Firebase = await getFirebase();
      await updateDoc(doc(Firebase.db, 'coupons', couponId), {
        usedCount: (await this._getCurrentUsage(couponId)) + 1,
        lastUsedBy: userId,
        lastUsedAt: serverTimestamp()
      });
    } catch (err) {
      console.error('Coupon usage recording error:', err);
    }
  },

  async _getCurrentUsage(couponId) {
    const Firebase = await getFirebase();
    const snap = await getDoc(doc(Firebase.db, 'coupons', couponId));
    return snap.exists() ? (snap.data().usedCount || 0) : 0;
  },

  _getBasePrice(plan, billing) {
    const prices = {
      starter: { monthly: 199, yearly: 159 },
      pro: { monthly: 499, yearly: 399 }
    };
    return prices[plan]?.[billing] || 0;
  },

  // ═══════════════════════════════
  //  ADMIN METHODS
  // ═══════════════════════════════

  async createCoupon(data) {
    try {
      const Firebase = await getFirebase();
      const coupon = {
        code: data.code.toUpperCase(),
        discount: parseInt(data.discount),
        usageLimit: parseInt(data.usageLimit) || null,
        usedCount: 0,
        applicablePlans: data.applicablePlans || [],
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
        active: true,
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(Firebase.db, 'coupons'), coupon);
      return { id: docRef.id, ...coupon };
    } catch (err) {
      console.error('Create coupon error:', err);
      throw err;
    }
  },

  async getAllCoupons() {
    try {
      const Firebase = await getFirebase();
      const q = query(collection(Firebase.db, 'coupons'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (err) {
      console.error('Get coupons error:', err);
      return [];
    }
  },

  async toggleCoupon(couponId, active) {
    try {
      const Firebase = await getFirebase();
      await updateDoc(doc(Firebase.db, 'coupons', couponId), { active });
    } catch (err) {
      console.error('Toggle coupon error:', err);
      throw err;
    }
  },

  async deleteCoupon(couponId) {
    try {
      const Firebase = await getFirebase();
      await deleteDoc(doc(Firebase.db, 'coupons', couponId));
    } catch (err) {
      console.error('Delete coupon error:', err);
      throw err;
    }
  }
};

window.CouponService = CouponService;

export default CouponService;
