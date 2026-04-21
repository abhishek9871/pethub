# PetHub — Deployment & Development Commands

**Project Name:** lovepethub
**Production Branch:** main

## Local Development

### Frontend only (Vite dev server)
```bash
npm run dev
```

### Full stack with Pages Functions (PayPal backend)
```bash
npm run pages:dev
```

## Deployment

### Set production secrets (one-time)
```bash
npx wrangler pages secret put PAYPAL_CLIENT_ID --project-name lovepethub
npx wrangler pages secret put PAYPAL_CLIENT_SECRET --project-name lovepethub
npx wrangler pages secret put PAYPAL_MODE --project-name lovepethub
```
(Enter "live" for PAYPAL_MODE when going to production)

### Build and deploy
```bash
npm run pages:deploy
```

### Manual deploy (if build already done)
```bash
npx wrangler pages deploy dist --project-name lovepethub --branch main
```

## PayPal Setup Checklist

1. Go to https://developer.paypal.com/dashboard/applications
2. Click "Create App" under REST API apps
3. Copy your **Client ID** and **Secret**
4. For local dev: put them in `.dev.vars`
5. For production: set as Cloudflare Pages secrets (commands above)
6. Set `VITE_PAYPAL_CLIENT_ID` in your `.env` file for the frontend SDK
7. Test with PayPal Sandbox accounts first

## Going LIVE with real money
1. In PayPal Developer Dashboard, switch from Sandbox to Live
2. Create a Live API app and get Live Client ID + Secret
3. Update Cloudflare secrets:
   ```bash
   npx wrangler pages secret put PAYPAL_CLIENT_ID --project-name lovepethub   # live ID
   npx wrangler pages secret put PAYPAL_CLIENT_SECRET --project-name lovepethub  # live secret
   npx wrangler pages secret put PAYPAL_MODE --project-name lovepethub   # enter: live
   ```
4. Update `.env` with live VITE_PAYPAL_CLIENT_ID
5. Rebuild and deploy: `npm run pages:deploy`
