// ==========================================================================
// Meer Dada - Haute Horlogerie Initial Data & Storage Engine
// ==========================================================================

const INITIAL_PRODUCTS = [
  {
    id: "MD-001",
    name: "Meer Dada Imperium Tourbillon",
    subtitle: "Automatic Calibre MD-801, 18k Rose Gold",
    category: "Tourbillon",
    price: 320000,
    oldPrice: 380000,
    rating: 5.0,
    reviewsCount: 42,
    badge: "Limited Edition",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=900&auto=format&fit=crop",
    featured: true,
    inStock: true,
    stockCount: 5,
    description: "The crown jewel of Meer Dada. Hand-assembled with an exposed 60-second flying tourbillon cage, framed by an 18K brushed rose gold case and finished with hand-stitched Louisiana alligator leather.",
    specs: {
      movement: "Meer Dada Calibre MD-801 Automatic Tourbillon",
      case: "42mm 18K Rose Gold with Sapphire Exhibition Caseback",
      glass: "Anti-reflective Double Curved Sapphire Crystal",
      waterResistance: "50 Meters (5 ATM)",
      powerReserve: "72 Hours",
      strap: "Cognac Brown Alligator Leather with Deployant Clasp"
    }
  },
  {
    id: "MD-002",
    name: "Meer Dada Royal Chronograph",
    subtitle: "Midnight Blue Sunray Dial, Column Wheel",
    category: "Chronograph",
    price: 245000,
    oldPrice: 290000,
    rating: 4.9,
    reviewsCount: 38,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=900&auto=format&fit=crop",
    featured: true,
    inStock: true,
    stockCount: 12,
    description: "Engineered for uncompromising precision. Featuring dual subsidiary dials, tachymeter scale, and a luminescent deep-sea blue sunray finish that captures light with sublime intensity.",
    specs: {
      movement: "Precision Integrated Column-Wheel Chronograph",
      case: "41mm 316L Surgical Stainless Steel",
      glass: "Domed Scratch-Proof Sapphire Crystal",
      waterResistance: "100 Meters (10 ATM)",
      powerReserve: "48 Hours",
      strap: "Midnight Matte Leather with Gold Contrast Stitching"
    }
  },
  {
    id: "MD-003",
    name: "Meer Dada Nocturne Skeleton",
    subtitle: "Full Openworked Dial, Gunmetal PVD",
    category: "Skeleton",
    price: 285000,
    oldPrice: 330000,
    rating: 4.8,
    reviewsCount: 29,
    badge: "Masterpiece",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=900&auto=format&fit=crop",
    featured: true,
    inStock: true,
    stockCount: 7,
    description: "Every balance wheel, escapement gear, and spring is celebrated in full mechanical glory. Hand-beveled titanium bridges dressed in dark anthracite PVD give this timepiece an avant-garde aesthetic.",
    specs: {
      movement: "In-House Manual Wind Skeleton Calibre 102",
      case: "43mm Titanium & Matte Gunmetal PVD",
      glass: "Ultra-Clear Sapphire Front & Back",
      waterResistance: "50 Meters (5 ATM)",
      powerReserve: "65 Hours",
      strap: "Vulcanized FKM Rubber Strap with Micro-Texture"
    }
  },
  {
    id: "MD-004",
    name: "Meer Dada Abyss Diver 300M",
    subtitle: "Ceramic Bezel, Super-LumiNova BGW9",
    category: "Diver",
    price: 195000,
    oldPrice: 225000,
    rating: 4.9,
    reviewsCount: 54,
    badge: "Certified 300M",
    image: "https://images.unsplash.com/photo-1547996160-71dfabbce5ed?q=80&w=900&auto=format&fit=crop",
    featured: false,
    inStock: true,
    stockCount: 15,
    description: "Built to conquer ocean abysses while commanding respect in the boardroom. High-tech unidirectional ceramic bezel with helium escape valve and brilliant Swiss grade BGW9 luminescence.",
    specs: {
      movement: "High-Beat Automatic 28,800 vph",
      case: "42.5mm Marine Grade 316L Stainless Steel",
      glass: "3.5mm Thick Double AR Coated Sapphire",
      waterResistance: "300 Meters (30 ATM / 1000ft)",
      powerReserve: "42 Hours",
      strap: "Solid Link Oyster Bracelet with Diver Extension"
    }
  },
  {
    id: "MD-005",
    name: "Meer Dada Heritage Grand Classique",
    subtitle: "Enamel Dial, Breguet Numerals, Ultra-Thin",
    category: "Classic Dress",
    price: 210000,
    oldPrice: 250000,
    rating: 5.0,
    reviewsCount: 22,
    badge: "Prestige",
    image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=900&auto=format&fit=crop",
    featured: false,
    inStock: true,
    stockCount: 9,
    description: "Pure aristocratic restraint. Boasting an ultra-slim 7.8mm profile, grand-feu white enamel dial, heat-blued steel hands, and understated guilloché work.",
    specs: {
      movement: "Ultra-Thin Calibre MD-Thin 2.4mm",
      case: "39mm 18k Yellow Gold Fluted Bezel",
      glass: "Flat Sapphire with Interior Anti-Reflective",
      waterResistance: "30 Meters (3 ATM)",
      powerReserve: "50 Hours",
      strap: "Hand-Waxed Italian Calfskin in Chestnut Brown"
    }
  },
  {
    id: "MD-006",
    name: "Meer Dada Phantom Stealth Chrono",
    subtitle: "Forged Carbon Fibre, Ceramic Pushers",
    category: "Chronograph",
    price: 295000,
    oldPrice: 340000,
    rating: 4.9,
    reviewsCount: 31,
    badge: "Exclusive",
    image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=900&auto=format&fit=crop",
    featured: true,
    inStock: true,
    stockCount: 6,
    description: "A triumph of modern aerospace materials. Forged carbon case body where no two patterns are alike. Monochromatic stealth markers with subtle gold indices.",
    specs: {
      movement: "Flyback Chronograph Automatic 4Hz",
      case: "44mm Forged Carbon & DLC Black Titanium",
      glass: "Curved Sapphire Crystal with Anti-Glare",
      waterResistance: "100 Meters (10 ATM)",
      powerReserve: "60 Hours",
      strap: "Integrated Cordura Fabric & Alcantara Lined"
    }
  },
  {
    id: "MD-007",
    name: "Meer Dada Celestial Moonphase",
    subtitle: "Aventurine Glass Dial, True Astronomical Moon",
    category: "Classic Dress",
    price: 360000,
    oldPrice: 410000,
    rating: 5.0,
    reviewsCount: 19,
    badge: "Masterpiece",
    image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=900&auto=format&fit=crop",
    featured: false,
    inStock: true,
    stockCount: 4,
    description: "Gaze into infinity. The dial is crafted from sparkling deep-space aventurine glass, displaying a hand-carved solid gold moon that tracks lunar cycles accurate to 122 years.",
    specs: {
      movement: "Astronomical Calendar Moonphase Automatic",
      case: "40mm Solid White Gold Finish",
      glass: "High-Dome Box Sapphire Crystal",
      waterResistance: "50 Meters (5 ATM)",
      powerReserve: "68 Hours",
      strap: "Dark Navy Hand-Finished Suede Alligator"
    }
  },
  {
    id: "MD-008",
    name: "Meer Dada Vintage 1954 Chronometer",
    subtitle: "Warm Patina Lume, Box Crystal, Co-Axial",
    category: "Classic Dress",
    price: 225000,
    oldPrice: 260000,
    rating: 4.8,
    reviewsCount: 47,
    badge: "Heritage",
    image: "https://images.unsplash.com/photo-1526045431048-f857369baa09?q=80&w=900&auto=format&fit=crop",
    featured: false,
    inStock: true,
    stockCount: 8,
    description: "Honoring the golden era of gentleman horology. Featuring vintage typography, warm radium-toned hour plots, and an chronometer-certified escape wheel mechanism.",
    specs: {
      movement: "COSC Certified Chronometer Calibre MD-54",
      case: "38.5mm Brushed Stainless Steel with Polished Chamfers",
      glass: "Vintage Profile High-Box Sapphire Crystal",
      waterResistance: "50 Meters (5 ATM)",
      powerReserve: "55 Hours",
      strap: "Distressed Vintage Saddle Leather"
    }
  }
];

