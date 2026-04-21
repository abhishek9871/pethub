// ─────────────────────────────────────────────────
// PetHub — Real Product Catalog
// All data scraped from live Amazon listings (April 2026).
// Images are real product photos from the manufacturer.
// Fulfillment: CJ Dropshipping US warehouse or direct Amazon.
// ─────────────────────────────────────────────────

export interface ProductVariant {
  label: string;
  options: string[];
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  benefits: string[];
  images: string[];
  supplier: {
    name: string;
    url: string;
    shippingToUS: string;
    sourcePrice: number;
  };
  pricing: {
    cost: number;
    sellPrice: number;
    compareAtPrice?: number;
    currency: string;
  };
  variants: ProductVariant[];
  tags: string[];
  featured: boolean;
  category: string;
  badges: string[];
  hook: string;
  trustLine: string;
  ctaText: string;
  faq: { question: string; answer: string }[];
  shippingNote: string;
  rating: { score: number; count: number };
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export const products: Product[] = [
  // ──────────────────────────────────────────────────────────
  // 1. DEXAS MUDBUSTER — Viral paw cleaner, 62K+ reviews
  // ──────────────────────────────────────────────────────────
  {
    id: "paw-cleaner",
    title: "Dexas MudBuster Portable Dog Paw Cleaner",
    slug: "dexas-mudbuster-paw-cleaner",
    description:
      "No more muddy paw prints all over your floors. This genius portable paw washer has soft silicone bristles inside a BPA-free cup — just add water, dip the paw in, twist gently, and wipe dry. Works in seconds, cleans in between the paw pads, and your dog barely notices. Over 62,000 pet parents already swear by it.",
    benefits: [
      "Cleans dirty paws in under 30 seconds",
      "Soft silicone bristles won't irritate sensitive paws",
      "No batteries, no mess — just add water",
      "Dishwasher safe for effortless cleaning",
      "Compact & portable — take it anywhere",
    ],
    images: ["/images/paw-cleaner.jpg"],
    supplier: {
      name: "Dexas (via Amazon)",
      url: "https://www.amazon.com/dp/B07DC6GKXR",
      shippingToUS: "2-day Prime / 3-5 day standard",
      sourcePrice: 20.00,
    },
    pricing: {
      cost: 20.00,
      sellPrice: 34.99,
      compareAtPrice: 44.99,
      currency: "USD",
    },
    variants: [
      {
        label: "Size",
        options: ["Small (for paws < 2.5\")", "Medium (for paws 2.5-3.5\")", "Large (for paws 3.5\"+)"],
      },
      {
        label: "Color",
        options: ["Blue", "Green", "Gray"],
      },
    ],
    tags: ["dogs", "cleaning", "viral", "outdoor", "bestseller"],
    featured: true,
    category: "Cleaning",
    badges: ["Viral Hit 🔥", "62K+ Reviews"],
    hook: "No more muddy paw prints. Clean paws in 30 seconds flat.",
    trustLine: "4.4★ with 62,000+ verified reviews on Amazon. Vet approved.",
    ctaText: "Get the MudBuster",
    faq: [
      {
        question: "How do I use it?",
        answer: "Add a little water, insert your dog's paw, twist the cup gently a few times, remove, and towel dry. Takes about 30 seconds per paw.",
      },
      {
        question: "Which size do I need?",
        answer: "Small for toy breeds (paws under 2.5\"). Medium for most dogs (paws 2.5-3.5\"). Large for big breeds like Labs, Goldens, and larger.",
      },
      {
        question: "Will my dog tolerate this?",
        answer: "Most dogs adapt within 1-2 uses. The silicone bristles feel like a gentle massage. Start with treats to create positive association.",
      },
    ],
    shippingNote: "Free US shipping • Arrives in 3-5 business days",
    rating: { score: 4.4, count: 62281 },
  },

  // ──────────────────────────────────────────────────────────
  // 2. HERTZKO SELF-CLEANING SLICKER BRUSH — 91K+ reviews
  // ──────────────────────────────────────────────────────────
  {
    id: "slicker-brush",
    title: "Hertzko Self-Cleaning Slicker Brush",
    slug: "hertzko-self-cleaning-slicker-brush",
    description:
      "One click and all the fur falls off the brush — that's the magic of Hertzko. The fine, angled bristles penetrate deep into the coat to remove loose fur, tangles, knots, and trapped dirt without scratching your pet's skin. Works beautifully on dogs, cats, and rabbits. 91,000+ pet parents can't be wrong.",
    benefits: [
      "One-click self-cleaning — press the button, fur slides off",
      "Fine bent bristles detangle without pain",
      "Works on all coat types — short, medium, long, curly",
      "Comfortable non-slip grip for long grooming sessions",
      "Great for dogs, cats, and rabbits",
    ],
    images: ["/images/slicker-brush.jpg"],
    supplier: {
      name: "Hertzko (via Amazon)",
      url: "https://www.amazon.com/dp/B00ZGPI3OY",
      shippingToUS: "2-day Prime / 3-5 day standard",
      sourcePrice: 13.99,
    },
    pricing: {
      cost: 13.99,
      sellPrice: 29.99,
      compareAtPrice: 39.99,
      currency: "USD",
    },
    variants: [],
    tags: ["dogs", "cats", "grooming", "viral", "bestseller"],
    featured: true,
    category: "Grooming",
    badges: ["#1 Best Seller", "91K+ Reviews"],
    hook: "One click. All the fur falls off. Grooming has never been this satisfying.",
    trustLine: "4.5★ with 91,900+ verified reviews. Amazon's #1 grooming brush.",
    ctaText: "Grab the Brush",
    faq: [
      {
        question: "Does it hurt my pet?",
        answer: "Not at all. The bristles are fine and bent at a 60° angle to glide through the coat without scratching the skin underneath.",
      },
      {
        question: "How does the self-cleaning work?",
        answer: "Press the button on the back — the bristles retract and all collected fur slides off in one clump. No picking hair out by hand.",
      },
      {
        question: "Does it work on short-haired dogs?",
        answer: "Yes! It works on all coat lengths. Especially effective during shedding season for short-haired breeds.",
      },
    ],
    shippingNote: "Free US shipping • Arrives in 3-5 business days",
    rating: { score: 4.5, count: 91978 },
  },

  // ──────────────────────────────────────────────────────────
  // 3. CHOMCHOM ROLLER — 203K+ reviews, THE pet hair remover
  // ──────────────────────────────────────────────────────────
  {
    id: "hair-remover",
    title: "ChomChom Pet Hair Remover Roller",
    slug: "chomchom-pet-hair-remover",
    description:
      "The internet's favorite pet hair remover — and it actually works. No sticky sheets, no batteries, no refills ever. Just roll it back and forth on your couch, bed, or car seats and watch it grab every last hair. The built-in collection chamber pops open to empty in seconds. 200,000+ 5-star reviews can't be wrong.",
    benefits: [
      "Removes ALL pet hair from furniture, beds, and car seats",
      "No refills, no batteries, no sticky sheets — ever",
      "Reusable & eco-friendly — saves hundreds on lint rollers",
      "One-button emptying — pop open and dump",
      "Works on fabric, carpet, upholstery, and bedding",
    ],
    images: ["/images/hair-remover.jpg"],
    supplier: {
      name: "ChomChom (via Amazon)",
      url: "https://www.amazon.com/dp/B00BPU7AWW",
      shippingToUS: "2-day Prime / 3-5 day standard",
      sourcePrice: 24.99,
    },
    pricing: {
      cost: 24.99,
      sellPrice: 39.99,
      compareAtPrice: 49.99,
      currency: "USD",
    },
    variants: [],
    tags: ["dogs", "cats", "cleaning", "home", "viral", "bestseller"],
    featured: true,
    category: "Cleaning",
    badges: ["200K+ Reviews 🏆", "Viral"],
    hook: "No refills. No batteries. No excuses. The only pet hair remover you'll ever need.",
    trustLine: "4.5★ with 203,700+ verified reviews. The #1 pet hair remover on the internet.",
    ctaText: "Stop the Shedding",
    faq: [
      {
        question: "How does it work without sticky tape?",
        answer: "It uses a patented electrostatic fabric roller. Roll it back and forth in short strokes — hair gets trapped in the internal chamber. Press the button to open and empty.",
      },
      {
        question: "Does it work on all surfaces?",
        answer: "Fabric surfaces only — couches, beds, car seats, clothes, rugs. Not designed for hard floors (use a vacuum for those).",
      },
      {
        question: "How long does it last?",
        answer: "Forever. There are no consumable parts. No refills to buy. It's a one-time purchase that replaces hundreds of lint roller sheets.",
      },
    ],
    shippingNote: "Free US shipping • Arrives in 3-5 business days",
    rating: { score: 4.5, count: 203722 },
  },

  // ──────────────────────────────────────────────────────────
  // 4. MALSIPREE DOG WATER BOTTLE — 39K+ reviews
  // ──────────────────────────────────────────────────────────
  {
    id: "water-bottle",
    title: "MalsiPree Portable Dog Water Bottle",
    slug: "malsipree-portable-dog-water-bottle",
    description:
      "The one product every dog owner needs in their bag. This genius water bottle has a built-in flip-out drinking bowl — press the button to fill it, press again to drain unused water back into the bottle. Zero waste, zero spills, one-handed operation. Take it on walks, hikes, road trips, or to the dog park.",
    benefits: [
      "One-hand operation — press to fill, press to retract",
      "Built-in drinking bowl — nothing extra to carry",
      "100% leak-proof locking mechanism",
      "BPA-free, food-grade materials",
      "Lightweight & fits in car cup holders",
    ],
    images: ["/images/water-bottle.jpg"],
    supplier: {
      name: "MalsiPree (via Amazon)",
      url: "https://www.amazon.com/dp/B082FJG4LV",
      shippingToUS: "2-day Prime / 3-5 day standard",
      sourcePrice: 19.99,
    },
    pricing: {
      cost: 19.99,
      sellPrice: 34.99,
      compareAtPrice: 44.99,
      currency: "USD",
    },
    variants: [
      {
        label: "Size",
        options: ["12oz (small dogs)", "19oz (all dogs)"],
      },
      {
        label: "Color",
        options: ["White", "Blue", "Pink", "Gray"],
      },
    ],
    tags: ["dogs", "travel", "outdoor", "hydration", "accessories"],
    featured: true,
    category: "Travel",
    badges: ["Must-Have", "39K+ Reviews"],
    hook: "Hydrate your dog anywhere with one hand. Zero spills guaranteed.",
    trustLine: "4.7★ with 39,600+ verified reviews. Rated the #1 dog water bottle.",
    ctaText: "Stay Hydrated",
    faq: [
      {
        question: "Is it really 100% leak-proof?",
        answer: "Yes. The locking mechanism creates an airtight seal. We've seen it tested upside-down in a backpack for 24 hours with zero leaks.",
      },
      {
        question: "Which size should I get?",
        answer: "12oz is perfect for short walks with small dogs. 19oz is ideal for longer outings, hikes, or medium-to-large dogs.",
      },
      {
        question: "Can I put anything besides water in it?",
        answer: "We recommend water only. The narrow opening makes it difficult to clean thoroughly with other liquids.",
      },
    ],
    shippingNote: "Free US shipping • Arrives in 3-5 business days",
    rating: { score: 4.7, count: 39694 },
  },

  // ──────────────────────────────────────────────────────────
  // 5. BLAZIN SAFETY LED DOG COLLAR — 19K+ reviews
  // ──────────────────────────────────────────────────────────
  {
    id: "led-collar",
    title: "Blazin' LED Light Up Dog Collar",
    slug: "blazin-led-dog-collar",
    description:
      "Your dog becomes visible from 1,000+ feet away. This USB-rechargeable LED collar has 3 light modes and lasts up to 8 hours per charge. Perfect for early morning walks, late evening bathroom breaks, camping, and keeping your dog safe near roads. Weather-resistant and so lightweight your dog won't even notice it.",
    benefits: [
      "Visible from 1,000+ feet in complete darkness",
      "USB rechargeable — full charge in 1 hour, lasts 8 hours",
      "3 modes: steady glow, fast flash, slow flash",
      "Weather-resistant (IP65) — rain, snow, puddles",
      "Cuttable to fit any size dog perfectly",
    ],
    images: ["/images/led-collar.jpg"],
    supplier: {
      name: "Blazin' Safety (via Amazon)",
      url: "https://www.amazon.com/dp/B01N0MQXYW",
      shippingToUS: "2-day Prime / 3-5 day standard",
      sourcePrice: 21.99,
    },
    pricing: {
      cost: 21.99,
      sellPrice: 39.99,
      compareAtPrice: 49.99,
      currency: "USD",
    },
    variants: [
      {
        label: "Size",
        options: ['Small (8-12")', 'Medium (12-16")', 'Large (16-27")'],
      },
      {
        label: "Color",
        options: ["Green", "Blue", "Red", "White", "Orange", "Pink"],
      },
    ],
    tags: ["dogs", "safety", "night", "walking", "LED", "viral"],
    featured: true,
    category: "Safety",
    badges: ["Night Essential 🌙"],
    hook: "Visible from 1,000 feet. Your dog will literally glow in the dark.",
    trustLine: "4.6★ with 19,500+ verified reviews. Keeps 19,000+ dogs safe every night.",
    ctaText: "Light Up Your Walks",
    faq: [
      {
        question: "How long does the battery last?",
        answer: "Up to 8 hours on steady mode, 12+ hours on flash mode. Full recharge takes about 1 hour via any USB port.",
      },
      {
        question: "Can my dog swim with it on?",
        answer: "It's weather-resistant for rain and puddles (IP65), but don't submerge it fully in water. Remove before swimming.",
      },
      {
        question: "Will it fit my dog?",
        answer: "Yes — the collar is cuttable, so you trim it to the exact length your dog needs. Check the size guide for the right starting length.",
      },
    ],
    shippingNote: "Free US shipping • Arrives in 3-5 business days",
    rating: { score: 4.6, count: 19590 },
  },

  // ──────────────────────────────────────────────────────────
  // 6. OUTWARD HOUND SLO BOWL — 72K+ reviews
  // ──────────────────────────────────────────────────────────
  {
    id: "slow-feeder",
    title: "Outward Hound Fun Feeder Slo Bowl",
    slug: "outward-hound-fun-feeder-slo-bowl",
    description:
      "Your dog eats their entire bowl in 45 seconds? That's not just messy — it's dangerous. Bloating, vomiting, choking. This vet-recommended slow feeder forces them to eat 10x slower with its maze-like ridges. Made from food-safe, BPA-free materials with a non-slip base. 72,000+ pet parents trust it.",
    benefits: [
      "Slows eating speed by up to 10x",
      "Prevents bloating, vomiting, and choking",
      "Non-slip rubber base — stays put on any floor",
      "Dishwasher safe (top rack)",
      "BPA-free, food-grade, phthalate-free material",
    ],
    images: ["/images/slow-feeder.jpg"],
    supplier: {
      name: "Outward Hound (via Amazon)",
      url: "https://www.amazon.com/dp/B00FPKNRCS",
      shippingToUS: "2-day Prime / 3-5 day standard",
      sourcePrice: 12.71,
    },
    pricing: {
      cost: 12.71,
      sellPrice: 24.99,
      compareAtPrice: 34.99,
      currency: "USD",
    },
    variants: [
      {
        label: "Size",
        options: ["Mini (¾ cup)", "Small (1.5 cups)", "Regular (2 cups)", "Large (4 cups)"],
      },
      {
        label: "Pattern",
        options: ["Swirl (Orange)", "Flower (Teal)", "Ridge (Purple)"],
      },
    ],
    tags: ["dogs", "feeding", "health", "vet-approved", "bestseller"],
    featured: false,
    category: "Feeding",
    badges: ["Vet Approved ✓", "72K+ Reviews"],
    hook: "Your dog eats 10x slower. No more bloating, choking, or vomiting.",
    trustLine: "4.7★ with 72,700+ verified reviews. Recommended by veterinarians worldwide.",
    ctaText: "Feed Them Better",
    faq: [
      {
        question: "What size do I need?",
        answer: "Mini for toy breeds (¾ cup), Small for small breeds (1.5 cups), Regular for medium breeds (2 cups), Large for big breeds (4 cups).",
      },
      {
        question: "Does it work with wet food?",
        answer: "Yes! The textured ridges work great with wet food, raw food, and even yogurt or pumpkin puree.",
      },
      {
        question: "My dog flips their bowl. Will this stay put?",
        answer: "Yes. The rubber non-slip base grips the floor firmly. It's much harder to flip than a standard bowl.",
      },
    ],
    shippingNote: "Free US shipping • Arrives in 3-5 business days",
    rating: { score: 4.7, count: 72752 },
  },
];

// Derive categories from product data
export const categories = [
  "All",
  ...Array.from(new Set(products.map((p) => p.category))),
];
