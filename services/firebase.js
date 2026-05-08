/* ═══════════════════════════════════════════
   OmniTrace Firebase Service
   ═══════════════════════════════════════════ */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  serverTimestamp,
  limit as firestoreLimit
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js';

// ═══ Firebase Config ═══
// Replace with your own Firebase project config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "000000000000",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const Firebase = {
  auth,
  db,
  storage,

  // ═══ Auth Methods ═══

  async login(email, password) {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      return cred.user;
    } catch (err) {
      throw this._mapError(err);
    }
  },

  async signup(email, password, name) {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      // Create user document
      await setDoc(doc(db, 'users', cred.user.uid), {
        name: name,
        email: email,
        plan: 'free',
        createdAt: serverTimestamp(),
        productCount: 0
      });
      return cred.user;
    } catch (err) {
      throw this._mapError(err);
    }
  },

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // Check if user doc exists
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName || 'User',
          email: user.email,
          plan: 'free',
          createdAt: serverTimestamp(),
          productCount: 0
        });
      }
      return user;
    } catch (err) {
      throw this._mapError(err);
    }
  },

  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      throw this._mapError(err);
    }
  },

  async changePassword(currentPassword, newPassword) {
    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
    } catch (err) {
      throw this._mapError(err);
    }
  },

  async logout() {
    try {
      await signOut(auth);
    } catch (err) {
      throw this._mapError(err);
    }
  },

  onAuth(callback) {
    return onAuthStateChanged(auth, callback);
  },

  getCurrentUser() {
    return auth.currentUser;
  },

  // ═══ Storage ═══

  async uploadFile(path, file) {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (err) {
      throw this._mapError(err);
    }
  },

  // ═══ Error Mapping ═══

  _mapError(err) {
    const errorMap = {
      'auth/user-not-found': 'No account found with this email.',
      'auth/wrong-password': 'Incorrect password.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/email-already-in-use': 'An account with this email already exists.',
      'auth/weak-password': 'Password must be at least 6 characters.',
      'auth/too-many-requests': 'Too many attempts. Please try again later.',
      'auth/popup-closed-by-user': 'Sign-in popup was closed.',
      'auth/invalid-credential': 'Invalid credentials. Please try again.',
      'auth/requires-recent-login': 'Please log in again to perform this action.',
      'permission-denied': 'You do not have permission for this action.',
    };

    const code = err.code || '';
    const message = errorMap[code] || err.message || 'An unexpected error occurred.';
    return new Error(message);
  }
};

window.Firebase = Firebase;

export default Firebase;
