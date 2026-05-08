/* ════════════════════════════════════════════════════════════
   OmniTrace — Pixel-Perfect Homepage (Stripe/Linear-Level)
   Wireframe: Hero → Trust → Problem/Solution → Flow → Showcase
              → Use Cases → Pricing → Social Proof → Final CTA
   ════════════════════════════════════════════════════════════ */

export default function renderHome() {
  return `
    <!-- ═══ 1. HERO SECTION ═══ -->
    <section class="landing-hero" style="position: relative;">
      <!-- Ambient orbs + grid -->
      <div class="bg-orbs">
        <div class="bg-orb bg-orb-1"></div>
        <div class="bg-orb bg-orb-2"></div>
        <div class="bg-orb bg-orb-3"></div>
      </div>
      <div class="bg-grid"></div>
      
      <div class="container" style="position: relative; z-index: 1;">
        <div class="landing-hero-grid">
          <div class="landing-copy">
            <div class="hero-badge hero-reveal-1">🚀 OmniTrace is currently in Private Beta</div>
            <h1 class="hero-reveal-2">Stop losing track of items. Track everything with <span class="text-gradient">QR-powered intelligence.</span></h1>
            <p class="hero-reveal-3">From warehouses to retail shelves — monitor, verify, and manage items in real time. We are building in public.</p>
            <div class="hero-actions hero-reveal-4">
              <a class="btn btn-primary btn-lg" data-link href="/signup">Get Early Access →</a>
              <a class="btn btn-secondary btn-lg" data-link href="/demo">View Live Dashboard</a>
            </div>
            <div class="landing-proof-row hero-reveal-5">
              <span style="display:flex;align-items:center;gap:6px;"><span style="color:var(--success);">✓</span> Free for early adopters</span>
              <span style="color:var(--border-color);">·</span>
              <span style="display:flex;align-items:center;gap:6px;"><span style="color:var(--success);">✓</span> Setup in 2 minutes</span>
            </div>
          </div>

          <div class="dashboard-preview animate-float" aria-label="Live OmniTrace dashboard">
            <div class="dashboard-preview-topbar">
              <div class="preview-dots"><span></span><span></span><span></span></div>
              <strong style="font-size: 12px; color: var(--text-secondary);">app.omnitrace.io</strong>
              <span class="badge badge-success" style="font-size:10px;">● LIVE</span>
            </div>
            <div class="dashboard-preview-body">
              <div class="preview-kpis">
                <div class="preview-kpi"><strong id="hero-prev-products">12K+</strong><span>Products</span></div>
                <div class="preview-kpi"><strong id="hero-prev-scans">80K+</strong><span>Scans/mo</span></div>
                <div class="preview-kpi"><strong id="hero-prev-users">3.5K+</strong><span>Businesses</span></div>
                <div class="preview-kpi"><strong style="color:var(--success);">+24%</strong><span>Growth</span></div>
              </div>
              <div class="preview-main">
                <div class="preview-chart">
                  <div style="display:flex;justify-content:space-between;margin-bottom:10px;">
                    <strong style="font-size:13px;">Scan activity</strong>
                    <span style="font-size:11px;color:var(--success);font-weight:700;">▲ 24%</span>
                  </div>
                  <div class="preview-bars" id="hero-bars">
                    <span style="height:35%"></span><span style="height:54%"></span><span style="height:48%"></span><span style="height:74%"></span><span style="height:62%"></span><span style="height:88%"></span><span style="height:96%"></span>
                  </div>
                </div>
                <div class="preview-feed">
                  <strong style="font-size:13px;display:block;margin-bottom:10px;">Live activity</strong>
                  <div style="display:grid;gap:8px;font-size:11px;">
                    <div style="padding:8px;background:var(--bg-secondary);border-radius:6px;"><span class="badge badge-success" style="font-size:9px;">SCAN</span> Batch A72 verified</div>
                    <div style="padding:8px;background:var(--bg-secondary);border-radius:6px;"><span class="badge badge-warning" style="font-size:9px;">LOW</span> 5 units left</div>
                    <div style="padding:8px;background:var(--bg-secondary);border-radius:6px;"><span class="badge badge-primary" style="font-size:9px;">MOVE</span> Pallet P-918</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ 2. REAL BUSINESS METRICS (Animated Counters) ═══ -->
    <section class="trust-strip">
      <div class="container">
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-icon" style="background:rgba(99,102,241,0.12);color:var(--primary);">📦</div>
            <strong id="m-items">—</strong>
            <span>Items tracked</span>
          </div>
          <div class="metric-card">
            <div class="metric-icon" style="background:rgba(16,185,129,0.12);color:var(--success);">🏢</div>
            <strong id="m-workspaces">—</strong>
            <span>Active workspaces</span>
          </div>
          <div class="metric-card">
            <div class="metric-icon" style="background:rgba(6,182,212,0.12);color:var(--secondary);">📱</div>
            <strong id="m-scans">—</strong>
            <span>Total QR scans</span>
          </div>
          <div class="metric-card">
            <div class="metric-icon" style="background:rgba(244,114,182,0.12);color:var(--accent);">⚡</div>
            <strong>Fast</strong>
            <span>Firebase backend</span>
          </div>
        </div>

        <div style="margin-top:32px;">
          <p style="text-align:center; font-size:11px; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:1.5px; margin-bottom:16px;">Built by industry experts, powering modern operations</p>
        </div>
      </div>
    </section>

    <!-- ═══ 3. PROBLEM → SOLUTION ═══ -->
    <section class="section">
      <div class="container">
        <div class="text-center" style="margin-bottom: 48px;">
          <div class="hero-badge">The shift</div>
          <h2 class="reveal" style="font-size:clamp(28px,4vw,42px); font-weight:900; margin:14px 0 12px; letter-spacing:-1px;">From <span style="color:var(--danger);">inventory chaos</span> → to <span class="text-gradient">verified intelligence</span></h2>
          <p class="reveal" style="color:var(--text-secondary); max-width:560px; margin:0 auto;">Most teams fight inventory problems with spreadsheets and guesswork. OmniTrace gives every product a digital identity.</p>
        </div>

        <div class="ps-split">
          <div class="ps-card problem reveal">
            <span class="ps-tag">❌ The Problem</span>
            <h3>Without OmniTrace</h3>
            <div class="ps-list">
              <div class="ps-item">
                <div class="ps-item-icon">📉</div>
                <div class="ps-item-body"><strong>Inventory loss</strong><span>Items disappear without trace. No accountability for missing stock.</span></div>
              </div>
              <div class="ps-item">
                <div class="ps-item-icon">⚠️</div>
                <div class="ps-item-body"><strong>Counterfeit products</strong><span>No way to verify authenticity. Fakes damage your brand and customer trust.</span></div>
              </div>
              <div class="ps-item">
                <div class="ps-item-icon">🌫️</div>
                <div class="ps-item-body"><strong>No tracking visibility</strong><span>Where is the product right now? Who scanned it? You don't know.</span></div>
              </div>
            </div>
          </div>

          <div class="ps-card solution reveal">
            <span class="ps-tag">✓ The Solution</span>
            <h3>With OmniTrace</h3>
            <div class="ps-list">
              <div class="ps-item">
                <div class="ps-item-icon">📱</div>
                <div class="ps-item-body"><strong>QR tracking</strong><span>Every product gets a unique scannable identity. Every scan is logged.</span></div>
              </div>
              <div class="ps-item">
                <div class="ps-item-icon">📊</div>
                <div class="ps-item-body"><strong>Real-time dashboard</strong><span>Live view of inventory, movement, and team activity. Updates instantly.</span></div>
              </div>
              <div class="ps-item">
                <div class="ps-item-icon">🛡️</div>
                <div class="ps-item-body"><strong>Secure verification</strong><span>Customers and teams can scan to verify authenticity and origin.</span></div>
              </div>
            </div>
          </div>
        </div>

        <div class="inline-cta">
          <div>
            <strong>Start tracking in 30 seconds</strong>
            <span>No credit card · Free forever plan available</span>
          </div>
          <a class="btn btn-primary" data-link href="/signup">Get Started Free →</a>
        </div>
      </div>
    </section>

    <!-- ═══ 4. PRODUCT FLOW ═══ -->
    <section class="section" style="background:var(--bg-tertiary);">
      <div class="container">
        <div class="text-center" style="margin-bottom: 48px;">
          <div class="hero-badge">How it works</div>
          <h2 class="reveal" style="font-size:clamp(28px,4vw,42px); font-weight:900; margin:14px 0 12px; letter-spacing:-1px;">From product to verified scan in <span class="text-gradient">4 steps</span></h2>
        </div>

        <div class="flow-row stagger-children">
          <div class="flow-card reveal">
            <span class="flow-emoji">📦</span>
            <span class="flow-num">1</span>
            <h4>Add product</h4>
            <p>Create or import products with name, SKU, quantity, and location.</p>
          </div>
          <div class="flow-card reveal">
            <span class="flow-emoji">▦</span>
            <span class="flow-num">2</span>
            <h4>Generate QR</h4>
            <p>Each product gets a unique, scannable QR code automatically.</p>
          </div>
          <div class="flow-card reveal">
            <span class="flow-emoji">📱</span>
            <span class="flow-num">3</span>
            <h4>Scan anywhere</h4>
            <p>Warehouse, retail, logistics — any phone camera captures the scan.</p>
          </div>
          <div class="flow-card reveal">
            <span class="flow-emoji">📊</span>
            <span class="flow-num">4</span>
            <h4>Track in dashboard</h4>
            <p>See real-time movement, verifications, and analytics across all sites.</p>
          </div>
        </div>

        <div class="inline-cta">
          <div>
            <strong>Upgrade your workflow today</strong>
            <span>Replace spreadsheets with verified product intelligence</span>
          </div>
          <a class="btn btn-primary" data-link href="/signup">Try It Free →</a>
        </div>
      </div>
    </section>

    <!-- ═══ 5. DASHBOARD SHOWCASE (DARK) ═══ -->
    <section class="dark-showcase" style="padding: 80px 0;">
      <div class="container">
        <div class="text-center" style="margin-bottom: 48px;">
          <div class="hero-badge">⚡ Built for operators</div>
          <h2 class="reveal" style="font-size:clamp(30px,4.5vw,48px); font-weight:900; margin:14px 0 12px; letter-spacing:-1.5px;">Every scan becomes <span class="text-gradient">operational intelligence</span></h2>
          <p class="reveal" style="max-width:600px; margin:0 auto;">A command center that connects product identity, scan verification, stock movement, and analytics — live.</p>
        </div>

        <div class="showcase-mock reveal" style="max-width: 1080px; margin: 0 auto;">
          <div class="showcase-mock-bar">
            <div class="preview-dots"><span></span><span></span><span></span></div>
            <strong style="font-size:12px; color:#94A3B8; flex:1; text-align:center;">OmniTrace Operations · Live</strong>
            <span class="badge badge-success" style="font-size:10px;">● Real-time</span>
          </div>
          <div class="showcase-mock-body">
            <div class="showcase-kpi-grid">
            <div class="showcase-kpi">
              <div class="kv" id="sc-products">—</div>
              <div class="kl">Total items</div>
            </div>
            <div class="showcase-kpi">
              <div class="kv" id="sc-scans">—</div>
              <div class="kl">QR scans</div>
            </div>
            <div class="showcase-kpi">
              <div class="kv" id="sc-active">—</div>
              <div class="kl">Active workspaces</div>
            </div>
            <div class="showcase-kpi">
              <div class="kv">Fast</div>
              <div class="kl">Firebase Backend</div>
            </div>
            </div>

            <div class="showcase-grid">
              <div class="showcase-panel">
                <h4>Scan Activity · Last 7 days</h4>
                <div class="showcase-bars" id="sc-bars">
                  <span style="height:42%"></span><span style="height:58%"></span><span style="height:65%"></span><span style="height:48%"></span><span style="height:78%"></span><span style="height:90%"></span><span style="height:100%"></span>
                </div>
                <div style="display:flex; justify-content:space-between; margin-top:8px; font-size:10px; color:#64748B;">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>
              <div class="showcase-panel">
                <h4>Recent items</h4>
                <div id="showcase-items-list">
                  <div style="font-size:12px;color:var(--text-muted);">Syncing live data...</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style="text-align:center; margin-top:40px;">
          <a class="btn btn-primary btn-lg" data-link href="/demo">Open Live Demo →</a>
        </div>
      </div>
    </section>

    <!-- ═══ 6. USE CASES ═══ -->
    <section class="section">
      <div class="container">
        <div class="text-center" style="margin-bottom: 48px;">
          <div class="hero-badge">Use cases</div>
          <h2 class="reveal" style="font-size:clamp(28px,4vw,42px); font-weight:900; margin:14px 0 12px; letter-spacing:-1px;">Built for <span class="text-gradient">real-world tracking</span></h2>
        </div>
        <div class="grid grid-4 stagger-children">
          <div class="feature-card reveal">
            <div class="feature-icon" style="background:rgba(99,102,241,0.12);">🏪</div>
            <h3>Retail tracking</h3>
            <p>Verify shelf stock, prevent shrinkage, and audit movement across stores instantly.</p>
          </div>
          <div class="feature-card reveal">
            <div class="feature-icon" style="background:rgba(6,182,212,0.12);">🏭</div>
            <h3>Warehouse management</h3>
            <p>Track every pallet, bin, and handoff from receiving to dispatch in real-time.</p>
          </div>
          <div class="feature-card reveal">
            <div class="feature-icon" style="background:rgba(16,185,129,0.12);">🛡️</div>
            <h3>Anti-counterfeit</h3>
            <p>Give customers a scannable proof of authenticity. Protect your brand from fakes.</p>
          </div>
          <div class="feature-card reveal">
            <div class="feature-icon" style="background:rgba(244,114,182,0.12);">🚚</div>
            <h3>Logistics tracking</h3>
            <p>Record checkpoint scans across last-mile delivery. Eliminate handoff blind spots.</p>
          </div>
        </div>

        <div class="inline-cta">
          <div>
            <strong>Built for your industry</strong>
            <span>Custom workflows · Multi-location · Team permissions</span>
          </div>
          <a class="btn btn-primary" data-link href="/contact">Talk to Sales →</a>
        </div>
      </div>
    </section>

    <!-- ═══ 6.5. PRODUCT DEPTH (API · Integrations · Security) ═══ -->
    <section class="section">
      <div class="container">
        <div class="text-center" style="margin-bottom: 48px;">
          <div class="hero-badge">⚙️ Built like infrastructure</div>
          <h2 class="reveal" style="font-size:clamp(28px,4vw,42px); font-weight:900; margin:14px 0 12px; letter-spacing:-1px;">Engineered for teams that ship at <span class="text-gradient">enterprise scale</span></h2>
          <p class="reveal" style="color:var(--text-secondary); max-width:580px; margin:0 auto;">A real platform — not a tracker. Built on Firebase, secured end-to-end, and extended via API.</p>
        </div>

        <div class="grid grid-3 stagger-children">
          <div class="depth-card reveal">
            <div class="depth-header">
              <div class="feature-icon" style="background:rgba(99,102,241,0.12);">🔗</div>
              <h3>REST + Webhook API</h3>
            </div>
            <p>Generate keys, hit /v1 endpoints, subscribe to scan webhooks. Build internal tools or integrate with your ERP.</p>
            <div class="code-block">
              <div class="code-label">POST /v1/products</div>
              <code>{<br>&nbsp;&nbsp;"name": "Batch A72",<br>&nbsp;&nbsp;"sku": "WH-A72-2024"<br>}</code>
            </div>
          </div>

          <div class="depth-card reveal">
            <div class="depth-header">
              <div class="feature-icon" style="background:rgba(16,185,129,0.12);">🧩</div>
              <h3>Native Integrations</h3>
            </div>
            <p>Plug into the tools your team already uses. One-click connections, two-way data sync, zero glue code.</p>
            <div class="integration-grid">
              <div class="int-pill">📊 Google Sheets</div>
              <div class="int-pill">💬 Slack</div>
              <div class="int-pill">⚡ Zapier</div>
              <div class="int-pill">🛒 Shopify</div>
              <div class="int-pill">📦 SAP</div>
              <div class="int-pill">🧾 Razorpay</div>
            </div>
          </div>

          <div class="depth-card reveal">
            <div class="depth-header">
              <div class="feature-icon" style="background:rgba(244,114,182,0.12);">🛡️</div>
              <h3>Enterprise Security</h3>
            </div>
            <p>Your data, your compliance. Encrypted at rest and in transit, with role-based access and audit logs.</p>
            <div class="security-list">
              <div class="sec-item"><span style="color:var(--success);">✓</span> AES-256 encryption at rest</div>
              <div class="sec-item"><span style="color:var(--success);">✓</span> TLS 1.3 in transit</div>
              <div class="sec-item"><span style="color:var(--success);">✓</span> SOC 2 Type II ready</div>
              <div class="sec-item"><span style="color:var(--success);">✓</span> GDPR & DPDP compliant</div>
              <div class="sec-item"><span style="color:var(--success);">✓</span> Role-based access control</div>
              <div class="sec-item"><span style="color:var(--success);">✓</span> Full audit trail</div>
            </div>
          </div>
        </div>

        <div class="inline-cta">
          <div>
            <strong>Try free today</strong>
            <span>Production-ready API · No setup fees · Cancel anytime</span>
          </div>
          <a class="btn btn-primary" data-link href="/signup">Start Free Trial →</a>
        </div>
      </div>
    </section>

    <!-- ═══ 7. PRICING ═══ -->
    <section class="section" style="background:var(--bg-tertiary);">
      <div class="container">
        <div class="text-center" style="margin-bottom: 28px;">
          <div class="hero-badge">💎 Pricing · Used by startups & enterprises</div>
          <h2 class="reveal" style="font-size:clamp(28px,4vw,42px); font-weight:900; margin:14px 0 12px; letter-spacing:-1px;">Simple, <span class="text-gradient">transparent pricing</span></h2>
          <p class="reveal" style="color:var(--text-secondary); max-width:480px; margin:0 auto;">Start free. Pay only when you scale. 7-day refund on every paid plan.</p>
        </div>

        <div class="pricing-toggle">
          <span id="hp-label-monthly" class="active">Monthly</span>
          <div class="toggle-switch" id="hp-billing-toggle" role="button" tabindex="0"></div>
          <span id="hp-label-yearly">Yearly <span class="yearly-savings">Save 20%</span></span>
        </div>

        <div class="grid grid-4 stagger-children">
          <div class="pricing-card reveal">
            <div class="pricing-plan-name">Free</div>
            <div class="pricing-plan-desc">For individuals</div>
            <div class="pricing-amount"><span class="pricing-currency">₹</span><span class="pricing-value">0</span><span class="pricing-period">/forever</span></div>
            <ul class="pricing-features">
              <li><span class="check">✓</span> 10 products</li>
              <li><span class="check">✓</span> Basic QR tracking</li>
              <li><span class="check">✓</span> Mobile scanning</li>
              <li><span class="cross">✗</span> <span style="opacity:0.5">Analytics</span></li>
            </ul>
            <a class="btn btn-secondary" style="width:100%;" data-link href="/signup">Get Started</a>
          </div>

          <div class="pricing-card reveal">
            <div class="pricing-plan-name">Starter</div>
            <div class="pricing-plan-desc">For small teams</div>
            <div class="pricing-amount"><span class="pricing-currency">₹</span><span class="pricing-value" data-monthly="99" data-yearly="79">99</span><span class="pricing-period" data-monthly="/month" data-yearly="/month">/month</span></div>
            <ul class="pricing-features">
              <li><span class="check">✓</span> 100 products</li>
              <li><span class="check">✓</span> QR generation</li>
              <li><span class="check">✓</span> Basic analytics</li>
              <li><span class="check">✓</span> Email support</li>
            </ul>
            <a class="btn btn-outline" style="width:100%;" data-link href="/pricing">Choose Starter</a>
          </div>

          <div class="pricing-card popular reveal">
            <div class="pricing-plan-name">Pro</div>
            <div class="pricing-plan-desc">For growing businesses</div>
            <div class="pricing-amount"><span class="pricing-currency">₹</span><span class="pricing-value" data-monthly="499" data-yearly="399">499</span><span class="pricing-period" data-monthly="/month" data-yearly="/month">/month</span></div>
            <div class="savings-badge" data-yearly-only style="display:none;">💰 Save ₹1,200/year</div>
            <ul class="pricing-features">
              <li><span class="check">✓</span> Unlimited products</li>
              <li><span class="check">✓</span> Full QR suite</li>
              <li><span class="check">✓</span> Advanced analytics</li>
              <li><span class="check">✓</span> API access</li>
              <li><span class="check">✓</span> Priority support</li>
              <li><span class="check">✓</span> Webhook integrations</li>
            </ul>
            <a class="btn btn-primary" style="width:100%;" data-link href="/pricing">Choose Pro →</a>
          </div>

          <div class="pricing-card reveal">
            <div class="pricing-plan-name">Enterprise</div>
            <div class="pricing-plan-desc">For large orgs</div>
            <div class="pricing-amount"><span class="pricing-value" style="font-size:32px;">Custom</span></div>
            <ul class="pricing-features">
              <li><span class="check">✓</span> Everything in Pro</li>
              <li><span class="check">✓</span> Unlimited team</li>
              <li><span class="check">✓</span> Dedicated support</li>
              <li><span class="check">✓</span> SLA guarantee</li>
            </ul>
            <a class="btn btn-secondary" style="width:100%;" data-link href="/contact">Contact Sales</a>
          </div>
        </div>

        <div class="text-center" style="margin-top:32px;">
          <a class="btn btn-outline" data-link href="/pricing">See full feature comparison →</a>
        </div>
      </div>
    </section>

    <!-- ═══ 8. EARLY ACCESS ═══ -->
    <section class="section">
      <div class="container">
        <div class="text-center" style="margin-bottom: 48px;">
          <div class="hero-badge">✨ MVP Live</div>
          <h2 class="reveal" style="font-size:clamp(28px,4vw,42px); font-weight:900; margin:14px 0 12px; letter-spacing:-1px;">Building the future in <span class="text-gradient">public</span></h2>
          <p class="reveal" style="color:var(--text-secondary); max-width:560px; margin:0 auto;">We are iterating fast with our early adopters. Join our private beta today and help shape the product.</p>
        </div>
      </div>
    </section>

    <!-- ═══ 9. FINAL CTA ═══ -->
    <section class="section">
      <div class="container">
        <div class="final-cta reveal">
          <h2>Start tracking smarter today</h2>
          <p>Join 2,000+ teams using OmniTrace to verify, track, and manage every product. Free forever plan available.</p>
          <div class="final-cta-buttons">
            <a class="btn btn-lg" data-link href="/signup" style="background:#fff; color:var(--primary); font-weight:800;">Get Started Free</a>
            <a class="btn btn-lg btn-outline" data-link href="/contact" style="border-color:rgba(255,255,255,0.5); color:#fff;">Contact Sales</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

export async function init() {
  // Pricing toggle
  let isYearly = false;
  const toggle = document.getElementById('hp-billing-toggle');
  const labelM = document.getElementById('hp-label-monthly');
  const labelY = document.getElementById('hp-label-yearly');

  toggle?.addEventListener('click', () => {
    isYearly = !isYearly;
    toggle.classList.toggle('active', isYearly);
    labelM?.classList.toggle('active', !isYearly);
    labelY?.classList.toggle('active', isYearly);
    document.querySelectorAll('.pricing-value[data-monthly]').forEach(el => {
      el.textContent = el.dataset[isYearly ? 'yearly' : 'monthly'];
    });
    document.querySelectorAll('.pricing-period[data-monthly]').forEach(el => {
      el.textContent = isYearly ? '/month, billed yearly' : '/month';
    });
    // Show/hide yearly savings badges
    document.querySelectorAll('[data-yearly-only]').forEach(el => {
      el.style.display = isYearly ? 'inline-block' : 'none';
    });
  });

  // ═══ Animated counters (IntersectionObserver) ═══
  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.target) || 0;
    const suffix = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimals) || 0;
    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = target * eased;
      el.textContent = (decimals > 0
        ? current.toFixed(decimals)
        : Math.round(current).toLocaleString()) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.counter-value[data-target]').forEach(el => counterObserver.observe(el));

  // Load real stats
  const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const fmt = (n) => Number(n || 0).toLocaleString() + '+';
  const fmtShort = (n) => {
    const num = Number(n || 0);
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toString();
  };

  try {
    if (!window.OmniDB) {
      const mod = await import('../services/omnidb.js');
      window.OmniDB = mod.default;
    }
    const stats = await window.OmniDB.getAggregateStats();

    // Hero preview KPIs (Real data, no fakes)
    setText('hero-prev-products', (stats.items || 0).toLocaleString());
    setText('hero-prev-scans', (stats.scans || 0).toLocaleString());
    setText('hero-prev-users', (stats.workspaces || 0).toLocaleString());

    // Update data targets for intersection observer counters
    const updateTarget = (id, val) => {
      const el = document.getElementById(id);
      if (el) {
        el.dataset.target = val;
        // If it's already animated, update text immediately
        if (el.dataset.animated) el.textContent = Number(val).toLocaleString() + (el.dataset.suffix || '');
      }
    };

    updateTarget('m-items', stats.items || 0);
    updateTarget('m-workspaces', stats.workspaces || 0);
    updateTarget('m-scans', stats.scans || 0);

    // Showcase KPIs
    setText('sc-products', (stats.items || 0).toLocaleString());
    setText('sc-scans', (stats.scans || 0).toLocaleString());
    setText('sc-active', (stats.workspaces || 0).toLocaleString());

    // Live bar chart from real data
    const trends = await window.OmniDB.getScanTrends?.(7);
    const heroBars = document.getElementById('hero-bars');
    const scBars = document.getElementById('sc-bars');
    
    if (Array.isArray(trends) && trends.length) {
      const max = Math.max(...trends.map(t => t.count || 0), 1);
      const bars = trends.map(t => `<span style="height:${Math.max(((t.count || 0) / max) * 100, 12)}%"></span>`).join('');
      if (heroBars) heroBars.innerHTML = bars;
      if (scBars) scBars.innerHTML = bars;
    } else {
      // Empty state for bars if no data
      const emptyBars = Array(7).fill('<span style="height:12%; opacity: 0.3;"></span>').join('');
      if (heroBars) heroBars.innerHTML = emptyBars;
      if (scBars) scBars.innerHTML = emptyBars;
    }
  } catch (e) {
    console.error('Home stats error:', e);
  }
}
