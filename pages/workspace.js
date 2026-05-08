/* ════════════════════════════════════════════════════════════
   OmniTrace — Workspace Page (Add Item + Real CRUD)
   ════════════════════════════════════════════════════════════ */

import Store from '../assets/js/store.js';
import { PLAN_LIMITS } from '../config/pricing.js';

export default function renderWorkspace() {
  return `
    <div class="dashboard-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">📦 Workspace</h1>
          <p class="page-subtitle">Manage your items and inventory</p>
        </div>
        <button class="btn btn-primary" id="btn-add-item">+ Add Item</button>
      </div>

      <div id="limit-banner" style="display: none; margin-bottom: 24px; padding: 12px 16px; background: rgba(245, 158, 11, 0.1); border: 1px solid var(--warning); border-radius: var(--radius-md); color: var(--warning); font-size: 14px; font-weight: 600;">
        ⚠️ You are nearing your plan's item limit. <a data-link href="/billing" style="text-decoration: underline;">Upgrade plan</a>
      </div>

      <div style="display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap;">
        <div class="search-bar" style="flex: 1; min-width: 240px;">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="Search items..." id="search-input">
        </div>
        <select class="form-input" id="filter-workspace" style="max-width: 200px;">
          <option value="">Select Workspace...</option>
        </select>
        <select class="form-input" id="filter-category" style="max-width: 180px;">
          <option value="">All Categories</option>
        </select>
      </div>

      <div class="glass-card" style="padding: 0; overflow: hidden; border: none;">
        <div id="items-container">
          <!-- Rendered via JS -->
        </div>
      </div>
    </div>

    <!-- Add/Edit Item Modal -->
    <div id="item-modal" class="modal-root"></div>
  `;
}

