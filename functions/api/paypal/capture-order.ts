// ─────────────────────────────────────────────────────────────
// Cloudflare Pages Function: POST /api/paypal/capture-order
// Captures payment, sends email notifications via Resend:
//   1. Order confirmation to customer
//   2. Full order details to store owner for fulfillment
// ─────────────────────────────────────────────────────────────

interface Env {
  PAYPAL_CLIENT_ID: string;
  PAYPAL_CLIENT_SECRET: string;
  PAYPAL_MODE?: string;
  RESEND_API_KEY?: string;
  OWNER_EMAIL?: string;
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
  if (!response.ok) throw new Error(`PayPal auth failed: ${response.status}`);
  const data = await response.json() as { access_token: string };
  return data.access_token;
}

// ─── Resend Email Helper ────────────────────────────────────
async function sendEmail(apiKey: string, to: string, subject: string, html: string) {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'PetHub <onboarding@resend.dev>',
        to: [to],
        subject,
        html,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error(`[Resend] Failed to send to ${to}: ${err}`);
    } else {
      console.log(`[Resend] ✅ Email sent to ${to}: ${subject}`);
    }
  } catch (err: any) {
    console.error(`[Resend] Error sending to ${to}: ${err.message}`);
  }
}

// ─── Email Templates ────────────────────────────────────────
function buildCustomerEmail(order: any) {
  const { orderId, amount, payerName, items } = order;
  return `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb;">
  <div style="background: white; border-radius: 16px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
    <div style="text-align: center; margin-bottom: 24px;">
      <h1 style="color: #006b60; margin: 0; font-size: 28px;">PetHub</h1>
      <p style="color: #6b7280; margin-top: 4px;">Order Confirmed 🎉</p>
    </div>
    
    <p style="font-size: 16px; color: #111;">Hi ${payerName},</p>
    <p style="font-size: 16px; color: #374151;">Thank you for your order! We're getting it ready for you.</p>
    
    <div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 24px 0;">
      <p style="margin: 0 0 8px; font-weight: 700; color: #166534;">Order #${orderId}</p>
      <p style="margin: 0; font-size: 24px; font-weight: 700; color: #006b60;">$${amount}</p>
    </div>

    <p style="font-size: 14px; color: #6b7280;">📦 You'll receive a shipping confirmation once your order ships (usually within 1-2 business days).</p>
    
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
    
    <p style="font-size: 12px; color: #9ca3af; text-align: center;">
      Need help? Reply to this email or visit <a href="https://lovepethub.pages.dev" style="color: #006b60;">lovepethub.pages.dev</a>
    </p>
  </div>
</body></html>`;
}

function buildOwnerEmail(order: any) {
  const { orderId, paypalOrderId, captureId, amount, payerName, payerEmail, shippingName, address, items } = order;
  
  const addressBlock = address
    ? `
      <p style="margin: 4px 0;"><strong>Ship To:</strong> ${shippingName || payerName}</p>
      <p style="margin: 4px 0;">${address.address_line_1 || ''}</p>
      ${address.address_line_2 ? `<p style="margin: 4px 0;">${address.address_line_2}</p>` : ''}
      <p style="margin: 4px 0;">${address.admin_area_2 || ''}, ${address.admin_area_1 || ''} ${address.postal_code || ''}</p>
      <p style="margin: 4px 0;">${address.country_code || ''}</p>`
    : '<p style="margin: 4px 0; color: #ef4444;">⚠️ No shipping address provided</p>';

  return `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #fef2f2;">
  <div style="background: white; border-radius: 16px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
    <div style="text-align: center; margin-bottom: 24px;">
      <h1 style="color: #dc2626; margin: 0; font-size: 28px;">🚨 NEW ORDER!</h1>
      <p style="color: #6b7280; margin-top: 4px;">PetHub — Fulfill this order ASAP</p>
    </div>

    <div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
      <p style="margin: 0 0 8px; font-weight: 700; color: #92400e; font-size: 18px;">💰 $${amount} received</p>
      <p style="margin: 0; color: #78350f;">Order #${orderId}</p>
    </div>

    <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
      <h3 style="margin: 0 0 12px; color: #1e293b;">👤 Customer Details</h3>
      <p style="margin: 4px 0;"><strong>Name:</strong> ${payerName}</p>
      <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${payerEmail}">${payerEmail}</a></p>
    </div>

    <div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
      <h3 style="margin: 0 0 12px; color: #166534;">📦 Shipping Address</h3>
      ${addressBlock}
    </div>

    <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
      <h3 style="margin: 0 0 12px; color: #1e293b;">🔗 PayPal Reference</h3>
      <p style="margin: 4px 0;"><strong>PayPal Order:</strong> ${paypalOrderId}</p>
      <p style="margin: 4px 0;"><strong>Capture ID:</strong> ${captureId}</p>
      <p style="margin: 4px 0;"><strong>Items:</strong> ${items}</p>
    </div>

    <div style="text-align: center; margin-top: 24px;">
      <a href="https://www.paypal.com/activity" style="display: inline-block; background: #006b60; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700;">View in PayPal Dashboard →</a>
    </div>
  </div>
</body></html>`;
}

