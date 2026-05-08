/* ════════════════════════════════════════════════════════════
   OmniTrace — Developer QA Checker Panel
   Press Ctrl+Shift+D to toggle
   ════════════════════════════════════════════════════════════ */

export function initQAChecker() {
  if (typeof window === 'undefined') return;

  // Create panel
  const panel = document.createElement('div');
  panel.id = 'qa-panel';
  panel.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 16px;
    width: 280px;
    box-shadow: var(--shadow-lg);
    font-size: 13px;
    display: none;
  `;

  panel.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
      <strong>QA Health Check</strong>
      <button id="qa-close" style="background:none;border:none;font-size:16px;cursor:pointer;color:var(--text-secondary);">×</button>
    </div>
    <div id="qa-results" style="line-height:1.8;"></div>
  `;

  document.body.appendChild(panel);

  // Toggle with keyboard
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
      e.preventDefault();
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
      if (panel.style.display === 'block') runChecks();
    }
  });

  document.getElementById('qa-close')?.addEventListener('click', () => {
    panel.style.display = 'none';
  });

  function runChecks() {
    const results = document.getElementById('qa-results');
    let html = '';

    // Route check
    const currentPath = window.location.pathname;
    const validRoutes = ['/', '/features', '/pricing', '/dashboard', '/workspace', '/scan', '/login', '/signup', '/demo'];
    const routeOk = validRoutes.includes(currentPath) || currentPath.startsWith('/admin') || currentPath.startsWith('/docs');
    html += `<div style="color:${routeOk ? 'var(--success)' : 'var(--danger)'}">✓ Route: ${currentPath} ${routeOk ? '' : '(Unknown)'}</div>`;

    // Auth status
    const user = window.Store?.get('user');
    html += `<div style="color:${user ? 'var(--success)' : 'var(--text-muted)'}">✓ Auth: ${user ? user.email : 'Not logged in'}</div>`;

    // Firebase status
    const firebaseReady = !!window.Firebase?.db;
    html += `<div style="color:${firebaseReady ? 'var(--success)' : 'var(--warning)'}">✓ Firebase: ${firebaseReady ? 'Connected' : 'Checking...'}</div>`;

    // Console errors
    const errors = window._qaErrors || 0;
    html += `<div style="color:${errors > 0 ? 'var(--danger)' : 'var(--success)'}">✓ Console errors: ${errors}</div>`;

    results.innerHTML = html;
  }

  // Capture console errors
  const originalError = console.error;
  console.error = function(...args) {
    window._qaErrors = (window._qaErrors || 0) + 1;
    return originalError.apply(console, args);
  };
}