export async function init() {
  const user = Store.get('user');
  if (!user) return;

  let allItems = [];
  let userWorkspaces = [];
  let currentWsId = null;
  const plan = Store.get('plan') || 'free';
  const planLimit = PLAN_LIMITS[plan]?.products || 10;

  const container = document.getElementById('items-container');
  container.innerHTML = window.Skeleton.table(6);

  if (!window.OmniDB) {
    container.innerHTML = window.ErrorUI.render('Database not initialized.', 'window.location.reload()');
    return;
  }

  try {
    userWorkspaces = await window.OmniDB.getUserWorkspaces(user.uid);
    if (!userWorkspaces.length) {
      const newWs = await window.OmniDB.getOrCreateWorkspace(user.uid, user.name);
      if (newWs) userWorkspaces.push(newWs);
    }
    
    if (userWorkspaces.length > 0) {
      currentWsId = userWorkspaces[0].id;
      const wsSelect = document.getElementById('filter-workspace');
      wsSelect.innerHTML = userWorkspaces.map(ws => `<option value="${ws.id}">${escapeHtml(ws.name)}</option>`).join('');
      
      wsSelect.addEventListener('change', (e) => {
        currentWsId = e.target.value;
        setupItemsListener(currentWsId);
      });

      setupItemsListener(currentWsId);
    } else {
      container.innerHTML = window.ErrorUI.render('Could not load workspaces.', 'window.location.reload()');
    }
  } catch (err) {
    container.innerHTML = window.ErrorUI.render(err.message, 'window.location.reload()');
  }

  function setupItemsListener(wsId) {
    container.innerHTML = window.Skeleton.table(4);
    
    if (window._wsUnsubscribe) window._wsUnsubscribe();

    window._wsUnsubscribe = window.OmniDB.subscribeItems(wsId, (items) => {
      allItems = items;
      
      const banner = document.getElementById('limit-banner');
      if (planLimit !== Infinity && items.length >= planLimit * 0.8) {
        banner.style.display = 'block';
      } else {
        banner.style.display = 'none';
      }

      renderItems(allItems);
      updateCategoryFilter(allItems);
    }, (err) => {
      console.error('Items listener error:', err);
      container.innerHTML = window.ErrorUI.render('Failed to connect to workspace data. Check your network.', 'window.location.reload()');
    });

    if (window._currentUnsubscribes) {
      window._currentUnsubscribes.push(window._wsUnsubscribe);
    }
  }

  function renderItems(items) {
    if (items.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="padding: 60px;">
          <div class="empty-icon">📦</div>
          <p class="empty-title">No items found</p>
          <p class="empty-desc">Add your first item to get started.</p>
          <button class="btn btn-primary" onclick="document.getElementById('btn-add-item').click()">+ Add Item</button>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="table-wrapper" style="border:none;">
        <table class="data-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Qty</th>
              <th>Scans</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(i => `
              <tr>
                <td>
                  <strong style="color: var(--primary);">${escapeHtml(i.name)}</strong>
                  ${i.description ? `<br><span style="font-size:12px; color:var(--text-muted);">${escapeHtml(i.description).substring(0, 50)}</span>` : ''}
                </td>
                <td style="font-family: monospace; font-size: 12px;">${escapeHtml(i.sku || '—')}</td>
                <td>${escapeHtml(i.category || '—')}</td>
                <td><span class="badge ${i.quantity <= 0 ? 'badge-danger' : 'badge-success'}">${i.quantity || 0}</span></td>
                <td>${i.scanCount || 0}</td>
                <td>
                  <div style="display: flex; gap: 6px;">
                    <button class="btn btn-sm btn-secondary" onclick="window._editItem('${i.id}')">✏️</button>
                    <button class="btn btn-sm btn-secondary" style="color:var(--danger);" onclick="window._deleteItem('${i.id}', '${escapeHtml(i.name).replace(/'/g, "\\'")}')">🗑️</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function updateCategoryFilter(items) {
    const select = document.getElementById('filter-category');
    const categories = [...new Set(items.map(i => i.category).filter(Boolean))];
    select.innerHTML = '<option value="">All Categories</option>' +
      categories.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
  }

  // Search
  document.getElementById('search-input')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const filtered = allItems.filter(i =>
      i.name.toLowerCase().includes(q) ||
      (i.sku || '').toLowerCase().includes(q) ||
      (i.category || '').toLowerCase().includes(q)
    );
    renderItems(filtered);
  });

  // Filter Category
  document.getElementById('filter-category')?.addEventListener('change', (e) => {
    const cat = e.target.value;
    renderItems(cat ? allItems.filter(i => i.category === cat) : allItems);
  });

  // Add Item
  document.getElementById('btn-add-item')?.addEventListener('click', () => {
    if (allItems.length >= planLimit) {
      window.showModal('Limit Reached', `You have reached the ${planLimit} item limit on your current plan. Please upgrade to add more.`, [`<a class="btn btn-primary" data-link href="/billing">Upgrade Plan</a>`]);
      return;
    }
    showItemModal(null);
  });

  window._editItem = (id) => {
    const item = allItems.find(i => i.id === id);
    if (item) showItemModal(item);
  };

  window._deleteItem = async (id, name) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await window.OmniDB.deleteItem(id, name, currentWsId);
      window.showToast('Item deleted.', 'success');
    } catch (err) {
      window.showToast(err.message, 'error');
    }
  };

  function showItemModal(item) {
    const modal = document.getElementById('item-modal');
    const isEdit = !!item;

    modal.innerHTML = `
      <div class="modal-overlay" id="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">${isEdit ? 'Edit Item' : 'Add New Item'}</h3>
            <button class="modal-close" id="modal-close">✕</button>
          </div>
          <form id="item-form">
            <div id="modal-error" style="display:none; color:var(--danger); font-size:13px; background:rgba(239,68,68,0.1); padding:10px; border-radius:var(--radius-sm); margin-bottom:16px;"></div>
            
            <div class="form-group">
              <label class="form-label">Item Name *</label>
              <input type="text" class="form-input" id="i-name" value="${isEdit ? escapeHtml(item.name) : ''}" required placeholder="e.g. Wireless Mouse">
            </div>
            
            <div class="form-group">
              <label class="form-label">Description</label>
              <textarea class="form-input" id="i-desc" rows="2" placeholder="Brief description...">${isEdit ? escapeHtml(item.description || '') : ''}</textarea>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label class="form-label">Category</label>
                <input type="text" class="form-input" id="i-cat" value="${isEdit ? escapeHtml(item.category || '') : ''}" placeholder="Electronics">
              </div>
              <div class="form-group">
                <label class="form-label">Quantity *</label>
                <input type="number" class="form-input" id="i-qty" value="${isEdit ? item.quantity || 0 : 1}" min="0" required>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Tags (comma separated)</label>
              <input type="text" class="form-input" id="i-tags" value="${isEdit ? escapeHtml((item.tags || []).join(', ')) : ''}" placeholder="urgent, fragile, batch-A">
            </div>

            <div class="form-group">
              <label class="form-label">Image URL</label>
              <input type="url" class="form-input" id="i-image" value="${isEdit ? escapeHtml(item.imageUrl || '') : ''}" placeholder="https://...">
            </div>

            <div class="form-group">
              <label class="form-label">Workspace *</label>
              <select class="form-input" id="i-workspace" required ${isEdit ? 'disabled' : ''}>
                ${userWorkspaces.map(ws => `<option value="${ws.id}" ${currentWsId === ws.id ? 'selected' : ''}>${escapeHtml(ws.name)}</option>`).join('')}
              </select>
            </div>

            <div style="display: flex; gap: 12px; margin-top: 16px;">
              <button type="submit" class="btn btn-primary" style="flex:1;" id="item-submit">
                ${isEdit ? 'Update Item' : 'Save Item'}
              </button>
              <button type="button" class="btn btn-secondary" id="modal-cancel">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    `;

    modal.classList.add('active');

    const closeModal = () => { modal.classList.remove('active'); modal.innerHTML = ''; };
    document.getElementById('modal-close')?.addEventListener('click', closeModal);
    document.getElementById('modal-cancel')?.addEventListener('click', closeModal);
    document.getElementById('modal-overlay')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeModal(); });

    document.getElementById('item-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('item-submit');
      const errDiv = document.getElementById('modal-error');
      errDiv.style.display = 'none';

      const qty = parseInt(document.getElementById('i-qty').value);
      if (qty < 0) {
        errDiv.textContent = 'Quantity must be 0 or greater.';
        errDiv.style.display = 'block';
        return;
      }

      const tagsRaw = document.getElementById('i-tags').value;
      const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(t => t) : [];
      const targetWsId = document.getElementById('i-workspace').value;

      const data = {
        name: document.getElementById('i-name').value.trim(),
        description: document.getElementById('i-desc').value.trim(),
        category: document.getElementById('i-cat').value.trim() || 'Uncategorized',
        quantity: qty,
        tags,
        imageUrl: document.getElementById('i-image').value.trim(),
      };

      try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Saving...';

        if (isEdit) {
          await window.OmniDB.updateItem(item.id, targetWsId, data);
          window.showToast('Item updated!', 'success');
        } else {
          await window.OmniDB.createItem(data, targetWsId);
          window.showToast('Item created successfully!', 'success');
        }
        closeModal();
        // Since we have an active onSnapshot listener on the workspace, 
        // the table will automatically update without a manual refresh call.
      } catch (err) {
        errDiv.textContent = err.message;
        errDiv.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = isEdit ? 'Update Item' : 'Save Item';
      }
    });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
