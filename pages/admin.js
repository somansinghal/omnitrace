/* ════════════════════════════════════════════════════════════
   OmniTrace — Admin Page (Stripe-Level Control Panel)
   Sub-routes: /admin, /admin/users, /admin/workspaces, etc.
   ════════════════════════════════════════════════════════════ */

import Store from '../assets/js/store.js';

export default async function renderAdmin() {
  const user = Store.get('user');
  if (user?.role !== 'admin') {
    return `
      <div class="dashboard-page">
        <div class="empty-state" style="min-height: 60vh;">
          <div class="empty-icon">🔒</div>
          <h2 class="empty-title">Access Denied</h2>
          <p class="empty-desc">Admin role required. Set <code>role: "admin"</code> in your user document.</p>
          <a class="btn btn-primary" data-link href="/dashboard">Back to Dashboard</a>
        </div>
      </div>
    `;
  }

  // Determine active section from URL
  const path = window.location.pathname.replace('/admin', '').replace(/^\//, '') || 'dashboard';
  const section = path.split('/')[0];

  const { renderAdminShell } = await import('../components/adminlayout.js');
  return renderAdminShell(section, '<div id="admin-section-content"></div>');
}

export async function init() {
  if (Store.get('user')?.role !== 'admin') return;

  if (!window.Admin) {
    const mod = await import('../services/admin.js');
    window.Admin = mod.default;
  }

  const path = window.location.pathname.replace('/admin', '').replace(/^\//, '') || 'dashboard';
  const section = path.split('/')[0];
  const content = document.getElementById('admin-section-content');
  if (!content) return;

  // Skeleton
  content.innerHTML = window.Skeleton.card();

  try {
    switch (section) {
      case 'dashboard': await renderDashboard(content); break;
      case 'users': await renderUsers(content); break;
      case 'workspaces': await renderWorkspaces(content); break;
      case 'subscriptions': await renderSubscriptions(content); break;
      case 'payments': await renderPayments(content); break;
      case 'coupons': await renderCoupons(content); break;
      case 'analytics': await renderAnalytics(content); break;
      case 'activity': await renderActivity(content); break;
      case 'features': await renderFeatures(content); break;
      case 'system': await renderSystem(content); break;
      default: await renderDashboard(content);
    }
  } catch (err) {
    content.innerHTML = window.ErrorUI.render(err.message, 'window.location.reload()');
  }
}

// ═══════════════════════════════════════════════════════════
//  1. DASHBOARD
// ═══════════════════════════════════════════════════════════
async function renderDashboard(content) {
  const m = await window.Admin.getDashboardMetrics();
  const revChart = await window.Admin.getRevenueChart(6);

  content.innerHTML = `
    <div class="admin-section-title">
      <div><h1>📊 Admin Dashboard</h1><p>Real-time platform metrics</p></div>
    </div>

    <!-- KPI Grid -->
    <div class="grid grid-4" style="margin-bottom: 24px;">
      ${kpi('💰', 'rgba(16,185,129,0.12)', 'MRR', `₹${(m.mrr).toLocaleString()}`, `ARR ₹${(m.arr / 1000).toFixed(0)}K`)}
      ${kpi('👥', 'rgba(99,102,241,0.12)', 'Total Users', m.totalUsers.toLocaleString(), `+${m.newUsersWeek} this week`)}
      ${kpi('💎', 'rgba(244,114,182,0.12)', 'Active Subs', m.activeSubs.toLocaleString(), `${m.conversionRate}% conversion`)}
      ${kpi('🏢', 'rgba(6,182,212,0.12)', 'Workspaces', m.totalWorkspaces.toLocaleString(), `${m.totalProducts} products`)}
    </div>

    <!-- Charts Row -->
    <div class="grid grid-2" style="margin-bottom: 24px;">
      <div class="glass-card">
        <h3 style="font-size: 15px; font-weight: 700; margin-bottom: 16px;">💰 Revenue (6 months)</h3>
        <div style="height: 200px; display: flex; align-items: flex-end; gap: 8px; padding-top: 20px;">
          ${(() => {
            const max = Math.max(...revChart.map(c => c.revenue), 1);
            return revChart.map(c => `
              <div class="db-bar" style="height: ${Math.max((c.revenue / max) * 100, 4)}%;">
                <span class="bar-tooltip">₹${(c.revenue / 1000).toFixed(0)}K</span>
              </div>
            `).join('');
          })()}
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 8px; font-size: 11px; color: var(--text-muted);">
          ${revChart.map(c => `<span>${c.month}</span>`).join('')}
        </div>
      </div>

      <div class="glass-card">
        <h3 style="font-size: 15px; font-weight: 700; margin-bottom: 16px;">👥 Plan Breakdown</h3>
        ${planBreakdownHTML(m.planBreakdown, m.totalUsers)}
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-3" style="margin-bottom: 24px;">
      ${kpi('🧾', 'rgba(99,102,241,0.12)', 'Total Revenue', `₹${(m.totalRevenue).toLocaleString()}`, `₹${m.monthlyRevenue.toLocaleString()} this month`)}
      ${kpi('📱', 'rgba(6,182,212,0.12)', 'Total Scans', m.totalScans.toLocaleString(), 'All-time')}
      ${kpi('📊', 'rgba(245,158,11,0.12)', 'Coupon Uses', m.couponRedemptions.toLocaleString(), `${m.churnedUsers} churned`)}
    </div>

    <!-- Recent Activity -->
    <div class="glass-card">
      <h3 style="font-size: 15px; font-weight: 700; margin-bottom: 16px;">📋 Recent Platform Activity</h3>
      <div id="recent-activity">${window.Skeleton.timeline(5)}</div>
    </div>
  `;

  // Load recent activity
  const activities = await window.Admin.getRecentActivity(15);
  const activityDiv = document.getElementById('recent-activity');
  if (activities.length) {
    activityDiv.innerHTML = activities.map(a => `
      <div style="display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--border-color);">
        <span class="badge badge-${a.action === 'created' ? 'success' : a.action === 'deleted' ? 'danger' : 'primary'}">${a.action}</span>
        <div style="flex: 1; min-width: 0;">
          <p style="font-size: 13px; margin: 0;">${escapeHtml(a.details || '')}</p>
          <span style="font-size: 11px; color: var(--text-muted);">${timeAgo(a.createdAt?.toDate ? a.createdAt.toDate() : new Date())}</span>
        </div>
      </div>
    `).join('');
  } else {
    activityDiv.innerHTML = '<p style="color: var(--text-muted); font-size: 14px; padding: 20px 0;">No recent activity.</p>';
  }
}

// ═══════════════════════════════════════════════════════════
//  2. USER MANAGEMENT
// ═══════════════════════════════════════════════════════════
async function renderUsers(content) {
  content.innerHTML = `
    <div class="admin-section-title">
      <div><h1>👥 User Management</h1><p>View and manage all users</p></div>
    </div>
    <div style="display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap;">
      <div class="search-bar" style="flex: 1; min-width: 240px;">
        <span class="search-icon">🔍</span>
        <input type="text" id="user-search" placeholder="Search by name, email, plan...">
      </div>
      <select class="form-input" id="user-filter" style="max-width: 160px;">
        <option value="">All Plans</option>
        <option value="free">Free</option>
        <option value="starter">Starter</option>
        <option value="pro">Pro</option>
        <option value="enterprise">Enterprise</option>
      </select>
    </div>
    <div class="glass-card" style="padding: 0; overflow: hidden;">
      <div id="users-table">${window.Skeleton.table(8)}</div>
    </div>
  `;

  let allUsers = await window.Admin.getAllUsers();
  renderUsersTable(allUsers);

  document.getElementById('user-search')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const filter = document.getElementById('user-filter').value;
    let filtered = allUsers.filter(u =>
      (u.name || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q) ||
      (u.plan || '').toLowerCase().includes(q)
    );
    if (filter) filtered = filtered.filter(u => (u.plan || 'free') === filter);
    renderUsersTable(filtered);
  });

  document.getElementById('user-filter')?.addEventListener('change', (e) => {
    const filter = e.target.value;
    const q = document.getElementById('user-search').value.toLowerCase();
    let filtered = filter ? allUsers.filter(u => (u.plan || 'free') === filter) : allUsers;
    if (q) filtered = filtered.filter(u => (u.name || '').toLowerCase().includes(q) || (u.email || '').toLowerCase().includes(q));
    renderUsersTable(filtered);
  });

  // User actions
  window._adminUserAction = async (uid, action, name) => {
    try {
      if (action === 'delete') {
        if (!confirm(`Delete user "${name}"? This cannot be undone.`)) return;
        await window.Admin.deleteUser(uid);
        window.showToast('User deleted.', 'success');
      } else if (action === 'suspend') {
        const reason = prompt('Suspension reason:') || 'No reason provided';
        await window.Admin.suspendUser(uid, reason);
        window.showToast('User suspended.', 'warning');
      } else if (action === 'unsuspend') {
        await window.Admin.unsuspendUser(uid);
        window.showToast('User reactivated.', 'success');
      } else if (action === 'makeAdmin') {
        if (!confirm(`Promote "${name}" to admin?`)) return;
        await window.Admin.setUserRole(uid, 'admin');
        window.showToast('User promoted to admin.', 'success');
      } else if (action === 'removeAdmin') {
        await window.Admin.setUserRole(uid, 'user');
        window.showToast('Admin role removed.', 'success');
      }
      allUsers = await window.Admin.getAllUsers();
      renderUsersTable(allUsers);
    } catch (err) { window.showToast(err.message, 'error'); }
  };

  window._adminPlanChange = async (uid, name) => {
    const plan = prompt(`Change plan for "${name}".\nOptions: free, starter, pro, enterprise`);
    if (!plan || !['free', 'starter', 'pro', 'enterprise'].includes(plan)) return;
    try {
      await window.Admin.updateUserPlan(uid, plan);
      window.showToast(`Plan changed to ${plan}.`, 'success');
      allUsers = await window.Admin.getAllUsers();
      renderUsersTable(allUsers);
    } catch (err) { window.showToast(err.message, 'error'); }
  };
}

