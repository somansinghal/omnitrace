/* ════════════════════════════════════════════════════════════
   OmniTrace — UI Components
   Skeletons exactly mirror real layouts → zero shift guarantee
   ════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────
   SKELETON REGISTRY
   Each shape has the same dimensions/margins
   as the real element it replaces.
───────────────────────────────────────────── */
export const Skeleton = {

  // ── Generic ──────────────────────────────
  text(width = '100%', height = '14px') {
    return `<div class="skeleton" style="height:${height};width:${width};border-radius:4px;"></div>`;
  },

  card(height = '200px') {
    return `<div class="skeleton" style="height:${height};border-radius:var(--radius-xl);"></div>`;
  },

  // ── KPI card — matches .db-kpi-card ──────
  kpi() {
    return `
      <div class="skeleton" style="
        height:128px;
        border-radius:var(--radius-xl);
        display:flex;
        flex-direction:column;
        padding:20px;
        gap:10px;
      "></div>`;
  },

  kpiGrid(count = 4) {
    return `
      <div style="
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
        gap:16px;
        margin-bottom:24px;
        min-height:128px;
      ">
        ${Array(count).fill(this.kpi()).join('')}
      </div>`;
  },

  // ── Table rows ────────────────────────────
  tableRow() {
    return `
      <tr>
        <td style="padding:12px 16px;"><div class="skeleton" style="height:16px;width:60%;border-radius:4px;"></div></td>
        <td style="padding:12px 16px;"><div class="skeleton" style="height:16px;width:45%;border-radius:4px;"></div></td>
        <td style="padding:12px 16px;"><div class="skeleton" style="height:16px;width:55%;border-radius:4px;"></div></td>
        <td style="padding:12px 16px;"><div class="skeleton" style="height:16px;width:35%;border-radius:4px;"></div></td>
        <td style="padding:12px 16px;"><div class="skeleton" style="height:24px;width:64px;border-radius:20px;"></div></td>
      </tr>`;
  },

  table(rows = 6) {
    return `
      <div style="
        border:1px solid var(--border-color);
        border-radius:var(--radius-xl);
        overflow:hidden;
        min-height:${rows * 52 + 48}px;
      ">
        <div style="
          background:var(--bg-tertiary);
          padding:12px 16px;
          display:grid;
          grid-template-columns:2fr 1fr 1fr 1fr auto;
          gap:16px;
          border-bottom:1px solid var(--border-color);
        ">
          ${['55%','40%','45%','35%','60px'].map(w =>
            `<div class="skeleton" style="height:12px;width:${w};border-radius:4px;"></div>`
          ).join('')}
        </div>
        <table style="width:100%;border-collapse:collapse;">
          <tbody>${Array(rows).fill(this.tableRow()).join('')}</tbody>
        </table>
      </div>`;
  },

  // ── Timeline / Activity ────────────────────
  timeline(items = 5) {
    return `
      <div style="display:flex;flex-direction:column;gap:16px;min-height:${items * 60}px;">
        ${Array(items).fill(0).map(() => `
          <div style="display:flex;align-items:flex-start;gap:12px;">
            <div class="skeleton" style="width:36px;height:36px;border-radius:50%;flex-shrink:0;"></div>
            <div style="flex:1;display:flex;flex-direction:column;gap:6px;padding-top:6px;">
              <div class="skeleton" style="height:14px;width:70%;border-radius:4px;"></div>
              <div class="skeleton" style="height:12px;width:40%;border-radius:4px;"></div>
            </div>
          </div>
        `).join('')}
      </div>`;
  },

  // ── Chart / Graph ──────────────────────────
  chart(height = '220px') {
    return `
      <div style="min-height:${height};display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
          <div class="skeleton" style="height:16px;width:140px;border-radius:4px;"></div>
          <div class="skeleton" style="height:16px;width:60px;border-radius:20px;"></div>
        </div>
        <div style="flex:1;display:flex;align-items:flex-end;gap:6px;min-height:${parseInt(height) - 40}px;">
          ${[55,72,48,88,63,91,78].map(h =>
            `<div class="skeleton" style="flex:1;height:${h}%;border-radius:4px 4px 0 0;"></div>`
          ).join('')}
        </div>
        <div style="display:flex;justify-content:space-between;">
          ${['M','T','W','T','F','S','S'].map(() =>
            `<div class="skeleton" style="height:10px;width:20px;border-radius:4px;"></div>`
          ).join('')}
        </div>
      </div>`;
  },

  // ── Hero / Page heading ────────────────────
  heading() {
    return `
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px;">
        <div class="skeleton" style="height:32px;width:280px;border-radius:6px;"></div>
        <div class="skeleton" style="height:16px;width:200px;border-radius:4px;"></div>
      </div>`;
  },

  // ── Pricing cards ──────────────────────────
  pricingCard() {
    return `
      <div style="
        border:1px solid var(--border-color);
        border-radius:var(--radius-xl);
        padding:28px;
        display:flex;
        flex-direction:column;
        gap:16px;
        min-height:400px;
      ">
        <div class="skeleton" style="height:22px;width:80px;border-radius:4px;"></div>
        <div class="skeleton" style="height:14px;width:120px;border-radius:4px;"></div>
        <div class="skeleton" style="height:48px;width:100px;border-radius:8px;"></div>
        ${Array(5).fill(0).map(() =>
          `<div class="skeleton" style="height:14px;width:${60 + Math.round(Math.random() * 30)}%;border-radius:4px;"></div>`
        ).join('')}
        <div class="skeleton" style="height:44px;border-radius:var(--radius-md);margin-top:auto;"></div>
      </div>`;
  },

  pricingGrid() {
    return `
      <div style="
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
        gap:20px;
        margin-top:32px;
      ">
        ${Array(4).fill(this.pricingCard()).join('')}
      </div>`;
  },

  // ── Blog / Article cards ───────────────────
  articleCard() {
    return `
      <div style="
        border:1px solid var(--border-color);
        border-radius:var(--radius-xl);
        overflow:hidden;
      ">
        <div class="skeleton" style="height:200px;border-radius:0;"></div>
        <div style="padding:20px;display:flex;flex-direction:column;gap:10px;">
          <div class="skeleton" style="height:12px;width:60px;border-radius:20px;"></div>
          <div class="skeleton" style="height:18px;width:85%;border-radius:4px;"></div>
          <div class="skeleton" style="height:14px;width:100%;border-radius:4px;"></div>
          <div class="skeleton" style="height:14px;width:70%;border-radius:4px;"></div>
          <div style="display:flex;gap:8px;margin-top:4px;">
            <div class="skeleton" style="height:12px;width:60px;border-radius:4px;"></div>
            <div class="skeleton" style="height:12px;width:50px;border-radius:4px;"></div>
          </div>
        </div>
      </div>`;
  },

  articleGrid(count = 3) {
    return `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;">
        ${Array(count).fill(this.articleCard()).join('')}
      </div>`;
  },

  // ── Profile / Billing page ─────────────────
  profileCard() {
    return `
      <div style="
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:20px;
      " class="sk-profile-grid">
        ${Array(4).fill(0).map(() => `
          <div style="
            border:1px solid var(--border-color);
            border-radius:var(--radius-xl);
            padding:28px;
            display:flex;
            flex-direction:column;
            gap:16px;
            min-height:260px;
          ">
            <div class="skeleton" style="height:20px;width:140px;border-radius:4px;"></div>
            ${Array(3).fill(0).map(() => `
              <div style="display:flex;flex-direction:column;gap:6px;">
                <div class="skeleton" style="height:11px;width:80px;border-radius:4px;"></div>
                <div class="skeleton" style="height:44px;border-radius:var(--radius-md);"></div>
              </div>
            `).join('')}
          </div>
        `).join('')}
        <style>
          @media(max-width:768px){.sk-profile-grid{grid-template-columns:1fr!important;}}
        </style>
      </div>`;
  },

  // ── Workspace page ─────────────────────────
  workspacePage() {
    return `
      <div style="display:flex;flex-direction:column;gap:24px;">
        ${this.heading()}
        <div style="display:flex;gap:12px;margin-bottom:8px;">
          <div class="skeleton" style="height:44px;flex:1;border-radius:var(--radius-md);"></div>
          <div class="skeleton" style="height:44px;width:160px;border-radius:var(--radius-md);"></div>
          <div class="skeleton" style="height:44px;width:140px;border-radius:var(--radius-md);"></div>
        </div>
        ${this.table(7)}
      </div>`;
  },

  // ── Dashboard page ─────────────────────────
  dashboardPage() {
    return `
      <div style="display:flex;flex-direction:column;gap:24px;padding:20px 16px;">
        <!-- Greeting hero -->
        <div class="skeleton" style="height:92px;border-radius:var(--radius-xl);"></div>

        <!-- KPI grid -->
        ${this.kpiGrid(4)}

        <!-- Chart + Activity row -->
        <div style="
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:20px;
          min-height:280px;
        " class="sk-chart-row">
          ${this.chart('260px')}
          ${this.timeline(5)}
          <style>@media(max-width:1024px){.sk-chart-row{grid-template-columns:1fr!important;}}</style>
        </div>

        <!-- Quick actions -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;min-height:72px;">
          ${Array(4).fill(0).map(() =>
            `<div class="skeleton" style="height:72px;border-radius:var(--radius-lg);"></div>`
          ).join('')}
        </div>

        <!-- Product table -->
        ${this.table(5)}
      </div>`;
  },

  // ── Public page (hero-like) ────────────────
  publicPage() {
    return `
      <div style="display:flex;flex-direction:column;gap:32px;padding:40px 16px;max-width:1200px;margin:0 auto;">
        <!-- hero block -->
        <div style="display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center;min-height:260px;padding:48px 20px;">
          <div class="skeleton" style="height:12px;width:140px;border-radius:20px;"></div>
          <div class="skeleton" style="height:44px;width:72%;border-radius:8px;"></div>
          <div class="skeleton" style="height:24px;width:55%;border-radius:4px;"></div>
          <div style="display:flex;gap:12px;margin-top:8px;">
            <div class="skeleton" style="height:48px;width:160px;border-radius:var(--radius-lg);"></div>
            <div class="skeleton" style="height:48px;width:140px;border-radius:var(--radius-lg);"></div>
          </div>
        </div>
        <!-- cards grid -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;">
          ${Array(3).fill(0).map(() => this.card('180px')).join('')}
        </div>
        ${this.table(4)}
      </div>`;
  },

  // ── Auth page ──────────────────────────────
  authPage() {
    return `
      <div style="
        min-height:calc(100vh - var(--header-h));
        display:flex;align-items:center;justify-content:center;
        padding:40px 20px;
      ">
        <div style="width:100%;max-width:440px;display:flex;flex-direction:column;gap:16px;">
          <div class="skeleton" style="height:32px;width:50%;border-radius:6px;align-self:center;"></div>
          <div class="skeleton" style="height:14px;width:65%;border-radius:4px;align-self:center;"></div>
          <div style="display:flex;gap:10px;margin-top:8px;">
            <div class="skeleton" style="flex:1;height:44px;border-radius:var(--radius-md);"></div>
            <div class="skeleton" style="flex:1;height:44px;border-radius:var(--radius-md);"></div>
          </div>
          ${Array(3).fill(0).map(() => `
            <div style="display:flex;flex-direction:column;gap:6px;">
              <div class="skeleton" style="height:11px;width:70px;border-radius:4px;"></div>
              <div class="skeleton" style="height:44px;border-radius:var(--radius-md);"></div>
            </div>
          `).join('')}
          <div class="skeleton" style="height:48px;border-radius:var(--radius-md);margin-top:4px;"></div>
        </div>
      </div>`;
  },

  // ── API page ───────────────────────────────
  apiPage() {
    return `
      <div style="display:flex;flex-direction:column;gap:24px;padding:20px 16px;">
        ${this.heading()}
        ${this.card('120px')}
        ${this.table(6)}
        <div style="
          border:1px solid var(--border-color);
          border-radius:var(--radius-xl);
          overflow:hidden;
          min-height:180px;
          padding:24px;
          display:flex;flex-direction:column;gap:12px;
        ">
          ${this.text('40%','18px')}
          <div class="skeleton" style="height:120px;border-radius:var(--radius-md);"></div>
        </div>
      </div>`;
  },

  // ── Docs page ──────────────────────────────
  docsPage() {
    return `
      <div style="display:flex;flex-direction:column;gap:20px;padding:20px 16px;max-width:860px;margin:0 auto;">
        ${this.heading()}
        ${Array(4).fill(0).map(() => `
          <div style="
            border:1px solid var(--border-color);
            border-radius:var(--radius-xl);
            padding:28px;
            display:flex;flex-direction:column;gap:10px;
          ">
            <div class="skeleton" style="height:20px;width:200px;border-radius:4px;"></div>
            <div class="skeleton" style="height:14px;width:95%;border-radius:4px;"></div>
            <div class="skeleton" style="height:14px;width:80%;border-radius:4px;"></div>
            <div class="skeleton" style="height:14px;width:88%;border-radius:4px;"></div>
          </div>
        `).join('')}
      </div>`;
  },

  // ── Notifications page ─────────────────────
  notificationsPage() {
    return `
      <div style="display:flex;flex-direction:column;gap:16px;padding:20px 16px;">
        ${this.heading()}
        <div style="
          border:1px solid var(--border-color);
          border-radius:var(--radius-xl);
          overflow:hidden;
        ">
          ${Array(8).fill(0).map(() => `
            <div style="
              display:flex;align-items:flex-start;gap:14px;
              padding:16px 20px;
              border-bottom:1px solid var(--border-color);
            ">
              <div class="skeleton" style="width:40px;height:40px;border-radius:50%;flex-shrink:0;"></div>
              <div style="flex:1;display:flex;flex-direction:column;gap:7px;padding-top:4px;">
                <div class="skeleton" style="height:14px;width:65%;border-radius:4px;"></div>
                <div class="skeleton" style="height:12px;width:40%;border-radius:4px;"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>`;
  },

  // ── Billing page ───────────────────────────
  billingPage() {
    return `
      <div style="display:flex;flex-direction:column;gap:24px;padding:20px 16px;">
        ${this.heading()}
        <div class="skeleton" style="height:140px;border-radius:var(--radius-xl);max-width:560px;"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;" class="sk-billing-grid">
          <div class="skeleton" style="height:180px;border-radius:var(--radius-xl);"></div>
          <div class="skeleton" style="height:180px;border-radius:var(--radius-xl);"></div>
          <style>@media(max-width:768px){.sk-billing-grid{grid-template-columns:1fr!important;}}</style>
        </div>
        ${this.table(5)}
      </div>`;
  },
};

/* ─────────────────────────────────────────────
   ROUTE → SKELETON MAP
   Used by the router to pick the right shape.
───────────────────────────────────────────── */
export const SkeletonForRoute = {
  '/dashboard': () => Skeleton.dashboardPage(),
  '/workspace': () => Skeleton.workspacePage(),
  '/admin': () => Skeleton.dashboardPage(),
  '/admin/users': () => Skeleton.workspacePage(),
  '/admin/workspaces': () => Skeleton.workspacePage(),
  '/admin/subscriptions': () => Skeleton.workspacePage(),
  '/admin/payments': () => Skeleton.workspacePage(),
  '/admin/coupons': () => Skeleton.workspacePage(),
  '/admin/analytics': () => `<div style="display:flex;flex-direction:column;gap:24px;padding:20px 16px;">${Skeleton.heading()}${Skeleton.kpiGrid(4)}${Skeleton.chart('240px')}</div>`,
  '/admin/activity': () => `<div style="display:flex;flex-direction:column;gap:24px;padding:20px 16px;">${Skeleton.heading()}${Skeleton.timeline(10)}</div>`,
  '/admin/features': () => `<div style="display:flex;flex-direction:column;gap:20px;padding:20px 16px;">${Skeleton.heading()}${Array(8).fill(Skeleton.card('68px')).join('')}</div>`,
  '/admin/system': () => `<div style="display:flex;flex-direction:column;gap:20px;padding:20px 16px;">${Skeleton.heading()}${Skeleton.kpiGrid(3)}${Skeleton.table(4)}</div>`,
  '/scan': () => `<div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;padding:20px 16px;" class="sk-scan-grid">${Skeleton.card('380px')}${Skeleton.card('380px')}<style>@media(max-width:768px){.sk-scan-grid{grid-template-columns:1fr!important;}}</style></div>`,
  '/profile': () => Skeleton.profileCard(),
  '/billing': () => Skeleton.billingPage(),
  '/api': () => Skeleton.apiPage(),
  '/notifications': () => Skeleton.notificationsPage(),
  '/pricing': () => `<div style="display:flex;flex-direction:column;gap:32px;padding:48px 16px;max-width:1200px;margin:0 auto;">${Skeleton.heading()}${Skeleton.pricingGrid()}</div>`,
  '/blog': () => `<div style="display:flex;flex-direction:column;gap:32px;padding:48px 16px;max-width:1200px;margin:0 auto;">${Skeleton.heading()}${Skeleton.articleGrid(3)}</div>`,
  '/docs': () => Skeleton.docsPage(),
  '/help': () => Skeleton.docsPage(),
  '/login': () => Skeleton.authPage(),
  '/signup': () => Skeleton.authPage(),
  '/forgot': () => Skeleton.authPage(),
  '/onboarding': () => Skeleton.authPage(),
};

/* default for any unmapped public page */
SkeletonForRoute._default = () => Skeleton.publicPage();

/* ─────────────────────────────────────────────
   ERROR UI
───────────────────────────────────────────── */
export const ErrorUI = {
  render(message, retryFnStr) {
    return `
      <div style="
        padding:48px 20px;
        display:flex;flex-direction:column;align-items:center;justify-content:center;
        text-align:center;gap:16px;
        background:rgba(239,68,68,0.03);
        border:1px dashed rgba(239,68,68,0.3);
        border-radius:var(--radius-xl);
        min-height:240px;
      ">
        <div style="font-size:40px;">⚠️</div>
        <h3 style="font-size:18px;font-weight:700;color:var(--danger);">Failed to load</h3>
        <p style="color:var(--text-secondary);font-size:14px;max-width:400px;">${message || 'An unexpected error occurred. Check your connection and try again.'}</p>
        ${retryFnStr ? `<button class="btn btn-outline" style="border-color:var(--danger);color:var(--danger);" onclick="${retryFnStr}">↺ Try Again</button>` : ''}
      </div>`;
  }
};

// Expose globally
window.Skeleton = Skeleton;
window.SkeletonForRoute = SkeletonForRoute;
window.ErrorUI = ErrorUI;
