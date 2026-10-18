// ==========================================================================
// Meer Dada - Haute Horlogerie Admin Panel Engine
// ==========================================================================

let currentOrderStatusFilter = "All";
let editingProductId = null;

document.addEventListener("DOMContentLoaded", () => {
  initDashboardMetrics();
  renderOrdersTable();
  renderProductsTable();
  renderCategoryAnalytics();
  setupSidebarNavigation();
  setupModals();
  setupProductForm();
  setupResetDataButton();
});

/* ==========================================================================
   1. Dashboard Metrics Calculations
   ========================================================================== */
function initDashboardMetrics() {
  const orders = getOrders();
  const products = getProducts();

  // Total Revenue
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);
  const revenueEl = document.getElementById("metricRevenue");
  if (revenueEl) revenueEl.textContent = formatPrice(totalRevenue);

  // Total Orders
  const ordersEl = document.getElementById("metricOrders");
  if (ordersEl) ordersEl.textContent = orders.length;

  // Active Catalog Count
  const productsEl = document.getElementById("metricProducts");
  if (productsEl) productsEl.textContent = products.length;

  // Low Stock Items (Stock <= 6)
  const lowStockCount = products.filter((p) => (p.stockCount || 0) <= 6).length;
  const lowStockEl = document.getElementById("metricLowStock");
  if (lowStockEl) lowStockEl.textContent = lowStockCount;
}

/* ==========================================================================
   2. Sidebar Navigation Tabs
   ========================================================================== */
function setupSidebarNavigation() {
  const navButtons = document.querySelectorAll(".admin-nav-item button");
  const sections = document.querySelectorAll(".admin-view-section");

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      navButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const targetSectionId = btn.dataset.target;
      sections.forEach((sec) => {
        sec.style.display = sec.id === targetSectionId ? "block" : "none";
      });
    });
  });
}

/* ==========================================================================
   3. Orders Management Table
   ========================================================================== */
