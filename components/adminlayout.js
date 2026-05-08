/* ════════════════════════════════════════════════════════════
   OmniTrace — Admin Layout (Sidebar + Page Container)
   ════════════════════════════════════════════════════════════ */

export function renderAdminShell(activeSection, contentHTML) {
  const sections = [
    { key: 'dashboard', label: 'Dashboard', icon: '📊' },
    { key: 'users', label: 'Users', icon: '👥' },
    { key: 'workspaces', label: 'Workspaces', icon: '🏢' },
    { key: 'subscriptions', label: 'Subscriptions', icon: '💎' },
    { key: 'payments', label: 'Payments', icon: '💳' },
    { key: 'coupons', label: 'Coupons', icon: '🎟️' },
    { key: 'analytics', label: 'Analytics', icon: '📈' },
    { key: 'activity', label: 'Activity Log', icon: '📋' },
    { key: 'features', label: 'Feature Flags', icon: '🚩' },
    { key: 'system', label: 'System Health', icon: '⚡' }
  ];

  return `
    <style>
      .admin-shell {
        display: grid;
        grid-template-columns: 1fr;
        min-height: calc(100vh - var(--header-h));
        max-width: var(--max-w);
        margin: 0 auto;
      }
      @media (min-width: 1024px) {
        .admin-shell { grid-template-columns: 240px 1fr; gap: 24px; padding: 24px; }
      }

      .admin-sidebar {
        display: none;
        background: var(--bg-glass);
        backdrop-filter: blur(20px);
        border: 1px solid var(--border-glass);
        border-radius: var(--radius-xl);
        padding: 16px;
        height: fit-content;
        position: sticky;
        top: calc(var(--header-h) + 24px);
      }
      @media (min-width: 1024px) { .admin-sidebar { display: block; } }

      .admin-mobile-nav {
        display: flex; gap: 6px; padding: 16px;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        background: var(--bg-secondary);
        border-bottom: 1px solid var(--border-color);
      }
      @media (min-width: 1024px) { .admin-mobile-nav { display: none; } }

      .admin-nav-item {
        display: flex; align-items: center; gap: 10px;
        padding: 10px 14px;
        border-radius: var(--radius-md);
        font-size: 14px; font-weight: 500;
        color: var(--text-secondary);
        cursor: pointer;
        transition: all 0.2s;
        white-space: nowrap;
        margin-bottom: 2px;
      }
      .admin-nav-item:hover { background: rgba(99,102,241,0.08); color: var(--primary); }
      .admin-nav-item.active { background: rgba(99,102,241,0.12); color: var(--primary); font-weight: 600; }

      .admin-content {
        padding: 16px;
        min-width: 0; /* Prevent grid blow-out */
      }
      @media (min-width: 1024px) { .admin-content { padding: 0; } }

      .admin-section-title {
        display: flex; align-items: center; justify-content: space-between;
        margin-bottom: 24px; gap: 12px; flex-wrap: wrap;
      }
      .admin-section-title h1 {
        font-size: 24px; font-weight: 800; margin: 0;
      }
      @media (min-width: 768px) { .admin-section-title h1 { font-size: 28px; } }
      .admin-section-title p {
        font-size: 13px; color: var(--text-secondary); margin-top: 4px;
      }

      /* Health pill */
      .health-pill {
        display: inline-flex; align-items: center; gap: 6px;
        padding: 4px 12px; border-radius: var(--radius-full);
        font-size: 12px; font-weight: 600;
      }
      .health-pill.operational { background: rgba(16,185,129,0.12); color: var(--success); }
      .health-pill.degraded { background: rgba(245,158,11,0.12); color: var(--warning); }
      .health-pill.down { background: rgba(239,68,68,0.12); color: var(--danger); }
      .health-pill::before {
        content: ''; width: 6px; height: 6px; border-radius: 50%;
        background: currentColor;
      }

      /* Mini bar chart */
      .mini-chart {
        display: flex; align-items: flex-end; gap: 4px;
        height: 60px; margin-top: 12px;
      }
      .mini-chart .bar {
        flex: 1; min-width: 4px;
        background: linear-gradient(180deg, var(--primary), var(--primary-light));
        border-radius: 2px 2px 0 0;
        opacity: 0.7;
        transition: opacity 0.2s;
      }
      .mini-chart .bar:hover { opacity: 1; }

      /* Toggle switch (feature flags) */
      .ff-toggle {
        position: relative; width: 44px; height: 24px;
        background: var(--bg-tertiary); border-radius: 12px;
        cursor: pointer; transition: background 0.3s;
        border: 1px solid var(--border-color);
        flex-shrink: 0;
      }
      .ff-toggle.on { background: var(--primary); border-color: var(--primary); }
      .ff-toggle::after {
        content: ''; position: absolute; top: 2px; left: 2px;
        width: 18px; height: 18px; background: #fff; border-radius: 50%;
        transition: transform 0.3s;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      }
      .ff-toggle.on::after { transform: translateX(20px); }
    </style>

    <!-- Mobile horizontal nav -->
    <div class="admin-mobile-nav">
      ${sections.map(s => `
        <a class="admin-nav-item ${activeSection === s.key ? 'active' : ''}" data-link href="/admin/${s.key === 'dashboard' ? '' : s.key}" style="padding: 8px 12px;">
          <span>${s.icon}</span><span>${s.label}</span>
        </a>
      `).join('')}
    </div>

    <div class="admin-shell">
      <!-- Desktop sidebar -->
      <aside class="admin-sidebar">
        <div style="padding: 8px 12px 12px; border-bottom: 1px solid var(--border-color); margin-bottom: 12px;">
          <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">Admin Panel</div>
          <div style="font-size: 16px; font-weight: 700; margin-top: 4px;">Control Center</div>
        </div>
        ${sections.map(s => `
          <a class="admin-nav-item ${activeSection === s.key ? 'active' : ''}" data-link href="/admin/${s.key === 'dashboard' ? '' : s.key}">
            <span style="font-size: 16px;">${s.icon}</span>
            <span>${s.label}</span>
          </a>
        `).join('')}
        <div style="padding: 12px; border-top: 1px solid var(--border-color); margin-top: 12px;">
          <a class="admin-nav-item" data-link href="/dashboard" style="font-size: 12px; color: var(--text-muted);">
            <span>↩</span><span>Back to App</span>
          </a>
        </div>
      </aside>

      <!-- Content area -->
      <main class="admin-content">
        ${contentHTML}
      </main>
    </div>
  `;
}
