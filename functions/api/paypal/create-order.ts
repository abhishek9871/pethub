// ─────────────────────────────────────────────────────────────
// Cloudflare Pages Function: POST /api/paypal/create-order
// Creates a PayPal order using REST API v2.
// Validates all pricing server-side — never trusts the client.
// ─────────────────────────────────────────────────────────────

// Server-side product catalog — SOURCE OF TRUTH for pricing
const PRODUCT_CATALOG: Record<string, { title: string; sellPrice: number }> = {
  'paw-cleaner': { title: 'Dexas MudBuster Portable Dog Paw Cleaner', sellPrice: 34.99 },
  'slicker-brush': { title: 'Hertzko Self-Cleaning Slicker Brush', sellPrice: 29.99 },
  'hair-remover': { title: 'ChomChom Pet Hair Remover Roller', sellPrice: 39.99 },
  'water-bottle': { title: 'MalsiPree Portable Dog Water Bottle', sellPrice: 34.99 },
  'led-collar': { title: "Blazin' LED Light Up Dog Collar", sellPrice: 39.99 },
  'slow-feeder': { title: 'Outward Hound Fun Feeder Slo Bowl', sellPrice: 24.99 },
};

interface CartItem {
  productId: string;
  quantity: number;
  variant?: Record<string, string>;
}

interface Env {
  PAYPAL_CLIENT_ID: string;
  PAYPAL_CLIENT_SECRET: string;
  PAYPAL_MODE?: string; // "sandbox" or "live"
}

function getPayPalBaseUrl(env: Env): string {
  return env.PAYPAL_MODE === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';
}

async function getAccessToken(env: Env): Promise<string> {
  const base = getPayPalBaseUrl(env);
  const auth = btoa(`${env.PAYPAL_CLIENT_ID}:${env.PAYPAL_CLIENT_SECRET}`);

  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`PayPal auth failed: ${response.status} ${err}`);
  }

  const data = await response.json() as { access_token: string };
  return data.access_token;
}

function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `PH-${timestamp}-${random}`.toUpperCase();
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    if (!env.PAYPAL_CLIENT_ID || !env.PAYPAL_CLIENT_SECRET) {
      console.error('[PayPal] Missing PAYPAL_CLIENT_ID or PAYPAL_CLIENT_SECRET');
      return new Response(
        JSON.stringify({ error: 'Payment system is not configured. Please contact support.' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const body = await request.json() as { items: CartItem[] };

    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Cart is empty' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Validate items and calculate totals server-side
    const lineItems: { name: string; quantity: string; unit_amount: { currency_code: string; value: string }; description?: string }[] = [];
    let subtotal = 0;

    for (const item of body.items) {
      const product = PRODUCT_CATALOG[item.productId];
      if (!product) {
        return new Response(
          JSON.stringify({ error: `Unknown product: ${item.productId}` }),
          { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }

      if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 10) {
        return new Response(
          JSON.stringify({ error: `Invalid quantity for ${product.title}` }),
          { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }

      const variantDesc = item.variant
        ? Object.entries(item.variant).map(([k, v]) => `${k}: ${v}`).join(', ')
        : undefined;

      lineItems.push({
        name: product.title,
        quantity: item.quantity.toString(),
        unit_amount: {
          currency_code: 'USD',
          value: product.sellPrice.toFixed(2),
        },
        description: variantDesc,
      });

      subtotal += product.sellPrice * item.quantity;
    }

    // Shipping: free over $75, else $5.99
    const shippingCost = subtotal >= 75 ? 0 : 5.99;
    const total = subtotal + shippingCost;

    const orderId = generateOrderId();

    // Get PayPal access token
    const accessToken = await getAccessToken(env);
    const base = getPayPalBaseUrl(env);

    // Create PayPal order
    const orderPayload: any = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: orderId,
          description: `PetHub Order ${orderId}`,
          amount: {
            currency_code: 'USD',
            value: total.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: subtotal.toFixed(2),
              },
              shipping: {
                currency_code: 'USD',
                value: shippingCost.toFixed(2),
              },
            },
          },
          items: lineItems,
        },
      ],
      payment_source: {
        paypal: {
          experience_context: {
            brand_name: 'PetHub',
            shipping_preference: 'GET_FROM_FILE',
            user_action: 'PAY_NOW',
            return_url: `${new URL(request.url).origin}/?checkout=success`,
            cancel_url: `${new URL(request.url).origin}/?checkout=cancel`,
          },
        },
      },
    };

    const paypalResponse = await fetch(`${base}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify(orderPayload),
    });

    if (!paypalResponse.ok) {
      const errBody = await paypalResponse.text();
      console.error(`[PayPal] Create order failed: ${paypalResponse.status} ${errBody}`);
      return new Response(
        JSON.stringify({ error: 'Failed to create payment. Please try again.' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const paypalOrder = await paypalResponse.json() as { id: string; status: string };
    console.log(`[PayPal] Order created: ${paypalOrder.id} | Internal: ${orderId} | Total: $${total.toFixed(2)}`);

    return new Response(
      JSON.stringify({ id: paypalOrder.id, orderId }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );

  } catch (err: any) {
    console.error('[PayPal] Create order error:', err.message);
    return new Response(
      JSON.stringify({ error: 'Something went wrong. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
