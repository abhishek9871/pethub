export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  features: string[];
  image: string;
  thumbnail: string;
  badges: string[];
  hook: string;
  trustLine: string;
  ctaText: string;
  faq: { question: string; answer: string }[];
  shippingNote: string;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Mindful Paws Slow Feeder",
    category: "Nutrition",
    price: 35.00,
    description: "Eating too fast isn't comfortable for any pet. Our slow feeder features raised ridges that turn mealtime into a fun puzzle. Made from heavy-duty, food-safe materials, it naturally helps your dog pace themselves while offering mental stimulation.",
    features: [
      "Promotes slower, safer eating",
      "Non-slip base keeps the bowl in place",
      "Easy to clean in the dishwasher"
    ],
    image: "https://picsum.photos/seed/slowfeeder/800/1000",
    thumbnail: "https://picsum.photos/seed/slowfeeder/400/500",
    badges: ["Best Seller"],
    hook: "Make mealtime last longer and keep your dog happily engaged.",
    trustLine: "Tested by pups, loved by pet parents.",
    ctaText: "Add to Cart - Happy Tummies",
    faq: [
      { question: "What size dog is this for?", answer: "Perfect for small to medium breeds (holds up to 2 cups of dry food)." },
      { question: "Is it safe?", answer: "Yes! It's made from BPA-free, food-grade materials." }
    ],
    shippingNote: "Ships in 1-2 days from our US warehouse."
  },
  {
    id: "p2",
    name: "Zen Garden Snuffle Mat",
    category: "Wellness",
    price: 48.00,
    description: "Dogs see the world through their noses. This snuffle mat simulates the thrill of outdoor foraging, turning treat time into an enriching activity. It’s a great way to redirect excess energy and give them a comforting focus.",
    features: [
      "Keeps dogs mentally stimulated and calm",
      "Hides treats perfectly in durable fabric folds",
      "Toss it in the wash for easy cleanup"
    ],
    image: "https://picsum.photos/seed/snufflemat/800/1000",
    thumbnail: "https://picsum.photos/seed/snufflemat/400/500",
    badges: ["Sustainable"],
    hook: "A fun, foraging puzzle that tires out active pups without leaving the living room.",
    trustLine: "Handcrafted from safe, non-toxic upcycled fabric.",
    ctaText: "Add to Cart - Start Sniffing",
    faq: [
      { question: "Can my heavy chewer use this?", answer: "We recommend supervising your dog during use to prevent chewing on the mat itself." },
      { question: "How do I clean it?", answer: "Just shake out the crumbs and machine wash on cold." }
    ],
    shippingNote: "Fast, tracked shipping across the USA."
  },
  {
    id: "p3",
    name: "Calm Cove Lick Mat",
    category: "Wellness",
    price: 24.00,
    description: "Sometimes pets just need a little distraction. Spread peanut butter, yogurt, or pureed pumpkin on this textured mat to keep them happily occupied. The licking motion naturally helps soothe nerves during stressful situations like nail trims or loud noises.",
    features: [
      "Soothes anxiety through repetitive licking",
      "Strong suction cups stick to tubs and tiles",
      "Freezer-friendly for long-lasting treats"
    ],
    image: "https://picsum.photos/seed/lickmat/800/1000",
    thumbnail: "https://picsum.photos/seed/lickmat/400/500",
    badges: [],
    hook: "The soothing distraction your pet needs for bath time, grooming, or fireworks.",
    trustLine: "Made from 100% premium food-grade silicone.",
    ctaText: "Add to Cart - Calm Their Nerves",
    faq: [
      { question: "Does it stick to the floor?", answer: "It sticks best to smooth surfaces like tile, glass, or bathtubs." },
      { question: "Is it dishwasher safe?", answer: "Yes, top rack recommended!" }
    ],
    shippingNote: "Complimentary shipping on orders over $75."
  },
  {
    id: "p4",
    name: "Silky Coat Grooming Glove",
    category: "Wellness",
    price: 28.00,
    description: "Say goodbye to stressful brushing sessions. This grooming glove mimics the touch of your hand, allowing you to pet your dog or cat while efficiently removing loose hair. It keeps your home cleaner and makes coat maintenance a bonding experience.",
    features: [
      "Gently detangles and traps loose fur",
      "Flexible design reaches tricky spots easily",
      "Perfect for both wet baths and dry rubdowns"
    ],
    image: "https://picsum.photos/seed/groomingglove/800/1000",
    thumbnail: "https://picsum.photos/seed/groomingglove/400/500",
    badges: ["Popular"],
    hook: "Turn dreaded brushings into a relaxing massage your pet will beg for.",
    trustLine: "Gentle on sensitive skin and safe for all coat types.",
    ctaText: "Add to Cart - Treat Your Pet",
    faq: [
      { question: "Will this fit my hand?", answer: "Yes, the adjustable wrist strap ensures a comfortable fit for most hands." },
      { question: "Does it work on short hair?", answer: "Absolutely! It’s great for both short and long-haired breeds." }
    ],
    shippingNote: "Quick US delivery straight to your door."
  },
  {
    id: "p5",
    name: "Nomad Travel Water Bottle",
    category: "Accessories",
    price: 32.00,
    description: "Whether you're hiking a trail or walking the neighborhood, hydration is key. This sleek water bottle features a built-in cup—just press the button to release water, and press again to draw back the leftovers. It's smart, sanitary, and perfectly portable.",
    features: [
      "One-hand operation so you can hold the leash",
      "Built-in bowl for easy drinking anywhere",
      "Leak-proof lock prevents bag spills"
    ],
    image: "https://picsum.photos/seed/waterbottle/800/1000",
    thumbnail: "https://picsum.photos/seed/waterbottle/400/500",
    badges: ["Travel Essential"],
    hook: "Keep your best friend hydrated on the go, with zero spills and zero hassle.",
    trustLine: "100% leak-proof design guaranteed.",
    ctaText: "Add to Cart - Ready for Adventure",
    faq: [
      { question: "How much water does it hold?", answer: "It holds 14oz (400ml), perfect for walks and short hikes." },
      { question: "Is it safe for hot water?", answer: "We recommend using cool or room-temperature water only." }
    ],
    shippingNote: "Ships locally for fast arrival."
  },
  {
    id: "p6",
    name: "Lumina LED Night Collar",
    category: "Apparel",
    price: 45.00,
    description: "Don't let early sunsets cut your walks short. This bright, rechargeable LED collar ensures your dog is seen by cyclists and drivers from a distance. It’s lightweight, easily adjustable, and gives you total peace of mind after dark.",
    features: [
      "Ultra-bright LED for maximum low-light visibility",
      "USB rechargeable (no batteries needed)",
      "Durable and weather-resistant material"
    ],
    image: "https://picsum.photos/seed/ledcollar/800/1000",
    thumbnail: "https://picsum.photos/seed/ledcollar/400/500",
    badges: [],
    hook: "Keep them visible and safe on every late-night walk or backyard bathroom break.",
    trustLine: "Visible up to 1,000 feet in the dark.",
    ctaText: "Add to Cart - Light the Way",
    faq: [
      { question: "How long does the battery last?", answer: "Up to 5 hours of continuous use on a single quick charge." },
      { question: "Can it be worn in the rain?", answer: "Yes, the heavy-duty casing is completely weather resistant." }
    ],
    shippingNote: "Standard shipping takes just 3-5 days."
  },
  {
    id: "p7",
    name: "Control No-Pull Harness",
    category: "Apparel",
    price: 65.00,
    description: "A good walk shouldn't feel like a tug-of-war. Our ergonomic harness is designed to gently guide your dog without putting pressure on their neck. The soft, padded design ensures they stay comfortable while giving you better control.",
    features: [
      "Front clip gently discourages pulling behavior",
      "Padded chest plate prevents chafing",
      "Four adjustment points for a perfect fit"
    ],
    image: "https://picsum.photos/seed/nopullharness/800/1000",
    thumbnail: "https://picsum.photos/seed/nopullharness/400/500",
    badges: ["Ergonomic"],
    hook: "Enjoy peaceful walks again without the choking, pulling, or struggle.",
    trustLine: "Designed for safe, comfortable, and controlled walking.",
    ctaText: "Add to Cart - Better Walks Ahead",
    faq: [
      { question: "How do I choose the right size?", answer: "Measure your dog's chest girth; it's highly adjustable for most adult breeds." },
      { question: "Where does the leash attach?", answer: "There is a front clip for training to stop pulling, and a back clip for casual walking." }
    ],
    shippingNote: "Free shipping available for orders over $75!"
  },
  {
    id: "p8",
    name: "Oasis Cat Fountain",
    category: "Nutrition",
    price: 75.00,
    description: "Cats often ignore still water in a bowl. This modern fountain mimics a gently running stream to entice your cat to drink more, supporting their overall daily hydration. The sleek ceramic design is hygienic and looks great in any living space.",
    features: [
      "Flowing water naturally attracts cats to drink",
      "Replaceable filters keep water tasting fresh",
      "Ultra-quiet pump won't disrupt your home"
    ],
    image: "https://picsum.photos/seed/catfountain/800/1000",
    thumbnail: "https://picsum.photos/seed/catfountain/400/500",
    badges: ["Premium Design"],
    hook: "Encourage picky drinkers to stay hydrated with fresh, moving water.",
    trustLine: "Crafted from high-quality, easy-to-clean ceramic.",
    ctaText: "Add to Cart - Hydrate Your Cat",
    faq: [
      { question: "How often should I change the filter?", answer: "We recommend every 2 to 4 weeks depending on use." },
      { question: "Is the pump loud?", answer: "Not at all! The low-voltage pump runs nearly silently." }
    ],
    shippingNote: "Ships carefully packaged to prevent breaking."
  }
];
