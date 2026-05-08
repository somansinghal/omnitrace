/* ════════════════════════════════════════════════════════════
   OmniTrace — Login Page (Investor-Grade)
   ════════════════════════════════════════════════════════════ */

export default function renderLogin() {
  return `
    <div class="auth-page">
      <div class="auth-card">
        <h1 class="auth-title">Welcome back</h1>
        <p class="auth-subtitle">Log in to your OmniTrace account</p>

        <div class="social-btns">
          <button class="btn btn-secondary" id="btn-google">
            <span style="font-size:18px;">🔵</span> Google
          </button>
        </div>

        <div class="auth-divider">or continue with email</div>

        <form id="login-form">
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-input" id="login-email" placeholder="you@example.com" required autocomplete="email">
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" class="form-input" id="login-password" placeholder="••••••••" required autocomplete="current-password">
          </div>
          <div style="text-align: right; margin-bottom: 20px;">
            <a data-link href="/forgot" style="color: var(--primary); font-size: 13px; font-weight: 600;">Forgot password?</a>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;" id="login-submit">
            Log In
          </button>
        </form>

        <div class="auth-footer">
          Don't have an account? <a data-link href="/signup">Sign up free</a>
        </div>
      </div>
    </div>
  `;
}

export async function init() {
  // Dynamic imports with error handling
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

  const form = document.getElementById('login-form');
  const submitBtn = document.getElementById('login-submit');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
      window.showToast('Please fill in all fields.', 'error');
      return;
    }

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Logging in...';

      const user = await Firebase.login(email, password);
      let profile = null;
      if (OmniDB) {
        try { profile = await OmniDB.getProfile(user.uid); } catch (e) { console.warn('Profile fetch failed:', e); }
      }

      Store.setUser({
        uid: user.uid,
        name: profile?.name || user.displayName || 'User',
        email: user.email,
        plan: profile?.plan || 'free'
      });

      window.showToast('Welcome back!', 'success');
      window.Router.navigate('/dashboard');
    } catch (err) {
      window.showToast(err.message || 'Login failed. Please try again.', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Log In';
    }
  });

  // Google login
  document.getElementById('btn-google')?.addEventListener('click', async () => {
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

      window.showToast('Logged in with Google!', 'success');
      window.Router.navigate('/dashboard');
    } catch (err) {
      window.showToast(err.message || 'Google login failed.', 'error');
    }
  });

}
