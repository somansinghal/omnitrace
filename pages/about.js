/* ════════════════════════════════════════════════════════════
   OmniTrace — About Page (Investor-Grade)
   ════════════════════════════════════════════════════════════ */

export default function renderAbout() {
  return `
    <section class="section" style="padding-top: 120px;">
      <div class="container">
        <div class="text-center" style="margin-bottom: 64px;">
          <div class="hero-badge">🏢 About Us</div>
          <h1 class="reveal" style="font-size: 42px; font-weight: 900; margin: 16px 0 12px;">
            Building the future of <span class="text-gradient">inventory tracking</span>
          </h1>
          <p class="reveal" style="color: var(--text-secondary); font-size: 17px; max-width: 640px; margin: 0 auto; line-height: 1.7;">
            We believe every business — from a small shop to a global enterprise — deserves world-class inventory management tools that are simple, affordable, and powerful.
          </p>
        </div>

        <!-- Mission -->
        <div class="glass-card reveal" style="max-width: 800px; margin: 0 auto 80px; padding: 48px; text-align: center;">
          <div style="font-size: 48px; margin-bottom: 20px;">🎯</div>
          <h2 style="font-size: 28px; font-weight: 800; margin-bottom: 16px;">Our Mission</h2>
          <p style="color: var(--text-secondary); font-size: 16px; line-height: 1.8;">
            To eliminate inventory chaos by providing an intuitive, affordable, and powerful tracking platform that works for businesses of every size. We're building OmniTrace to be the last inventory tool you'll ever need — one that grows with you from your first product to your millionth.
          </p>
        </div>

        <!-- Stats -->
        <div class="grid grid-4 stagger-children" style="margin-bottom: 80px;">
          <div class="stat-card reveal" style="text-align: center;">
            <div class="stat-value text-gradient">2023</div>
            <div class="stat-label">Founded</div>
          </div>
          <div class="stat-card reveal" style="text-align: center;">
            <div class="stat-value text-gradient">2,000+</div>
            <div class="stat-label">Active Teams</div>
          </div>
          <div class="stat-card reveal" style="text-align: center;">
            <div class="stat-value text-gradient">10K+</div>
            <div class="stat-label">Products Tracked Daily</div>
          </div>
          <div class="stat-card reveal" style="text-align: center;">
            <div class="stat-value text-gradient">99.9%</div>
            <div class="stat-label">Platform Uptime</div>
          </div>
        </div>

        <!-- Values -->
        <div class="text-center" style="margin-bottom: 40px;">
          <h2 class="reveal" style="font-size: 32px; font-weight: 800;">Our Values</h2>
          <p class="reveal" style="color: var(--text-secondary); margin-top: 8px;">The principles that guide everything we build.</p>
        </div>
        <div class="grid grid-3 stagger-children" style="margin-bottom: 80px;">
          <div class="feature-card reveal" style="text-align: center; padding: 40px 32px;">
            <div style="font-size: 40px; margin-bottom: 16px;">🎯</div>
            <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 10px;">Simplicity First</h3>
            <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.7;">Powerful doesn't have to mean complicated. We obsess over making every feature intuitive and delightful to use.</p>
          </div>
          <div class="feature-card reveal" style="text-align: center; padding: 40px 32px;">
            <div style="font-size: 40px; margin-bottom: 16px;">🔒</div>
            <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 10px;">Security by Default</h3>
            <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.7;">Your data is encrypted, backed up, and protected with enterprise-grade security. We never compromise on safety.</p>
          </div>
          <div class="feature-card reveal" style="text-align: center; padding: 40px 32px;">
            <div style="font-size: 40px; margin-bottom: 16px;">💡</div>
            <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 10px;">Always Innovating</h3>
            <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.7;">We ship fast. New features, improvements, and integrations every single week. Your feedback drives our roadmap.</p>
          </div>
        </div>

        <!-- Team -->
        <div class="text-center" style="margin-bottom: 40px;">
          <h2 class="reveal" style="font-size: 32px; font-weight: 800;">Meet the Team</h2>
          <p class="reveal" style="color: var(--text-secondary); margin-top: 8px;">A small team with a big vision.</p>
        </div>
        <div class="grid grid-3 stagger-children" style="max-width: 800px; margin: 0 auto;">
          <div class="glass-card reveal" style="text-align: center; padding: 36px;">
            <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--secondary)); margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; font-size: 32px; color: #fff;">👨‍💻</div>
            <h3 style="font-size: 18px; font-weight: 700;">Arjun Mehta</h3>
            <p style="color: var(--primary); font-size: 13px; font-weight: 600; margin: 4px 0;">Founder & CEO</p>
            <p style="color: var(--text-secondary); font-size: 13px; line-height: 1.6;">Full-stack engineer. Previously built logistics tools at scale for Fortune 500 companies.</p>
          </div>
          <div class="glass-card reveal" style="text-align: center; padding: 36px;">
            <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), var(--primary)); margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; font-size: 32px; color: #fff;">👩‍🎨</div>
            <h3 style="font-size: 18px; font-weight: 700;">Priya Sharma</h3>
            <p style="color: var(--primary); font-size: 13px; font-weight: 600; margin: 4px 0;">Head of Design</p>
            <p style="color: var(--text-secondary); font-size: 13px; line-height: 1.6;">Design systems expert. Previously at Notion and Figma. Loves making complex tools feel simple.</p>
          </div>
          <div class="glass-card reveal" style="text-align: center; padding: 36px;">
            <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, var(--secondary), var(--success)); margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; font-size: 32px; color: #fff;">👨‍🔬</div>
            <h3 style="font-size: 18px; font-weight: 700;">Rahul Nair</h3>
            <p style="color: var(--primary); font-size: 13px; font-weight: 600; margin: 4px 0;">CTO</p>
            <p style="color: var(--text-secondary); font-size: 13px; line-height: 1.6;">Cloud architecture specialist. Firebase & GCP expert. Built systems handling 10M+ requests daily.</p>
          </div>
        </div>

        <!-- CTA -->
        <div class="text-center" style="margin-top: 64px;">
          <a class="btn btn-primary btn-lg" data-link href="/contact">Get in Touch</a>
        </div>
      </div>
    </section>
  `;
}
