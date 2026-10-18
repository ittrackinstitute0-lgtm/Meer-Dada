# 👑 Meer Dada - Haute Horlogerie & Luxury Timepieces

A world-class, ultra-luxury e-commerce website and integrated Admin Console for **Meer Dada** watches.

---

## 📁 File & Folder Structure (فائل اور فولڈر اسٹرکچر)

```
Meer Dada/
├── index.html            # Main Luxury Storefront (ہوم پیج اور واچ کیٹلاگ)
├── admin.html            # Admin Operations Console (ایڈمن پینل اور آرڈر مینیجر)
├── README.md             # Project documentation & features
├── assets/
│   └── logo.svg          # Meer Dada luxury royal crown emblem / favicon
├── css/
│   ├── style.css         # Main luxury dark/champagne gold theme & responsive layout
│   ├── animations.css    # Exclusive button animations (shimmer, glow, ripple, beam, ping)
│   └── admin.css         # Admin dashboard styling, metrics cards & order tables
└── js/
    ├── data.js           # Initial products catalog, orders storage, and LocalStorage engine
    ├── app.js            # Storefront interactions, live filters, cart drawer, checkout flow
    ├── admin.js          # Admin dashboard analytics, order status updates, CRUD for watches
    └── animations.js     # Button ripple physics, magnetic cursor effects & toast alerts
```

---

## ✨ Key Features (اہم خصوصیات)

### 1. 🌟 Luxury Brand Experience (Meer Dada)
- **Royal Obsidian & Champagne Gold Theme** inspired by legendary horology maisons (Patek Philippe, Audemars Piguet, Rolex).
- Typography featuring **Cinzel** (classic luxury serif) and **Plus Jakarta Sans** (clean modern sans-serif).
- Double-curved glassmorphism, subtle radial glows, and floating specification badges.

### 2. ⚡ Unique & Professional Button Animations (بٹن اینیمیشنز)
- **Liquid Gold Shimmer Ray** (`.btn-gold-primary`): Smooth metallic diagonal light reflection moving across the button on hover.
- **Rotating Neon Border Beam** (`.btn-border-beam`): Rotating 360-degree golden border light tracing the button perimeter.
- **Interactive Water Ripple** (`.ripple-wave`): Fluid material wave originating from the exact click coordinates.
- **Magnetic Elevation Physics**: Buttons subtly follow the cursor on hover.
- **Interactive "Added to Box ✓" Transition** (`.btn-add-to-cart`): Dynamic color change and checkmark confirmation.
- **Pulsing Live Beacon**: Glowing green activity beacon for the Admin Panel launcher.

### 3. ⌚ Complete E-Commerce Storefront (`index.html`)
- **Hero Section**: High-resolution timepiece showcase, technical specifications, and key guarantee counters.
- **Live Filter Pills**: Filter instantly by *All, Tourbillon, Chronograph, Skeleton, Diver 300M, Classic Dress*.
- **Live Search & Sort**: Real-time keyword filtering and sorting (Price low/high, rating, featured).
- **Quick Specifications Modal**: Inspect movement calibres, water depth ratings, sapphire glass, and power reserves.
- **Slide-Over Private Box (Cart Drawer)**: Adjust quantities, remove items, and apply VIP discount code (`MEER10`).
- **White-Glove Checkout Flow**: Direct checkout modal capturing client information, destination city, address, and payment method.
- **Instant Admin Sync**: Orders placed on the storefront are automatically saved to `localStorage` and immediately show up live in `admin.html`!

### 4. 🛡️ Comprehensive Admin Panel (`admin.html`)
- **4 Real-Time Metric Cards**:
  - Total Gross Revenue in PKR
  - Total Acquisitions / Orders
  - Active Timepieces in Catalog
  - Low Stock Warning Alerts (&le; 6 units)
- **Order Dossier Management**:
  - Filter orders by status (*All, Pending, Processing, Dispatched, Delivered*).
  - Update fulfillment status on the fly with instant persistence.
  - View full client dossier (shipping destination, phone, email, notes).
  - Delete or archive orders.
- **Timepiece Inventory (CRUD)**:
  - Add new watch with live image preview, category, price, and horological specs.
  - Modify existing watches.
  - Delete watches from catalog.
- **Complications Analytics**: Visual progress charts showing distribution of watch types.
- **Reset Demo Data Button**: Refresh to default state anytime with one click.

---

## 🚀 How to Open and Run (کیسے چلائیں)

No complex build tools or installation needed! Simply:

1. Double click **`index.html`** in your file explorer to open the storefront in any web browser (Chrome, Edge, Safari, Firefox).
2. Double click **`admin.html`** or click the floating **"Admin Panel"** button on the storefront to access the Admin Console.
3. Test placing an order on `index.html` with promo code `MEER10` — then switch to `admin.html` to see your new order live!