// ─── Main Handler ───────────────────────────────────────────
export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    if (!env.PAYPAL_CLIENT_ID || !env.PAYPAL_CLIENT_SECRET) {
      return new Response(
        JSON.stringify({ error: 'Payment system is not configured.' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const body = await request.json() as { orderID: string };
    if (!body.orderID) {
      return new Response(
        JSON.stringify({ error: 'Missing order ID' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const accessToken = await getAccessToken(env);
    const base = getPayPalBaseUrl(env);

    const captureResponse = await fetch(`${base}/v2/checkout/orders/${body.orderID}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
    });

    const captureData = await captureResponse.json() as any;

    if (!captureResponse.ok) {
      console.error(`[PayPal] Capture failed: ${captureResponse.status}`, JSON.stringify(captureData));
      if (captureData?.details?.[0]?.issue === 'ORDER_ALREADY_CAPTURED') {
        return new Response(
          JSON.stringify({ error: 'This order has already been processed.' }),
          { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }
      return new Response(
        JSON.stringify({ error: 'Payment capture failed. Please try again.' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // ═══════════ PAYMENT CAPTURED — SEND NOTIFICATIONS ═══════════
    const capture = captureData.purchase_units?.[0]?.payments?.captures?.[0];
    const payer = captureData.payer;
    const shipping = captureData.purchase_units?.[0]?.shipping;
    const refId = captureData.purchase_units?.[0]?.reference_id || 'N/A';
    const itemsJson = captureData.purchase_units?.[0]?.items
      ? captureData.purchase_units[0].items.map((i: any) => `${i.quantity}x ${i.name}`).join(', ')
      : 'See PayPal dashboard';

    const orderDetails = {
      orderId: refId,
      paypalOrderId: captureData.id,
      captureId: capture?.id || 'N/A',
      amount: capture?.amount?.value || '0.00',
      payerName: `${payer?.name?.given_name || ''} ${payer?.name?.surname || ''}`.trim(),
      payerEmail: payer?.email_address || '',
      shippingName: shipping?.name?.full_name || '',
      address: shipping?.address || null,
      items: itemsJson,
    };

    // Send emails via Resend (non-blocking — don't fail the order if email fails)
    if (env.RESEND_API_KEY) {
      const emailPromises: Promise<void>[] = [];

      // 1. Customer confirmation email
      if (orderDetails.payerEmail) {
        emailPromises.push(
          sendEmail(
            env.RESEND_API_KEY,
            orderDetails.payerEmail,
            `Order Confirmed 🎉 — PetHub #${orderDetails.orderId}`,
            buildCustomerEmail(orderDetails)
          )
        );
      }

      // 2. Owner notification with full details for fulfillment
      const ownerEmail = env.OWNER_EMAIL || 'sparshrajput088@gmail.com';
      emailPromises.push(
        sendEmail(
          env.RESEND_API_KEY,
          ownerEmail,
          `🚨 NEW ORDER $${orderDetails.amount} — #${orderDetails.orderId}`,
          buildOwnerEmail(orderDetails)
        )
      );

      // Fire emails in parallel, don't block the response
      context.waitUntil(Promise.allSettled(emailPromises));
    } else {
      console.warn('[Email] RESEND_API_KEY not configured — no emails sent');
    }

    return new Response(
      JSON.stringify({
        status: captureData.status,
        orderId: refId,
        paypalOrderId: captureData.id,
        captureId: capture?.id,
        payer: {
          name: orderDetails.payerName,
          email: orderDetails.payerEmail,
        },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );

  } catch (err: any) {
    console.error('[PayPal] Capture error:', err.message);
    return new Response(
      JSON.stringify({ error: 'Something went wrong during payment capture.' }),
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