function renderOrdersTable() {
  const tableBody = document.getElementById("ordersTableBody");
  if (!tableBody) return;

  const orders = getOrders();
  const searchInput = document.getElementById("orderSearchInput");
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

  let filtered = orders.filter((order) => {
    const matchesStatus =
      currentOrderStatusFilter === "All" || order.status === currentOrderStatusFilter;
    const matchesQuery =
      order.id.toLowerCase().includes(query) ||
      (order.customer?.name || "").toLowerCase().includes(query) ||
      (order.customer?.city || "").toLowerCase().includes(query);
    return matchesStatus && matchesQuery;
  });

  if (filtered.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center; padding: 2.5rem; color: var(--text-dim);">
          No orders match the current criteria.
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = filtered
    .map((order) => {
      const itemsList = order.items.map((i) => `${i.name} (×${i.quantity})`).join(", ");
      return `
      <tr>
        <td>
          <strong style="color:var(--gold-light); font-family:var(--font-serif);">${order.id}</strong>
        </td>
        <td>
          <div><strong>${order.customer?.name || "Client"}</strong></div>
          <small style="color:var(--text-dim);">${order.customer?.city || "Pakistan"}</small>
        </td>
        <td style="max-width: 220px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${itemsList}">
          ${itemsList}
        </td>
        <td>
          <span style="font-family:var(--font-serif); font-weight:600; color:#fff;">
            ${formatPrice(order.totalAmount)}
          </span>
        </td>
        <td>
          <small style="color:var(--text-dim);">${order.date}</small>
        </td>
        <td>
          <select class="status-select-dropdown" onchange="updateOrderStatus('${order.id}', this.value)">
            <option value="Pending" ${order.status === "Pending" ? "selected" : ""}>Pending</option>
            <option value="Processing" ${order.status === "Processing" ? "selected" : ""}>Processing</option>
            <option value="Dispatched" ${order.status === "Dispatched" ? "selected" : ""}>Dispatched</option>
            <option value="Delivered" ${order.status === "Delivered" ? "selected" : ""}>Delivered</option>
          </select>
        </td>
        <td>
          <div class="table-action-btns">
            <button class="btn-icon-action" onclick="viewOrderDetails('${order.id}')" title="View Order Dossier">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
            <button class="btn-icon-action delete" onclick="deleteOrder('${order.id}')" title="Remove Record">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </td>
      </tr>
    `;
    })
    .join("");
}

function filterOrdersByStatus(status, buttonEl) {
  currentOrderStatusFilter = status;
  document.querySelectorAll(".status-tab-btn").forEach((btn) => btn.classList.remove("active"));
  if (buttonEl) buttonEl.classList.add("active");
  renderOrdersTable();
}

function updateOrderStatus(orderId, newStatus) {
  let orders = getOrders();
  const order = orders.find((o) => o.id === orderId);
  if (!order) return;

  order.status = newStatus;
  saveOrders(orders);
  renderOrdersTable();
  initDashboardMetrics();
  showToast(`Order ${orderId} marked as ${newStatus}.`, "success");
}

function deleteOrder(orderId) {
  if (!confirm(`Are you certain you wish to delete order record ${orderId}?`)) return;

  let orders = getOrders();
  orders = orders.filter((o) => o.id !== orderId);
  saveOrders(orders);
  renderOrdersTable();
  initDashboardMetrics();
  showToast(`Order ${orderId} removed.`, "info");
}

function viewOrderDetails(orderId) {
  const orders = getOrders();
  const order = orders.find((o) => o.id === orderId);
  if (!order) return;

  const modal = document.getElementById("orderDetailModal");
  const modalBody = document.getElementById("orderDetailModalBody");
  const backdrop = document.getElementById("adminModalBackdrop");

  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div style="padding: 2rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-subtle); padding-bottom:1rem; margin-bottom:1.5rem;">
        <div>
          <span style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.15em; color:var(--gold-light);">Meer Dada Order Dossier</span>
          <h2 style="font-family:var(--font-serif); color:#fff; font-size:1.6rem; margin-top:0.2rem;">${order.id}</h2>
        </div>
        <span class="status-pill ${order.status.toLowerCase()}">${order.status}</span>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1.5rem; margin-bottom:1.8rem; background:rgba(255,255,255,0.02); padding:1.2rem; border-radius:12px; border:1px solid var(--border-subtle);">
        <div>
          <h4 style="font-size:0.75rem; color:var(--text-dim); text-transform:uppercase; margin-bottom:0.4rem;">Customer Information</h4>
          <p style="color:#fff; font-weight:600;">${order.customer?.name}</p>
          <p style="font-size:0.85rem; color:var(--text-muted);">${order.customer?.email}</p>
          <p style="font-size:0.85rem; color:var(--text-muted);">${order.customer?.phone}</p>
        </div>
        <div>
          <h4 style="font-size:0.75rem; color:var(--text-dim); text-transform:uppercase; margin-bottom:0.4rem;">Delivery Address</h4>
          <p style="font-size:0.88rem; color:#fff;">${order.customer?.address}</p>
          <p style="font-size:0.88rem; color:var(--gold-light); font-weight:600;">${order.customer?.city}, Pakistan</p>
          <p style="font-size:0.75rem; color:var(--text-dim); margin-top:0.5rem;">Payment: ${order.paymentMethod}</p>
        </div>
      </div>

      <h4 style="font-size:0.85rem; text-transform:uppercase; letter-spacing:0.1em; color:var(--gold-light); margin-bottom:0.8rem;">
        Timepieces Ordered
      </h4>
      <div style="border: 1px solid var(--border-subtle); border-radius:10px; overflow:hidden; margin-bottom:1.5rem;">
        ${order.items
          .map(
            (item) => `
          <div style="display:flex; justify-content:space-between; align-items:center; padding:0.9rem 1.2rem; border-bottom:1px solid rgba(255,255,255,0.04); background:rgba(0,0,0,0.2);">
            <div>
              <div style="color:#fff; font-weight:600; font-size:0.92rem;">${item.name}</div>
              <small style="color:var(--text-dim);">Quantity: ${item.quantity}</small>
            </div>
            <div style="font-family:var(--font-serif); color:var(--gold-light); font-weight:600;">
              ${formatPrice(item.price * item.quantity)}
            </div>
          </div>
        `
          )
          .join("")}
        <div style="display:flex; justify-content:space-between; padding:1.2rem; background:rgba(197,160,89,0.06); font-weight:700;">
          <span style="color:#fff;">Grand Total:</span>
          <span style="font-family:var(--font-serif); color:var(--gold-light); font-size:1.25rem;">${formatPrice(order.totalAmount)}</span>
        </div>
      </div>

      ${
        order.notes
          ? `
        <div style="background:rgba(0,0,0,0.3); border-radius:8px; padding:0.8rem 1.2rem; border-left:3px solid var(--gold-primary);">
          <small style="color:var(--gold-light); font-weight:600; text-transform:uppercase; display:block; margin-bottom:0.2rem;">Special Instructions:</small>
          <p style="font-size:0.85rem; color:var(--text-muted);">${order.notes}</p>
        </div>
      `
          : ""
      }
    </div>
  `;

  modal.classList.add("active");
  backdrop.classList.add("active");
}

/* ==========================================================================
   4. Product Catalog Management Table
   ========================================================================== */
function renderProductsTable() {
  const tableBody = document.getElementById("productsTableBody");
  if (!tableBody) return;

  const products = getProducts();
  const searchInput = document.getElementById("productSearchInput");
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.id.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center; padding: 2.5rem; color: var(--text-dim);">
          No timepieces match the search.
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = filtered
    .map(
      (prod) => `
    <tr>
      <td>
        <div class="product-cell">
          <img src="${prod.image}" alt="${prod.name}" class="product-thumbnail-img">
          <div>
            <strong style="color:#fff;">${prod.name}</strong>
            <div style="font-size:0.75rem; color:var(--text-dim);">${prod.id}</div>
          </div>
        </div>
      </td>
      <td>
        <span class="status-pill" style="background:rgba(255,255,255,0.05); color:var(--gold-light); border:1px solid var(--gold-border);">
          ${prod.category}
        </span>
      </td>
      <td>
        <span style="font-family:var(--font-serif); font-weight:600; color:var(--gold-light);">
          ${formatPrice(prod.price)}
        </span>
      </td>
      <td>
        <strong>${prod.stockCount || 0} units</strong>
      </td>
      <td>
        ${
          (prod.stockCount || 0) <= 6
            ? `<span class="status-pill pending">Low Stock</span>`
            : `<span class="status-pill delivered">In Stock</span>`
        }
      </td>
      <td>
        <div class="table-action-btns">
          <button class="btn-icon-action" onclick="openEditProductModal('${prod.id}')" title="Edit Timepiece">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button class="btn-icon-action delete" onclick="deleteProduct('${prod.id}')" title="Delete Timepiece">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  `
    )
    .join("");
}

function openAddProductModal() {
  editingProductId = null;
  const modal = document.getElementById("productModal");
  const form = document.getElementById("productForm");
  const title = document.getElementById("productModalTitle");
  const backdrop = document.getElementById("adminModalBackdrop");
  const imgPreview = document.getElementById("productImagePreview");

  if (form) form.reset();
  if (title) title.textContent = "Craft New Timepiece";
  if (imgPreview) imgPreview.src = "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=900&auto=format&fit=crop";

  if (modal) modal.classList.add("active");
  if (backdrop) backdrop.classList.add("active");
}

function openEditProductModal(productId) {
  editingProductId = productId;
  const products = getProducts();
  const prod = products.find((p) => p.id === productId);
  if (!prod) return;

  const modal = document.getElementById("productModal");
  const title = document.getElementById("productModalTitle");
  const backdrop = document.getElementById("adminModalBackdrop");

  if (title) title.textContent = `Modify Timepiece: ${prod.name}`;

  document.getElementById("prodName").value = prod.name;
  document.getElementById("prodSubtitle").value = prod.subtitle || "";
  document.getElementById("prodCategory").value = prod.category;
  document.getElementById("prodPrice").value = prod.price;
  document.getElementById("prodOldPrice").value = prod.oldPrice || "";
  document.getElementById("prodStock").value = prod.stockCount || 10;
  document.getElementById("prodBadge").value = prod.badge || "";
  document.getElementById("prodImage").value = prod.image;
  document.getElementById("prodDesc").value = prod.description || "";

  document.getElementById("prodMovement").value = prod.specs?.movement || "";
  document.getElementById("prodCase").value = prod.specs?.case || "";
  document.getElementById("prodGlass").value = prod.specs?.glass || "";
  document.getElementById("prodWater").value = prod.specs?.waterResistance || "";
  document.getElementById("prodReserve").value = prod.specs?.powerReserve || "";
  document.getElementById("prodStrap").value = prod.specs?.strap || "";

  const imgPreview = document.getElementById("productImagePreview");
  if (imgPreview) imgPreview.src = prod.image;

  if (modal) modal.classList.add("active");
  if (backdrop) backdrop.classList.add("active");
}

function deleteProduct(productId) {
  if (!confirm("Are you sure you want to remove this masterpiece from the catalog?")) return;

  let products = getProducts();
  products = products.filter((p) => p.id !== productId);
  saveProducts(products);
  renderProductsTable();
  renderCategoryAnalytics();
  initDashboardMetrics();
  showToast("Timepiece removed from catalog.", "info");
}

function setupProductForm() {
  const form = document.getElementById("productForm");
  const imgInput = document.getElementById("prodImage");
  const imgPreview = document.getElementById("productImagePreview");

  if (imgInput && imgPreview) {
    imgInput.addEventListener("input", (e) => {
      const url = e.target.value.trim();
      if (url) imgPreview.src = url;
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("prodName").value.trim();
      const subtitle = document.getElementById("prodSubtitle").value.trim();
      const category = document.getElementById("prodCategory").value;
      const price = Number(document.getElementById("prodPrice").value);
      const oldPrice = Number(document.getElementById("prodOldPrice").value) || null;
      const stock = Number(document.getElementById("prodStock").value);
      const badge = document.getElementById("prodBadge").value.trim();
      const image = document.getElementById("prodImage").value.trim();
      const desc = document.getElementById("prodDesc").value.trim();

      const specs = {
        movement: document.getElementById("prodMovement").value.trim() || "Meer Dada Automatic Calibre",
        case: document.getElementById("prodCase").value.trim() || "42mm 316L Stainless Steel",
        glass: document.getElementById("prodGlass").value.trim() || "Sapphire Crystal AR-Coated",
        waterResistance: document.getElementById("prodWater").value.trim() || "100M / 10 ATM",
        powerReserve: document.getElementById("prodReserve").value.trim() || "48 Hours",
        strap: document.getElementById("prodStrap").value.trim() || "Handcrafted Alligator Leather"
      };

      let products = getProducts();

      if (editingProductId) {
        // Edit existing product
        const index = products.findIndex((p) => p.id === editingProductId);
        if (index !== -1) {
          products[index] = {
            ...products[index],
            name,
            subtitle,
            category,
            price,
            oldPrice,
            stockCount: stock,
            badge,
            image,
            description: desc,
            specs
          };
          showToast(`"${name}" updated successfully.`, "success");
        }
      } else {
        // Add new product
        const newId = `MD-${String(products.length + 1).padStart(3, "0")}`;
        const newProduct = {
          id: newId,
          name,
          subtitle,
          category,
          price,
          oldPrice,
          rating: 5.0,
          reviewsCount: 1,
          badge: badge || "New Arrival",
          image: image || "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=900&auto=format&fit=crop",
          featured: true,
          inStock: true,
          stockCount: stock,
          description: desc,
          specs
        };
        products.unshift(newProduct);
        showToast(`New timepiece "${name}" crafted and published!`, "success");
      }

      saveProducts(products);
      renderProductsTable();
      renderCategoryAnalytics();
      initDashboardMetrics();
      closeAllAdminModals();
    });
  }
}

/* ==========================================================================
   5. Analytics & Visual Breakdown
   ========================================================================== */
function renderCategoryAnalytics() {
  const container = document.getElementById("categoryAnalyticsList");
  if (!container) return;

  const products = getProducts();
  const counts = {};
  products.forEach((p) => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });

  const categories = Object.keys(counts);
  const total = products.length || 1;

  container.innerHTML = categories
    .map((cat) => {
      const count = counts[cat];
      const pct = Math.round((count / total) * 100);
      return `
      <div class="category-stat-row">
        <div class="category-stat-header">
          <span style="color:#fff; font-weight:600;">${cat}</span>
          <span style="color:var(--gold-light); font-weight:700;">${count} Pieces (${pct}%)</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${pct}%;"></div>
        </div>
      </div>
    `;
    })
    .join("");
}

/* ==========================================================================
   6. Modals & Demo Data Reset
   ========================================================================== */
function setupModals() {
  const backdrop = document.getElementById("adminModalBackdrop");
  const closeBtns = document.querySelectorAll(".admin-modal-close");

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", closeAllAdminModals);
  });

  if (backdrop) {
    backdrop.addEventListener("click", closeAllAdminModals);
  }
}

function closeAllAdminModals() {
  document.querySelectorAll(".modal-window").forEach((m) => m.classList.remove("active"));
  const backdrop = document.getElementById("adminModalBackdrop");
  if (backdrop) backdrop.classList.remove("active");
}

function setupResetDataButton() {
  const resetBtn = document.getElementById("btnResetDemoData");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Reset catalog and orders to default factory configuration? Any custom orders or products will be refreshed.")) {
        resetAllData();
        initDashboardMetrics();
        renderOrdersTable();
        renderProductsTable();
        renderCategoryAnalytics();
        showToast("Demo data refreshed successfully.", "success");
      }
    });
  }
}
