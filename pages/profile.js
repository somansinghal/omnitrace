/* ═══════════════════════════════════════════
   OmniTrace — Profile Page
   ═══════════════════════════════════════════ */

import Store from '../assets/js/store.js';

export default function renderProfile() {
  const user = Store.get('user');
  const theme = Store.get('theme');

  return `
    <div class="dashboard-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">👤 Profile</h1>
          <p class="page-subtitle">Manage your account settings</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 900px;" class="profile-grid">
        <!-- Profile Info -->
        <div class="glass-card" style="padding: 32px;">
          <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 24px;">Personal Information</h3>
          <form id="profile-form">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" class="form-input" id="profile-name" value="${escapeHtml(user?.name || '')}" placeholder="Your name">
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email" class="form-input" value="${escapeHtml(user?.email || '')}" disabled style="opacity: 0.6;">
              <span style="font-size: 11px; color: var(--text-muted);">Email cannot be changed</span>
            </div>
            <button type="submit" class="btn btn-primary" id="profile-save" style="width: 100%;">
              Save Changes
            </button>
          </form>
        </div>

        <!-- Change Password -->
        <div class="glass-card" style="padding: 32px;">
          <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 24px;">Change Password</h3>
          <form id="password-form">
            <div class="form-group">
              <label class="form-label">Current Password</label>
              <input type="password" class="form-input" id="pw-current" placeholder="••••••••" required autocomplete="current-password">
            </div>
            <div class="form-group">
              <label class="form-label">New Password</label>
              <input type="password" class="form-input" id="pw-new" placeholder="Min 6 characters" required minlength="6" autocomplete="new-password">
            </div>
            <div class="form-group">
              <label class="form-label">Confirm New Password</label>
              <input type="password" class="form-input" id="pw-confirm" placeholder="Re-enter new password" required autocomplete="new-password">
            </div>
            <button type="submit" class="btn btn-primary" id="pw-save" style="width: 100%;">
              Update Password
            </button>
          </form>
        </div>

        <!-- Theme Settings -->
        <div class="glass-card" style="padding: 32px;">
          <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 24px;">🎨 Theme</h3>
          <div class="tabs" id="theme-tabs">
            <div class="tab ${theme === 'light' ? 'active' : ''}" data-theme-set="light">☀️ Light</div>
            <div class="tab ${theme === 'dark' ? 'active' : ''}" data-theme-set="dark">🌙 Dark</div>
            <div class="tab ${theme === 'system' ? 'active' : ''}" data-theme-set="system">💻 System</div>
          </div>
          <p style="font-size: 13px; color: var(--text-muted);">
            System theme follows your device's appearance settings.
          </p>
        </div>

        <!-- Account Info -->
        <div class="glass-card" style="padding: 32px;">
          <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 24px;">📋 Account Info</h3>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div>
              <div style="font-size: 12px; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">User ID</div>
              <div style="font-size: 14px; font-family: monospace; margin-top: 4px;">${user?.uid || '—'}</div>
            </div>
            <div>
              <div style="font-size: 12px; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Current Plan</div>
              <div style="margin-top: 6px;">
                <span class="badge badge-${Store.get('plan') === 'pro' ? 'warning' : Store.get('plan') === 'starter' ? 'success' : 'primary'}">
                  ${(Store.get('plan') || 'free').toUpperCase()}
                </span>
              </div>
            </div>
            <div>
              <div style="font-size: 12px; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">Account</div>
              <div style="font-size: 14px; margin-top: 4px;">${escapeHtml(user?.email || '—')}</div>
            </div>
          </div>
          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border-color);">
            <button class="btn btn-danger btn-sm" id="btn-logout" style="width: 100%;">
              🚪 Log Out
            </button>
          </div>
        </div>
      </div>
    </div>

    <style>
      @media (max-width: 768px) {
        .profile-grid { grid-template-columns: 1fr !important; }
      }
    </style>
  `;
}

export async function init() {
  const { default: OmniDB } = await import('../services/omnidb.js');
  const { default: Firebase } = await import('../services/firebase.js');
  const Store = (await import('../assets/js/store.js')).default;
  const user = Store.get('user');

  // Profile form
  const profileForm = document.getElementById('profile-form');
  profileForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('profile-name').value.trim();
    if (!name) {
      window.showToast('Name cannot be empty.', 'error');
      return;
    }

    const btn = document.getElementById('profile-save');
    try {
      btn.disabled = true;
      btn.textContent = 'Saving...';
      await OmniDB.updateProfile(user.uid, { name });
      Store.setUser({ ...user, name });
      window.showToast('Profile updated!', 'success');
    } catch (err) {
      window.showToast(err.message, 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Save Changes';
    }
  });

  // Password form
  const pwForm = document.getElementById('password-form');
  pwForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const current = document.getElementById('pw-current').value;
    const newPw = document.getElementById('pw-new').value;
    const confirm = document.getElementById('pw-confirm').value;

    if (newPw !== confirm) {
      window.showToast('Passwords do not match.', 'error');
      return;
    }

    if (newPw.length < 6) {
      window.showToast('Password must be at least 6 characters.', 'error');
      return;
    }

    const btn = document.getElementById('pw-save');
    try {
      btn.disabled = true;
      btn.textContent = 'Updating...';
      await Firebase.changePassword(current, newPw);
      window.showToast('Password updated!', 'success');
      pwForm.reset();
    } catch (err) {
      window.showToast(err.message, 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Update Password';
    }
  });

  // Theme tabs
  document.querySelectorAll('#theme-tabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const theme = tab.dataset.themeSet;
      Store.setTheme(theme);
      document.querySelectorAll('#theme-tabs .tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      window.showToast(`Theme set to ${theme}.`, 'success');
    });
  });

  // Logout
  document.getElementById('btn-logout')?.addEventListener('click', async () => {
    try {
      await Firebase.logout();
      Store.setUser(null);
      window.showToast('Logged out.', 'info');
      window.Router.navigate('/');
    } catch (err) {
      window.showToast(err.message, 'error');
    }
  });
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
