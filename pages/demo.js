/* ════════════════════════════════════════════════════════════
   OmniTrace — Public Demo Mode
   Explore the product without creating an account
   ════════════════════════════════════════════════════════════ */

const DEMO_PRODUCTS = [
  { id: 'demo-1', name: 'Wireless Mouse M720', sku: 'SKU-WM-720', category: 'Electronics', quantity: 48, price: 2499, location: 'Warehouse A', qrCode: 'OT-DEMO-A1B2', scanCount: 127, status: 'active' },
  { id: 'demo-2', name: 'USB-C Hub 7-in-1', sku: 'SKU-UC-7IN1', category: 'Accessories', quantity: 23, price: 3499, location: 'Warehouse B', qrCode: 'OT-DEMO-C3D4', scanCount: 89, status: 'active' },
  { id: 'demo-3', name: 'Mechanical Keyboard K95', sku: 'SKU-MK-K95', category: 'Electronics', quantity: 5, price: 7999, location: 'Warehouse A', qrCode: 'OT-DEMO-E5F6', scanCount: 214, status: 'active' },
  { id: 'demo-4', name: 'Monitor Stand Pro', sku: 'SKU-MS-PRO', category: 'Furniture', quantity: 67, price: 1299, location: 'Warehouse C', qrCode: 'OT-DEMO-G7H8', scanCount: 43, status: 'active' },
  { id: 'demo-5', name: 'Webcam 4K Ultra', sku: 'SKU-WC-4K', category: 'Electronics', quantity: 0, price: 8999, location: 'Warehouse A', qrCode: 'OT-DEMO-I9J0', scanCount: 312, status: 'out-of-stock' },
  { id: 'demo-6', name: 'Standing Desk Frame', sku: 'SKU-SD-FRM', category: 'Furniture', quantity: 3, price: 24999, location: 'Warehouse C', qrCode: 'OT-DEMO-K1L2', scanCount: 56, status: 'low-stock' },
  { id: 'demo-7', name: 'Noise Cancelling Headphones', sku: 'SKU-NC-HP1', category: 'Audio', quantity: 31, price: 12999, location: 'Warehouse B', qrCode: 'OT-DEMO-M3N4', scanCount: 198, status: 'active' },
  { id: 'demo-8', name: 'LED Desk Lamp', sku: 'SKU-DL-LED', category: 'Lighting', quantity: 89, price: 1899, location: 'Warehouse A', qrCode: 'OT-DEMO-O5P6', scanCount: 71, status: 'active' },
];

const DEMO_ACTIVITIES = [
  { action: 'scanned', details: 'Wireless Mouse M720 scanned at Warehouse A', time: '2 minutes ago' },
  { action: 'created', details: 'LED Desk Lamp added to inventory', time: '15 minutes ago' },
  { action: 'updated', details: 'Mechanical Keyboard K95 quantity updated: 8 → 5', time: '1 hour ago' },
  { action: 'scanned', details: 'Webcam 4K Ultra scanned at Warehouse A', time: '2 hours ago' },
  { action: 'deleted', details: 'Old Cable Bundle removed from inventory', time: '3 hours ago' },
  { action: 'created', details: 'Standing Desk Frame added to inventory', time: '5 hours ago' },
  { action: 'scanned', details: 'Noise Cancelling Headphones scanned at Warehouse B', time: '6 hours ago' },
];

