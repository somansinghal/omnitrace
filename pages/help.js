/* ════════════════════════════════════════════════════════════
   OmniTrace — Premium Help Center (Vercel/Linear Style)
   ════════════════════════════════════════════════════════════ */

export default function renderHelp() {
  const faqs = [
    { q: 'How do I add my first item?', a: 'Navigate to Workspace, click “Add Item”, fill in the details, and save. A unique QR code is automatically generated.' },
    { q: 'Can I scan QR codes with my phone?', a: 'Yes! Go to Scan, allow camera access, and point your phone at any item QR code. You can also manually enter the QR code ID.' },
    { q: 'What happens when I reach my plan limit?', a: 'You’ll receive a notification when approaching your limit. Upgrade anytime from Billing, or archive old items to free up space.' },
    { q: 'How do I upgrade or downgrade my plan?', a: 'Go to Billing → choose a new plan → complete payment. Downgrades take effect at the end of your current billing cycle.' },
    { q: 'Can I export my data?', a: 'Yes, export your entire item catalog as CSV from the Workspace. Analytics reports can be exported as PDF or CSV.' },
    { q: 'Is my data secure?', a: 'Absolutely. All data is encrypted in transit and at rest. We use Firebase enterprise-grade security and Razorpay PCI DSS compliant payments.' },
    { q: 'Do you offer refunds?', a: 'Yes — 7-day money-back guarantee on all paid plans. Contact support@omnitrace.app for a prompt refund.' },
    { q: 'Can multiple people access one account?', a: 'Team collaboration is available on Pro and Enterprise plans with different permission levels for each member.' },
    { q: 'Do you offer API access?', a: 'Yes, API access is available on Pro and Enterprise plans. Full documentation is available at /api after upgrading.' },
    { q: 'How do subscriptions auto-renew?', a: 'Paid plans auto-renew at the end of each billing cycle. You can cancel anytime from Billing to stop auto-renewal.' }
  ];

  const topics = [
    { icon: '🚀', title: 'Getting Started', desc: 'Create your workspace and add your first item' },
    { icon: '📦', title: 'Workspaces', desc: 'Manage multiple teams and inventory locations' },
    { icon: '📱', title: 'QR Scanning', desc: 'Verify and track items with your phone or camera' },
    { icon: '🔐', title: 'Authentication', desc: 'Email, Google, and secure password management' },
    { icon: '🔑', title: 'API Access', desc: 'Integrate OmniTrace with your existing systems' },
    { icon: '💳', title: 'Billing', desc: 'Plans, payments, and subscription management' },
    { icon: '🛡️', title: 'Security', desc: 'Data encryption and compliance standards' },
    { icon: '⚠️', title: 'Troubleshooting', desc: 'Common issues and how to fix them quickly' }
  ];

  return `
    <!-- ═══ HERO ═══ -->
    <section style="padding: 120px 0 60px; background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-tertiary) 100%);">
      <div class="container">
        <div class="text-center">
          <div class="hero-badge">❓ Support</div>
          <h1 class="reveal" style="font-size: clamp(36px, 5vw, 56px); font-weight: 900; margin: 16px 0 12px; letter-spacing: -1.5px;">
            How can we <span class="text-gradient">help you?</span>
          </h1>
          <p class="reveal" style="color: var(--text-secondary); font-size: 17px; max-width: 560px; margin: 0 auto 40px; line-height: 1.7;">
            Find answers, explore guides, and get support from our team.
          </p>
          <div class="search-bar reveal" style="max-width: 520px; margin: 0 auto;">
            <span class="search-icon">🔍</span>
            <input type="text" placeholder="Search for answers..." id="help-search">
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ TOPICS GRID ═══ -->
    <section class="section">
      <div class="container">
        <div class="text-center" style="margin-bottom: 40px;">
          <div class="hero-badge">Popular Topics</div>
        </div>
        <div class="help-topics stagger-children">
          ${topics.map(t => `
            <a class="help-topic-card reveal" href="#">
              <div class="icon" style="background: rgba(99,102,241,0.1);">${t.icon}</div>
              <div>
                <h4>${t.title}</h4>
                <p>${t.desc}</p>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- ═══ FAQ ═══ -->
    <section class="section" style="background: var(--bg-tertiary);">
      <div class="container">
        <div class="text-center" style="margin-bottom: 40px;">
          <div class="hero-badge">FAQ</div>
          <h2 class="reveal" style="font-size: clamp(28px, 4vw, 40px); font-weight: 900; margin: 14px 0 8px; letter-spacing: -1px;">
            Frequently asked <span class="text-gradient">questions</span>
          </h2>
        </div>

        <div style="max-width: 780px; margin: 0 auto;">
          <div class="stagger-children">
            ${faqs.map((faq, i) => `
              <div class="faq-card reveal" data-faq="${i}">
                <div class="faq-question">
                  <strong>${faq.q}</strong>
                  <span class="faq-icon" id="faq-icon-${i}">+</span>
                </div>
                <div class="faq-answer" id="faq-answer-${i}">
                  <p>${faq.a}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CONTACT SUPPORT ═══ -->
    <section class="section">
      <div class="container">
        <div class="text-center" style="margin-bottom: 40px;">
          <div class="hero-badge">Still need help?</div>
        </div>
        <div class="grid grid-2" style="max-width: 760px; margin: 0 auto;">
          <div class="glass-card reveal" style="text-align: center; padding: 32px;">
            <div style="font-size: 36px; margin-bottom: 12px;">📧</div>
            <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">Email Support</h3>
            <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 16px;">Get a reply within 24 hours.</p>
            <a href="mailto:support@omnitrace.app" class="btn btn-primary" style="width: 100%;">support@omnitrace.app</a>
          </div>
          <div class="glass-card reveal" style="text-align: center; padding: 32px;">
            <div style="font-size: 36px; margin-bottom: 12px;">💬</div>
            <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">Community</h3>
            <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 16px;">Join discussions and get help from the community.</p>
            <a class="btn btn-secondary" style="width: 100%;" href="https://x.com/omnitrace" target="_blank" rel="noopener">Join on X</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

export async function init() {
  // FAQ toggle
  document.querySelectorAll('[data-faq]').forEach(el => {
    el.addEventListener('click', () => {
      const i = el.dataset.faq;
      const answer = document.getElementById(`faq-answer-${i}`);
      const icon = document.getElementById(`faq-icon-${i}`);
      
      const isOpen = el.classList.contains('open');
      el.classList.toggle('open', !isOpen);
      answer.style.maxHeight = isOpen ? '0px' : answer.scrollHeight + 'px';
      icon.textContent = isOpen ? '+' : '−';
    });
  });

  // Search filter
  const search = document.getElementById('help-search');
  if (search) {
    search.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      document.querySelectorAll('[data-faq]').forEach(el => {
        const text = el.textContent.toLowerCase();
        el.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }
}
