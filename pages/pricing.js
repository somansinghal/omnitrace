/* ════════════════════════════════════════════════════════════
   OmniTrace — Pricing (Strict Refactor)
   Source of truth: config/pricing.js
   ════════════════════════════════════════════════════════════ */

import Store from '../assets/js/store.js';
import { PLANS } from '../config/pricing.js';

export default function renderPricing() {
  return `
    <section class="section" style="padding-top: 120px;">
      <div class="container">
        <div class="text-center" style="margin-bottom: 48px;">
          <div class="hero-badge">💎 Pricing</div>
          <h1 class="reveal" style="font-size: 42px; font-weight: 900; margin: 16px 0 12px;">Simple, <span class="text-gradient">transparent pricing</span></h1>
          <p class="reveal" style="color: var(--text-secondary); font-size: 17px; max-width: 500px; margin: 0 auto; line-height: 1.7;">Start free. Upgrade when you need more. No hidden fees.</p>
        </div>

        <div class="pricing-toggle">
          <span id="hp-label-monthly" class="active">Monthly</span>
          <div class="toggle-switch" id="hp-billing-toggle" role="button" tabindex="0"></div>
          <span id="hp-label-yearly">Yearly <span class="yearly-savings">Save 20%</span></span>
        </div>

        <!-- Coupon Input -->
        <div class="glass-card reveal" style="max-width: 500px; margin: 0 auto 32px; padding: 20px;">
          <div style="display: flex; gap: 8px;">
            <input type="text" class="form-input" id="coupon-input" placeholder="Enter coupon code" style="flex: 1; text-transform: uppercase;">
            <button class="btn btn-primary" id="btn-apply-coupon">Apply</button>
          </div>
          <div id="coupon-status" style="margin-top: 12px; font-size: 13px; display: none;"></div>
        </div>

        <div class="grid grid-4 stagger-children">
          ${PLANS.map(plan => {
            const isPro = plan.id === 'pro';
            const isEnterprise = plan.id === 'enterprise';
            const isFree = plan.id === 'free';
            
            // Starter or Pro pricing
            const dataMonthly = plan.id === 'starter' ? 99 : (plan.id === 'pro' ? 499 : 0);
            const dataYearly = plan.id === 'starter' ? 79 : (plan.id === 'pro' ? 399 : 0);

            return `
              <div class="pricing-card reveal ${isPro ? 'popular' : ''}">
                <div class="pricing-plan-name">${plan.name}</div>
                <div class="pricing-plan-desc">${plan.desc}</div>
                
                <div class="pricing-amount">
                  ${isEnterprise ? `
                    <span class="pricing-value" style="font-size:32px;">Custom</span>
                  ` : `
                    <span class="pricing-currency">₹</span>
                    <span class="pricing-value" data-monthly="${dataMonthly}" data-yearly="${dataYearly}">${dataMonthly}</span>
                    <span class="pricing-period" data-monthly="/month" data-yearly="/month">/month</span>
                  `}
                </div>

                ${isPro ? `
                  <div class="savings-badge" data-yearly-only style="display:none;">💰 Save ₹1,200/year</div>
                ` : ''}

                <ul class="pricing-features">
                  ${plan.features.map(f => `
                    <li>
                      <span class="${f.included ? 'check' : 'cross'}">${f.included ? '✓' : '✗'}</span>
                      <span style="${f.included ? '' : 'opacity: 0.5;'}">${f.text}</span>
                    </li>
                  `).join('')}
                </ul>

                ${isFree ? `
                  <a class="btn btn-secondary" style="width:100%;" id="btn-free" data-link href="/signup">Get Started</a>
                ` : isEnterprise ? `
                  <a class="btn btn-secondary" style="width:100%;" data-plan="enterprise" id="btn-enterprise" data-link href="/contact">Contact Sales</a>
                ` : `
                  <button class="btn ${isPro ? 'btn-primary' : 'btn-outline'}" style="width:100%;" data-plan="${plan.id}" id="btn-${plan.id}">
                    Choose ${plan.name} ${isPro ? '→' : ''}
                  </button>
                `}
              </div>
            `;
          }).join('')}
        </div>

        <!-- Subscription lifecycle -->
        <div class="glass-card reveal" style="margin-top: 48px; padding: 28px;">
          <div style="display:grid;grid-template-columns:1fr;gap:18px;align-items:center;">
            <div>
              <div class="hero-badge" style="margin-bottom:12px;">Secure subscription lifecycle</div>
              <h3 style="font-size:24px;font-weight:800;margin-bottom:10px;">Razorpay checkout with plan lifecycle controls</h3>
              <p style="color:var(--text-secondary);font-size:14px;line-height:1.7;max-width:640px;">Every checkout creates an auditable payment record, verifies the payment server-side, updates Firestore with plan dates, and enforces limits automatically across the product workspace.</p>
            </div>
            <div class="grid grid-4" style="gap:12px;">
              <div style="padding:16px;background:var(--bg-tertiary);border-radius:var(--radius-lg);"><strong>1. Order</strong><p style="font-size:12px;color:var(--text-secondary);margin-top:6px;">Backend creates Razorpay order</p></div>
              <div style="padding:16px;background:var(--bg-tertiary);border-radius:var(--radius-lg);"><strong>2. Verify</strong><p style="font-size:12px;color:var(--text-secondary);margin-top:6px;">HMAC verification endpoint</p></div>
              <div style="padding:16px;background:var(--bg-tertiary);border-radius:var(--radius-lg);"><strong>3. Activate</strong><p style="font-size:12px;color:var(--text-secondary);margin-top:6px;">Plan start/end dates stored</p></div>
              <div style="padding:16px;background:var(--bg-tertiary);border-radius:var(--radius-lg);"><strong>4. Enforce</strong><p style="font-size:12px;color:var(--text-secondary);margin-top:6px;">Limits apply in Workspace</p></div>
            </div>
          </div>
        </div>

        <!-- Comparison Table -->
        <div class="glass-card reveal" style="margin-top: 64px; padding: 40px;">
          <h3 style="font-size: 22px; font-weight: 700; margin-bottom: 24px; text-align: center;">Full Feature Comparison</h3>
          <div class="table-wrapper">
            <table class="data-table">
              <thead><tr><th>Feature</th><th>Free</th><th>Starter</th><th style="color:var(--primary);">Pro ⭐</th><th>Enterprise</th></tr></thead>
              <tbody>
                <tr><td>Products</td><td>10</td><td>100</td><td style="color:var(--primary);font-weight:700;">Unlimited</td><td>Unlimited</td></tr>
                <tr><td>QR Codes</td><td>✓</td><td>✓</td><td style="color:var(--primary);font-weight:700;">✓</td><td>✓</td></tr>
                <tr><td>Analytics</td><td>✗</td><td>Basic</td><td style="color:var(--primary);font-weight:700;">Advanced</td><td>Advanced</td></tr>
                <tr><td>API</td><td>✗</td><td>✗</td><td style="color:var(--primary);font-weight:700;">✓</td><td>✓</td></tr>
                <tr><td>Team</td><td>1</td><td>1</td><td style="color:var(--primary);font-weight:700;">5</td><td>Unlimited</td></tr>
                <tr><td>Support</td><td>Community</td><td>Email</td><td style="color:var(--primary);font-weight:700;">Priority</td><td>Dedicated</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style="max-width: 680px; margin: 80px auto 0;">
          <h2 class="text-center reveal" style="font-size: 28px; font-weight: 800; margin-bottom: 32px;">FAQ</h2>
          <div class="stagger-children">
            <div class="glass-card reveal" style="margin-bottom:12px;padding:24px;"><strong>Can I switch plans anytime?</strong><p style="color:var(--text-secondary);font-size:14px;margin-top:8px;">Yes! Upgrade instantly, downgrade at cycle end. Prorated billing.</p></div>
            <div class="glass-card reveal" style="margin-bottom:12px;padding:24px;"><strong>Is there a free trial?</strong><p style="color:var(--text-secondary);font-size:14px;margin-top:8px;">Free plan is unlimited. 7-day refund on all paid plans.</p></div>
            <div class="glass-card reveal" style="margin-bottom:12px;padding:24px;"><strong>Payment methods?</strong><p style="color:var(--text-secondary);font-size:14px;margin-top:8px;">Credit/debit cards, UPI, net banking, wallets via Razorpay.</p></div>
            <div class="glass-card reveal" style="margin-bottom:12px;padding:24px;"><strong>Refunds?</strong><p style="color:var(--text-secondary);font-size:14px;margin-top:8px;">7-day money-back guarantee. Contact support for prompt refund.</p></div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export async function init() {
  let isYearly = false;
  let appliedCoupon = null;
  const user = Store.get('user');
  const currentPlan = user?.plan || Store.get('plan') || 'free';

  // Billing toggle
  const toggle = document.getElementById('hp-billing-toggle');
  const labelM = document.getElementById('hp-label-monthly');
  const labelY = document.getElementById('hp-label-yearly');

  toggle?.addEventListener('click', () => {
    isYearly = !isYearly;
    toggle.classList.toggle('active', isYearly);
    labelM?.classList.toggle('active', !isYearly);
    labelY?.classList.toggle('active', isYearly);
    updatePrices();
  });

  function updatePrices() {
    const period = isYearly ? 'yearly' : 'monthly';
    document.querySelectorAll('.pricing-value[data-monthly]').forEach(el => {
      let price = parseInt(el.dataset[period]);
      if (appliedCoupon) price = Math.round(price * (1 - appliedCoupon.discount / 100));
      el.textContent = price;
    });
    document.querySelectorAll('.pricing-period[data-monthly]').forEach(el => {
      el.textContent = isYearly ? '/month, billed yearly' : '/month';
    });
    // Show/hide yearly savings badges
    document.querySelectorAll('[data-yearly-only]').forEach(el => {
      el.style.display = isYearly ? 'inline-block' : 'none';
    });
  }

  // Coupon system
  document.getElementById('btn-apply-coupon')?.addEventListener('click', async () => {
    const code = document.getElementById('coupon-input').value.trim();
    const status = document.getElementById('coupon-status');
    if (!code) { status.style.display = 'block'; status.style.color = 'var(--danger)'; status.textContent = 'Enter a coupon code.'; return; }

    try {
      if (!window.CouponService) {
        const mod = await import('../services/coupons.js');
        window.CouponService = mod.default;
      }
      const result = await window.CouponService.validateCoupon(code, 'pro', isYearly ? 'yearly' : 'monthly');
      if (result.valid) {
        appliedCoupon = result.coupon;
        status.style.display = 'block';
        status.style.color = 'var(--success)';
        status.innerHTML = `✅ Coupon applied! <strong>${appliedCoupon.discount}% off</strong> — Save ₹${appliedCoupon.discountAmount}`;
        updatePrices();
        window.showToast(`Coupon "${code}" applied!`, 'success');
      } else {
        appliedCoupon = null;
        status.style.display = 'block';
        status.style.color = 'var(--danger)';
        status.textContent = `❌ ${result.error}`;
        updatePrices();
      }
    } catch (err) {
      status.style.display = 'block';
      status.style.color = 'var(--danger)';
      status.textContent = '❌ Validation failed. Try again.';
    }
  });

  // Update buttons
  function updateButtons() {
    const bf = document.getElementById('btn-free');
    const bs = document.getElementById('btn-starter');
    const bp = document.getElementById('btn-pro');
    if (currentPlan === 'free') { if (bf) { bf.textContent = 'Current Plan'; bf.disabled = true; } }
    else if (currentPlan === 'starter') { if (bs) { bs.textContent = 'Current Plan'; bs.disabled = true; bs.className = 'btn btn-secondary'; bs.style.width = '100%'; } }
    else if (currentPlan === 'pro') { if (bp) { bp.textContent = 'Current Plan'; bp.disabled = true; bp.className = 'btn btn-secondary'; bp.style.width = '100%'; } }
  }
  if (user) updateButtons();

  // Plan selection
  document.querySelectorAll('[data-plan]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const plan = btn.dataset.plan;
      if (!user) { window.Router.navigate('/signup'); return; }
      if (plan === currentPlan) return;
      if (plan === 'enterprise') { window.Router.navigate('/contact'); return; }

      try {
        btn.disabled = true;
        btn.textContent = 'Processing...';
        const { default: Payments } = await import('../services/payments.js');
        const billing = isYearly ? 'yearly' : 'monthly';

        if (appliedCoupon) {
          await window.CouponService.recordUsage(appliedCoupon.id, user.uid);
        }

        await Payments.initiatePayment(plan, billing, appliedCoupon);
        btn.textContent = '✓ Upgraded!';
        setTimeout(() => window.location.reload(), 1500);
      } catch (err) {
        btn.disabled = false;
        btn.textContent = plan === 'pro' ? 'Choose Pro' : 'Choose Starter';
        if (err.message !== 'Payment cancelled') {
          window.showToast(err.message, 'error');
        }
      }
    });
  });
}
