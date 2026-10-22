# Deploy PackList2Excel to Vercel

Box status (2026-10-22): `vercel` CLI is **not installed** and not authenticated. Nothing has been deployed.

## What is needed from the owner
1. **Vercel access** — either:
   - push this repo to your GitHub and click "Import Project" at vercel.com/new (simplest), or
   - create a Vercel token (vercel.com/account/tokens) so it can be deployed with `npx vercel deploy --prod --token $VERCEL_TOKEN`.
2. **LLM API key** for an OpenAI-compatible vision model → `LLM_API_KEY`, `LLM_BASE_URL`, `LLM_MODEL`.
   PDFs are sent as an OpenAI `file` content part; images as `image_url`. If your provider does not accept PDF parts, use images or an OpenAI model (e.g. gpt-4o-mini). Live extraction has NOT been tested yet (no key available).
3. **Support email** → `SUPPORT_EMAIL` (must match the one given to Waffo/Creem).
4. **Checkout links** from Waffo or Creem → `CHECKOUT_URL_PRO` ($9/mo), `CHECKOUT_URL_CREDITS_100` ($5), `CHECKOUT_URL_CREDITS_500` ($19).
5. **License keys** → `LICENSE_KEYS` (comma-separated) for paying customers; Creem can issue license keys, otherwise send them manually after each order.
6. Optional: `SITE_URL` (for sitemap), `UPSTASH_REDIS_REST_URL/TOKEN` for durable free-tier limits.

## Steps
```
npm install && npm run build      # passes on the box
vercel --prod                     # or import via dashboard
```
Set env vars in Vercel → Project → Settings → Environment Variables, then redeploy.

## Before submitting to Waffo review
- Set LLM_API_KEY first so the converter is live (without it the page shows a demo-only notice).
- Set SUPPORT_EMAIL so it shows in footer / Terms / Privacy.
- Footer already links Pricing, Terms & Refunds, Privacy Policy.

## Known limits
- Free limit without Upstash uses cookie + in-memory IP counter (resets on cold start; easy to bypass). Fine for launch, add Upstash for enforcement.
- Pro is unlocked by a license key, not by user accounts.
