/* ════════════════════════════════════════════════════════════
   OmniTrace — Contact Page (Investor-Grade)
   ════════════════════════════════════════════════════════════ */

export default function renderContact() {
  return `
    <section class="section" style="padding-top: 120px;">
      <div class="container">
        <div class="text-center" style="margin-bottom: 56px;">
          <div class="hero-badge">📬 Contact</div>
          <h1 class="reveal" style="font-size: 42px; font-weight: 900; margin: 16px 0 12px;">
            Get in <span class="text-gradient">touch</span>
          </h1>
          <p class="reveal" style="color: var(--text-secondary); font-size: 17px; max-width: 520px; margin: 0 auto; line-height: 1.7;">
            Have a question, feedback, or enterprise inquiry? We'd love to hear from you. Our team typically responds within 24 hours.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 40px; max-width: 960px; margin: 0 auto;" class="contact-grid">
          <!-- Contact Form -->
          <div class="glass-card reveal" style="padding: 36px;">
            <h2 style="font-size: 22px; font-weight: 700; margin-bottom: 24px;">Send a Message</h2>
            <form id="contact-form">
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" class="form-input" id="contact-name" placeholder="John Doe" required>
              </div>
              <div class="form-group">
                <label class="form-label">Email Address</label>
                <input type="email" class="form-input" id="contact-email" placeholder="john@example.com" required>
              </div>
              <div class="form-group">
                <label class="form-label">Subject</label>
                <select class="form-input" id="contact-subject">
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="enterprise">Enterprise Plan</option>
                  <option value="billing">Billing Question</option>
                  <option value="feedback">Product Feedback</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Message</label>
                <textarea class="form-input" id="contact-message" placeholder="Tell us what you need..." rows="5" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary" style="width: 100%;" id="contact-submit">
                Send Message
              </button>
            </form>
          </div>

          <!-- Contact Info -->
          <div class="stagger-children">
            <div class="glass-card reveal" style="padding: 28px; margin-bottom: 16px;">
              <div style="display: flex; align-items: flex-start; gap: 14px;">
                <div style="width: 40px; height: 40px; background: rgba(99,102,241,0.1); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;">📧</div>
                <div>
                  <h3 style="font-size: 15px; font-weight: 700; margin-bottom: 4px;">Email</h3>
                  <p style="color: var(--text-secondary); font-size: 14px;">help.omnitrace@gmail.com</p>
                  <p style="color: var(--text-muted); font-size: 12px; margin-top: 4px;">We reply within 24 hours</p>
                </div>
              </div>
            </div>
            <div class="glass-card reveal" style="padding: 28px; margin-bottom: 16px;">
              <div style="display: flex; align-items: flex-start; gap: 14px;">
                <div style="width: 40px; height: 40px; background: rgba(6,182,212,0.1); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;">💬</div>
                <div>
                  <h3 style="font-size: 15px; font-weight: 700; margin-bottom: 4px;">Live Chat</h3>
                  <p style="color: var(--text-secondary); font-size: 14px;">Mon–Fri, 9am–6pm IST</p>
                  <p style="color: var(--text-muted); font-size: 12px; margin-top: 4px;">Pro & Enterprise plans</p>
                </div>
              </div>
            </div>
            <div class="glass-card reveal" style="padding: 28px; margin-bottom: 16px;">
              <div style="display: flex; align-items: flex-start; gap: 14px;">
                <div style="width: 40px; height: 40px; background: rgba(16,185,129,0.1); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;">🏢</div>
                <div>
                  <h3 style="font-size: 15px; font-weight: 700; margin-bottom: 4px;">Office</h3>
                  <p style="color: var(--text-secondary); font-size: 14px;">Jaipur, Rajasthan, India</p>
                  <p style="color: var(--text-muted); font-size: 12px; margin-top: 4px;">Remote-first company</p>
                </div>
              </div>
            </div>
            <div class="glass-card reveal" style="padding: 28px;">
              <h3 style="font-size: 15px; font-weight: 700; margin-bottom: 12px;">🌐 Follow Us</h3>
              <div style="display: flex; gap: 10px;">
                <a href="#" class="btn btn-sm btn-secondary" onclick="event.preventDefault()" style="flex:1; justify-content:center;">Twitter</a>
                <a href="#" class="btn btn-sm btn-secondary" onclick="event.preventDefault()" style="flex:1; justify-content:center;">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <style>
      @media (max-width: 768px) {
        .contact-grid { grid-template-columns: 1fr !important; }
      }
    </style>
  `;
}

export async function init() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      window.showToast('Please fill in all required fields.', 'error');
      return;
    }

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      let EmailService;
      try {
        const mod = await import('../services/email.js');
        EmailService = mod.default;
      } catch (e) {
        console.warn('EmailJS not available:', e);
      }

      if (EmailService) {
        await EmailService.sendContactMessage({ name, email, subject, message });
      } else {
        // Fallback for demo
        console.log('Contact form submitted:', { name, email, subject, message });
        await new Promise(r => setTimeout(r, 800));
      }

      window.showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
      form.reset();
    } catch (err) {
      window.showToast(err.message || 'Failed to send message.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}
