// ─────────────────────────────────────────────────────────────
// Cloudflare Pages Function: GET /p/:slug
// Serves dynamic HTML with Open Graph meta tags for social
// sharing on Threads, Instagram, Twitter, etc.
// Crawlers see the OG tags; real users get redirected to the SPA.
// ─────────────────────────────────────────────────────────────

const PRODUCTS: Record<string, { title: string; description: string; price: string; image: string; rating: string; reviews: string; hook: string }> = {
  'paw-cleaner': {
    title: 'Dexas MudBuster Portable Dog Paw Cleaner',
    description: 'No more muddy paw prints. Clean paws in 30 seconds flat. Soft silicone bristles, dishwasher safe, BPA-free.',
    price: '$34.99',
    image: '/images/paw-cleaner.jpg',
    rating: '4.4',
    reviews: '62,281',
    hook: 'No more muddy paw prints. Clean paws in 30 seconds flat.',
  },
  'slicker-brush': {
    title: 'Hertzko Self-Cleaning Slicker Brush',
    description: 'One click. All the fur falls off. The #1 grooming brush on Amazon with 91,000+ reviews.',
    price: '$29.99',
    image: '/images/slicker-brush.jpg',
    rating: '4.5',
    reviews: '91,978',
    hook: 'One click. All the fur falls off. Grooming has never been this satisfying.',
  },
  'hair-remover': {
    title: 'ChomChom Pet Hair Remover Roller',
    description: 'No refills. No batteries. No excuses. The #1 pet hair remover with 200,000+ reviews.',
    price: '$39.99',
    image: '/images/hair-remover.jpg',
    rating: '4.5',
    reviews: '203,722',
    hook: 'No refills. No batteries. The only pet hair remover you\'ll ever need.',
  },
  'water-bottle': {
    title: 'MalsiPree Portable Dog Water Bottle',
    description: 'Hydrate your dog anywhere with one hand. Zero spills guaranteed. Built-in drinking bowl.',
    price: '$34.99',
    image: '/images/water-bottle.jpg',
    rating: '4.7',
    reviews: '39,694',
    hook: 'Hydrate your dog anywhere with one hand. Zero spills guaranteed.',
  },
  'led-collar': {
    title: "Blazin' LED Light Up Dog Collar",
    description: 'Visible from 1,000 feet. USB rechargeable, 8-hour battery, weather resistant. Keep your dog safe.',
    price: '$39.99',
    image: '/images/led-collar.jpg',
    rating: '4.6',
    reviews: '19,590',
    hook: 'Visible from 1,000 feet. Your dog will literally glow in the dark.',
  },
  'slow-feeder': {
    title: 'Outward Hound Fun Feeder Slo Bowl',
    description: 'Your dog eats 10x slower. Prevents bloating, vomiting, and choking. Vet approved with 72,000+ reviews.',
    price: '$24.99',
    image: '/images/slow-feeder.jpg',
    rating: '4.7',
    reviews: '72,752',
    hook: 'Your dog eats 10x slower. No more bloating, choking, or vomiting.',
  },
};

export const onRequest: PagesFunction = async (context) => {
  const { params, request } = context;
  const slug = (params as any).slug as string;

  const product = PRODUCTS[slug];

  if (!product) {
    // Unknown product — redirect to homepage
    return Response.redirect(new URL('/', request.url).toString(), 302);
  }

  const origin = new URL(request.url).origin;
  const imageUrl = `${origin}${product.image}`;
  const productUrl = `${origin}/?product=${slug}`;

  // Serve HTML with rich Open Graph tags for social media previews
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${product.title} — PetHub</title>
  <meta name="description" content="${product.description}">

  <!-- Open Graph (Facebook, Threads, Instagram, LinkedIn) -->
  <meta property="og:type" content="product">
  <meta property="og:title" content="${product.title} — ${product.price}">
  <meta property="og:description" content="${product.hook} ⭐ ${product.rating} (${product.reviews} reviews)">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:width" content="800">
  <meta property="og:image:height" content="800">
  <meta property="og:url" content="${productUrl}">
  <meta property="og:site_name" content="PetHub">
  <meta property="product:price:amount" content="${product.price.replace('$', '')}">
  <meta property="product:price:currency" content="USD">

  <!-- Twitter / X Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${product.title} — ${product.price}">
  <meta name="twitter:description" content="${product.hook}">
  <meta name="twitter:image" content="${imageUrl}">

  <!-- Instant redirect for real users -->
  <meta http-equiv="refresh" content="0;url=${productUrl}">

  <style>
    body { font-family: system-ui, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f5f5f5; }
    .card { text-align: center; padding: 2rem; }
    .card img { max-width: 300px; border-radius: 1rem; }
    .card h1 { font-size: 1.5rem; margin: 1rem 0 0.5rem; }
    .card p { color: #666; }
    .card a { color: #006b60; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <img src="${imageUrl}" alt="${product.title}" width="300" height="300">
    <h1>${product.title}</h1>
    <p>${product.hook}</p>
    <p>⭐ ${product.rating} (${product.reviews} reviews) — <strong>${product.price}</strong></p>
    <p><a href="${productUrl}">View on PetHub →</a></p>
  </div>
  <script>window.location.replace("${productUrl}");</script>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
