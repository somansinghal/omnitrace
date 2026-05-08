/* ═══════════════════════════════════════════
   OmniTrace Global Store (State Management)
   ═══════════════════════════════════════════ */

const Store = {
  _state: {
    user: null,
    theme: localStorage.getItem('omnitrace-theme') || 'system',
    products: [],
    plan: 'free',
    sidebarOpen: false,
    loading: false,
    initialized: false,
  },
  _listeners: new Map(),

  get(key) {
    return this._state[key];
  },

  set(key, value) {
    const old = this._state[key];
    this._state[key] = value;
    if (old !== value) {
      this._notify(key, value, old);
    }
  },

  subscribe(key, callback) {
    if (!this._listeners.has(key)) {
      this._listeners.set(key, new Set());
    }
    this._listeners.get(key).add(callback);
    return () => this._listeners.get(key)?.delete(callback);
  },

  _notify(key, value, old) {
    const listeners = this._listeners.get(key);
    if (listeners) {
      listeners.forEach(cb => {
        try { cb(value, old); } catch (e) { console.error('Store listener error:', e); }
      });
    }
    const allListeners = this._listeners.get('*');
    if (allListeners) {
      allListeners.forEach(cb => {
        try { cb(key, value, old); } catch (e) { console.error('Store listener error:', e); }
      });
    }
  },

  setUser(user) {
    this.set('user', user);
    if (user) {
      this.set('plan', user.plan || 'free');
    }
  },

  setTheme(theme) {
    this.set('theme', theme);
    localStorage.setItem('omnitrace-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  },

  toggleSidebar() {
    this.set('sidebarOpen', !this._state.sidebarOpen);
  },

  closeSidebar() {
    this.set('sidebarOpen', false);
  },

  setLoading(val) {
    this.set('loading', val);
  },

  getState() {
    return { ...this._state };
  }
};

// Apply saved theme
Store.setTheme(Store.get('theme'));

// Expose globally
window.Store = Store;

export default Store;
