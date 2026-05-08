/* ════════════════════════════════════════════════════════════
   OmniTrace — Billing Page (Advanced: Invoices, History, Lifecycle)
   ════════════════════════════════════════════════════════════ */

import Store from '../assets/js/store.js';

export default function renderBilling() {
  const user = Store.get('user');
  const plan = Store.get('plan') || 'free';

  const planInfo = {
    free: { name: 'Free', price: '₹0', desc: 'Basic tracking', color: '#64748B' },
    starter: { name: 'Starter', price: '₹199/mo', desc: 'Small teams', color: '#10B981' },
    pro: { name: 'Pro', price: '₹499/mo', desc: 'Growing businesses', color: '#6366F1' },
    enterprise: { name: 'Enterprise', price: 'Custom', desc: 'Large orgs', color: '#F472B6' }
  };

  const current = planInfo[plan] || planInfo.free;

  return `
    <div class="dashboard-page">
      <div class="page-header">
        <div><h1 class="page-title">💳 Billing</h1><p class="page-subtitle">Manage subscription & payment history</p></div>
      </div>

      <!-- Current Plan Card -->
      <div class="current-plan-card" style="margin-bottom: 32px; max-width: 560px;">
        <div class="plan-name">${current.name} Plan</div>
        <div class="plan-price">${current.price}</div>
        <div class="plan-info">${current.desc}</div>
        <div id="plan-dates" style="margin-top: 12px; font-size: 13px; opacity: 0.8;"></div>
        <div style="margin-top: 20px; display: flex; gap: 12px;">
          ${plan !== 'pro' && plan !== 'enterprise' ? `<a class="btn" data-link href="/pricing" style="background:rgba(255,255,255,0.2);color:#fff;backdrop-filter:blur(10px);">Upgrade Plan</a>` : ''}
          <a class="btn" data-link href="/pricing" style="background:rgba(255,255,255,0.1);color:#fff;">View Plans</a>
        </div>
      </div>

      <!-- Billing Details -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px;" class="billing-grid">
        <div class="glass-card" style="padding: 28px;">
          <h3 class="db-section-title">📋 Plan Limits</h3>
          <div id="plan-limits"></div>
        </div>
        <div class="glass-card" style="padding: 28px;">
          <h3 class="db-section-title">📊 Usage</h3>
          <div id="plan-usage"></div>
        </div>
      </div>

      <!-- Payment History -->
      <div class="glass-card" style="padding: 28px; margin-bottom: 24px;">
        <div class="db-card-header">
          <h3 class="db-section-title">🧾 Payment History</h3>
        </div>
        <div id="payment-history"></div>
      </div>

      <!-- Invoice Generator -->
      <div class="glass-card" style="padding: 28px;">
        <h3 class="db-section-title">📄 Generate Invoice</h3>
        <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 16px;">Generate a PDF invoice for any past payment.</p>
        <div id="invoice-select"></div>
      </div>
    </div>

    <style>
      @media (max-width: 768px) {
        .billing-grid { grid-template-columns: 1fr !important; }
      }
    </style>
  `;
}

