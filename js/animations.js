// ==========================================================================
// Meer Dada - Button Animations & Visual Interaction Engine
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  initRippleEffects();
  initHeaderScrollEffect();
  initMagneticButtons();
});

/**
 * 1. Liquid Ripple Animation on Click
 */
function initRippleEffects() {
  document.addEventListener("click", (e) => {
    const targetBtn = e.target.closest(".btn, .icon-btn, .filter-pill, .social-pill-btn");
    if (!targetBtn) return;

    const rect = targetBtn.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.classList.add("ripple-wave");

    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    // Remove any previous ripples
    const existingRipple = targetBtn.querySelector(".ripple-wave");
    if (existingRipple) existingRipple.remove();

    targetBtn.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
}

/**
 * 2. Header blur and shrink on scroll
 */
function initHeaderScrollEffect() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/**
 * 3. Magnetic Hover Physics for Primary Buttons
 */
function initMagneticButtons() {
  const magneticButtons = document.querySelectorAll(".btn-magnetic, .btn-gold-primary");

  magneticButtons.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Subtle magnetic deflection
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.02)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = `translate(0px, 0px) scale(1)`;
      btn.style.transition = "transform 0.4s ease";
    });

    btn.addEventListener("mouseenter", () => {
      btn.style.transition = "none";
    });
  });
}

/**
 * 4. Toast Notification Dispatcher
 */
function showToast(message, type = "success") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.classList.add("toast-container");
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.classList.add("luxury-toast");
  
  let iconSvg = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  `;

  if (type === "info") {
    iconSvg = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c5a059" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    `;
  } else if (type === "warning" || type === "danger") {
    iconSvg = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    `;
  }

  toast.innerHTML = `
    <span class="toast-icon">${iconSvg}</span>
    <span class="toast-message">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = "all 0.4s ease";
    toast.style.opacity = "0";
    toast.style.transform = "translateX(50px)";
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}
