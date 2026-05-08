/* ════════════════════════════════════════════════════════════
   OmniTrace — Scan QR Page (Real-time Analytics)
   ════════════════════════════════════════════════════════════ */

export default function renderScan() {
  return `
    <div class="dashboard-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">📷 Scan QR Code</h1>
          <p class="page-subtitle">Point your camera at a QR code to log a scan</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: start;" class="scan-layout">
        <!-- Scanner -->
        <div class="glass-card" style="padding: 28px;">
          <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 16px;">Camera Scanner</h3>

          <div class="qr-scanner-container" id="scanner-container" style="background: var(--bg-tertiary); min-height: 300px; display: flex; align-items: center; justify-content: center;">
            <video id="scanner-video" style="display: none; width: 100%;" autoplay playsinline></video>
            <div id="scanner-placeholder" style="text-align: center; padding: 40px;">
              <div style="font-size: 64px; margin-bottom: 16px;">📷</div>
              <p style="color: var(--text-secondary); margin-bottom: 16px;">Click below to activate camera</p>
              <button class="btn btn-primary" id="btn-start-scan">Start Scanner</button>
            </div>
          </div>

          <div style="margin-top: 16px;">
            <button class="btn btn-secondary" id="btn-stop-scan" style="display: none; width: 100%;">
              Stop Scanner
            </button>
          </div>

          <!-- Manual Entry -->
          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border-color);">
            <h4 style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">Or enter QR code manually:</h4>
            <div style="display: flex; gap: 8px;">
              <input type="text" class="form-input" id="manual-qr" placeholder="e.g. OT-A1B2C3D4" style="flex: 1;">
              <button class="btn btn-primary" id="btn-manual-lookup">Look Up</button>
            </div>
          </div>
        </div>

        <!-- Result -->
        <div class="glass-card" style="padding: 28px;">
          <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 16px;">Scan Result</h3>
          <div id="scan-result">
            <div class="empty-state" style="padding: 40px;">
              <div style="font-size: 48px; margin-bottom: 12px; opacity: 0.5;">🔍</div>
              <p style="color: var(--text-muted);">Scan a QR code to log and view details</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <style>
      @media (max-width: 768px) {
        .scan-layout { grid-template-columns: 1fr !important; }
      }
    </style>
  `;
}

export async function init() {
  let stream = null;
  const video = document.getElementById('scanner-video');
  const placeholder = document.getElementById('scanner-placeholder');
  const startBtn = document.getElementById('btn-start-scan');
  const stopBtn = document.getElementById('btn-stop-scan');
  const resultDiv = document.getElementById('scan-result');

  if (!window.OmniDB) {
    resultDiv.innerHTML = window.ErrorUI.render('Database not initialized.', 'window.location.reload()');
    return;
  }

  startBtn?.addEventListener('click', async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      video.srcObject = stream;
      video.style.display = 'block';
      placeholder.style.display = 'none';
      startBtn.style.display = 'none';
      stopBtn.style.display = 'block';

      window.showToast('Camera active. (Tip: Use manual entry for testing)', 'info');
    } catch (err) {
      window.showToast('Camera access denied.', 'error');
    }
  });

  stopBtn?.addEventListener('click', stopCamera);

  function stopCamera() {
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      stream = null;
    }
    video.style.display = 'none';
    video.srcObject = null;
    placeholder.style.display = '';
    startBtn.style.display = '';
    stopBtn.style.display = 'none';
  }

  const manualInput = document.getElementById('manual-qr');
  const lookupBtn = document.getElementById('btn-manual-lookup');

  async function doLookup() {
    const qrCode = manualInput?.value.trim();
    if (!qrCode) return window.showToast('Please enter a QR code.', 'error');

    try {
      lookupBtn.disabled = true;
      lookupBtn.textContent = 'Searching...';
      
      // Skeleton loading state
      resultDiv.innerHTML = window.Skeleton.card();

      const product = await window.OmniDB.scanProduct(qrCode);

      if (product) {
        showProductResult(product);
        window.showToast('Scan logged successfully!', 'success');
      } else {
        resultDiv.innerHTML = `
          <div class="empty-state" style="padding: 40px; background: rgba(245, 158, 11, 0.05); border: 1px dashed var(--warning); border-radius: var(--radius-xl);">
            <div style="font-size: 48px; margin-bottom: 12px;">⚠️</div>
            <p class="empty-title" style="color: var(--warning);">Product Not Found</p>
            <p class="empty-desc">No product matches QR code: <strong>${escapeHtml(qrCode)}</strong></p>
          </div>
        `;
      }
    } catch (err) {
      resultDiv.innerHTML = window.ErrorUI.render(err.message, 'doLookup()');
    } finally {
      lookupBtn.disabled = false;
      lookupBtn.textContent = 'Look Up';
      manualInput.value = '';
    }
  }

  lookupBtn?.addEventListener('click', doLookup);
  manualInput?.addEventListener('keypress', (e) => { if (e.key === 'Enter') doLookup(); });

  function showProductResult(product) {
    resultDiv.innerHTML = `
      <div style="animation: slideUp 0.3s ease;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
          <div style="width: 56px; height: 56px; border-radius: var(--radius-lg); background: linear-gradient(135deg, var(--primary), var(--secondary)); display: flex; align-items: center; justify-content: center; font-size: 24px; color: #fff;">📦</div>
          <div>
            <h3 style="font-size: 20px; font-weight: 700;">${escapeHtml(product.name)}</h3>
            <span class="badge badge-success">${product.status || 'Active'}</span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
          <div style="padding: 12px; background: var(--bg-tertiary); border-radius: var(--radius-md);">
            <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">SKU</div>
            <div style="font-size: 14px; font-weight: 600; font-family: monospace;">${escapeHtml(product.sku || '—')}</div>
          </div>
          <div style="padding: 12px; background: var(--bg-tertiary); border-radius: var(--radius-md);">
            <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Total Scans</div>
            <div style="font-size: 14px; font-weight: 700; color: var(--primary);">${(product.scanCount || 0) + 1}</div>
          </div>
          <div style="padding: 12px; background: var(--bg-tertiary); border-radius: var(--radius-md);">
            <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Category</div>
            <div style="font-size: 14px; font-weight: 600;">${escapeHtml(product.category || '—')}</div>
          </div>
          <div style="padding: 12px; background: var(--bg-tertiary); border-radius: var(--radius-md);">
            <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Quantity</div>
            <div style="font-size: 14px; font-weight: 600;">${product.quantity || 0}</div>
          </div>
          <div style="padding: 12px; background: var(--bg-tertiary); border-radius: var(--radius-md);">
            <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Location</div>
            <div style="font-size: 14px; font-weight: 600;">${escapeHtml(product.location || '—')}</div>
          </div>
        </div>

        ${product.description ? `
          <div style="margin-bottom: 20px;">
            <div style="font-size: 12px; color: var(--text-muted); text-transform: uppercase; font-weight: 600; margin-bottom: 6px;">Description</div>
            <p style="font-size: 14px; color: var(--text-secondary);">${escapeHtml(product.description)}</p>
          </div>
        ` : ''}
      </div>
    `;
  }

  window.addEventListener('popstate', stopCamera, { once: true });
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
