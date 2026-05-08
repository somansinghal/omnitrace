/* ════════════════════════════════════════════════════════════
   OmniTrace — Onboarding Flow (Step-by-Step Setup)
   ════════════════════════════════════════════════════════════ */

import Store from '../assets/js/store.js';

export default function renderOnboarding() {
  return `
    <div style="min-height: calc(100vh - var(--header-h)); display: flex; align-items: center; justify-content: center; padding: 40px 20px;">
      <div style="max-width: 600px; width: 100%;">
        <!-- Progress Bar -->
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 40px;" id="onboard-progress">
          <div class="onboard-step active" data-step="1"><span>1</span></div>
          <div class="onboard-line"><div class="onboard-line-fill" id="progress-fill" style="width: 0%;"></div></div>
          <div class="onboard-step" data-step="2"><span>2</span></div>
          <div class="onboard-line"><div class="onboard-line-fill" style="width: 0%;"></div></div>
          <div class="onboard-step" data-step="3"><span>3</span></div>
          <div class="onboard-line"><div class="onboard-line-fill" style="width: 0%;"></div></div>
          <div class="onboard-step" data-step="4"><span>4</span></div>
        </div>

        <!-- Step Content -->
        <div id="onboard-content">
          <!-- Rendered via JS -->
        </div>
      </div>
    </div>

    <style>
      .onboard-step {
        width: 40px; height: 40px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 14px; font-weight: 700;
        background: var(--bg-tertiary); color: var(--text-muted);
        border: 2px solid var(--border-color);
        transition: all 0.4s ease; flex-shrink: 0;
      }
      .onboard-step.active { background: var(--primary); color: #fff; border-color: var(--primary); }
      .onboard-step.done { background: var(--success); color: #fff; border-color: var(--success); }
      .onboard-line { flex: 1; height: 3px; background: var(--border-color); border-radius: 2px; overflow: hidden; }
      .onboard-line-fill { height: 100%; background: var(--primary); transition: width 0.5s ease; border-radius: 2px; }
      .onboard-card {
        background: var(--bg-glass); backdrop-filter: blur(24px);
        border: 1px solid var(--border-glass); border-radius: var(--radius-xl);
        padding: 40px; box-shadow: var(--shadow-lg);
        animation: slideUp 0.4s ease;
      }
    </style>
  `;
}

