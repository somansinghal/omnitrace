/* ════════════════════════════════════════════════════════════
   OmniTrace — SPA Router (Strict Refactor)
   Centralized: Dynamic imports, loading pre-renders, safety checks
   ════════════════════════════════════════════════════════════ */

import Store from './store.js';

const routes = {
  '/': { page: 'home', layout: 'public', title: 'Home' },
  '/features': { page: 'features', layout: 'public', title: 'Features' },
  '/pricing': { page: 'pricing', layout: 'public', title: 'Pricing' },
  '/about': { page: 'about', layout: 'public', title: 'About' },
  '/team': { page: 'team', layout: 'public', title: 'Team' },
  '/careers': { page: 'careers', layout: 'public', title: 'Careers' },
  '/blog': { page: 'blog', layout: 'public', title: 'Blog' },
  '/contact': { page: 'contact', layout: 'public', title: 'Contact' },
  '/docs': { page: 'docs', layout: 'public', title: 'Documentation' },
  '/help': { page: 'help', layout: 'public', title: 'Help' },
  '/privacy': { page: 'legal', layout: 'public', title: 'Privacy Policy' },
  '/terms': { page: 'legal', layout: 'public', title: 'Terms of Service' },
  '/cookies': { page: 'legal', layout: 'public', title: 'Cookie Policy' },
  '/security': { page: 'legal', layout: 'public', title: 'Security' },
  '/demo': { page: 'demo', layout: 'public', title: 'Demo' },
  '/login': { page: 'login', layout: 'auth', title: 'Login' },
  '/signup': { page: 'signup', layout: 'auth', title: 'Sign Up' },
  '/forgot': { page: 'forgot', layout: 'auth', title: 'Reset Password' },
  '/onboarding': { page: 'onboarding', layout: 'auth', title: 'Setup', protected: true },
  '/dashboard': { page: 'dashboard', layout: 'app', title: 'Dashboard', protected: true },
  '/workspace': { page: 'workspace', layout: 'app', title: 'Workspace', protected: true },
  '/scan': { page: 'scan', layout: 'app', title: 'Scan QR', protected: true },
  '/profile': { page: 'profile', layout: 'app', title: 'Profile', protected: true },
  '/billing': { page: 'billing', layout: 'app', title: 'Billing', protected: true },
  '/admin': { page: 'admin', layout: 'app', title: 'Admin Panel', protected: true },
  '/admin/users': { page: 'admin', layout: 'app', title: 'Users — Admin', protected: true },
  '/admin/workspaces': { page: 'admin', layout: 'app', title: 'Workspaces — Admin', protected: true },
  '/admin/subscriptions': { page: 'admin', layout: 'app', title: 'Subscriptions — Admin', protected: true },
  '/admin/payments': { page: 'admin', layout: 'app', title: 'Payments — Admin', protected: true },
  '/admin/coupons': { page: 'admin', layout: 'app', title: 'Coupons — Admin', protected: true },
  '/admin/analytics': { page: 'admin', layout: 'app', title: 'Analytics — Admin', protected: true },
  '/admin/activity': { page: 'admin', layout: 'app', title: 'Activity — Admin', protected: true },
  '/admin/features': { page: 'admin', layout: 'app', title: 'Features — Admin', protected: true },
  '/admin/system': { page: 'admin', layout: 'app', title: 'System Health — Admin', protected: true },
  '/api': { page: 'api', layout: 'app', title: 'API', protected: true },
  '/notifications': { page: 'notifications', layout: 'app', title: 'Notifications', protected: true },
};

