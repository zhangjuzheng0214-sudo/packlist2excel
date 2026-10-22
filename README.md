# PackList2Excel
Convert packing lists & commercial invoices (PDF/images) to Excel with an OpenAI-compatible vision LLM. Line items + header extraction, batch merge, totals check (sum of lines vs stated totals), demo mode without API key.

```
cp .env.example .env.local   # fill in values
npm install && npm run dev
```
Sheets in the export: Line Items (with SUM formulas), Documents, Totals Check.
See DEPLOY.md and DISTRIBUTION.md.
