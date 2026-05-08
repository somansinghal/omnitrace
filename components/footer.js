/* ════════════════════════════════════════════════════════════
   OmniTrace — Premium Footer (Investor-Grade, Dark Themed)
   ════════════════════════════════════════════════════════════ */

export default function renderFooter() {
  return `
    <div class="footer-inner">
      <div class="footer-grid">
        <!-- Brand Column -->
        <div class="footer-col footer-brand-col">
          <a class="header-logo" data-link href="/" style="margin-bottom: 12px;">
            <div class="logo-icon" style="width:34px;height:34px;">📦</div>
            <span style="font-weight:800;font-size:18px;">Omni<span class="text-gradient">Trace</span></span>
          </a>
          <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.7; margin: 0; max-width: 260px;">
            Smart QR-powered inventory tracking for modern teams. Track every item, verify every scan.
          </p>
        </div>

        <!-- Product -->
        <div class="footer-col">
          <h4 class="footer-heading">Product</h4>
          <a data-link href="/features">Features</a>
          <a data-link href="/pricing">Pricing</a>
          <a data-link href="/demo">Live Demo</a>
          <a data-link href="/docs">Documentation</a>
        </div>

        <!-- Company -->
        <div class="footer-col">
          <h4 class="footer-heading">Company</h4>
          <a data-link href="/about">About</a>
          <a data-link href="/team">Team</a>
          <a data-link href="/blog">Blog</a>
          <a data-link href="/contact">Contact</a>
        </div>

        <!-- Resources -->
        <div class="footer-col">
          <h4 class="footer-heading">Resources</h4>
          <a data-link href="/help">Help Center</a>
          <a data-link href="/api">API Reference</a>
          <a data-link href="/privacy">Privacy Policy</a>
          <a data-link href="/terms">Terms of Service</a>
        </div>

        <!-- Social -->
        <div class="footer-col">
          <h4 class="footer-heading">Social</h4>
          <div style="display: flex; gap: 8px; margin-top: 6px;">
            <a class="social-icon-btn linkedin" href="https://linkedin.com/company/omnitrace" target="_blank" rel="noopener noreferrer" data-tooltip="LinkedIn" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a class="social-icon-btn instagram" href="https://instagram.com/omnitrace" target="_blank" rel="noopener noreferrer" data-tooltip="Instagram" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a class="social-icon-btn twitter" href="https://x.com/omnitrace" target="_blank" rel="noopener noreferrer" data-tooltip="X (Twitter)" aria-label="X">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
          <a href="mailto:hello@omnitrace.app" rel="noopener" style="margin-top: 14px; font-size: 12px;">hello@omnitrace.app</a>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <p style="margin: 0;">&copy; ${new Date().getFullYear()} OmniTrace. All rights reserved.</p>
        <div style="display: flex; gap: 16px;">
          <a data-link href="/privacy" style="font-size: 12px; color: var(--text-muted);">Privacy</a>
          <a data-link href="/terms" style="font-size: 12px; color: var(--text-muted);">Terms</a>
          <a data-link href="/cookies" style="font-size: 12px; color: var(--text-muted);">Cookies</a>
        </div>
      </div>
    </div>

    <style>
      .footer-outer { background: var(--bg-secondary); border-top: 1px solid var(--border-color); padding: 56px 0 20px; }
      @media (min-width: 768px) { .footer-outer { padding: 72px 0 24px; } }
      .footer-inner { max-width: var(--max-w); margin: 0 auto; padding: 0 20px; }
      @media (min-width: 768px) { .footer-inner { padding: 0 32px; } }

      .footer-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 32px 24px;
        margin-bottom: 40px;
      }
      @media (min-width: 640px) { .footer-grid { grid-template-columns: 1fr 1fr 1fr; } }
      @media (min-width: 1024px) { .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 36px; } }

      .footer-heading {
        font-size: 13px;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 14px;
        text-transform: none;
        letter-spacing: -0.2px;
      }
      .footer-col { display: flex; flex-direction: column; }
      .footer-col a {
        display: block;
        font-size: 13px;
        color: var(--text-secondary);
        padding: 4px 0;
        transition: color 0.2s;
        line-height: 1.8;
      }
      .footer-col a:hover { color: var(--primary); }

      .footer-bottom {
        border-top: 1px solid var(--border-color);
        padding-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 10px;
        font-size: 12px;
        color: var(--text-muted);
      }
    </style>
  `;
}