export async function init() {
  const user = Store.get('user');
  if (!user) return;

  const plan = Store.get('plan') || 'free';

  // Skeletons
  document.getElementById('payment-history').innerHTML = window.Skeleton.table(4);
  document.getElementById('plan-limits').innerHTML = window.Skeleton.text('100%');
  document.getElementById('plan-usage').innerHTML = window.Skeleton.text('100%');

  // Plan dates
  try {
    if (!window.OmniDB) {
      const mod = await import('../services/omnidb.js');
      window.OmniDB = mod.default;
    }

    const profile = await window.OmniDB.getProfile(user.uid);
    const datesEl = document.getElementById('plan-dates');

    if (profile?.planEndDate) {
      const endDate = profile.planEndDate.toDate();
      const startDate = profile.planStartDate?.toDate();
      const daysLeft = Math.ceil((endDate - new Date()) / (1000 * 60 * 60 * 24));

      datesEl.innerHTML = `
        ${startDate ? `Started: ${startDate.toLocaleDateString()}` : ''}
        ${startDate ? ' · ' : ''}Renews: ${endDate.toLocaleDateString()}
        ${daysLeft > 0 ? ` · ${daysLeft} days remaining` : ''}
      `;
    }
  } catch (e) { console.warn('Profile date error:', e); }

  // Plan limits
  const limits = {
    free: { products: 10, analytics: false, api: false, support: 'Community' },
    starter: { products: 100, analytics: true, api: false, support: 'Email' },
    pro: { products: Infinity, analytics: true, api: true, support: 'Priority' },
    enterprise: { products: Infinity, analytics: true, api: true, support: 'Dedicated' }
  };

  const lim = limits[plan] || limits.free;
  document.getElementById('plan-limits').innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 14px;">
      <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-secondary); font-size: 14px;">Products</span><span style="font-weight: 600;">${lim.products === Infinity ? 'Unlimited' : lim.products}</span></div>
      <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-secondary); font-size: 14px;">Analytics</span><span style="font-weight: 600;">${lim.analytics ? '✅' : '❌'}</span></div>
      <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-secondary); font-size: 14px;">API Access</span><span style="font-weight: 600;">${lim.api ? '✅' : '❌'}</span></div>
      <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-secondary); font-size: 14px;">Support</span><span style="font-weight: 600;">${lim.support}</span></div>
    </div>
  `;

  // Usage
  try {
    const products = await new Promise((resolve) => {
      window.OmniDB.subscribeProductsByUser(user.uid, (p) => resolve(p), () => resolve([]));
    });

    const productCount = products.length;
    const maxProducts = lim.products === Infinity ? '∞' : lim.products;
    const usagePct = lim.products === Infinity ? 5 : Math.min((productCount / lim.products) * 100, 100);

    document.getElementById('plan-usage').innerHTML = `
      <div style="margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span style="font-size: 14px; color: var(--text-secondary);">Products</span>
          <span style="font-size: 14px; font-weight: 600;">${productCount} / ${maxProducts}</span>
        </div>
        <div style="height: 8px; background: var(--bg-tertiary); border-radius: 4px; overflow: hidden;">
          <div style="height: 100%; width: ${usagePct}%; background: ${usagePct > 80 ? 'var(--danger)' : 'var(--primary)'}; border-radius: 4px; transition: width 0.8s ease;"></div>
        </div>
        ${usagePct > 80 ? '<p style="color: var(--danger); font-size: 12px; margin-top: 8px; font-weight: 600;">⚠️ Approaching limit. Consider upgrading.</p>' : ''}
      </div>
    `;
  } catch (e) {
    document.getElementById('plan-usage').innerHTML = '<p style="color: var(--text-muted);">Could not load usage data.</p>';
  }

  // Payment history
  try {
    const payments = await window.OmniDB.getPayments(user.uid);
    const historyDiv = document.getElementById('payment-history');
    const invoiceDiv = document.getElementById('invoice-select');

    if (!payments.length) {
      historyDiv.innerHTML = `
        <div class="empty-state" style="padding: 30px;">
          <div class="empty-icon">🧾</div>
          <p class="empty-title">No payments yet</p>
          <p class="empty-desc">Payment history will appear after your first purchase.</p>
          <a class="btn btn-primary btn-sm" data-link href="/pricing">View Plans</a>
        </div>
      `;
      invoiceDiv.innerHTML = '<p style="color: var(--text-muted); font-size: 14px;">No invoices available.</p>';
      return;
    }

    historyDiv.innerHTML = `
      <div class="table-wrapper">
        <table class="data-table">
          <thead><tr><th>Date</th><th>Plan</th><th>Amount</th><th>Status</th><th>ID</th><th></th></tr></thead>
          <tbody>
            ${payments.map(p => `
              <tr>
                <td>${p.createdAt?.toDate ? p.createdAt.toDate().toLocaleDateString() : '—'}</td>
                <td><strong>${(p.plan || '').charAt(0).toUpperCase() + (p.plan || '').slice(1)}</strong></td>
                <td>₹${(p.amount || 0).toLocaleString()}</td>
                <td><span class="badge badge-${p.status === 'success' ? 'success' : p.status === 'failed' ? 'danger' : 'warning'}">${(p.status || 'pending').charAt(0).toUpperCase() + (p.status || 'pending').slice(1)}</span></td>
                <td style="font-family: monospace; font-size: 11px;">${p.razorpayPaymentId || '—'}</td>
                <td></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    // Invoice generator
    const successPayments = payments.filter(p => p.status === 'success');
    if (successPayments.length > 0) {
      invoiceDiv.innerHTML = `
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <select class="form-input" id="invoice-select-input" style="flex: 1; min-width: 200px;">
            ${successPayments.map((p, i) => `
              <option value="${i}">${p.createdAt?.toDate ? p.createdAt.toDate().toLocaleDateString() : 'Payment'} — ₹${(p.amount || 0).toLocaleString()} (${p.plan})</option>
            `).join('')}
          </select>
          <button class="btn btn-primary" id="btn-generate-invoice">Generate Invoice</button>
        </div>
      `;

      document.getElementById('btn-generate-invoice')?.addEventListener('click', () => {
        const idx = parseInt(document.getElementById('invoice-select-input').value);
        const p = successPayments[idx];
        if (p) generateInvoice(p, user);
      });
    } else {
      invoiceDiv.innerHTML = '<p style="color: var(--text-muted); font-size: 14px;">No successful payments for invoicing.</p>';
    }

  } catch (err) {
    document.getElementById('payment-history').innerHTML = window.ErrorUI.render('Failed to load payments.', 'window.location.reload()');
  }
}

function generateInvoice(payment, user) {
  const invoiceHTML = `
    <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
        <div>
          <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 4px;">INVOICE</h2>
          <p style="color: #64748B; font-size: 13px;">OmniTrace — Smart Inventory Tracking</p>
        </div>
        <div style="text-align: right;">
          <p style="font-size: 14px; font-weight: 600;">Invoice #${payment.id?.substring(0, 8).toUpperCase() || 'N/A'}</p>
          <p style="font-size: 13px; color: #64748B;">Date: ${payment.createdAt?.toDate ? payment.createdAt.toDate().toLocaleDateString() : new Date().toLocaleDateString()}</p>
        </div>
      </div>
      <div style="border-top: 2px solid #E2E8F0; padding-top: 20px; margin-bottom: 20px;">
        <p style="font-size: 13px; color: #64748B; margin-bottom: 4px;">Bill To</p>
        <p style="font-size: 16px; font-weight: 700;">${user.name || 'User'}</p>
        <p style="font-size: 14px; color: #64748B;">${user.email || ''}</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr style="border-bottom: 1px solid #E2E8F0;">
          <th style="text-align: left; padding: 12px 0; font-size: 12px; color: #64748B;">DESCRIPTION</th>
          <th style="text-align: right; padding: 12px 0; font-size: 12px; color: #64748B;">AMOUNT</th>
        </tr>
        <tr style="border-bottom: 1px solid #E2E8F0;">
          <td style="padding: 12px 0; font-weight: 600;">${(payment.plan || '').charAt(0).toUpperCase() + (payment.plan || '').slice(1)} Plan — ${payment.billingCycle || 'monthly'}</td>
          <td style="text-align: right; font-weight: 700;">₹${(payment.amount || 0).toLocaleString()}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; font-weight: 800; font-size: 18px;">Total</td>
          <td style="text-align: right; font-weight: 800; font-size: 18px;">₹${(payment.amount || 0).toLocaleString()}</td>
        </tr>
      </table>
      <p style="font-size: 12px; color: #94A3B8; text-align: center; margin-top: 40px;">Payment ID: ${payment.razorpayPaymentId || 'N/A'} · Paid via Razorpay</p>
    </div>
  `;

  window.showModal('Invoice', invoiceHTML, [
    `<button class="btn btn-secondary" onclick="window.print()">Print</button>`,
    `<button class="btn btn-primary" onclick="document.getElementById('global-modal-close')?.click()">Close</button>`
  ]);
}
