/* ════════════════════════════════════════════════════════════
   OmniTrace — Notifications Page
   ════════════════════════════════════════════════════════════ */

import Store from '../assets/js/store.js';

export default function renderNotifications() {
  return `
    <div class="dashboard-page">
      <div class="page-header">
        <div><h1 class="page-title">🔔 Notifications</h1><p class="page-subtitle">Real-time alerts and updates</p></div>
        <button class="btn btn-sm btn-secondary" id="btn-mark-read">Mark All Read</button>
      </div>
      <div id="notifications-list">
        <!-- Rendered via JS -->
      </div>
    </div>
  `;
}

export async function init() {
  const user = Store.get('user');
  if (!user) return;

  const container = document.getElementById('notifications-list');
  container.innerHTML = window.Skeleton.timeline(6);

  // Build notifications from recent activities
  if (!window.OmniDB) {
    container.innerHTML = window.ErrorUI.render('Service unavailable.', 'window.location.reload()');
    return;
  }

  const unsub = window.OmniDB.subscribeActivity(user.uid, (activities) => {
    if (!activities.length) {
      container.innerHTML = `
        <div class="empty-state" style="padding: 60px;">
          <div class="empty-icon">🔔</div>
          <p class="empty-title">No notifications</p>
          <p class="empty-desc">When something happens in your workspace, you'll see it here.</p>
        </div>
      `;
      return;
    }

    const notifications = activities.map(a => {
      const icons = { created: '📦', updated: '✏️', deleted: '🗑️', scanned: '📱', upgrade: '💎', downgrade: '⬇️' };
      const colors = { created: 'success', updated: 'primary', deleted: 'danger', scanned: 'primary', upgrade: 'warning', downgrade: 'primary' };
      return {
        icon: icons[a.action] || '📋',
        color: colors[a.action] || 'primary',
        title: a.action.charAt(0).toUpperCase() + a.action.slice(1),
        message: a.details,
        time: a.createdAt?.toDate ? timeAgo(a.createdAt.toDate()) : 'Just now',
        read: false
      };
    });

    container.innerHTML = `
      <div class="glass-card" style="padding: 0; overflow: hidden;">
        ${notifications.map((n, i) => `
          <div style="display: flex; align-items: flex-start; gap: 14px; padding: 16px 24px; border-bottom: 1px solid var(--border-color); ${!n.read ? 'background: rgba(99,102,241,0.03);' : ''} transition: background 0.2s; cursor: pointer;" onclick="this.style.background='';" data-idx="${i}">
            <div style="width: 40px; height: 40px; border-radius: var(--radius-md); background: ${!n.read ? 'rgba(99,102,241,0.12)' : 'var(--bg-tertiary)'}; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;">${n.icon}</div>
            <div style="flex: 1; min-width: 0;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <strong style="font-size: 14px;">${n.title}</strong>
                ${!n.read ? '<span style="width: 8px; height: 8px; background: var(--primary); border-radius: 50;"></span>' : ''}
              </div>
              <p style="font-size: 13px; color: var(--text-secondary); margin: 0; line-height: 1.5;">${n.message}</p>
              <span style="font-size: 11px; color: var(--text-muted); margin-top: 4px; display: inline-block;">${n.time}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Mark all read
    document.getElementById('btn-mark-read')?.addEventListener('click', () => {
      container.querySelectorAll('[data-idx]').forEach(el => {
        el.style.background = '';
        el.querySelector('span[style*="border-radius: 50"]')?.remove();
      });
      window.showToast('All notifications marked as read.', 'success');
    });
  }, (err) => {
    container.innerHTML = window.ErrorUI.render('Failed to load notifications.', 'window.location.reload()');
  });

  if (window._currentUnsubscribes) window._currentUnsubscribes.push(unsub);
}

function timeAgo(date) {
  const s = Math.floor((new Date() - date) / 1000);
  if (s < 60) return 'Just now';
  if (s < 3600) return Math.floor(s / 60) + 'm ago';
  if (s < 86400) return Math.floor(s / 3600) + 'h ago';
  return Math.floor(s / 86400) + 'd ago';
}
