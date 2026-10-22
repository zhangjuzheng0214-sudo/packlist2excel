# PackList2Excel
Convert packing lists & commercial invoices (PDF/images) to Excel with an OpenAI-compatible vision LLM. Line items + header extraction, batch merge, totals check (sum of lines vs stated totals), demo mode without API key.

```
cp .env.example .env.local   # fill in values
npm install && npm run dev
```
Sheets in the export: Line Items (with SUM formulas), Documents, Totals Check.
See DEPLOY.md and DISTRIBUTION.md.

`test-docs/` holds fictional test documents (text PDFs, PNG, scanned PDF). Two contain deliberate total errors: commercial-invoice.pdf (stated USD 37,535 vs line sum 37,435) and packing-list-image.png / scanned-packing-list.pdf (stated CBM 11.25 vs 10.75).
