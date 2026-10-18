// ==========================================================================
// Meer Dada - Storefront Core Application
// ==========================================================================

let currentCategory = "All";
let searchQuery = "";
let currentSort = "featured";
let appliedDiscount = 0; // percentage

document.addEventListener("DOMContentLoaded", () => {
  renderCatalog();
  setupFilterPills();
  setupSearchAndSort();
  updateCartBadge();
  setupCartDrawer();
  setupModals();
  setupConciergeForm();
  setupMobileMenu();
});

function setupMobileMenu() {
  const toggleBtn = document.getElementById("mobileMenuToggle");
  const navLinks = document.querySelector(".nav-links");
  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("mobile-open");
    });
  });
}

/* ==========================================================================
   Catalog Rendering & Filtering
   ========================================================================== */
function renderCatalog() {
  const productsContainer = document.getElementById("productsGrid");
  if (!productsContainer) return;

  const products = getProducts();

  let filtered = products.filter((item) => {
    const matchesCategory =
      currentCategory === "All" || item.category === currentCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sorting
  if (currentSort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else {
    // featured
    filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  if (filtered.length === 0) {
    productsContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
        <p style="font-size: 1.2rem; color: var(--text-muted); margin-bottom: 1rem;">
          No timepieces found matching your criteria.
        </p>
        <button class="btn btn-gold-outline btn-sm" onclick="resetFilters()">
          Reset Search Filters
        </button>
      </div>
    `;
    return;
  }

  const wishlist = getWishlist();

  productsContainer.innerHTML = filtered
    .map((watch) => {
      const isWishlisted = wishlist.includes(watch.id);
      return `
      <article class="product-card" data-id="${watch.id}">
        <div class="product-card-top">
          <span class="product-badge">${watch.badge || watch.category}</span>
          <button class="product-wishlist-btn ${isWishlisted ? "active" : ""}" 
                  onclick="toggleWishlist('${watch.id}')" 
                  title="Save to Wishlist" aria-label="Save to Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? "#ef4444" : "none"}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          
          <img src="${watch.image}" alt="${watch.name}" class="product-card-img" loading="lazy">
          
          <button class="quick-view-overlay-btn" onclick="openQuickView('${watch.id}')">
            Quick Specifications
          </button>
        </div>

        <div class="product-card-body">
          <span class="product-category-tag">${watch.category}</span>
          <h3 class="product-name">${watch.name}</h3>
          <p class="product-subtitle">${watch.subtitle}</p>
          
          <div class="product-rating">
            <span class="stars">★★★★★</span>
            <span>(${watch.rating.toFixed(1)}) · ${watch.reviewsCount} reviews</span>
          </div>

          <div class="product-price-row">
            <div class="price-box">
              <span class="current-price">${formatPrice(watch.price)}</span>
              ${watch.oldPrice ? `<span class="old-price">${formatPrice(watch.oldPrice)}</span>` : ""}
            </div>

            <button class="btn btn-add-to-cart" id="btn-add-${watch.id}" onclick="handleAddToCart('${watch.id}', this)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span>Acquire</span>
            </button>
          </div>
        </div>
      </article>
    `;
    })
    .join("");
}

function resetFilters() {
  currentCategory = "All";
  searchQuery = "";
  const searchInput = document.getElementById("catalogSearch");
  if (searchInput) searchInput.value = "";
  
  document.querySelectorAll(".filter-pill").forEach((pill) => {
    pill.classList.toggle("active", pill.dataset.category === "All");
  });
  
  renderCatalog();
}

function setupFilterPills() {
  const pills = document.querySelectorAll(".filter-pill");
  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      currentCategory = pill.dataset.category;
      renderCatalog();
    });
  });
}

function setupSearchAndSort() {
  const searchInput = document.getElementById("catalogSearch");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      renderCatalog();
    });
  }

  const sortSelect = document.getElementById("catalogSort");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      renderCatalog();
    });
  }
}

/* ==========================================================================
   Shopping Cart Management
   ========================================================================== */
function setupCartDrawer() {
  const cartBtn = document.getElementById("cartToggleBtn");
  const cartDrawer = document.getElementById("cartDrawer");
  const drawerBackdrop = document.getElementById("drawerBackdrop");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const continueShoppingBtn = document.getElementById("continueShoppingBtn");

  const openDrawer = () => {
    renderCartItems();
    cartDrawer.classList.add("active");
    drawerBackdrop.classList.add("active");
  };

  const closeDrawer = () => {
    cartDrawer.classList.remove("active");
    drawerBackdrop.classList.remove("active");
  };

  if (cartBtn) cartBtn.addEventListener("click", openDrawer);
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener("click", closeDrawer);
  if (continueShoppingBtn) continueShoppingBtn.addEventListener("click", closeDrawer);

  // Promo Code Handler
  const applyPromoBtn = document.getElementById("applyPromoBtn");
  if (applyPromoBtn) {
    applyPromoBtn.addEventListener("click", () => {
      const codeInput = document.getElementById("promoCodeInput");
      const val = codeInput ? codeInput.value.trim().toUpperCase() : "";
      if (val === "MEER10") {
        appliedDiscount = 0.1;
        showToast("Concession Applied: 10% VIP Privilege Code honored!", "success");
        renderCartItems();
      } else if (val === "") {
        showToast("Please enter a promo code", "warning");
      } else {
        showToast("Invalid promo code. Use code 'MEER10'", "danger");
      }
    });
  }
}

function handleAddToCart(productId, buttonElement) {
  const products = getProducts();
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: 1
    });
  }

  saveCart(cart);
  updateCartBadge();

  // Button micro-interaction animation
  if (buttonElement) {
    const originalContent = buttonElement.innerHTML;
    buttonElement.classList.add("animating");
    buttonElement.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>Added</span>
    `;

    setTimeout(() => {
      buttonElement.classList.remove("animating");
      buttonElement.innerHTML = originalContent;
    }, 1400);
  }

  showToast(`"${product.name}" added to your Private Box.`, "success");
}

function updateCartBadge() {
  const cart = getCart();
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const badge = document.getElementById("cartCountBadge");
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  }
}

function renderCartItems() {
  const container = document.getElementById("cartItemsList");
  const subtotalEl = document.getElementById("cartSubtotal");
  const discountEl = document.getElementById("cartDiscount");
  const totalEl = document.getElementById("cartTotal");
  const checkoutBtn = document.getElementById("proceedToCheckoutBtn");

  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-message">
        <div class="cart-empty-icon">⌚</div>
        <h4 style="color:#fff; margin-bottom: 0.5rem; font-family:var(--font-serif)">Your Box is Empty</h4>
        <p style="font-size:0.85rem;">Discover our master timepieces and begin your collection.</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = formatPrice(0);
    if (discountEl) discountEl.textContent = formatPrice(0);
    if (totalEl) totalEl.textContent = formatPrice(0);
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  if (checkoutBtn) checkoutBtn.disabled = false;

  let subtotal = 0;

  container.innerHTML = cart
    .map((item) => {
      const lineTotal = item.price * item.quantity;
      subtotal += lineTotal;
      return `
      <div class="cart-item-card">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h4 class="cart-item-name">${item.name}</h4>
          <div class="cart-item-price">${formatPrice(item.price)}</div>
          
          <div class="cart-quantity-controls">
            <button class="qty-btn" onclick="updateItemQuantity('${item.id}', -1)">-</button>
            <span class="qty-number">${item.quantity}</span>
            <button class="qty-btn" onclick="updateItemQuantity('${item.id}', 1)">+</button>
            <button class="cart-remove-item" onclick="removeCartItem('${item.id}')" title="Remove item" style="margin-left: auto;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
    })
    .join("");

  const discountAmount = subtotal * appliedDiscount;
  const finalTotal = subtotal - discountAmount;

  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (discountEl) discountEl.textContent = appliedDiscount > 0 ? `- ${formatPrice(discountAmount)} (10%)` : formatPrice(0);
  if (totalEl) totalEl.textContent = formatPrice(finalTotal);
}

function updateItemQuantity(id, delta) {
  let cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter((i) => i.id !== id);
  }

  saveCart(cart);
  updateCartBadge();
  renderCartItems();
}

function removeCartItem(id) {
  let cart = getCart();
  cart = cart.filter((i) => i.id !== id);
  saveCart(cart);
  updateCartBadge();
  renderCartItems();
  showToast("Timepiece removed from Box.", "info");
}

/* ==========================================================================
   Quick View Modal
   ========================================================================== */
function openQuickView(productId) {
  const products = getProducts();
  const watch = products.find((p) => p.id === productId);
  if (!watch) return;

  const modal = document.getElementById("quickViewModal");
  const modalBody = document.getElementById("quickViewModalBody");
  const backdrop = document.getElementById("modalBackdrop");

  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div class="quickview-container">
      <div class="quickview-image-wrap">
        <img src="${watch.image}" alt="${watch.name}">
      </div>
      <div class="quickview-info-wrap">
        <span class="product-category-tag">${watch.category} · ${watch.badge || "Exquisite"}</span>
        <h2 style="font-size: 1.8rem; margin: 0.4rem 0; color: #fff;">${watch.name}</h2>
        <p style="color: var(--text-dim); font-size: 0.9rem; margin-bottom: 1rem;">${watch.subtitle}</p>
        
        <div style="font-family: var(--font-serif); font-size: 1.6rem; color: var(--gold-light); font-weight: 700; margin-bottom: 1.2rem;">
          ${formatPrice(watch.price)}
          ${watch.oldPrice ? `<span style="font-size: 1rem; color: var(--text-dim); text-decoration: line-through; margin-left: 0.5rem;">${formatPrice(watch.oldPrice)}</span>` : ""}
        </div>

        <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.5rem;">
          ${watch.description}
        </p>

        <h4 style="font-size: 0.88rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold-light); margin-bottom: 0.6rem;">
          Horological Specifications
        </h4>

        <div class="spec-table">
          <div class="spec-row">
            <span class="spec-label">Calibre / Movement:</span>
            <span class="spec-val">${watch.specs?.movement || "Meer Dada In-House Automatic"}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Case Architecture:</span>
            <span class="spec-val">${watch.specs?.case || "42mm 316L Stainless Steel"}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Crystal Glass:</span>
            <span class="spec-val">${watch.specs?.glass || "Scratch-Proof Sapphire"}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Water Resistance:</span>
            <span class="spec-val">${watch.specs?.waterResistance || "100M / 10 ATM"}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Power Reserve:</span>
            <span class="spec-val">${watch.specs?.powerReserve || "48 Hours"}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Strap / Clasp:</span>
            <span class="spec-val">${watch.specs?.strap || "Genuine Leather Strap"}</span>
          </div>
        </div>

        <div style="margin-top: 1.5rem; display: flex; gap: 1rem;">
          <button class="btn btn-gold-primary btn-block" onclick="handleAddToCart('${watch.id}', this); closeAllModals();">
            Acquire Timepiece
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("active");
  backdrop.classList.add("active");
}

/* ==========================================================================
   Checkout & Order Placement Flow (Synced with Admin Panel)
   ========================================================================== */
function setupModals() {
  const backdrop = document.getElementById("modalBackdrop");
  const checkoutBtn = document.getElementById("proceedToCheckoutBtn");
  const checkoutModal = document.getElementById("checkoutModal");
  const checkoutForm = document.getElementById("checkoutForm");

  const closeBtns = document.querySelectorAll(".modal-close-btn, .close-modal-trigger");
  closeBtns.forEach((btn) => {
    btn.addEventListener("click", closeAllModals);
  });

  if (backdrop) {
    backdrop.addEventListener("click", closeAllModals);
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      const cart = getCart();
      if (cart.length === 0) {
        showToast("Your box is empty. Add a timepiece before checkout.", "warning");
        return;
      }

      // Close cart drawer and open checkout modal
      const cartDrawer = document.getElementById("cartDrawer");
      const drawerBackdrop = document.getElementById("drawerBackdrop");
      if (cartDrawer) cartDrawer.classList.remove("active");
      if (drawerBackdrop) drawerBackdrop.classList.remove("active");

      // Calculate checkout total summary
      const subtotal = cart.reduce((tot, i) => tot + i.price * i.quantity, 0);
      const discountAmount = subtotal * appliedDiscount;
      const total = subtotal - discountAmount;

      const summaryEl = document.getElementById("checkoutSummaryText");
      if (summaryEl) {
        summaryEl.innerHTML = `
          Total Items: <strong>${cart.length}</strong> | Payable Total: <strong style="color:var(--gold-light)">${formatPrice(total)}</strong>
        `;
      }

      checkoutModal.classList.add("active");
      backdrop.classList.add("active");
    });
  }

  // Handle Order Submit
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const cart = getCart();
      if (cart.length === 0) return;

      const fullName = document.getElementById("custName").value.trim();
      const email = document.getElementById("custEmail").value.trim();
      const phone = document.getElementById("custPhone").value.trim();
      const city = document.getElementById("custCity").value.trim();
      const address = document.getElementById("custAddress").value.trim();
      const paymentMethod = document.getElementById("custPayment").value;
      const notes = document.getElementById("custNotes").value.trim();

      const subtotal = cart.reduce((tot, i) => tot + i.price * i.quantity, 0);
      const discount = subtotal * appliedDiscount;
      const grandTotal = subtotal - discount;

      const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
      const now = new Date();
      const dateString = now.toISOString().replace("T", " ").substring(0, 16);

      const newOrder = {
        id: newOrderId,
        customer: {
          name: fullName,
          email: email,
          phone: phone,
          city: city,
          address: address
        },
        items: cart.map((i) => ({
          id: i.id,
          name: i.name,
          quantity: i.quantity,
          price: i.price
        })),
        totalAmount: grandTotal,
        paymentMethod: paymentMethod,
        status: "Pending",
        date: dateString,
        notes: notes || "Standard luxury packaging."
      };

      // Save order to LocalStorage so Admin Panel sees it live!
      const currentOrders = getOrders();
      currentOrders.unshift(newOrder);
      saveOrders(currentOrders);

      // Clear Shopping Cart
      saveCart([]);
      updateCartBadge();
      appliedDiscount = 0;

      // Close checkout modal and show success modal
      closeAllModals();
      showSuccessModal(newOrderId, fullName, grandTotal, city);
    });
  }
}

function showSuccessModal(orderId, name, amount, city) {
  const successModal = document.getElementById("successModal");
  const backdrop = document.getElementById("modalBackdrop");
  const detailsEl = document.getElementById("successOrderDetails");

  if (detailsEl) {
    detailsEl.innerHTML = `
      <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 0.8rem;">
        Thank you, esteemed <strong>${name}</strong>. Your acquisition has been safely registered with Meer Dada Haute Horlogerie.
      </p>
      <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--gold-border); border-radius: 12px; padding: 1rem; margin: 1.2rem 0; text-align: left;">
        <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem; font-size:0.85rem;">
          <span style="color:var(--text-dim)">Order Reference:</span>
          <span style="color:var(--gold-light); font-weight:700;">${orderId}</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem; font-size:0.85rem;">
          <span style="color:var(--text-dim)">Amount Payable:</span>
          <span style="color:#fff; font-weight:600;">${formatPrice(amount)}</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.85rem;">
          <span style="color:var(--text-dim)">Delivery Destination:</span>
          <span style="color:#fff;">${city}, Pakistan</span>
        </div>
      </div>
      <p style="font-size: 0.82rem; color: var(--text-dim);">
        Our VIP concierge will contact you shortly to verify delivery instructions. You can view this order live in the <strong>Admin Panel</strong>.
      </p>
    `;
  }

  if (successModal) successModal.classList.add("active");
  if (backdrop) backdrop.classList.add("active");
}

function closeAllModals() {
  document.querySelectorAll(".modal-window").forEach((modal) => {
    modal.classList.remove("active");
  });
  const backdrop = document.getElementById("modalBackdrop");
  if (backdrop) backdrop.classList.remove("active");
}

/* ==========================================================================
   Wishlist Handling
   ========================================================================== */
function toggleWishlist(productId) {
  let wishlist = getWishlist();
  if (wishlist.includes(productId)) {
    wishlist = wishlist.filter((id) => id !== productId);
    showToast("Removed timepiece from your wish catalog.", "info");
  } else {
    wishlist.push(productId);
    showToast("Added timepiece to your Wishlist ♥", "success");
  }
  saveWishlist(wishlist);
  renderCatalog();
}

/* ==========================================================================
   VIP Concierge Form
   ========================================================================== */
function setupConciergeForm() {
  const form = document.getElementById("conciergeForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = document.getElementById("conciergeEmail");
      if (emailInput && emailInput.value) {
        showToast("Welcome to the Meer Dada Inner Circle. A luxury dossier has been sent to your inbox.", "success");
        emailInput.value = "";
      }
    });
  }
}
