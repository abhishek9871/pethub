// ─────────────────────────────────────────────────────────────
// Cloudflare Pages Function: POST /api/contact
// Sends contact form submissions to the store owner via Resend.
// ─────────────────────────────────────────────────────────────

interface Env {
  RESEND_API_KEY?: string;
  OWNER_EMAIL?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const body = await request.json() as {
      name: string;
      email: string;
      subject: string;
      message: string;
    };

    // Validation
    if (!body.name || !body.email || !body.message) {
      return new Response(
        JSON.stringify({ error: 'Please fill in all required fields.' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    if (!body.email.includes('@') || !body.email.includes('.')) {
      return new Response(
        JSON.stringify({ error: 'Please enter a valid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    if (!env.RESEND_API_KEY) {
      console.error('[Contact] RESEND_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Contact form is temporarily unavailable.' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const ownerEmail = env.OWNER_EMAIL || 'sparshrajput088@gmail.com';
    const subject = body.subject || 'New Contact Form Message';
    const timestamp = new Date().toLocaleString('en-US', { 
      timeZone: 'Asia/Kolkata', 
      dateStyle: 'full', 
      timeStyle: 'short' 
    });

    const html = `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f0f4ff;">
  <div style="background: white; border-radius: 16px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
    <div style="text-align: center; margin-bottom: 24px;">
      <h1 style="color: #006b60; margin: 0; font-size: 24px;">📬 New Message from PetHub</h1>
      <p style="color: #6b7280; margin-top: 4px; font-size: 13px;">${timestamp}</p>
    </div>

    <div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
      <h3 style="margin: 0 0 12px; color: #166534; font-size: 14px;">👤 From</h3>
      <p style="margin: 4px 0; font-size: 16px;"><strong>${body.name}</strong></p>
      <p style="margin: 4px 0;"><a href="mailto:${body.email}" style="color: #006b60;">${body.email}</a></p>
    </div>

    <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
      <h3 style="margin: 0 0 8px; color: #1e293b; font-size: 14px;">📝 Subject</h3>
      <p style="margin: 0; font-size: 16px; font-weight: 600;">${subject}</p>
    </div>

    <div style="background: #fffbeb; border-radius: 12px; padding: 20px;">
      <h3 style="margin: 0 0 8px; color: #92400e; font-size: 14px;">💬 Message</h3>
      <p style="margin: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${body.message}</p>
    </div>

    <div style="text-align: center; margin-top: 24px;">
      <a href="mailto:${body.email}?subject=Re: ${encodeURIComponent(subject)}" 
         style="display: inline-block; background: #006b60; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700;">
        Reply to ${body.name} →
      </a>
    </div>
  </div>
</body></html>`;

    // Send to owner
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'PetHub Contact <onboarding@resend.dev>',
        to: [ownerEmail],
        subject: `📬 PetHub: ${subject} — from ${body.name}`,
        html,
        reply_to: body.email,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`[Contact] Resend error: ${err}`);
      return new Response(
        JSON.stringify({ error: 'Failed to send message. Please try again.' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    console.log(`[Contact] ✅ Message from ${body.name} (${body.email}) sent to owner`);

    return new Response(
      JSON.stringify({ success: true, message: 'Message sent successfully!' }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );

  } catch (err: any) {
    console.error('[Contact] Error:', err.message);
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
