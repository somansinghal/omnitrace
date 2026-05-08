/* ════════════════════════════════════════════════════════════
   OmniTrace — Mobile Sidebar Drawer
   Desktop: hidden | Mobile: slide-in drawer with full nav
   ════════════════════════════════════════════════════════════ */

import Store from '../assets/js/store.js';

export default function renderSidebar() {
  const user = Store.get('user');
  const currentPath = window.location.pathname;
  const isLoggedIn = !!user;
  const plan = Store.get('plan') || 'free';
  const initials = user ? (user.name || user.email || 'U').charAt(0).toUpperCase() : '';
  const theme = Store.get('theme') || 'system';

  const publicLinks = [
    { icon: '🏠', label: 'Home', href: '/' },
    { icon: '✨', label: 'Features', href: '/features' },
    { icon: '💎', label: 'Pricing', href: '/pricing' },
    { icon: '🧪', label: 'Demo', href: '/demo' },
    { icon: '📝', label: 'Blog', href: '/blog' },
    { icon: '🏢', label: 'About', href: '/about' },
    { icon: '👥', label: 'Team', href: '/team' },
    { icon: '📬', label: 'Contact', href: '/contact' },
  ];

  const dashboardLinks = [
    { icon: '📊', label: 'Dashboard', href: '/dashboard' },
    { icon: '📦', label: 'Workspace', href: '/workspace' },
    { icon: '📷', label: 'Scan QR', href: '/scan' },
    { icon: '🔔', label: 'Notifications', href: '/notifications' },
  ];

  const accountLinks = [
    { icon: '👤', label: 'Profile', href: '/profile' },
    { icon: '💳', label: 'Billing', href: '/billing' },
    { icon: '🔑', label: 'API', href: '/api' },
  ];

  const planColors = { free: 'badge-primary', starter: 'badge-success', pro: 'badge-warning', enterprise: 'badge-danger' };

  return `
    <!-- Sidebar Header -->
    <div class="sidebar-header">
      <a class="header-logo" data-link href="/">
        <div class="logo-icon">📦</div>
        <span style="font-size: 16px;">Omni<span class="text-gradient">Trace</span></span>
      </a>
      <button class="sidebar-close-btn" id="sidebar-close" aria-label="Close menu">✕</button>
    </div>

    <!-- Sidebar Body -->
    <div class="sidebar-body">
      ${isLoggedIn ? `
        <div class="sidebar-section">
          <div class="sidebar-section-title">Workspace</div>
          ${dashboardLinks.map(l => `
            <a class="sidebar-link ${currentPath === l.href ? 'active' : ''}" data-link href="${l.href}">
              <span class="link-icon">${l.icon}</span>
              <span>${l.label}</span>
            </a>
          `).join('')}
        </div>

        <div class="sidebar-section">
          <div class="sidebar-section-title">Account</div>
          ${accountLinks.map(l => `
            <a class="sidebar-link ${currentPath === l.href ? 'active' : ''}" data-link href="${l.href}">
              <span class="link-icon">${l.icon}</span>
              <span>${l.label}</span>
            </a>
          `).join('')}
          ${user.role === 'admin' ? `
            <a class="sidebar-link ${currentPath === '/admin' ? 'active' : ''}" data-link href="/admin">
              <span class="link-icon">🛡️</span><span>Admin Panel</span>
            </a>
          ` : ''}
        </div>

        <div class="sidebar-section">
          <div class="sidebar-section-title">Plan</div>
          <div style="padding: 8px 12px; display: flex; align-items: center; gap: 8px;">
            <span class="badge ${planColors[plan] || 'badge-primary'}">${plan.toUpperCase()}</span>
            ${plan !== 'pro' && plan !== 'enterprise' ? `
              <a data-link href="/billing" style="font-size: 12px; color: var(--primary); font-weight: 600;">Upgrade →</a>
            ` : ''}
          </div>
        </div>
      ` : ''}

      <div class="sidebar-section">
        <div class="sidebar-section-title">${isLoggedIn ? 'Browse' : 'Navigation'}</div>
        ${publicLinks.map(l => `
          <a class="sidebar-link ${currentPath === l.href ? 'active' : ''}" data-link href="${l.href}">
            <span class="link-icon">${l.icon}</span>
            <span>${l.label}</span>
          </a>
        `).join('')}
      </div>

      <div class="sidebar-section">
        <div class="sidebar-section-title">Theme</div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; padding: 0 12px;">
          <button class="btn btn-sm btn-secondary ${theme === 'light' ? 'btn-outline' : ''}" data-theme-set="light" style="padding: 8px; min-height: 38px;">☀️</button>
          <button class="btn btn-sm btn-secondary ${theme === 'dark' ? 'btn-outline' : ''}" data-theme-set="dark" style="padding: 8px; min-height: 38px;">🌙</button>
          <button class="btn btn-sm btn-secondary ${theme === 'system' ? 'btn-outline' : ''}" data-theme-set="system" style="padding: 8px; min-height: 38px;">💻</button>
        </div>
      </div>

      ${!isLoggedIn ? `
        <div class="sidebar-section" style="padding: 0 12px;">
          <a class="btn btn-secondary" data-link href="/login" style="width: 100%; justify-content: center; margin-bottom: 8px;">Log In</a>
          <a class="btn btn-primary" data-link href="/signup" style="width: 100%; justify-content: center;">Get Started Free</a>
        </div>
      ` : ''}
    </div>

    ${isLoggedIn ? `
      <div class="sidebar-user">
        <div class="sidebar-user-avatar">${initials}</div>
        <div class="sidebar-user-info">
          <div class="sidebar-user-name">${user.name || 'User'}</div>
          <div class="sidebar-user-email">${user.email || ''}</div>
        </div>
        <button data-action="logout" title="Log out" style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: var(--radius-md); color: var(--danger); font-size: 16px;" onmouseover="this.style.background='rgba(239,68,68,0.1)'" onmouseout="this.style.background=''">🚪</button>
      </div>
    ` : ''}
  `;
}