export default function renderDemo() {
  return `
    <div class="dashboard-page">
      <!-- Demo Banner -->
      <div style="background: linear-gradient(135deg, #F59E0B, #D97706); padding: 12px 20px; border-radius: var(--radius-lg); margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 20px;">🧪</span>
          <span style="color: #fff; font-weight: 600; font-size: 14px;">Demo Mode — Explore with sample data. No account required.</span>
        </div>
        <div style="display: flex; gap: 8px;">
          <a class="btn btn-sm" data-link href="/signup" style="background: rgba(255,255,255,0.2); color: #fff; backdrop-filter: blur(10px);">Create Free Account</a>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-4 stagger-children" style="margin-bottom: 24px;">
        <div class="db-kpi-card animate-scale-in">
          <div class="kpi-icon" style="background: rgba(99,102,241,0.12);">📦</div>
          <div class="kpi-value">${DEMO_PRODUCTS.length}</div>
          <div class="kpi-label">Demo Products</div>
        </div>
        <div class="db-kpi-card animate-scale-in">
          <div class="kpi-icon" style="background: rgba(6,182,212,0.12);">📱</div>
          <div class="kpi-value">${DEMO_PRODUCTS.reduce((s, p) => s + p.scanCount, 0)}</div>
          <div class="kpi-label">Total Scans</div>
        </div>
        <div class="db-kpi-card animate-scale-in">
          <div class="kpi-icon" style="background: rgba(16,185,129,0.12);">📊</div>
          <div class="kpi-value">${new Set(DEMO_PRODUCTS.map(p => p.category)).size}</div>
          <div class="kpi-label">Categories</div>
        </div>
        <div class="db-kpi-card animate-scale-in">
          <div class="kpi-icon" style="background: rgba(244,114,182,0.12);">💎</div>
          <div class="kpi-value" style="font-size: 22px; padding-top: 6px;">Pro</div>
          <div class="kpi-label">Demo Plan</div>
        </div>
      </div>

      <!-- Products Table -->
      <div class="glass-card" style="padding: 28px; margin-bottom: 24px;">
        <div class="db-card-header">
          <h3 class="db-section-title">📦 Demo Products</h3>
          <span class="badge badge-warning">Read-only</span>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Name</th><th>SKU</th><th>Category</th><th>Qty</th><th>Price</th><th>Scans</th><th>Status</th></tr></thead>
            <tbody>
              ${DEMO_PRODUCTS.map(p => `
                <tr>
                  <td><strong style="color:var(--primary);">${p.name}</strong></td>
                  <td style="font-family:monospace;font-size:12px;">${p.sku}</td>
                  <td>${p.category}</td>
                  <td><span class="badge ${p.quantity === 0 ? 'badge-danger' : p.quantity <= 5 ? 'badge-warning' : 'badge-success'}">${p.quantity}</span></td>
                  <td>₹${p.price.toLocaleString()}</td>
                  <td>${p.scanCount}</td>
                  <td><span class="badge badge-${p.status === 'active' ? 'success' : p.status === 'low-stock' ? 'warning' : 'danger'}">${p.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Activity + Quick Actions Row -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;" class="demo-grid">
        <div class="glass-card" style="padding: 28px;">
          <h3 class="db-section-title">⚡ Recent Activity</h3>
          <div style="max-height: 280px; overflow-y: auto;">
            ${DEMO_ACTIVITIES.map(a => `
              <div style="display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--border-color);">
                <span class="badge badge-${a.action === 'created' ? 'success' : a.action === 'deleted' ? 'danger' : 'primary'}">${a.action}</span>
                <div style="flex: 1;">
                  <p style="font-size: 13px; margin: 0;">${a.details}</p>
                  <span style="font-size: 11px; color: var(--text-muted);">${a.time}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="glass-card" style="padding: 28px;">
          <h3 class="db-section-title">🚀 Try It Now</h3>
          <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 20px; line-height: 1.7;">
            This is a preview of what your dashboard will look like. Create a free account to add your own products and start tracking.
          </p>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <a class="btn btn-primary" data-link href="/signup" style="width: 100%; justify-content: center;">Create Free Account</a>
            <a class="btn btn-secondary" data-link href="/features" style="width: 100%; justify-content: center;">Explore Features</a>
            <a class="btn btn-outline" data-link href="/pricing" style="width: 100%; justify-content: center;">View Pricing</a>
          </div>
        </div>
      </div>
    </div>

    <style>
      @media (max-width: 768px) {
        .demo-grid { grid-template-columns: 1fr !important; }
      }
    </style>
  `;
}
