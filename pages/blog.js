/* ════════════════════════════════════════════════════════════
   OmniTrace — Blog Page
   ════════════════════════════════════════════════════════════ */

export default function renderBlog() {
  const posts = [
    { title: 'How QR Codes Are Revolutionizing Inventory Management', excerpt: 'QR codes have evolved far beyond simple URLs. In 2025, they\'re the backbone of modern inventory tracking systems, enabling real-time visibility across supply chains.', category: 'Product', date: 'Dec 15, 2024', readTime: '5 min read', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop' },
    { title: '5 Signs Your Business Has Outgrown Spreadsheets', excerpt: 'Spreadsheets are great for starting out, but there comes a point when they become a liability. Here are the telltale signs it\'s time to upgrade.', category: 'Business', date: 'Dec 10, 2024', readTime: '4 min read', img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop' },
    { title: 'Building a Real-time Dashboard with Firebase', excerpt: 'A deep dive into how we built OmniTrace\'s real-time analytics dashboard using Firestore onSnapshot listeners and vanilla JavaScript.', category: 'Engineering', date: 'Dec 5, 2024', readTime: '8 min read', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop' },
    { title: 'The Complete Guide to Warehouse Organization', excerpt: 'From bin locations to zone picking, this comprehensive guide covers everything about organizing your warehouse for maximum efficiency.', category: 'Guide', date: 'Nov 28, 2024', readTime: '12 min read', img: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&h=400&fit=crop' },
    { title: 'Why We Chose Vanilla JS Over React', excerpt: 'In a world of frameworks, we made the unconventional choice to build OmniTrace with vanilla JavaScript. Here\'s why it was the best decision we made.', category: 'Engineering', date: 'Nov 20, 2024', readTime: '6 min read', img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop' },
    { title: 'Customer Story: How TechMart Cut Audit Time by 90%', excerpt: 'TechMart was spending 3 days on monthly inventory audits. After implementing OmniTrace, they reduced it to just 3 hours.', category: 'Customer Story', date: 'Nov 15, 2024', readTime: '5 min read', img: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=600&h=400&fit=crop' }
  ];

  return `
    <section class="section" style="padding-top: 120px;">
      <div class="container">
        <div class="text-center" style="margin-bottom: 64px;">
          <div class="hero-badge">📝 Blog</div>
          <h1 class="reveal" style="font-size: 42px; font-weight: 900; margin: 16px 0 12px;">Insights & <span class="text-gradient">updates</span></h1>
          <p class="reveal" style="color: var(--text-secondary); font-size: 17px; max-width: 560px; margin: 0 auto; line-height: 1.7;">Product updates, engineering deep-dives, and inventory management best practices.</p>
        </div>

        <div class="glass-card reveal" style="margin-bottom: 48px; padding: 0; overflow: hidden; display: grid; grid-template-columns: 1fr 1fr;" class="featured-post">
          <div style="background: url('${posts[0].img}') center/cover; min-height: 320px;"></div>
          <div style="padding: 40px; display: flex; flex-direction: column; justify-content: center;">
            <span class="badge badge-primary" style="width: fit-content; margin-bottom: 16px;">${posts[0].category}</span>
            <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 12px; line-height: 1.3;">${posts[0].title}</h2>
            <p style="color: var(--text-secondary); font-size: 15px; line-height: 1.7; margin-bottom: 20px;">${posts[0].excerpt}</p>
            <div style="display: flex; align-items: center; gap: 16px; font-size: 13px; color: var(--text-muted);">
              <span>${posts[0].date}</span><span>•</span><span>${posts[0].readTime}</span>
            </div>
          </div>
        </div>

        <div class="grid grid-3 stagger-children">
          ${posts.slice(1).map(p => `
            <article class="glass-card reveal" style="padding: 0; overflow: hidden; cursor: pointer; transition: all 0.35s ease;">
              <div style="height: 200px; background: url('${p.img}') center/cover;"></div>
              <div style="padding: 24px;">
                <span class="badge badge-primary" style="width: fit-content; margin-bottom: 12px;">${p.category}</span>
                <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 10px; line-height: 1.4;">${p.title}</h3>
                <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.6; margin-bottom: 16px;">${p.excerpt}</p>
                <div style="display: flex; align-items: center; gap: 12px; font-size: 12px; color: var(--text-muted);">
                  <span>${p.date}</span><span>•</span><span>${p.readTime}</span>
                </div>
              </div>
            </article>
          `).join('')}
        </div>

        <div class="glass-card reveal" style="margin-top: 64px; padding: 48px; text-align: center; max-width: 600px; margin-left: auto; margin-right: auto;">
          <h3 style="font-size: 22px; font-weight: 700; margin-bottom: 12px;">📬 Newsletter</h3>
          <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 24px;">Articles and updates delivered to your inbox.</p>
          <form id="news-form" style="display: flex; gap: 8px;">
            <input type="email" class="form-input" placeholder="you@example.com" required style="flex: 1;">
            <button type="submit" class="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
    <style>@media (max-width: 768px){.featured-post{grid-template-columns:1fr!important;}}</style>
  `;
}

export async function init() {
  document.getElementById('news-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    window.showToast('Subscribed! Check your inbox.', 'success');
    e.target.reset();
  });
}
