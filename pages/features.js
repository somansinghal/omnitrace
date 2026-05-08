/* ════════════════════════════════════════════════════════════
   OmniTrace — Features Page (Investor-Grade)
   ════════════════════════════════════════════════════════════ */

export default function renderFeatures() {
  return `
    <section class="section" style="padding-top: 120px;">
      <div class="container">
        <div class="text-center" style="margin-bottom: 64px;">
          <div class="hero-badge">✨ Features</div>
          <h1 class="reveal" style="font-size: 42px; font-weight: 900; margin: 16px 0 12px;">
            Powerful tools for <span class="text-gradient">every business</span>
          </h1>
          <p class="reveal" style="color: var(--text-secondary); font-size: 17px; max-width: 560px; margin: 0 auto; line-height: 1.7;">
            Everything you need to manage inventory, track assets, and gain insights — all in one beautifully designed platform.
          </p>
        </div>

        <!-- Feature 1: QR Tracking -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; margin-bottom: 100px;" class="feature-row">
          <div class="reveal">
            <div class="feature-icon" style="background: rgba(99, 102, 241, 0.12); width: 64px; height: 64px; font-size: 28px; margin-bottom: 20px;">📱</div>
            <h2 style="font-size: 28px; font-weight: 800; margin-bottom: 16px;">QR Code Tracking</h2>
            <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 20px;">
              Every product gets a unique, scannable QR code automatically. When scanned, it logs location, time, and user data instantly. Print labels, stick them on, and let the tracking begin.
            </p>
            <ul style="display: flex; flex-direction: column; gap: 10px;">
              <li style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-secondary);"><span style="color: var(--success); font-weight: 700;">✓</span> Auto-generated unique QR codes</li>
              <li style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-secondary);"><span style="color: var(--success); font-weight: 700;">✓</span> Complete scan history with timestamps</li>
              <li style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-secondary);"><span style="color: var(--success); font-weight: 700;">✓</span> Bulk QR generation for large catalogs</li>
              <li style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-secondary);"><span style="color: var(--success); font-weight: 700;">✓</span> Printable label export (PDF)</li>
            </ul>
          </div>
          <div class="reveal reveal-delay-2">
            <div class="demo-preview">
              <div class="demo-preview-header">
                <div class="demo-dot red"></div><div class="demo-dot yellow"></div><div class="demo-dot green"></div>
                <span style="font-size: 12px; color: var(--text-muted); margin-left: 8px;">QR Scanner</span>
              </div>
              <div class="demo-preview-body" style="padding: 32px; text-align: center;">
                <div style="width: 160px; height: 160px; border: 3px solid var(--primary); border-radius: var(--radius-lg); margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; position: relative;">
                  <div style="font-size: 48px;">📷</div>
                  <div style="position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--primary); animation: scanLine 2s ease-in-out infinite;"></div>
                </div>
                <p style="font-size: 13px; color: var(--text-muted);">Point camera at QR code to scan</p>
                <div style="margin-top: 16px; padding: 12px; background: var(--bg-tertiary); border-radius: var(--radius-md); text-align: left;">
                  <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px;">Last Scan</div>
                  <div style="font-size: 13px; font-weight: 600;">Wireless Mouse — Warehouse A</div>
                  <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">2 minutes ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature 2: Inventory -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; margin-bottom: 100px;" class="feature-row">
          <div class="reveal reveal-delay-2" style="order: 2;">
            <div class="demo-preview">
              <div class="demo-preview-header">
                <div class="demo-dot red"></div><div class="demo-dot yellow"></div><div class="demo-dot green"></div>
                <span style="font-size: 12px; color: var(--text-muted); margin-left: 8px;">Inventory Table</span>
              </div>
              <div class="demo-preview-body" style="padding: 16px;">
                <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                  <div style="flex: 1; height: 28px; background: var(--bg-tertiary); border-radius: var(--radius-sm);"></div>
                  <div style="width: 80px; height: 28px; background: var(--bg-tertiary); border-radius: var(--radius-sm);"></div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px;">
                  <div style="display: flex; gap: 8px; padding: 8px; background: var(--bg-tertiary); border-radius: var(--radius-sm);">
                    <div style="flex: 1; height: 14px; background: var(--border-color); border-radius: 3px;"></div>
                    <div style="width: 60px; height: 14px; background: rgba(16,185,129,0.2); border-radius: 3px;"></div>
                  </div>
                  <div style="display: flex; gap: 8px; padding: 8px; background: var(--bg-tertiary); border-radius: var(--radius-sm);">
                    <div style="flex: 1; height: 14px; background: var(--border-color); border-radius: 3px;"></div>
                    <div style="width: 60px; height: 14px; background: rgba(245,158,11,0.2); border-radius: 3px;"></div>
                  </div>
                  <div style="display: flex; gap: 8px; padding: 8px; background: var(--bg-tertiary); border-radius: var(--radius-sm);">
                    <div style="flex: 1; height: 14px; background: var(--border-color); border-radius: 3px;"></div>
                    <div style="width: 60px; height: 14px; background: rgba(16,185,129,0.2); border-radius: 3px;"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="reveal" style="order: 1;">
            <div class="feature-icon" style="background: rgba(6, 182, 212, 0.12); width: 64px; height: 64px; font-size: 28px; margin-bottom: 20px;">📦</div>
            <h2 style="font-size: 28px; font-weight: 800; margin-bottom: 16px;">Smart Inventory Management</h2>
            <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 20px;">
              Complete inventory control with categories, SKUs, locations, and stock levels. Search, filter, and organize your entire catalog from one clean dashboard.
            </p>
            <ul style="display: flex; flex-direction: column; gap: 10px;">
              <li style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-secondary);"><span style="color: var(--success); font-weight: 700;">✓</span> Unlimited custom categories</li>
              <li style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-secondary);"><span style="color: var(--success); font-weight: 700;">✓</span> Low stock alerts & notifications</li>
              <li style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-secondary);"><span style="color: var(--success); font-weight: 700;">✓</span> Multi-location warehouse support</li>
              <li style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-secondary);"><span style="color: var(--success); font-weight: 700;">✓</span> Bulk import & export (CSV)</li>
            </ul>
          </div>
        </div>

        <!-- Feature 3: Real-time -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; margin-bottom: 100px;" class="feature-row">
          <div class="reveal">
            <div class="feature-icon" style="background: rgba(244, 114, 182, 0.12); width: 64px; height: 64px; font-size: 28px; margin-bottom: 20px;">⚡</div>
            <h2 style="font-size: 28px; font-weight: 800; margin-bottom: 16px;">Real-time Updates</h2>
            <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 20px;">
              Every scan, update, and change syncs instantly across all devices. Your team always sees the latest data — no refresh needed. Built on Firebase for blazing-fast performance.
            </p>
            <ul style="display: flex; flex-direction: column; gap: 10px;">
              <li style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-secondary);"><span style="color: var(--success); font-weight: 700;">✓</span> Live sync across all devices</li>
              <li style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-secondary);"><span style="color: var(--success); font-weight: 700;">✓</span> Instant push notifications</li>
              <li style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-secondary);"><span style="color: var(--success); font-weight: 700;">✓</span> Full activity timeline</li>
              <li style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-secondary);"><span style="color: var(--success); font-weight: 700;">✓</span> Offline mode with auto-sync</li>
            </ul>
          </div>
          <div class="reveal reveal-delay-2">
            <div class="demo-preview">
              <div class="demo-preview-header">
                <div class="demo-dot red"></div><div class="demo-dot yellow"></div><div class="demo-dot green"></div>
                <span style="font-size: 12px; color: var(--text-muted); margin-left: 8px;">Live Activity</span>
              </div>
              <div class="demo-preview-body" style="padding: 20px;">
                <div style="display: flex; flex-direction: column; gap: 10px;">
                  <div style="display: flex; align-items: center; gap: 10px; padding: 10px; background: var(--bg-tertiary); border-radius: var(--radius-sm); animation: slideUp 0.5s ease;">
                    <div style="width: 8px; height: 8px; background: var(--success); border-radius: 50%;"></div>
                    <div style="flex: 1;">
                      <div style="font-size: 12px; font-weight: 600;">Product scanned</div>
                      <div style="font-size: 11px; color: var(--text-muted);">Wireless Mouse — Warehouse A</div>
                    </div>
                    <div style="font-size: 11px; color: var(--text-muted);">Just now</div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 10px; padding: 10px; background: var(--bg-tertiary); border-radius: var(--radius-sm);">
                    <div style="width: 8px; height: 8px; background: var(--primary); border-radius: 50%;"></div>
                    <div style="flex: 1;">
                      <div style="font-size: 12px; font-weight: 600;">Stock updated</div>
                      <div style="font-size: 11px; color: var(--text-muted);">USB-C Cable — qty: 45 → 42</div>
                    </div>
                    <div style="font-size: 11px; color: var(--text-muted);">2m ago</div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 10px; padding: 10px; background: var(--bg-tertiary); border-radius: var(--radius-sm);">
                    <div style="width: 8px; height: 8px; background: var(--warning); border-radius: 50%;"></div>
                    <div style="flex: 1;">
                      <div style="font-size: 12px; font-weight: 600;">Low stock alert</div>
                      <div style="font-size: 11px; color: var(--text-muted);">Mechanical Keyboard — 3 left</div>
                    </div>
                    <div style="font-size: 11px; color: var(--text-muted);">5m ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature 4: Analytics -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; margin-bottom: 80px;" class="feature-row">
          <div class="reveal reveal-delay-2" style="order: 2;">
            <div class="demo-preview">
              <div class="demo-preview-header">
                <div class="demo-dot red"></div><div class="demo-dot yellow"></div><div class="demo-dot green"></div>
                <span style="font-size: 12px; color: var(--text-muted); margin-left: 8px;">Analytics Dashboard</span>
              </div>
              <div class="demo-preview-body" style="padding: 20px;">
                <div style="display: flex; gap: 12px; margin-bottom: 16px;">
                  <div style="flex: 1; height: 80px; background: linear-gradient(180deg, rgba(99,102,241,0.2) 0%, transparent 100%); border-radius: var(--radius-sm); position: relative;">
                    <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 60%; background: linear-gradient(180deg, var(--primary) 0%, transparent 100%); border-radius: 0 0 var(--radius-sm) var(--radius-sm); opacity: 0.6;"></div>
                  </div>
                  <div style="flex: 1; height: 80px; background: linear-gradient(180deg, rgba(6,182,212,0.2) 0%, transparent 100%); border-radius: var(--radius-sm); position: relative;">
                    <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 40%; background: linear-gradient(180deg, var(--secondary) 0%, transparent 100%); border-radius: 0 0 var(--radius-sm) var(--radius-sm); opacity: 0.6;"></div>
                  </div>
                  <div style="flex: 1; height: 80px; background: linear-gradient(180deg, rgba(16,185,129,0.2) 0%, transparent 100%); border-radius: var(--radius-sm); position: relative;">
                    <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 75%; background: linear-gradient(180deg, var(--success) 0%, transparent 100%); border-radius: 0 0 var(--radius-sm) var(--radius-sm); opacity: 0.6;"></div>
                  </div>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-muted);">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>
            </div>
          </div>
          <div class="reveal" style="order: 1;">
            <div class="feature-icon" style="background: rgba(59, 130, 246, 0.12); width: 64px; height: 64px; font-size: 28px; margin-bottom: 20px;">📊</div>
            <h2 style="font-size: 28px; font-weight: 800; margin-bottom: 16px;">Analytics & Reports</h2>
            <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 20px;">
              Beautiful, actionable dashboards that turn your data into decisions. Track scan rates, inventory turnover, and operational efficiency at a glance.
            </p>
            <ul style="display: flex; flex-direction: column; gap: 10px;">
              <li style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-secondary);"><span style="color: var(--success); font-weight: 700;">✓</span> Visual dashboards & charts</li>
              <li style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-secondary);"><span style="color: var(--success); font-weight: 700;">✓</span> Export to CSV & PDF</li>
              <li style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-secondary);"><span style="color: var(--success); font-weight: 700;">✓</span> Custom date range filtering</li>
              <li style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-secondary);"><span style="color: var(--success); font-weight: 700;">✓</span> Trend analysis & forecasting</li>
            </ul>
          </div>
        </div>

        <!-- Additional Features Grid -->
        <div class="text-center" style="margin-bottom: 40px;">
          <h2 class="reveal" style="font-size: 32px; font-weight: 800;">And much more...</h2>
        </div>
        <div class="grid grid-3 stagger-children">
          <div class="feature-card reveal">
            <div style="font-size: 28px; margin-bottom: 12px;">🔐</div>
            <h3>Role-based Access</h3>
            <p>Control who can view, edit, or manage inventory with granular permissions for every team member.</p>
          </div>
          <div class="feature-card reveal">
            <div style="font-size: 28px; margin-bottom: 12px;">🔗</div>
            <h3>API Access</h3>
            <p>RESTful API for integrating OmniTrace with your existing tools, ERPs, and workflows seamlessly.</p>
          </div>
          <div class="feature-card reveal">
            <div style="font-size: 28px; margin-bottom: 12px;">📧</div>
            <h3>Email Notifications</h3>
            <p>Get notified about low stock, new scans, and important changes automatically via email.</p>
          </div>
          <div class="feature-card reveal">
            <div style="font-size: 28px; margin-bottom: 12px;">🌍</div>
            <h3>Multi-location</h3>
            <p>Manage inventory across multiple warehouses, stores, or offices from a single dashboard.</p>
          </div>
          <div class="feature-card reveal">
            <div style="font-size: 28px; margin-bottom: 12px;">📱</div>
            <h3>Mobile Ready</h3>
            <p>Fully responsive design. Scan QR codes directly from your phone camera with no app install needed.</p>
          </div>
          <div class="feature-card reveal">
            <div style="font-size: 28px; margin-bottom: 12px;">🛡️</div>
            <h3>Enterprise Security</h3>
            <p>End-to-end encryption, SOC 2 compliance, and regular security audits to keep your data safe.</p>
          </div>
        </div>

        <!-- CTA -->
        <div class="text-center" style="margin-top: 64px;">
          <a class="btn btn-primary btn-lg" data-link href="/signup">Start Tracking for Free</a>
        </div>
      </div>
    </section>

    <style>
      @media (max-width: 768px) {
        .feature-row { grid-template-columns: 1fr !important; }
        .feature-row > div { order: unset !important; }
      }
    </style>
  `;
}
