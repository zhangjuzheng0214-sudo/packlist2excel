# Deploy PackList2Excel to Vercel

Box status (2026-10-22): `vercel` CLI is **not installed** and not authenticated. Nothing has been deployed.

## What is needed from the owner
1. **Vercel access** — either:
   - push this repo to your GitHub and click "Import Project" at vercel.com/new (simplest), or
   - create a Vercel token (vercel.com/account/tokens) so it can be deployed with `npx vercel deploy --prod --token $VERCEL_TOKEN`.
2. **LLM API key** (OpenAI-compatible) → `LLM_API_KEY`, `LLM_BASE_URL`, `LLM_MODEL`, optional `LLM_VISION`.
   - Text-only models (DeepSeek, default): PDFs with a text layer → server-side text extraction (unpdf). Images and scanned PDFs → OCR in the user's browser (tesseract.js eng+chi_sim, pdfjs renders pages; assets load from cdn.jsdelivr.net). The text is then sent to the chat model with `response_format: json_object`.
   - Vision models: set `LLM_VISION=1` to send images/scanned PDFs directly to the model instead of OCR.
3. **Support email** → `SUPPORT_EMAIL` (must match the one given to Waffo/Creem).
4. **Checkout links** from Waffo or Creem → `CHECKOUT_URL_PRO` ($9/mo), `CHECKOUT_URL_CREDITS_100` ($5), `CHECKOUT_URL_CREDITS_500` ($19).
5. **License keys** → `LICENSE_KEYS` (comma-separated) for paying customers; Creem can issue license keys, otherwise send them manually after each order.
6. Optional: `SITE_URL` (for sitemap), `UPSTASH_REDIS_REST_URL/TOKEN` for durable free-tier limits.

## Vercel environment variables (Project → Settings → Environment Variables, Production)
| Name | Value |
|---|---|
| LLM_API_KEY | your DeepSeek key (secret) |
| LLM_BASE_URL | https://api.deepseek.com |
| LLM_MODEL | deepseek-chat |
| LLM_VISION | (leave unset for DeepSeek) |
| SUPPORT_EMAIL | your support email |
| CHECKOUT_URL_PRO / CHECKOUT_URL_CREDITS_100 / CHECKOUT_URL_CREDITS_500 | Waffo/Creem payment links |
| LICENSE_KEYS | comma-separated keys for paying customers |
| FREE_PAGES_PER_DAY | 3 |
| SITE_URL | https://<your-domain> |
| UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN | optional |

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
