/* ════════════════════════════════════════════════════════════
   OmniTrace — Forgot Password Page (Investor-Grade)
   ════════════════════════════════════════════════════════════ */

export default function renderForgot() {
  return `
    <div class="auth-page">
      <div class="auth-card">
        <div style="text-align: center; font-size: 48px; margin-bottom: 16px;">🔑</div>
        <h1 class="auth-title">Reset Password</h1>
        <p class="auth-subtitle">Enter your email and we'll send you a reset link</p>

        <form id="forgot-form">
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" class="form-input" id="forgot-email" placeholder="you@example.com" required autocomplete="email">
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;" id="forgot-submit">
            Send Reset Link
          </button>
        </form>

        <div id="forgot-success" class="hidden" style="text-align: center; padding: 20px;">
          <div style="font-size: 48px; margin-bottom: 12px;">✉️</div>
          <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">Check your email</h3>
          <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.6;">
            We've sent a password reset link to your email address. It may take a minute to arrive.
          </p>
        </div>

        <div class="auth-footer">
          Remember your password? <a data-link href="/login">Log in</a>
        </div>
      </div>
    </div>
  `;
}

export async function init() {
  let Firebase;
  try {
    const fbMod = await import('../services/firebase.js');
    Firebase = fbMod.default;
  } catch (e) {
    console.error('Firebase load error:', e);
    window.showToast('Authentication service unavailable. Please refresh.', 'error');
    return;
  }

  const form = document.getElementById('forgot-form');
  const submitBtn = document.getElementById('forgot-submit');
  const successDiv = document.getElementById('forgot-success');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value.trim();

    if (!email) {
      window.showToast('Please enter your email.', 'error');
      return;
    }

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      await Firebase.resetPassword(email);

      form.classList.add('hidden');
      successDiv.classList.remove('hidden');
      window.showToast('Reset link sent!', 'success');
    } catch (err) {
      window.showToast(err.message || 'Failed to send reset link.', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Reset Link';
    }
  });
}