export async function init() {
  let currentStep = 1;
  const totalSteps = 4;
  const user = Store.get('user');

  const steps = [
    {
      icon: '🏢',
      title: 'Create Your Workspace',
      desc: 'Give your workspace a name. This is where all your products and data will live.',
      content: `
        <div class="form-group">
          <label class="form-label">Workspace Name</label>
          <input type="text" class="form-input" id="ws-name" placeholder="${user?.name || 'My'}'s Workspace" value="${user?.name || ''}">
        </div>
      `
    },
    {
      icon: '📦',
      title: 'Add Your First Product',
      desc: 'Add a product to see how easy it is. You can always add more later.',
      content: `
        <div class="form-group">
          <label class="form-label">Product Name</label>
          <input type="text" class="form-input" id="p-name" placeholder="e.g. Wireless Mouse">
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group">
            <label class="form-label">Category</label>
            <input type="text" class="form-input" id="p-cat" placeholder="Electronics">
          </div>
          <div class="form-group">
            <label class="form-label">Quantity</label>
            <input type="number" class="form-input" id="p-qty" value="10" min="1">
          </div>
        </div>
      `
    },
    {
      icon: '📱',
      title: 'Your QR Code is Ready',
      desc: 'Every product gets a unique QR code automatically. Scan it anytime to look up product details.',
      content: `
        <div style="text-align: center; padding: 20px 0;">
          <div style="width: 180px; height: 180px; margin: 0 auto 20px; background: var(--bg-tertiary); border: 3px solid var(--primary); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; position: relative;">
            <div style="font-size: 64px;">📱</div>
            <div style="position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--primary); animation: scanLine 2s ease-in-out infinite;"></div>
          </div>
          <p style="font-size: 13px; color: var(--text-muted); font-family: monospace;">OT-DEMO-QR1234</p>
          <p style="font-size: 14px; color: var(--text-secondary); margin-top: 12px;">Print labels and stick them on your products</p>
        </div>
      `
    },
    {
      icon: '🎉',
      title: 'You\'re All Set!',
      desc: 'Your workspace is ready. Start scanning, tracking, and managing your inventory.',
      content: `
        <div style="text-align: center; padding: 20px 0;">
          <div style="font-size: 64px; margin-bottom: 16px;">🚀</div>
          <div style="display: flex; flex-direction: column; gap: 8px; max-width: 280px; margin: 0 auto; text-align: left;">
            <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-secondary);">
              <span style="color: var(--success); font-weight: 700;">✓</span> Workspace created
            </div>
            <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-secondary);">
              <span style="color: var(--success); font-weight: 700;">✓</span> First product added
            </div>
            <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-secondary);">
              <span style="color: var(--success); font-weight: 700;">✓</span> QR code generated
            </div>
            <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-secondary);">
              <span style="color: var(--success); font-weight: 700;">✓</span> Ready to scan
            </div>
          </div>
        </div>
      `
    }
  ];

  function renderStep(step) {
    const s = steps[step - 1];
    const content = document.getElementById('onboard-content');

    content.innerHTML = `
      <div class="onboard-card">
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="font-size: 48px; margin-bottom: 16px;">${s.icon}</div>
          <h2 style="font-size: 26px; font-weight: 800; margin-bottom: 8px;">${s.title}</h2>
          <p style="color: var(--text-secondary); font-size: 15px;">${s.desc}</p>
        </div>
        ${s.content}
        <div style="display: flex; gap: 12px; margin-top: 28px;">
          ${step > 1 ? `<button class="btn btn-secondary" style="flex: 1;" id="btn-prev">← Back</button>` : ''}
          <button class="btn btn-primary" style="flex: 2;" id="btn-next">
            ${step === totalSteps ? 'Go to Dashboard 🚀' : 'Continue →'}
          </button>
        </div>
        ${step < totalSteps ? `<p style="text-align: center; margin-top: 16px;"><a href="#" onclick="event.preventDefault(); window._skipOnboarding();" style="font-size: 13px; color: var(--text-muted);">Skip setup</a></p>` : ''}
      </div>
    `;

    // Update progress
    document.querySelectorAll('.onboard-step').forEach((el, i) => {
      el.classList.remove('active', 'done');
      if (i + 1 < step) el.classList.add('done');
      else if (i + 1 === step) el.classList.add('active');
    });

    // Progress line fills
    document.querySelectorAll('.onboard-line-fill').forEach((el, i) => {
      el.style.width = (i < step - 1) ? '100%' : '0%';
    });

    // Event handlers
    document.getElementById('btn-prev')?.addEventListener('click', () => {
      currentStep--;
      renderStep(currentStep);
    });

    document.getElementById('btn-next')?.addEventListener('click', async () => {
      if (step === totalSteps) {
        // Mark onboarding complete
        try {
          if (window.OmniDB && user) {
            await window.OmniDB.updateProfile(user.uid, { onboardingComplete: true });
          }
        } catch (e) { console.warn('Onboarding flag error:', e); }
        localStorage.setItem('omnitrace-onboarded', 'true');
        window.Router.navigate('/dashboard');
        window.showToast('Welcome to OmniTrace! 🎉', 'success');
        return;
      }

      // Step-specific actions
      if (step === 1) {
        const wsName = document.getElementById('ws-name')?.value.trim();
        if (wsName && window.OmniDB && user) {
          try {
            localStorage.setItem('omnitrace-ws-name', wsName);
          } catch (e) { console.warn('WS name save error:', e); }
        }
      }

      if (step === 2) {
        const pName = document.getElementById('p-name')?.value.trim();
        const pCat = document.getElementById('p-cat')?.value.trim();
        const pQty = parseInt(document.getElementById('p-qty')?.value) || 1;

        if (pName && window.OmniDB && user) {
          try {
            const ws = await window.OmniDB.getOrCreateWorkspace(user.uid, user.name);
            if (ws) {
              await window.OmniDB.createProduct({
                name: pName,
                category: pCat || 'Uncategorized',
                quantity: pQty
              }, ws.id);
              window.showToast('First product created!', 'success');
            }
          } catch (e) {
            console.warn('Product creation error:', e);
          }
        }
      }

      currentStep++;
      renderStep(currentStep);
    });
  }

  window._skipOnboarding = () => {
    localStorage.setItem('omnitrace-onboarded', 'true');
    window.Router.navigate('/dashboard');
  };

  renderStep(currentStep);
}
