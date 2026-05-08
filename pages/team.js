/* ════════════════════════════════════════════════════════════
   OmniTrace — Team Page (5 Equal Members, YC-Style)
   ════════════════════════════════════════════════════════════ */

const team = [
    {
      name: 'Soman Singhal',
      role: 'Team Leader',
      bio: 'Full-stack developer and startup builder passionate about solving real-world inventory and organization problems through scalable technology. Leads product vision, development, and execution for OmniTrace.',
      img: 'assets/team/soman.jpg',
      linkedin: 'https://linkedin.com/in/soman-singhal',
      instagram: 'https://instagram.com/_somansinghal'
    },
    {
      name: 'Bhavya Giya',
      role: 'Frontend Developer',
      bio: 'Frontend developer focused on crafting clean, responsive, and user-friendly interfaces. Passionate about modern UI/UX design and creating seamless digital experiences.',
      img: 'assets/team/bhavya.jpg',
      linkedin: 'https://linkedin.com/in/bhavyagiya2197',
      instagram: 'https://instagram.com/bhavyagiya_21'
    },
    {
      name: 'Prateek Lamoria',
      role: 'Cloud Manager',
      bio: 'Cloud and backend enthusiast specializing in Firebase, cloud infrastructure, and scalable backend integration. Focused on building secure and reliable systems for modern applications.',
      img: 'assets/team/prateek.jpg',
      linkedin: 'https://linkedin.com/in/prateek-lamoria-77a293387',
      instagram: 'https://instagram.com/prateek_lamoria'
    },
    {
      name: 'Krish Panchal',
      role: 'Hardware & Integration Lead',
      bio: 'Hardware integration and IoT enthusiast passionate about connecting physical systems with smart digital solutions. Focused on practical innovation and seamless tech integration.',
      img: 'assets/team/krish.jpg',
      linkedin: 'https://linkedin.com/in/krish-panchal-7103a3396',
      instagram: 'https://instagram.com/krrish.on'
    },
    {
      name: 'Kartikay Shekhawat',
      role: 'AI & Documentation Lead',
      bio: 'AI-focused developer with strong interest in intelligent systems, automation, and technical documentation. Dedicated to making complex technologies easier to understand and use.',
      img: 'assets/team/kartikay.jpg',
      linkedin: 'https://linkedin.com/in/kartikey-shekhawat-b2aa103b7',
      instagram: 'https://instagram.com/banna__kartikey_'
    }
  ];

