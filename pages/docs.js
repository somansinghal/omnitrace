/* ═══════════════════════════════════════════
   OmniTrace — Documentation Page
   ═══════════════════════════════════════════ */

export default function renderDocs() {
  return `
    <section class="section">
      <div class="container" style="max-width: 860px;">
        <div class="text-center" style="margin-bottom: 48px;">
          <div class="hero-badge">📚 Documentation</div>
          <h1 class="reveal" style="font-size: 42px; font-weight: 900; margin: 16px 0 12px;">
            OmniTrace <span class="text-gradient">Docs</span>
          </h1>
          <p class="reveal" style="color: var(--text-secondary); font-size: 16px;">
            Everything you need to get started and make the most of OmniTrace.
          </p>
        </div>

        <!-- Quick Start -->
        <div class="glass-card reveal" style="margin-bottom: 24px; padding: 36px;">
          <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 16px;">🚀 Quick Start</h2>
          <ol style="padding-left: 20px; color: var(--text-secondary); line-height: 2;">
            <li>Create a free account at <a data-link href="/signup" style="color: var(--primary); font-weight: 600;">Sign Up</a></li>
            <li>Navigate to your <strong>Workspace</strong> from the sidebar</li>
            <li>Click <strong>"Add Product"</strong> to create your first item</li>
            <li>A unique QR code is automatically generated</li>
            <li>Use the <strong>Scan</strong> page to scan QR codes with your camera</li>
          </ol>
        </div>

        <!-- QR Tracking -->
        <div class="glass-card reveal" style="margin-bottom: 24px; padding: 36px;">
          <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 16px;">📱 QR Code Tracking</h2>
          <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 16px;">
            Every product gets a unique QR code automatically. When scanned, it logs:
          </p>
          <ul style="color: var(--text-secondary); line-height: 2;">
            <li>📍 Location of scan</li>
            <li>🕐 Timestamp</li>
            <li>👤 User who scanned</li>
            <li>📊 Scan count</li>
          </ul>
        </div>

        <!-- API -->
        <div class="glass-card reveal" style="margin-bottom: 24px; padding: 36px;">
          <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 16px;">🔗 API Reference</h2>
          <p style="color: var(--text-secondary); margin-bottom: 16px;">
            Available on Pro and Enterprise plans. Authenticate with your API key.
          </p>
          <div style="background: var(--bg-tertiary); border-radius: var(--radius-md); padding: 20px; font-family: monospace; font-size: 13px; overflow-x: auto; margin-bottom: 16px;">
            <div style="color: var(--text-muted); margin-bottom: 8px;">// Get all products</div>
            <div>GET /api/v1/products</div>
            <div style="margin-top: 12px; color: var(--text-muted);">// Create product</div>
            <div>POST /api/v1/products</div>
            <div style="margin-top: 12px; color: var(--text-muted);">// Scan product</div>
            <div>GET /api/v1/scan/{qrCode}</div>
          </div>
          <p style="color: var(--text-muted); font-size: 13px;">
            Full API documentation available after upgrading to Pro plan.
          </p>
        </div>

        <!-- Plans -->
        <div class="glass-card reveal" style="margin-bottom: 24px; padding: 36px;">
          <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 16px;">💎 Plans & Limits</h2>
          <div class="table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Free</th>
                  <th>Starter</th>
                  <th>Pro</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Products</td><td>10</td><td>100</td><td>Unlimited</td></tr>
                <tr><td>QR Codes</td><td>✓</td><td>✓</td><td>✓</td></tr>
                <tr><td>Analytics</td><td>✗</td><td>Basic</td><td>Advanced</td></tr>
                <tr><td>API Access</td><td>✗</td><td>✗</td><td>✓</td></tr>
                <tr><td>Support</td><td>Community</td><td>Email</td><td>Priority</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- FAQ -->
        <div class="glass-card reveal" style="padding: 36px;">
          <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 16px;">❓ Troubleshooting</h2>
          <div style="color: var(--text-secondary); line-height: 1.8;">
            <p><strong>QR code not scanning?</strong> Ensure good lighting and hold the camera steady.</p>
            <p style="margin-top: 12px;"><strong>Data not syncing?</strong> Check your internet connection. Data syncs automatically when back online.</p>
            <p style="margin-top: 12px;"><strong>Can't upgrade?</strong> Ensure you're logged in and try again. Contact support if the issue persists.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}
