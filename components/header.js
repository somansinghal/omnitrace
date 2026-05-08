/* ════════════════════════════════════════════════════════════
   OmniTrace — Header
   Mobile: logo + hamburger | Desktop: full top nav
   ════════════════════════════════════════════════════════════ */

import Store from '../assets/js/store.js';

export default function renderHeader() {
  const user = Store.get('user');
  const isLoggedIn = !!user;
  const initials = user ? (user.name || user.email || 'U').charAt(0).toUpperCase() : '';
  const currentPath = window.location.pathname || '/';
  const theme = Store.get('theme') || 'system';
  const themeIcon = theme === 'dark' ? '🌙' : theme === 'light' ? '☀️' : '💻';

  // Top nav contents adapt to logged-in state
  const navLinks = isLoggedIn
    ? [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/workspace', label: 'Workspace' },
        { href: '/scan', label: 'Scan' },
        { href: '/pricing', label: 'Pricing' },
        { href: '/docs', label: 'Docs' },
      ]
    : [
        { href: '/', label: 'Home' },
        { href: '/features', label: 'Features' },
        { href: '/pricing', label: 'Pricing' },
        { href: '/about', label: 'About' },
        { href: '/demo', label: 'Demo' },
        { href: '/contact', label: 'Contact' },
      ];

  return `
    <div class="header-inner">
      <!-- Mobile: hamburger first -->
      <button class="mobile-menu-btn" aria-label="Open menu" id="header-menu-btn">☰</button>

      <a class="header-logo" data-link href="/">
        <div class="logo-icon">📦</div>
        <span>Omni<span class="text-gradient">Trace</span></span>
      </a>

      <!-- Desktop: top nav (hidden <1024px) -->
      <nav class="header-nav">
        ${navLinks.map(l => {
          const isActive = currentPath === l.href || (l.href !== '/' && currentPath.startsWith(l.href + '/'));
          return `<a data-link href="${l.href}" ${isActive ? 'class="nav-active"' : ''}>${l.label}</a>`;
        }).join('')}
      </nav>

      <div class="header-actions">
        <!-- Theme dropdown (always visible) -->
        <div class="dropdown">
          <button class="btn-icon" aria-label="Theme" id="theme-toggle-btn" style="display:flex;align-items:center;justify-content:center;color:var(--text-secondary);font-size:18px;">
            ${themeIcon}
          </button>
          <div class="dropdown-menu" style="min-width: 140px;">
            <div class="dropdown-item ${theme === 'light' ? 'active' : ''}" data-theme-set="light">☀️ Light</div>
            <div class="dropdown-item ${theme === 'dark' ? 'active' : ''}" data-theme-set="dark">🌙 Dark</div>
            <div class="dropdown-item ${theme === 'system' ? 'active' : ''}" data-theme-set="system">💻 System</div>
          </div>
        </div>

        ${isLoggedIn ? `
          <!-- Notifications -->
          <a class="btn-icon" data-link href="/notifications" aria-label="Notifications" style="display:flex;align-items:center;justify-content:center;color:var(--text-secondary);font-size:16px;">
            🔔
          </a>

          <!-- User dropdown (desktop only icon, mobile hidden in favor of sidebar) -->
          <div class="dropdown" style="display:none;" id="user-dropdown-wrap">
            <div class="header-avatar" id="user-avatar-btn" title="${user.name || user.email}">${initials}</div>
            <div class="dropdown-menu">
              <div class="dropdown-item" style="cursor:default;flex-direction:column;align-items:flex-start;gap:2px;">
                <strong style="font-size:14px;">${user.name || 'User'}</strong>
                <span style="font-size:12px;color:var(--text-muted);">${user.email || ''}</span>
              </div>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" data-link href="/profile">👤 Profile</a>
              <a class="dropdown-item" data-link href="/billing">💳 Billing</a>
              ${user.role === 'admin' ? '<a class="dropdown-item" data-link href="/admin">🛡️ Admin</a>' : ''}
              <div class="dropdown-divider"></div>
              <div class="dropdown-item" data-action="logout" style="color:var(--danger);">🚪 Log Out</div>
            </div>
          </div>
        ` : `
          <!-- Auth buttons (desktop only, hidden on mobile via media query) -->
          <a class="btn btn-secondary btn-sm header-auth-btn" data-link href="/login" style="display:none;">Log In</a>
          <a class="btn btn-primary btn-sm header-auth-btn" data-link href="/signup" style="display:none;">Get Started</a>
        `}
      </div>
    </div>

    <style>
      @media (min-width: 1024px) {
        #user-dropdown-wrap { display: block !important; }
        .header-auth-btn { display: inline-flex !important; }
      }
    </style>
  `;
}
