/* ════════════════════════════════════════════════════════════
   OmniTrace — Premium Legal Pages
   ════════════════════════════════════════════════════════════ */

export default function renderLegal() {
  const path = window.location.pathname;
  const slug = path.replace('/legal/', '').replace('/legal', '') || 'privacy';

  const pages = {
    privacy: renderPrivacy(),
    terms: renderTerms(),
    cookies: renderCookies()
  };

  const active = pages[slug] ? slug : 'privacy';

  return `
    <div class="doc-page">
      <div style="display: grid; grid-template-columns: 260px 1fr; gap: 40px;">
        <div class="doc-toc">
          <h4>Legal</h4>
          <a href="/privacy" class="${active === 'privacy' ? 'active' : ''}">Privacy Policy</a>
          <a href="/terms" class="${active === 'terms' ? 'active' : ''}">Terms of Service</a>
          <a href="/cookies" class="${active === 'cookies' ? 'active' : ''}">Cookie Policy</a>
          <a href="/security" class="${active === 'privacy' ? 'active' : ''}">Security</a>
        </div>
        <div class="doc-content">
          ${pages[active]}
        </div>
      </div>
    </div>
  `;
}

function renderPrivacy() {
  return `
    <div class="doc-header">
      <h1>Privacy Policy</h1>
      <p class="doc-subtitle">Last updated: January 2026</p>
    </div>

    <h2>1. Information We Collect</h2>
    <p>We collect information you provide directly when you create an account, use our services, or contact us. This includes your name, email address, workspace data, and usage activity.</p>

    <h2>2. How We Use Your Information</h2>
    <p>We use your information to provide and improve OmniTrace, process payments, send important notifications, and ensure the security of our platform. We never sell your personal data.</p>

    <div class="note"><strong>Transparency First</strong> You can export or delete your data at any time from your profile settings.</div>

    <h2>3. Data Storage & Security</h2>
    <p>All data is encrypted in transit and at rest using AES-256. We use Firebase enterprise infrastructure with SOC 2 Type II compliance.</p>

    <h2>4. Your Rights</h2>
    <p>You have the right to access, correct, or delete your data. You can also export your complete item history as CSV from the Workspace.</p>
  `;
}

function renderTerms() {
  return `
    <div class="doc-header">
      <h1>Terms of Service</h1>
      <p class="doc-subtitle">Last updated: January 2026</p>
    </div>

    <h2>1. Acceptance of Terms</h2>
    <p>By accessing or using OmniTrace, you agree to these Terms. If you do not agree, please do not use our services.</p>

    <h2>2. Accounts</h2>
    <p>You are responsible for maintaining the confidentiality of your account credentials and all activities that occur under your account.</p>

    <h2>3. Workspace Usage</h2>
    <p>You may create and manage workspaces. You are responsible for the content and data within your workspaces.</p>

    <h2>4. API Usage</h2>
    <p>API access is available on paid plans. You may not abuse the API or use it for any illegal purposes.</p>

    <h2>5. Termination</h2>
    <p>We may suspend or terminate your account if you violate these terms. You can cancel your subscription at any time from Billing.</p>
  `;
}

function renderCookies() {
  return `
    <div class="doc-header">
      <h1>Cookie Policy</h1>
      <p class="doc-subtitle">Last updated: January 2026</p>
    </div>

    <h2>1. What Are Cookies</h2>
    <p>Cookies are small text files stored on your device when you visit our website. They help us remember your preferences and improve your experience.</p>

    <h2>2. Types of Cookies We Use</h2>
    <div class="cookie-card">
      <div>
        <h3 style="font-size: 16px; margin-bottom: 6px;">Essential Cookies</h3>
        <p style="font-size: 14px; color: var(--text-secondary);">Required for authentication, security, and core functionality.</p>
      </div>
      <div class="cookie-toggle on" style="pointer-events: none;"></div>
    </div>
    <div class="cookie-card">
      <div>
        <h3 style="font-size: 16px; margin-bottom: 6px;">Analytics Cookies</h3>
        <p style="font-size: 14px; color: var(--text-secondary);">Help us understand how you use the platform (Google Analytics).</p>
      </div>
      <div class="cookie-toggle" onclick="this.classList.toggle('on')"></div>
    </div>
    <div class="cookie-card">
      <div>
        <h3 style="font-size: 16px; margin-bottom: 6px;">Preference Cookies</h3>
        <p style="font-size: 14px; color: var(--text-secondary);">Remember your theme, language, and workspace preferences.</p>
      </div>
      <div class="cookie-toggle on" onclick="this.classList.toggle('on')"></div>
    </div>

    <h2>3. Managing Cookies</h2>
    <p>You can control cookies through your browser settings. Disabling essential cookies may affect platform functionality.</p>
  `;
}
