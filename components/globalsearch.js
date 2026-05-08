/* ════════════════════════════════════════════════════════════
   OmniTrace — Global Search (Cmd+K)
   ════════════════════════════════════════════════════════════ */

export function initGlobalSearch() {
  // Create search overlay
  const overlay = document.createElement('div');
  overlay.id = 'global-search-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9500;background:rgba(0,0,0,0.5);backdrop-filter:blur(8px);display:none;align-items:flex-start;justify-content:center;padding:120px 20px 20px;';
  overlay.innerHTML = `
    <div style="background:var(--bg-secondary);border-radius:var(--radius-xl);width:100%;max-width:560px;box-shadow:var(--shadow-lg);overflow:hidden;animation:scaleIn 0.2s ease;">
      <div style="display:flex;align-items:center;gap:12px;padding:16px 20px;border-bottom:1px solid var(--border-color);">
        <span style="font-size:18px;color:var(--text-muted);">🔍</span>
        <input type="text" id="global-search-input" placeholder="Search pages, products, actions..." style="flex:1;background:none;border:none;font-size:15px;color:var(--text-primary);outline:none;">
        <kbd style="padding:2px 8px;background:var(--bg-tertiary);border:1px solid var(--border-color);border-radius:4px;font-size:11px;color:var(--text-muted);font-family:var(--font);">ESC</kbd>
      </div>
      <div id="global-search-results" style="max-height:360px;overflow-y:auto;padding:8px;">
        <!-- Results -->
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const searchEntries = [
    { icon: '🏠', label: 'Home', path: '/', group: 'Pages' },
    { icon: '✨', label: 'Features', path: '/features', group: 'Pages' },
    { icon: '💎', label: 'Pricing', path: '/pricing', group: 'Pages' },
    { icon: '🏢', label: 'About', path: '/about', group: 'Pages' },
    { icon: '👥', label: 'Team', path: '/team', group: 'Pages' },
    { icon: '💼', label: 'Careers', path: '/careers', group: 'Pages' },
    { icon: '📝', label: 'Blog', path: '/blog', group: 'Pages' },
    { icon: '📬', label: 'Contact', path: '/contact', group: 'Pages' },
    { icon: '📚', label: 'Documentation', path: '/docs', group: 'Resources' },
    { icon: '❓', label: 'Help Center', path: '/help', group: 'Resources' },
    { icon: '📊', label: 'Dashboard', path: '/dashboard', group: 'Workspace' },
    { icon: '📦', label: 'Workspace', path: '/workspace', group: 'Workspace' },
    { icon: '📷', label: 'Scan QR', path: '/scan', group: 'Workspace' },
    { icon: '👤', label: 'Profile', path: '/profile', group: 'Account' },
    { icon: '💳', label: 'Billing', path: '/billing', group: 'Account' },
    { icon: '🔔', label: 'Notifications', path: '/notifications', group: 'Account' },
    { icon: '🔑', label: 'API Settings', path: '/api', group: 'Account' },
    { icon: '🧪', label: 'Demo Mode', path: '/demo', group: 'Other' },
    { icon: '🔐', label: 'Login', path: '/login', group: 'Auth' },
    { icon: '📝', label: 'Sign Up', path: '/signup', group: 'Auth' },
    { icon: '🛡️', label: 'Privacy Policy', path: '/privacy', group: 'Legal' },
    { icon: '📋', label: 'Terms of Service', path: '/terms', group: 'Legal' },
  ];

  function openSearch() {
    overlay.style.display = 'flex';
    const input = document.getElementById('global-search-input');
    input.value = '';
    input.focus();
    renderResults('');
  }

  function closeSearch() {
    overlay.style.display = 'none';
  }

  function renderResults(query) {
    const results = document.getElementById('global-search-results');
    const q = query.toLowerCase().trim();

    const filtered = q ? searchEntries.filter(e =>
      e.label.toLowerCase().includes(q) || e.group.toLowerCase().includes(q) || e.path.includes(q)
    ) : searchEntries;

    if (!filtered.length) {
      results.innerHTML = '<p style="padding:20px;text-align:center;color:var(--text-muted);font-size:14px;">No results found.</p>';
      return;
    }

    // Group by category
    const groups = {};
    filtered.forEach(e => {
      if (!groups[e.group]) groups[e.group] = [];
      groups[e.group].push(e);
    });

    results.innerHTML = Object.entries(groups).map(([group, items]) => `
      <div style="margin-bottom:8px;">
        <div style="padding:6px 12px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-muted);">${group}</div>
        ${items.map(e => `
          <a data-link href="${e.path}" class="global-search-item" style="display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:var(--radius-md);cursor:pointer;transition:all 0.15s;color:var(--text-primary);" onmouseover="this.style.background='var(--bg-tertiary)'" onmouseout="this.style.background=''">
            <span style="font-size:16px;">${e.icon}</span>
            <span style="font-size:14px;font-weight:500;">${e.label}</span>
            <span style="margin-left:auto;font-size:12px;color:var(--text-muted);font-family:monospace;">${e.path}</span>
          </a>
        `).join('')}
      </div>
    `).join('');

    // Close on click
    results.querySelectorAll('[data-link]').forEach(el => {
      el.addEventListener('click', () => closeSearch());
    });
  }

  // Input handler
  document.getElementById('global-search-input')?.addEventListener('input', (e) => {
    renderResults(e.target.value);
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Cmd+K or Ctrl+K to open
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
    // Escape to close
    if (e.key === 'Escape') closeSearch();
  });

  // Close on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeSearch();
  });
}
