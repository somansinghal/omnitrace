/* ════════════════════════════════════════════════════════════
   OmniTrace — Layout Manager (Strict Refactor)
   Centralized: header, sidebar (mobile), footer, toasts, modals
   ════════════════════════════════════════════════════════════ */

import Store from './store.js';
import Router from './router.js';

// ═══ Global Toast ═══
window.showToast = function(message, type = 'info', duration = 4000) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  toast.innerHTML = `<span>${icons[type] || ''}</span><span style="flex:1;">${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, duration);
};

// ═══ Global Modal ═══
window.showModal = function(title, content, actions = []) {
  const root = document.getElementById('modal-root');
  if (!root) return;
  root.innerHTML = `
    <div class="modal-overlay" id="global-modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">${title}</h3>
          <button class="modal-close" id="global-modal-close">✕</button>
        </div>
        <div>${content}</div>
        ${actions.length ? `<div style="display:flex;gap:8px;margin-top:20px;justify-content:flex-end;flex-wrap:wrap;">${actions.join('')}</div>` : ''}
      </div>
    </div>
  `;
  root.classList.add('active');
  const close = () => { root.classList.remove('active'); root.innerHTML = ''; };
  document.getElementById('global-modal-close')?.addEventListener('click', close);
  document.getElementById('global-modal-overlay')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) close();
  });
  return close;
};

class LayoutManager {
  constructor() {
    this.init();
  }

  async init() {
    this._setupAuthListener();

    // Render shared global components synchronously/sequentially
    await this.renderHeader();
    await this.renderSidebar();
    await this.renderFooter();

    // Hide loader
    document.getElementById('app-loader')?.classList.add('hidden');
    document.getElementById('app')?.classList.remove('hidden');

    Router.init();

    // State subscriptions
    Store.subscribe('user', () => {
      this.renderHeader();
      this.renderSidebar();
    });

    Store.subscribe('sidebarOpen', (open) => {
      document.getElementById('app-sidebar')?.classList.toggle('open', open);
      document.getElementById('sidebar-overlay')?.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    Store.subscribe('theme', () => this.renderHeader());

    this._bindGlobalEvents();
    this._initGlobalSearch();

    // Listen for route changes to update active nav links
    window.addEventListener('routeChanged', (e) => {
      this._updateActiveNav(e.detail?.path || window.location.pathname);
    });

    // Update nav on first load
    setTimeout(() => {
      this._updateActiveNav(window.location.pathname);
    }, 200);

    // Initialize QA checker (Ctrl+Shift+D)
    import('/components/qa-checker.js')
      .then(mod => mod.initQAChecker?.())
      .catch(() => {});

    // STRICT PRELOAD RELEASE: Release UI only when absolutely ready (DOM, fonts, layout rendered)
    window.addEventListener("load", async () => {
      await Promise.all([
        document.fonts.ready,
        new Promise(r => requestAnimationFrame(r))
      ]);
      document.documentElement.classList.remove("preload");
      document.documentElement.classList.add("loaded");
    });

    // Safety fallback release (500ms max)
    setTimeout(() => {
      document.documentElement.classList.remove("preload");
      document.documentElement.classList.add("loaded");
    }, 500);
  }

  _bindGlobalEvents() {
    document.addEventListener('click', async (e) => {
      if (e.target.closest('.mobile-menu-btn, #header-menu-btn')) {
        Store.toggleSidebar();
        return;
      }
      if (e.target.closest('#sidebar-close, #sidebar-overlay')) {
        Store.closeSidebar();
        return;
      }
      if (e.target.closest('.sidebar-link[data-link]') && window.innerWidth < 1024) {
        Store.closeSidebar();
      }
      const themeBtn = e.target.closest('[data-theme-set]');
      if (themeBtn) {
        Store.setTheme(themeBtn.dataset.themeSet);
        document.querySelectorAll('.dropdown-menu.show').forEach(d => d.classList.remove('show'));
        return;
      }
      if (e.target.closest('[data-action="logout"]')) {
        try {
          const { default: Firebase } = await import('/services/firebase.js');
          await Firebase.logout();
          Store.setUser(null);
          localStorage.removeItem('omnitrace-onboarded');
          Store.closeSidebar();
          Router.navigate('/');
          window.showToast('Logged out successfully.', 'info');
        } catch (err) {
          console.error('Logout error:', err);
        }
        return;
      }
      if (e.target.closest('#user-avatar-btn')) {
        e.stopPropagation();
        const dropdown = e.target.closest('.dropdown')?.querySelector('.dropdown-menu');
        dropdown?.classList.toggle('show');
        return;
      }
      if (e.target.closest('#theme-toggle-btn')) {
        e.stopPropagation();
        const dropdown = e.target.closest('.dropdown')?.querySelector('.dropdown-menu');
        dropdown?.classList.toggle('show');
        return;
      }
      if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-menu.show').forEach(d => d.classList.remove('show'));
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) Store.closeSidebar();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') Store.closeSidebar();
    });

    // Header blur on scroll (smooth, GPU-friendly)
    let lastScrollY = 0;
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
      lastScrollY = window.scrollY;
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          const header = document.getElementById('app-header');
          if (header) header.classList.toggle('scrolled', lastScrollY > 16);
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }, { passive: true });
  }

  _updateActiveNav(path) {
    // Update header nav links
    const headerNav = document.getElementById('app-header');
    if (headerNav) {
      headerNav.querySelectorAll('.header-nav a[data-link]').forEach(link => {
        const href = link.getAttribute('href') || '/';
        const isActive = path === href || (href !== '/' && path.startsWith(href + '/'));
        link.classList.toggle('nav-active', isActive);
      });
    }

    // Update sidebar links
    const sidebar = document.getElementById('app-sidebar');
    if (sidebar) {
      sidebar.querySelectorAll('.sidebar-link[data-link]').forEach(link => {
        const href = link.getAttribute('href') || '/';
        const isActive = path === href || (href !== '/' && path.startsWith(href + '/'));
        link.classList.toggle('active', isActive);
      });
    }
  }

  async renderHeader() {
    try {
      const mod = await import('/components/header.js');
      const header = document.getElementById('app-header');
      if (header) header.innerHTML = mod.default();
    } catch (e) {
      console.error('Header render error:', e);
    }
  }

  async renderSidebar() {
    try {
      const mod = await import('/components/sidebar.js');
      const sidebar = document.getElementById('app-sidebar');
      if (sidebar) sidebar.innerHTML = mod.default();
    } catch (e) {
      console.error('Sidebar render error:', e);
    }
  }

  async renderFooter() {
    try {
      const mod = await import('/components/footer.js');
      const footer = document.getElementById('app-footer');
      if (footer) footer.innerHTML = mod.default();
    } catch (e) {
      console.error('Footer render error:', e);
    }
  }

  _initGlobalSearch() {
    try {
      import('/components/globalsearch.js')
        .then(mod => mod.initGlobalSearch?.())
        .catch(() => {});
    } catch (e) {}
  }

  async _setupAuthListener() {
    try {
      const { default: Firebase } = await import('/services/firebase.js');
      const { default: OmniDB } = await import('/services/omnidb.js');

      Firebase.onAuth(async (firebaseUser) => {
        if (firebaseUser) {
          try {
            const profile = await OmniDB.getProfile(firebaseUser.uid);
            Store.setUser({
              uid: firebaseUser.uid,
              name: profile?.name || firebaseUser.displayName || 'User',
              email: firebaseUser.email,
              plan: profile?.plan || 'free',
              role: profile?.role || 'user'
            });
          } catch (err) {
            Store.setUser({
              uid: firebaseUser.uid,
              name: firebaseUser.displayName || 'User',
              email: firebaseUser.email,
              plan: 'free',
              role: 'user'
            });
          }
        } else {
          Store.setUser(null);
        }
        Store.set('initialized', true);
      });
    } catch (err) {
      console.error('Auth listener error:', err);
      Store.set('initialized', true);
    }
  }
}

new LayoutManager();
export default LayoutManager;
