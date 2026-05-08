/* ════════════════════════════════════════════════════════════
   OmniTrace — API Key Service
   ════════════════════════════════════════════════════════════ */

import {
  collection, query, where, getDocs, addDoc, deleteDoc,
  doc, serverTimestamp, orderBy
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

let _Firebase = null;
async function getFirebase() {
  if (!_Firebase) {
    const mod = await import('./firebase.js');
    _Firebase = mod.default;
  }
  return _Firebase;
}

const ApiKeys = {

  async generateKey(userId, name) {
    try {
      const Firebase = await getFirebase();
      const key = 'otk_' + crypto.randomUUID().replace(/-/g, '') + crypto.randomUUID().split('-')[0];
      
      const keyDoc = {
        userId,
        name: name || 'API Key',
        key,
        createdAt: serverTimestamp(),
        lastUsedAt: null,
        usageCount: 0,
        active: true
      };

      const docRef = await addDoc(collection(Firebase.db, 'apiKeys'), keyDoc);
      return { id: docRef.id, ...keyDoc };
    } catch (err) {
      console.error('generateKey error:', err);
      throw err;
    }
  },

  async getKeys(userId) {
    try {
      const Firebase = await getFirebase();
      const q = query(
        collection(Firebase.db, 'apiKeys'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (err) {
      console.error('getKeys error:', err);
      return [];
    }
  },

  async revokeKey(keyId) {
    try {
      const Firebase = await getFirebase();
      await deleteDoc(doc(Firebase.db, 'apiKeys', keyId));
    } catch (err) {
      console.error('revokeKey error:', err);
      throw err;
    }
  },

  // Show first 8 + last 4 characters for display
  maskKey(key) {
    if (!key || key.length < 16) return key;
    return key.substring(0, 8) + '...' + key.substring(key.length - 4);
  }
};

window.ApiKeys = ApiKeys;
export default ApiKeys;