const Router = {
  currentRoute: null,

  init() {
    window.addEventListener('popstate', () => this.resolve());
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-link]');
      if (link) {
        e.preventDefault();
        const href = link.getAttribute('href') || link.dataset.link;
        if (href) this.navigate(href);
      }
    });
    this.resolve();
  },

  async navigate(path) {
    if (path === this.currentRoute) return;
    window.history.pushState({}, '', path);
    await this.resolve();
  },

  async resolve() {
    const path = window.location.pathname || '/';
    const route = routes[path] || null;

    // Cleanup previous real-time listeners safely
    if (window._currentUnsubscribes?.length > 0) {
      window._currentUnsubscribes.forEach(u => { if (typeof u === 'function') u(); });
    }
    window._currentUnsubscribes = [];

    if (!route) { this._render404(); return; }

    // Wait for auth to resolve before rendering to prevent visual pops
    if (!Store.get('initialized')) {
      let checkInit = setInterval(() => {
        if (Store.get('initialized')) {
          clearInterval(checkInit);
          this.resolve();
        }
      }, 30);
      return;
    }

    // Auth guard redirect
    if (route.protected && !Store.get('user')) {
      this.navigate('/login');
      return;
    }

    // Redirect logged-in users away from auth pages
    if ((path === '/login' || path === '/signup') && Store.get('user')) {
      this.navigate('/dashboard');
      return;
    }

    this.currentRoute = path;
    document.title = `${route.title} — OmniTrace`;

    const main = document.getElementById('app-content');
    if (!main) {
      throw new Error("App container #app-content is missing.");
    }

    try {
      // 1. Render route-specific skeleton synchronously first to reserve space (Zero CLS)
      const skFn = window.SkeletonForRoute?.[path] ?? window.SkeletonForRoute?._default;
      main.innerHTML = `<div class="fade-in" style="min-height:calc(100vh - var(--header-h));">${
        skFn ? skFn() : window.Skeleton?.publicPage?.() || ''
      }</div>`;

      // 2. Synchronously / In Parallel lazy load page module
      const mod = await import(`/pages/${route.page}.js`);
      if (!mod || typeof mod.default !== "function") {
        throw new Error("Module failed to load or has no default render function");
      }

      const html = await mod.default();

      // 3. Smooth page replacement without any layout jumps
      main.innerHTML = `<div class="page-enter fade-in">${html}</div>`;

      if (mod.init) {
        await mod.init();
      }

      this._applyLayout(route.layout);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this._initScrollReveal();

      // Dispatch route change event for active nav updates
      window.dispatchEvent(new CustomEvent('routeChanged', { detail: { path } }));

    } catch (err) {
      console.error('Router error:', err);
      this._renderError(err);
    }
  },

  _applyLayout(layout) {
    const footer = document.getElementById('app-footer');
    if (footer) {
      footer.style.display = (layout === 'public') ? '' : 'none';
    }
  },

  _render404() {
    const main = document.getElementById('app-content');
    if (main) {
      main.innerHTML = `
        <div class="page-enter fade-in" style="min-height:60vh;display:flex;align-items:center;justify-content:center;padding:20px;">
          <div class="empty-state">
            <div class="empty-icon">🔍</div>
            <h2 class="empty-title">404 — Page Not Found</h2>
            <p class="empty-desc">The page you're looking for doesn't exist or has been moved.</p>
            <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:8px;">
              <a class="btn btn-primary" data-link href="/">Go Home</a>
              <a class="btn btn-secondary" data-link href="/demo">Try Demo</a>
            </div>
          </div>
        </div>`;
    }
    document.title = '404 — OmniTrace';
  },

  _renderError(err) {
    const main = document.getElementById('app-content');
    if (main) {
      main.innerHTML = `
        <div class="page-enter fade-in" style="min-height:60vh;display:flex;align-items:center;justify-content:center;padding:20px;">
          ${window.ErrorUI ? window.ErrorUI.render(err.message || 'Failed to load page.', 'window.location.reload()') : '<p>Error loading page.</p>'}
        </div>`;
    }
    document.title = 'Error — OmniTrace';
  },

  _initScrollReveal() {
    setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        observer.observe(el);
      });
    }, 100);
  },

  _wait(ms) { return new Promise(r => setTimeout(r, ms)); }
};

window.Router = Router;
export default Router;