function renderUsersTable(users) {
  const div = document.getElementById('users-table');
  if (!div) return;
  if (!users.length) {
    div.innerHTML = '<div class="empty-state" style="padding: 40px;"><p class="empty-desc">No users found.</p></div>';
    return;
  }
  div.innerHTML = `
    <div class="table-wrapper" style="border:none;">
      <table class="data-table">
        <thead><tr><th>User</th><th>Email</th><th>Plan</th><th>Role</th><th>Status</th><th>Joined</th><th>Actions</th></tr></thead>
        <tbody>
          ${users.map(u => `
            <tr>
              <td>
                <div style="display:flex;align-items:center;gap:10px;">
                  <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:13px;">${(u.name || u.email || 'U').charAt(0).toUpperCase()}</div>
                  <strong>${escapeHtml(u.name || 'Unnamed')}</strong>
                </div>
              </td>
              <td style="font-size:13px;">${escapeHtml(u.email || '—')}</td>
              <td><span class="badge badge-${u.plan === 'pro' ? 'warning' : u.plan === 'starter' ? 'success' : u.plan === 'enterprise' ? 'danger' : 'primary'}">${(u.plan || 'free').toUpperCase()}</span></td>
              <td>${u.role === 'admin' ? '<span class="badge badge-danger">ADMIN</span>' : 'User'}</td>
              <td>${u.status === 'suspended' ? '<span class="badge badge-danger">SUSPENDED</span>' : '<span class="badge badge-success">Active</span>'}</td>
              <td style="font-size:12px;">${u.createdAt?.toDate ? u.createdAt.toDate().toLocaleDateString() : '—'}</td>
              <td>
                <div style="display:flex;gap:4px;">
                  <button class="btn btn-sm btn-secondary" onclick="window._adminPlanChange('${u.id}', '${escapeAttr(u.name || u.email)}')" title="Change plan">💎</button>
                  ${u.status === 'suspended'
                    ? `<button class="btn btn-sm btn-secondary" style="color:var(--success);" onclick="window._adminUserAction('${u.id}', 'unsuspend', '${escapeAttr(u.name || u.email)}')" title="Unsuspend">▶️</button>`
                    : `<button class="btn btn-sm btn-secondary" style="color:var(--warning);" onclick="window._adminUserAction('${u.id}', 'suspend', '${escapeAttr(u.name || u.email)}')" title="Suspend">⏸️</button>`}
                  ${u.role === 'admin'
                    ? `<button class="btn btn-sm btn-secondary" onclick="window._adminUserAction('${u.id}', 'removeAdmin', '${escapeAttr(u.name || u.email)}')" title="Remove admin">⚒️</button>`
                    : `<button class="btn btn-sm btn-secondary" onclick="window._adminUserAction('${u.id}', 'makeAdmin', '${escapeAttr(u.name || u.email)}')" title="Make admin">🛡️</button>`}
                  <button class="btn btn-sm btn-secondary" style="color:var(--danger);" onclick="window._adminUserAction('${u.id}', 'delete', '${escapeAttr(u.name || u.email)}')" title="Delete">🗑️</button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>`;
}

// ═══════════════════════════════════════════════════════════
//  3. WORKSPACE MANAGEMENT
// ═══════════════════════════════════════════════════════════
async function renderWorkspaces(content) {
  content.innerHTML = `
    <div class="admin-section-title">
      <div><h1>🏢 Workspace Management</h1><p>View and manage all workspaces</p></div>
    </div>
    <div class="glass-card" style="padding: 0; overflow: hidden;">
      <div id="ws-table">${window.Skeleton.table(6)}</div>
    </div>
  `;

  const workspaces = await window.Admin.getAllWorkspaces();
  const div = document.getElementById('ws-table');

  if (!workspaces.length) {
    div.innerHTML = '<div class="empty-state" style="padding: 40px;"><div class="empty-icon">🏢</div><p class="empty-title">No workspaces yet</p><p class="empty-desc">Workspaces will appear here as users sign up and create them.</p></div>';
    return;
  }

  div.innerHTML = `
    <div class="table-wrapper" style="border:none;">
      <table class="data-table">
        <thead><tr><th>Name</th><th>Plan</th><th>Members</th><th>Products</th><th>Scans</th><th>Created</th><th>Actions</th></tr></thead>
        <tbody>
          ${workspaces.map(w => `
            <tr>
              <td><strong>${escapeHtml(w.name || 'Unnamed')}</strong></td>
              <td><span class="badge badge-${w.plan === 'pro' ? 'warning' : 'primary'}">${(w.plan || 'free').toUpperCase()}</span></td>
              <td>${(w.members || []).length}</td>
              <td>${w.productCount || 0}</td>
              <td>${w.scanCount || 0}</td>
              <td style="font-size:12px;">${w.createdAt?.toDate ? w.createdAt.toDate().toLocaleDateString() : '—'}</td>
              <td>
                <button class="btn btn-sm btn-secondary" style="color:var(--danger);" onclick="window._adminDeleteWS('${w.id}', '${escapeAttr(w.name)}')">🗑️</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>`;

  window._adminDeleteWS = async (id, name) => {
    if (!confirm(`Delete workspace "${name}"? This cannot be undone.`)) return;
    try {
      await window.Admin.deleteWorkspace(id);
      window.showToast('Workspace deleted.', 'success');
      await renderWorkspaces(content);
    } catch (err) { window.showToast(err.message, 'error'); }
  };
}

// ═══════════════════════════════════════════════════════════
//  4. SUBSCRIPTIONS
// ═══════════════════════════════════════════════════════════
async function renderSubscriptions(content) {
  const users = await window.Admin.getAllUsers();
  const m = await window.Admin.getDashboardMetrics();

  const active = users.filter(u => u.plan && u.plan !== 'free' && u.planStatus !== 'cancelled');
  const expired = users.filter(u => {
    if (!u.planEndDate) return false;
    const end = u.planEndDate.toDate ? u.planEndDate.toDate() : new Date(u.planEndDate);
    return end < new Date() && u.plan !== 'free';
  });
  const expiringSoon = users.filter(u => {
    if (!u.planEndDate || u.plan === 'free') return false;
    const end = u.planEndDate.toDate ? u.planEndDate.toDate() : new Date(u.planEndDate);
    const days = Math.ceil((end - new Date()) / 86400000);
    return days > 0 && days <= 7;
  });

  content.innerHTML = `
    <div class="admin-section-title">
      <div><h1>💎 Subscriptions</h1><p>Active plans, renewals, and expiry tracking</p></div>
    </div>

    <div class="grid grid-4" style="margin-bottom: 24px;">
      ${kpi('💰', 'rgba(16,185,129,0.12)', 'MRR', `₹${m.mrr.toLocaleString()}`, '')}
      ${kpi('💎', 'rgba(99,102,241,0.12)', 'Active', m.activeSubs.toString(), `${m.conversionRate}% rate`)}
      ${kpi('⏰', 'rgba(245,158,11,0.12)', 'Expiring Soon', expiringSoon.length.toString(), 'Within 7 days')}
      ${kpi('❌', 'rgba(239,68,68,0.12)', 'Expired', expired.length.toString(), 'Need attention')}
    </div>

    <div class="glass-card" style="padding: 0; overflow: hidden;">
      <div style="padding: 16px 20px; border-bottom: 1px solid var(--border-color);">
        <h3 style="font-size: 15px; font-weight: 700;">Active Subscriptions</h3>
      </div>
      ${active.length === 0 ? '<div class="empty-state" style="padding: 40px;"><p class="empty-desc">No active paid subscriptions yet.</p></div>' : `
        <div class="table-wrapper" style="border:none;">
          <table class="data-table">
            <thead><tr><th>User</th><th>Plan</th><th>Cycle</th><th>Started</th><th>Renews</th><th>Days Left</th></tr></thead>
            <tbody>
              ${active.slice(0, 50).map(u => {
                const end = u.planEndDate?.toDate ? u.planEndDate.toDate() : null;
                const days = end ? Math.ceil((end - new Date()) / 86400000) : '—';
                return `
                  <tr>
                    <td><strong>${escapeHtml(u.name || u.email)}</strong></td>
                    <td><span class="badge badge-${u.plan === 'pro' ? 'warning' : 'success'}">${u.plan.toUpperCase()}</span></td>
                    <td>${u.billingCycle || 'monthly'}</td>
                    <td style="font-size:12px;">${u.planStartDate?.toDate ? u.planStartDate.toDate().toLocaleDateString() : '—'}</td>
                    <td style="font-size:12px;">${end ? end.toLocaleDateString() : '—'}</td>
                    <td>${typeof days === 'number' ? `<span class="badge badge-${days <= 7 ? 'warning' : 'success'}">${days}d</span>` : '—'}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `}
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════
//  5. PAYMENTS
// ═══════════════════════════════════════════════════════════
async function renderPayments(content) {
  const stats = await window.Admin.getPaymentStats();
  const payments = await window.Admin.getAllPayments(100);

  content.innerHTML = `
    <div class="admin-section-title">
      <div><h1>💳 Payment Monitoring</h1><p>Razorpay transactions and revenue tracking</p></div>
    </div>

    <div class="grid grid-4" style="margin-bottom: 24px;">
      ${kpi('🧾', 'rgba(99,102,241,0.12)', 'Total', stats.total.toString(), 'All payments')}
      ${kpi('✅', 'rgba(16,185,129,0.12)', 'Successful', stats.success.toString(), `${stats.total > 0 ? ((stats.success/stats.total)*100).toFixed(1) : 0}% rate`)}
      ${kpi('❌', 'rgba(239,68,68,0.12)', 'Failed', stats.failed.toString(), `${stats.pending} pending`)}
      ${kpi('💰', 'rgba(245,158,11,0.12)', 'Revenue', `₹${stats.totalAmount.toLocaleString()}`, 'From success')}
    </div>

    <div class="glass-card" style="padding: 0; overflow: hidden;">
      <div style="padding: 16px 20px; border-bottom: 1px solid var(--border-color);">
        <h3 style="font-size: 15px; font-weight: 700;">Recent Transactions</h3>
      </div>
      ${payments.length === 0 ? '<div class="empty-state" style="padding: 40px;"><div class="empty-icon">💳</div><p class="empty-title">No payments yet</p><p class="empty-desc">Razorpay transactions will appear here.</p></div>' : `
        <div class="table-wrapper" style="border:none;">
          <table class="data-table">
            <thead><tr><th>Date</th><th>Plan</th><th>Amount</th><th>Status</th><th>Cycle</th><th>Coupon</th><th>Razorpay ID</th></tr></thead>
            <tbody>
              ${payments.map(p => `
                <tr>
                  <td style="font-size:12px;">${p.createdAt?.toDate ? p.createdAt.toDate().toLocaleString() : '—'}</td>
                  <td><strong>${(p.plan || '').toUpperCase()}</strong></td>
                  <td>₹${(p.amount || 0).toLocaleString()}</td>
                  <td><span class="badge badge-${p.status === 'success' ? 'success' : p.status === 'failed' ? 'danger' : 'warning'}">${(p.status || 'pending').toUpperCase()}</span></td>
                  <td>${p.billingCycle || 'monthly'}</td>
                  <td>${p.couponCode || '—'}</td>
                  <td style="font-family:monospace;font-size:11px;">${p.razorpayPaymentId || '—'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════
//  6. COUPONS
// ═══════════════════════════════════════════════════════════
async function renderCoupons(content) {
  if (!window.CouponService) {
    const mod = await import('../services/coupons.js');
    window.CouponService = mod.default;
  }

  content.innerHTML = `
    <div class="admin-section-title">
      <div><h1>🎟️ Coupons</h1><p>Create and manage discount codes</p></div>
      <button class="btn btn-primary" id="btn-create-coupon">+ Create Coupon</button>
    </div>
    <div class="glass-card" style="padding: 0; overflow: hidden;">
      <div id="coupons-table">${window.Skeleton.table(5)}</div>
    </div>
    <div id="coupon-modal" class="modal-root"></div>
  `;

  const loadCoupons = async () => {
    try {
      const coupons = await window.CouponService.getAllCoupons();
      const div = document.getElementById('coupons-table');
      if (!coupons.length) {
        div.innerHTML = '<div class="empty-state" style="padding: 40px;"><div class="empty-icon">🎟️</div><p class="empty-title">No coupons yet</p><p class="empty-desc">Create your first discount code.</p></div>';
        return;
      }
      div.innerHTML = `
        <div class="table-wrapper" style="border:none;">
          <table class="data-table">
            <thead><tr><th>Code</th><th>Discount</th><th>Usage</th><th>Expires</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              ${coupons.map(c => `
                <tr>
                  <td><strong style="font-family:monospace;color:var(--primary);">${c.code}</strong></td>
                  <td>${c.discount}%</td>
                  <td>${c.usedCount || 0}${c.usageLimit ? ' / ' + c.usageLimit : ''}</td>
                  <td>${c.expiresAt?.toDate ? c.expiresAt.toDate().toLocaleDateString() : 'Never'}</td>
                  <td><span class="badge badge-${c.active ? 'success' : 'danger'}">${c.active ? 'Active' : 'Inactive'}</span></td>
                  <td>
                    <div style="display:flex;gap:6px;">
                      <button class="btn btn-sm btn-secondary" onclick="window._adminToggleCoupon('${c.id}',${!c.active})">${c.active ? '⏸️' : '▶️'}</button>
                      <button class="btn btn-sm btn-secondary" style="color:var(--danger);" onclick="window._adminDelCoupon('${c.id}','${c.code}')">🗑️</button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>`;
    } catch (err) {
      document.getElementById('coupons-table').innerHTML = window.ErrorUI.render('Failed to load.', 'window.location.reload()');
    }
  };

  window._adminToggleCoupon = async (id, active) => {
    try { await window.CouponService.toggleCoupon(id, active); window.showToast('Updated.', 'success'); loadCoupons(); }
    catch (e) { window.showToast(e.message, 'error'); }
  };
  window._adminDelCoupon = async (id, code) => {
    if (!confirm(`Delete "${code}"?`)) return;
    try { await window.CouponService.deleteCoupon(id); window.showToast('Deleted.', 'success'); loadCoupons(); }
    catch (e) { window.showToast(e.message, 'error'); }
  };

  document.getElementById('btn-create-coupon')?.addEventListener('click', () => {
    const modal = document.getElementById('coupon-modal');
    modal.innerHTML = `<div class="modal-overlay" id="mo"><div class="modal-content">
      <div class="modal-header"><h3 class="modal-title">Create Coupon</h3><button class="modal-close" id="mc">✕</button></div>
      <form id="cf"><div id="me" style="display:none;color:var(--danger);font-size:13px;background:rgba(239,68,68,0.1);padding:10px;border-radius:var(--radius-sm);margin-bottom:16px;"></div>
        <div class="form-group"><label class="form-label">Code</label><input type="text" class="form-input" id="cc" required placeholder="SAVE20" style="text-transform:uppercase;"></div>
        <div class="form-group"><label class="form-label">Discount (%)</label><input type="number" class="form-input" id="cd" required min="1" max="100"></div>
        <div class="form-group"><label class="form-label">Usage Limit</label><input type="number" class="form-input" id="cl" min="1" placeholder="Unlimited"></div>
        <div class="form-group"><label class="form-label">Expiry</label><input type="date" class="form-input" id="ce"></div>
        <button type="submit" class="btn btn-primary" style="width:100%;" id="cs">Create Coupon</button>
      </form></div></div>`;
    modal.classList.add('active');
    const close = () => { modal.classList.remove('active'); modal.innerHTML = ''; };
    document.getElementById('mc').onclick = close;
    document.getElementById('mo').onclick = e => { if (e.target === e.currentTarget) close(); };
    document.getElementById('cf').onsubmit = async (e) => {
      e.preventDefault();
      try {
        await window.CouponService.createCoupon({
          code: document.getElementById('cc').value.trim(),
          discount: document.getElementById('cd').value,
          usageLimit: document.getElementById('cl').value || null,
          expiresAt: document.getElementById('ce').value || null
        });
        window.showToast('Coupon created!', 'success');
        close(); loadCoupons();
      } catch (er) {
        document.getElementById('me').textContent = er.message;
        document.getElementById('me').style.display = 'block';
      }
    };
  });

  await loadCoupons();
}

// ═══════════════════════════════════════════════════════════
//  7. ANALYTICS
// ═══════════════════════════════════════════════════════════
async function renderAnalytics(content) {
  const growth = await window.Admin.getUserGrowthChart(30);
  const revChart = await window.Admin.getRevenueChart(6);
  const m = await window.Admin.getDashboardMetrics();

  content.innerHTML = `
    <div class="admin-section-title">
      <div><h1>📈 Analytics</h1><p>User growth, scan trends, and product metrics</p></div>
    </div>

    <div class="grid grid-3" style="margin-bottom: 24px;">
      ${kpi('👥', 'rgba(99,102,241,0.12)', 'New Users', `+${m.newUsersWeek}`, 'Last 7 days')}
      ${kpi('📦', 'rgba(6,182,212,0.12)', 'Products', m.totalProducts.toLocaleString(), 'All-time')}
      ${kpi('📱', 'rgba(244,114,182,0.12)', 'Scans', m.totalScans.toLocaleString(), 'All-time')}
    </div>

    <div class="glass-card" style="margin-bottom: 24px;">
      <h3 style="font-size: 15px; font-weight: 700; margin-bottom: 16px;">📈 User Growth (30 days)</h3>
      <div style="height: 200px; display: flex; align-items: flex-end; gap: 3px;">
        ${(() => {
          const max = Math.max(...growth.map(g => g.count), 1);
          return growth.map(g => `<div class="db-bar" style="height: ${Math.max((g.count / max) * 100, 4)}%;"><span class="bar-tooltip">${g.count} users · ${g.date}</span></div>`).join('');
        })()}
      </div>
    </div>

    <div class="glass-card">
      <h3 style="font-size: 15px; font-weight: 700; margin-bottom: 16px;">💰 Revenue Trend (6 months)</h3>
      <div style="height: 200px; display: flex; align-items: flex-end; gap: 8px;">
        ${(() => {
          const max = Math.max(...revChart.map(c => c.revenue), 1);
          return revChart.map(c => `<div class="db-bar" style="height: ${Math.max((c.revenue / max) * 100, 4)}%;"><span class="bar-tooltip">₹${c.revenue.toLocaleString()}</span></div>`).join('');
        })()}
      </div>
      <div style="display: flex; justify-content: space-between; margin-top: 8px; font-size: 11px; color: var(--text-muted);">
        ${revChart.map(c => `<span>${c.month}</span>`).join('')}
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════
//  8. ACTIVITY LOG
// ═══════════════════════════════════════════════════════════
async function renderActivity(content) {
  const [activities, adminLogs] = await Promise.all([
    window.Admin.getRecentActivity(50),
    window.Admin.getAdminLogs(50)
  ]);

  content.innerHTML = `
    <div class="admin-section-title">
      <div><h1>📋 Activity Log</h1><p>Track all platform actions</p></div>
    </div>

    <div class="tabs" id="act-tabs">
      <div class="tab active" data-tab="user">User Activity</div>
      <div class="tab" data-tab="admin">Admin Actions</div>
    </div>

    <div id="act-user" class="glass-card">
      ${activities.length === 0 ? '<div class="empty-state" style="padding: 40px;"><p class="empty-desc">No activity yet.</p></div>' : `
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${activities.map(a => `
            <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:var(--bg-tertiary);border-radius:var(--radius-md);">
              <span class="badge badge-${a.action === 'created' ? 'success' : a.action === 'deleted' ? 'danger' : 'primary'}" style="flex-shrink:0;">${a.action}</span>
              <div style="flex:1;min-width:0;">
                <p style="font-size:13px;margin:0;">${escapeHtml(a.details || '')}</p>
                <span style="font-size:11px;color:var(--text-muted);">${a.createdAt?.toDate ? a.createdAt.toDate().toLocaleString() : ''}</span>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    </div>

    <div id="act-admin" class="glass-card" style="display: none;">
      ${adminLogs.length === 0 ? '<div class="empty-state" style="padding: 40px;"><p class="empty-desc">No admin actions logged yet.</p></div>' : `
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${adminLogs.map(l => `
            <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:var(--bg-tertiary);border-radius:var(--radius-md);">
              <span class="badge badge-warning" style="flex-shrink:0;">${l.action}</span>
              <div style="flex:1;min-width:0;">
                <p style="font-size:13px;margin:0;">${escapeHtml(l.details || '')}</p>
                <span style="font-size:11px;color:var(--text-muted);">${l.adminEmail} · ${l.createdAt?.toDate ? l.createdAt.toDate().toLocaleString() : ''}</span>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;

  document.querySelectorAll('#act-tabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#act-tabs .tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('act-user').style.display = tab.dataset.tab === 'user' ? '' : 'none';
      document.getElementById('act-admin').style.display = tab.dataset.tab === 'admin' ? '' : 'none';
    });
  });
}

// ═══════════════════════════════════════════════════════════
//  9. FEATURE FLAGS
// ═══════════════════════════════════════════════════════════
async function renderFeatures(content) {
  const flags = await window.Admin.getFeatureFlags();
  const flagDefs = [
    { key: 'enableSignups', label: 'User Signups', desc: 'Allow new users to register accounts' },
    { key: 'enableGoogleAuth', label: 'Google Authentication', desc: 'Enable Google OAuth login' },
    { key: 'enableQRScanner', label: 'QR Scanner', desc: 'Enable camera-based QR scanning' },
    { key: 'enableAPI', label: 'API Access', desc: 'Allow Pro/Enterprise users to generate API keys' },
    { key: 'enableCoupons', label: 'Coupon System', desc: 'Allow users to apply discount codes' },
    { key: 'enableEmailNotifications', label: 'Email Notifications', desc: 'Send transactional emails' },
    { key: 'enableDemoMode', label: 'Public Demo', desc: 'Show demo page without login' },
    { key: 'maintenanceMode', label: '⚠️ Maintenance Mode', desc: 'Temporarily disable platform access' }
  ];

  content.innerHTML = `
    <div class="admin-section-title">
      <div><h1>🚩 Feature Flags</h1><p>Toggle platform features in real-time</p></div>
    </div>

    <div class="glass-card">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${flagDefs.map(f => `
          <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px;background:var(--bg-tertiary);border-radius:var(--radius-md);">
            <div style="flex:1;min-width:0;">
              <div style="font-weight:700;font-size:14px;margin-bottom:4px;">${f.label}</div>
              <div style="font-size:12px;color:var(--text-secondary);">${f.desc}</div>
            </div>
            <div class="ff-toggle ${flags[f.key] ? 'on' : ''}" data-flag="${f.key}"></div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  document.querySelectorAll('.ff-toggle').forEach(toggle => {
    toggle.addEventListener('click', async () => {
      const key = toggle.dataset.flag;
      const newState = !toggle.classList.contains('on');
      try {
        await window.Admin.updateFeatureFlag(key, newState);
        toggle.classList.toggle('on', newState);
        window.showToast(`${key} ${newState ? 'enabled' : 'disabled'}.`, 'success');
      } catch (err) {
        window.showToast(err.message, 'error');
      }
    });
  });
}

// ═══════════════════════════════════════════════════════════
//  10. SYSTEM HEALTH
// ═══════════════════════════════════════════════════════════
async function renderSystem(content) {
  const health = await window.Admin.getSystemHealth();

  content.innerHTML = `
    <div class="admin-section-title">
      <div><h1>⚡ System Health</h1><p>Monitor platform status and error logs</p></div>
      <button class="btn btn-secondary btn-sm" onclick="window.location.reload()">🔄 Refresh</button>
    </div>

    <!-- Service Status -->
    <div class="grid grid-2" style="margin-bottom: 24px;">
      ${[
        { name: 'Firestore Database', icon: '🗄️', ...health.firestore },
        { name: 'Authentication', icon: '🔐', ...health.auth },
        { name: 'File Storage', icon: '📁', ...health.storage },
        { name: 'Razorpay', icon: '💳', ...health.razorpay },
        { name: 'EmailJS', icon: '📧', ...health.emailjs }
      ].map(s => `
        <div class="glass-card">
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:12px;">
              <div style="font-size:24px;">${s.icon}</div>
              <div>
                <div style="font-weight:700;font-size:14px;">${s.name}</div>
                <div style="font-size:12px;color:var(--text-muted);">Latency: ${s.latency}</div>
              </div>
            </div>
            <span class="health-pill ${s.status}">${s.status}</span>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Stats -->
    <div class="grid grid-3" style="margin-bottom: 24px;">
      ${kpi('⚡', 'rgba(16,185,129,0.12)', 'Uptime', health.uptime, '30 days')}
      ${kpi('⚠️', 'rgba(245,158,11,0.12)', 'Errors (24h)', health.errorCount24h.toString(), 'See below')}
      ${kpi('🕐', 'rgba(99,102,241,0.12)', 'Last Check', 'Just now', health.lastCheck)}
    </div>

    <!-- Error Logs -->
    <div class="glass-card">
      <h3 style="font-size: 15px; font-weight: 700; margin-bottom: 16px;">⚠️ Recent Error Logs</h3>
      ${health.errors.length === 0 ? `
        <div class="empty-state" style="padding: 30px;">
          <div class="empty-icon">✨</div>
          <p class="empty-title">No errors detected</p>
          <p class="empty-desc">Platform is running smoothly.</p>
        </div>
      ` : `
        <div style="display: flex; flex-direction: column; gap: 8px; max-height: 400px; overflow-y: auto;">
          ${health.errors.map(e => `
            <div style="padding:12px;background:rgba(239,68,68,0.05);border-left:3px solid var(--danger);border-radius:var(--radius-sm);">
              <div style="font-size:13px;font-weight:600;color:var(--danger);">${escapeHtml(e.message || 'Unknown error')}</div>
              ${e.context ? `<div style="font-size:12px;color:var(--text-secondary);margin-top:4px;">Context: ${escapeHtml(e.context)}</div>` : ''}
              <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">${e.createdAt?.toDate ? e.createdAt.toDate().toLocaleString() : ''}</div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════
function kpi(icon, bg, label, value, sub) {
  return `
    <div class="db-kpi-card">
      <div class="kpi-icon" style="background: ${bg};">${icon}</div>
      <div class="kpi-value" style="font-size: 22px;">${value}</div>
      <div class="kpi-label">${label}</div>
      ${sub ? `<div style="font-size:11px;color:var(--text-muted);">${sub}</div>` : ''}
    </div>
  `;
}

function planBreakdownHTML(pb, totalUsers) {
  const plans = [
    { name: 'Free', count: pb.free, color: 'var(--text-secondary)' },
    { name: 'Starter', count: pb.starter, color: 'var(--success)' },
    { name: 'Pro', count: pb.pro, color: 'var(--primary)' },
    { name: 'Enterprise', count: pb.enterprise, color: 'var(--accent)' }
  ];
  return `<div style="display:flex;flex-direction:column;gap:14px;">
    ${plans.map(p => `
      <div>
        <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
          <span style="font-size:13px;font-weight:600;color:${p.color};">${p.name}</span>
          <span style="font-size:13px;font-weight:700;">${p.count}</span>
        </div>
        <div style="height:8px;background:var(--bg-tertiary);border-radius:4px;overflow:hidden;">
          <div style="height:100%;width:${(p.count / Math.max(totalUsers, 1)) * 100}%;background:${p.color};border-radius:4px;transition:width 0.8s ease;"></div>
        </div>
      </div>
    `).join('')}
  </div>`;
}

function timeAgo(date) {
  const s = Math.floor((new Date() - date) / 1000);
  if (s < 60) return 'Just now';
  if (s < 3600) return Math.floor(s / 60) + 'm ago';
  if (s < 86400) return Math.floor(s / 3600) + 'h ago';
  return Math.floor(s / 86400) + 'd ago';
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}

function escapeAttr(str) {
  return (str || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}
