/* ════════════════════════════════════════════════════════════
   OmniTrace — Careers Page
   ════════════════════════════════════════════════════════════ */

export default function renderCareers() {
  const jobs = [
    { title: 'Senior Frontend Engineer', dept: 'Engineering', type: 'Full-time', loc: 'Remote (India)', desc: 'Build beautiful, performant UIs using vanilla JS and modern CSS. Own the entire frontend architecture.' },
    { title: 'Backend Engineer (Firebase)', dept: 'Engineering', type: 'Full-time', loc: 'Remote (India)', desc: 'Design and implement scalable backend systems using Firebase Firestore, Cloud Functions, and security rules.' },
    { title: 'Product Designer', dept: 'Design', type: 'Full-time', loc: 'Bangalore / Remote', desc: 'Create intuitive, delightful interfaces for complex inventory workflows. Work closely with engineering.' },
    { title: 'Developer Advocate', dept: 'Marketing', type: 'Full-time', loc: 'Remote (India)', desc: 'Build our developer community through content, tutorials, and open-source contributions.' }
  ];

  return `
    <section class="section" style="padding-top: 120px;">
      <div class="container">
        <div class="text-center" style="margin-bottom: 64px;">
          <div class="hero-badge">💼 Careers</div>
          <h1 class="reveal" style="font-size: 42px; font-weight: 900; margin: 16px 0 12px;">Build the <span class="text-gradient">future of tracking</span></h1>
          <p class="reveal" style="color: var(--text-secondary); font-size: 17px; max-width: 600px; margin: 0 auto; line-height: 1.7;">We're a small, focused team building something big. If you love solving hard problems and shipping great products, we'd love to talk.</p>
        </div>

        <div class="grid grid-3 stagger-children" style="margin-bottom: 80px;">
          <div class="glass-card reveal" style="text-align: center; padding: 40px 32px;">
            <div style="font-size: 40px; margin-bottom: 16px;">🚀</div>
            <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 10px;">Ship Fast</h3>
            <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.7;">No bureaucracy. No endless meetings. Just build, test, ship, iterate. We deploy multiple times a day.</p>
          </div>
          <div class="glass-card reveal" style="text-align: center; padding: 40px 32px;">
            <div style="font-size: 40px; margin-bottom: 16px;">🌍</div>
            <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 10px;">Remote First</h3>
            <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.7;">Work from anywhere in India. Async-first communication and flexible hours. We hire the best, wherever they are.</p>
          </div>
          <div class="glass-card reveal" style="text-align: center; padding: 40px 32px;">
            <div style="font-size: 40px; margin-bottom: 16px;">💰</div>
            <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 10px;">Competitive Pay</h3>
            <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.7;">Market-rate salary plus equity. Everyone shares in the upside of what we're building together.</p>
          </div>
        </div>

        <div style="max-width: 800px; margin: 0 auto;">
          <h2 class="reveal" style="font-size: 28px; font-weight: 800; margin-bottom: 32px;">Open Positions</h2>
          ${jobs.map((j, i) => `
            <div class="glass-card reveal" style="margin-bottom: 16px; padding: 28px;">
              <div style="display: flex; justify-content: space-between; align-items: start; flex-wrap: wrap; gap: 12px;">
                <div style="flex: 1; min-width: 240px;">
                  <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">${j.title}</h3>
                  <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 12px; line-height: 1.6;">${j.desc}</p>
                  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                    <span class="badge badge-primary">${j.dept}</span>
                    <span class="badge badge-success">${j.type}</span>
                    <span style="font-size: 13px; color: var(--text-muted);">📍 ${j.loc}</span>
                  </div>
                </div>
                <button class="btn btn-primary btn-sm" onclick="window._apply('${j.title}')">Apply →</button>
              </div>
            </div>
          `).join('')}
          <p class="text-center" style="margin-top: 48px; color: var(--text-secondary); font-size: 14px;">Don't see a fit? Email <a href="mailto:careers.omnitrace@gmail.com" style="color: var(--primary); font-weight: 600;">careers@omnitrace.app</a></p>
        </div>
      </div>
    </section>
    <div id="job-modal" class="modal-root"></div>
  `;
}

export async function init() {
  window._apply = (title) => {
    const modal = document.getElementById('job-modal');
    modal.innerHTML = `
      <div class="modal-overlay" id="mo">
        <div class="modal-content">
          <div class="modal-header"><h3 class="modal-title">Apply: ${title}</h3><button class="modal-close" id="mc">✕</button></div>
          <form id="jf">
            <div class="form-group"><label class="form-label">Full Name</label><input type="text" class="form-input" id="jn" required></div>
            <div class="form-group"><label class="form-label">Email</label><input type="email" class="form-input" id="je" required></div>
            <div class="form-group"><label class="form-label">LinkedIn</label><input type="url" class="form-input" id="jl"></div>
            <div class="form-group"><label class="form-label">Portfolio / GitHub</label><input type="url" class="form-input" id="jp"></div>
            <div class="form-group"><label class="form-label">Why OmniTrace?</label><textarea class="form-input" id="jwhy" rows="3" required></textarea></div>
            <button type="submit" class="btn btn-primary" style="width:100%;" id="js">Submit Application</button>
          </form>
        </div>
      </div>`;
    modal.classList.add('active');
    const close = () => { modal.classList.remove('active'); modal.innerHTML = ''; };
    document.getElementById('mc')?.addEventListener('click', close);
    document.getElementById('mo')?.addEventListener('click', e => { if (e.target === e.currentTarget) close(); });
    document.getElementById('jf')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      document.getElementById('js').disabled = true;
      document.getElementById('js').textContent = 'Submitting...';
      await new Promise(r => setTimeout(r, 800));
      window.showToast('Application submitted! We\'ll be in touch.', 'success');
      close();
    });
  };
}
