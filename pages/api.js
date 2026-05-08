/* ════════════════════════════════════════════════════════════
   OmniTrace — Premium API Reference (Stripe/Vercel Style)
   ════════════════════════════════════════════════════════════ */

import Store from '../assets/js/store.js';

export default function renderApi() {
  const plan = Store.get('plan') || 'free';
  const hasAccess = plan === 'pro' || plan === 'enterprise';

  if (!hasAccess) {
    return `
      <div class="dashboard-page">
        <div class="empty-state" style="min-height: 60vh;">
          <div class="empty-icon">🔑</div>
          <h2 class="empty-title">API Access — Pro & Enterprise</h2>
          <p class="empty-desc">Upgrade to Pro or Enterprise plan to access the OmniTrace API and integrate with your existing tools.</p>
          <a class="btn btn-primary" data-link href="/pricing">Upgrade Plan</a>
        </div>
      </div>
    `;
  }

  return `
    <div class="doc-page">
      <div class="text-center" style="margin-bottom: 48px;">
        <div class="hero-badge">🔑 API Reference</div>
        <h1 class="reveal" style="font-size: clamp(36px, 5vw, 48px); font-weight: 900; margin: 16px 0 12px; letter-spacing: -1.5px;">
          Powerful API for <span class="text-gradient">developers</span>
        </h1>
        <p class="reveal" style="color: var(--text-secondary); max-width: 620px; margin: 0 auto;">
          Build custom integrations, automate workflows, and connect OmniTrace to your existing stack.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: 260px 1fr; gap: 40px;">
        <!-- Sticky Sidebar -->
        <div class="doc-toc">
          <h4>API Reference</h4>
          <a href="#auth">Authentication</a>
          <a href="#workspaces">Workspaces</a>
          <a href="#items">Items</a>
          <a href="#users">Users</a>
          <a href="#scans">Scans</a>
          <a href="#errors">Errors</a>
        </div>

        <div class="doc-content">
          <!-- AUTHENTICATION -->
          <h2 id="auth">Authentication</h2>
          <p>All API requests must include a valid API key in the Authorization header.</p>
          <div class="api-endpoint">
            <div class="api-header">
              <span class="api-method get">GET</span>
              <code class="api-url">https://api.omnitrace.app/v1/me</code>
            </div>
            <div class="api-section">
              <h4>Headers</h4>
              <div class="api-code">Authorization: Bearer YOUR_API_KEY</div>
            </div>
          </div>

          <!-- WORKSPACES -->
          <h2 id="workspaces">Workspaces</h2>
          <div class="api-endpoint">
            <div class="api-header">
              <span class="api-method get">GET</span>
              <code class="api-url">https://api.omnitrace.app/v1/workspaces</code>
            </div>
            <div class="api-section">
              <h4>Response</h4>
              <div class="api-code">{
  "workspaces": [
    {
      "id": "ws_abc123",
      "name": "Main Warehouse",
      "itemCount": 12453,
      "createdAt": "2025-01-12T09:00:00Z"
    }
  ]
}</div>
            </div>
          </div>

          <!-- ITEMS -->
          <h2 id="items">Items</h2>
          <div class="api-endpoint">
            <div class="api-header">
              <span class="api-method post">POST</span>
              <code class="api-url">https://api.omnitrace.app/v1/items</code>
            </div>
            <div class="api-section">
              <h4>Request</h4>
              <div class="api-code">{
  "name": "Wireless Mouse",
  "sku": "SKU-M720",
  "quantity": 48,
  "tags": ["electronics", "batch-A"]
}</div>
            </div>
          </div>

          <div class="api-endpoint">
            <div class="api-header">
              <span class="api-method get">GET</span>
              <code class="api-url">https://api.omnitrace.app/v1/items/:id</code>
            </div>
          </div>

          <!-- USERS -->
          <h2 id="users">Users</h2>
          <div class="api-endpoint">
            <div class="api-header">
              <span class="api-method get">GET</span>
              <code class="api-url">https://api.omnitrace.app/v1/users/me</code>
            </div>
          </div>

          <!-- SCANS -->
          <h2 id="scans">Scans</h2>
          <div class="api-endpoint">
            <div class="api-header">
              <span class="api-method post">POST</span>
              <code class="api-url">https://api.omnitrace.app/v1/scans</code>
            </div>
          </div>

          <!-- ERRORS -->
          <h2 id="errors">Error Handling</h2>
          <div class="api-endpoint">
            <div class="api-section">
              <h4>Common Error Responses</h4>
              <div class="api-code">{
  "error": {
    "code": "item_not_found",
    "message": "The requested item does not exist."
  }
}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
