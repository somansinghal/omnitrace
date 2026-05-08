/* ════════════════════════════════════════════════════════════
   OmniTrace — Signup Page (Investor-Grade)
   ════════════════════════════════════════════════════════════ */

export default function renderSignup() {
  return `
    <div class="auth-page">
      <div class="auth-card">
        <h1 class="auth-title">Create account</h1>
        <p class="auth-subtitle">Start tracking your inventory in minutes</p>

        <div class="social-btns">
          <button class="btn btn-secondary" id="btn-google-signup">
            <span style="font-size:18px;">🔵</span> Google
          </button>
        </div>

        <div class="auth-divider">or sign up with email</div>

        <form id="signup-form">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" class="form-input" id="signup-name" placeholder="John Doe" required autocomplete="name">
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-input" id="signup-email" placeholder="you@example.com" required autocomplete="email">
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" class="form-input" id="signup-password" placeholder="Min 6 characters" required minlength="6" autocomplete="new-password">
          </div>
          <div class="form-group">
            <label class="form-label">Confirm Password</label>
            <input type="password" class="form-input" id="signup-confirm" placeholder="Re-enter password" required autocomplete="new-password">
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;" id="signup-submit">
            Create Account
          </button>
        </form>

        <p style="text-align: center; margin-top: 16px; font-size: 12px; color: var(--text-muted);">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>

        <div class="auth-footer">
          Already have an account? <a data-link href="/login">Log in</a>
        </div>
      </div>
    </div>
  `;
}

export async function init() {
  let Firebase, OmniDB, Store;
  try {
    const fbMod = await import('../services/firebase.js');
    Firebase = fbMod.default;
  } catch (e) {
    console.error('Firebase load error:', e);
    window.showToast('Authentication service unavailable. Please refresh.', 'error');
    return;
  }

  try {
    const dbMod = await import('../services/omnidb.js');
    OmniDB = dbMod.default;
  } catch (e) {
    console.error('OmniDB load error:', e);
  }

  try {
    const storeMod = await import('../assets/js/store.js');
    Store = storeMod.default;
  } catch (e) {
    console.error('Store load error:', e);
    return;
  }

  const form = document.getElementById('signup-form');
  const submitBtn = document.getElementById('signup-submit');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;

    if (!name || !email || !password) {
      window.showToast('Please fill in all fields.', 'error');
      return;
    }

    if (password !== confirm) {
      window.showToast('Passwords do not match.', 'error');
      return;
    }

    if (password.length < 6) {
      window.showToast('Password must be at least 6 characters.', 'error');
      return;
    }

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Creating account...';

      const user = await Firebase.signup(email, password, name);

      Store.setUser({
        uid: user.uid,
        name,
        email,
        plan: 'free'
      });

      window.showToast('Account created! Welcome to OmniTrace.', 'success');
      window.Router.navigate('/dashboard');
    } catch (err) {
      window.showToast(err.message || 'Signup failed. Please try again.', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Create Account';
    }
  });

  // Google signup
  document.getElementById('btn-google-signup')?.addEventListener('click', async () => {
    try {
      const user = await Firebase.loginWithGoogle();
      let profile = null;
      if (OmniDB) {
        try { profile = await OmniDB.getProfile(user.uid); } catch (e) {}
      }

      Store.setUser({
        uid: user.uid,
        name: profile?.name || user.displayName || 'User',
        email: user.email,
        plan: profile?.plan || 'free'
      });

      window.showToast('Signed up with Google!', 'success');
      window.Router.navigate('/dashboard');
    } catch (err) {
      window.showToast(err.message || 'Google signup failed.', 'error');
    }
  });

}