const INITIAL_ORDERS = [
  {
    id: "ORD-9421",
    customer: {
      name: "Sultan Tariq Khan",
      email: "tariq.khan@luxury.pk",
      phone: "+92 300 8472910",
      city: "Islamabad",
      address: "Villa 14, Sector F-6/2, Embassy Road"
    },
    items: [
      { id: "MD-001", name: "Meer Dada Imperium Tourbillon", quantity: 1, price: 320000 }
    ],
    totalAmount: 320000,
    paymentMethod: "Bank Wire / VIP Concierge",
    status: "Delivered",
    date: "2026-10-15 14:32",
    notes: "Deliver in custom velvet presentation case."
  },
  {
    id: "ORD-9422",
    customer: {
      name: "Ahmad Raza Mansoor",
      email: "ahmad.raza@investments.com",
      phone: "+92 321 4455889",
      city: "Lahore",
      address: "House 88, Phase 5 DHA, Main Boulevard"
    },
    items: [
      { id: "MD-002", name: "Meer Dada Royal Chronograph", quantity: 1, price: 245000 },
      { id: "MD-004", name: "Meer Dada Abyss Diver 300M", quantity: 1, price: 195000 }
    ],
    totalAmount: 440000,
    paymentMethod: "Credit Card / VIP Secure",
    status: "Dispatched",
    date: "2026-10-17 09:15",
    notes: "Call 1 hour before delivery."
  },
  {
    id: "ORD-9423",
    customer: {
      name: "Bilal Farooq",
      email: "bilal.f@horizontech.ae",
      phone: "+92 333 1209843",
      city: "Karachi",
      address: "Penthouse 12B, Creek Vistas, DHA Phase 8"
    },
    items: [
      { id: "MD-003", name: "Meer Dada Nocturne Skeleton", quantity: 1, price: 285000 }
    ],
    totalAmount: 285000,
    paymentMethod: "Cash on Delivery",
    status: "Processing",
    date: "2026-10-18 11:20",
    notes: "Include warranty card stamped by Meer Dada Horology."
  },
  {
    id: "ORD-9424",
    customer: {
      name: "Dr. Hamza Siddiqui",
      email: "h.siddiqui@clinic.org",
      phone: "+92 312 9081234",
      city: "Peshawar",
      address: "Bunglow 4, University Town"
    },
    items: [
      { id: "MD-005", name: "Meer Dada Heritage Grand Classique", quantity: 1, price: 210000 }
    ],
    totalAmount: 210000,
    paymentMethod: "Bank Wire / VIP Concierge",
    status: "Pending",
    date: "2026-10-18 15:45",
    notes: "Gift packaging requested with personalized seal."
  }
];