export default function renderTeam() {
  return `
    <!-- ═══ HERO ═══ -->
    <section style="padding: 120px 0 60px;">
      <div class="container">
        <div class="text-center" style="margin-bottom: 20px;">
          <div class="hero-badge">👥 Our Team</div>
          <h1 class="reveal" style="font-size: clamp(36px, 5vw, 56px); font-weight: 900; margin: 16px 0 12px; letter-spacing: -1.5px;">
            Building the future of <span class="text-gradient">smart inventory</span>
          </h1>
          <p class="reveal" style="color: var(--text-secondary); font-size: 17px; max-width: 560px; margin: 0 auto; line-height: 1.7;">
            We're a small team of engineers, designers, and operators who believe inventory tracking shouldn't be painful.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══ TEAM GRID (5 equal cards) ═══ -->
    <section class="section" style="padding-top: 0;">
      <div class="container">
        <div class="team-grid stagger-children">
          ${team.map(m => `
            <div class="reveal team-card">
              <div class="team-card-img-wrap">
                <img src="${m.img}" alt="${m.name}" loading="lazy">
                <div class="team-card-gradient"></div>
              </div>
              <div class="team-card-body">
                <h3>${m.name}</h3>
                <p class="team-role">${m.role}</p>
                <p class="team-bio">${m.bio}</p>
                <div class="team-socials">
                  ${m.linkedin ? `
                    <a class="social-icon-btn linkedin" href="${m.linkedin}" target="_blank" rel="noopener noreferrer" data-tooltip="LinkedIn" aria-label="LinkedIn — ${m.name}">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                  ` : ''}
                  ${m.instagram ? `
                    <a class="social-icon-btn instagram" href="${m.instagram}" target="_blank" rel="noopener noreferrer" data-tooltip="Instagram" aria-label="Instagram — ${m.name}">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                  ` : ''}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- ═══ MISSION ═══ -->
    <section class="section" style="background: var(--bg-tertiary);">
      <div class="container" style="max-width: 720px; margin: 0 auto; text-align: center;">
        <div class="hero-badge">Our Mission</div>
        <h2 class="reveal" style="font-size: clamp(28px, 4vw, 40px); font-weight: 900; margin: 14px 0 16px; letter-spacing: -1px;">
          Why <span class="text-gradient">OmniTrace</span> exists
        </h2>
        <div class="reveal" style="color: var(--text-secondary); font-size: 16px; line-height: 1.9;">
          <p style="margin-bottom: 18px;">
            Most warehouses and retail chains still track inventory with paper registers, WhatsApp messages,
            or messy spreadsheets. Things get lost. Audits take days. Nobody has a clear picture.
          </p>
          <p style="margin-bottom: 18px;">
            We're building the tool we wish we had when we were running operations ourselves — simple QR
            scanning, real-time visibility, and zero setup friction.
          </p>
          <p>
            Five people. One mission. Making inventory tracking invisible so you can focus on what matters.
          </p>
        </div>

        <div class="reveal" style="
          margin-top: 40px; padding: 32px;
          background: var(--bg-glass); backdrop-filter: blur(24px);
          border: 1px solid var(--border-glass); border-radius: 20px;
          box-shadow: var(--shadow-md);
        ">
          <p style="font-size: 18px; font-weight: 700; color: var(--primary); margin-bottom: 8px;">🚀 OmniTrace is currently in Private Beta</p>
          <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 20px;">We're onboarding early adopters who want to shape the product.</p>
          <a class="btn btn-primary" data-link href="/signup">Apply for Early Access →</a>
        </div>
      </div>
    </section>

    <style>
      .team-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 24px;
      }
      @media (min-width: 600px) { .team-grid { grid-template-columns: repeat(2, 1fr); } }
      @media (min-width: 900px) { .team-grid { grid-template-columns: repeat(3, 1fr); } }
      @media (min-width: 1100px) { .team-grid { grid-template-columns: repeat(5, 1fr); } }

      .team-card {
        background: var(--bg-glass);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1px solid var(--border-glass);
        border-radius: 20px;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
        box-shadow: var(--shadow-md);
        display: flex;
        flex-direction: column;
      }
      .team-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 48px rgba(99,102,241,0.2), var(--shadow-lg);
        border-color: rgba(99,102,241,0.4);
      }

      .team-card-img-wrap {
        position: relative;
        overflow: hidden;
        aspect-ratio: 1 / 1;
        background: linear-gradient(135deg, var(--primary), var(--accent));
      }
      .team-card-img-wrap img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
      .team-card:hover .team-card-img-wrap img {
        transform: scale(1.06);
      }
      .team-card-gradient {
        position: absolute;
        bottom: 0; left: 0; right: 0;
        height: 48px;
        background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
        pointer-events: none;
      }

      .team-card-body {
        padding: 20px;
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .team-card-body h3 {
        font-size: 17px;
        font-weight: 700;
        margin: 0 0 2px 0;
      }
      .team-role {
        font-size: 13px;
        font-weight: 600;
        color: var(--primary);
        margin-bottom: 10px;
        letter-spacing: 0.2px;
        opacity: 0.9;
      }
      .team-bio {
        font-size: 13px;
        color: var(--text-secondary);
        line-height: 1.7;
        margin-bottom: 16px;
        flex: 1;
      }

      .team-socials {
        display: flex;
        gap: 8px;
        margin-top: auto;
      }
      .team-social-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 10px;
        background: rgba(99,102,241,0.08);
        color: var(--primary);
        transition: all 0.25s ease;
      }
      .team-social-linkedin:hover {
        background: #0077B5;
        color: #fff;
        transform: translateY(-2px);
      }
      .team-social-instagram:hover {
        background: linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
        color: #fff;
        transform: translateY(-2px);
      }
    </style>
  `;
}