// LocalStorage Keys
const STORAGE_KEYS = {
  PRODUCTS: "meer_dada_products_v1",
  ORDERS: "meer_dada_orders_v1",
  CART: "meer_dada_cart_v1",
  WISHLIST: "meer_dada_wishlist_v1"
};

// Data Store Accessors
function getProducts() {
  const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    return [...INITIAL_PRODUCTS];
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Error parsing stored products", e);
    return [...INITIAL_PRODUCTS];
  }
}

function saveProducts(products) {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
}

function getOrders() {
  const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
    return [...INITIAL_ORDERS];
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Error parsing stored orders", e);
    return [...INITIAL_ORDERS];
  }
}

function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
}

function getCart() {
  const stored = localStorage.getItem(STORAGE_KEYS.CART);
  return stored ? JSON.parse(stored) : [];
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
}

function getWishlist() {
  const stored = localStorage.getItem(STORAGE_KEYS.WISHLIST);
  return stored ? JSON.parse(stored) : [];
}

function saveWishlist(wishlist) {
  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
}

function resetAllData() {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
  localStorage.removeItem(STORAGE_KEYS.CART);
  localStorage.removeItem(STORAGE_KEYS.WISHLIST);
}

// Utility: Format Currency in PKR
function formatPrice(amount) {
  return "₨ " + Number(amount).toLocaleString("en-PK");
}
