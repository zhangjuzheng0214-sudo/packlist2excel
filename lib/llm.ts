import { Doc } from "./types";
const PROMPT = `You extract data from export shipping documents (packing lists, commercial invoices). Return ONLY JSON:
{"docType":string,"shipper":string,"consignee":string,"invoiceNo":string,"date":"YYYY-MM-DD","currency":string,"incoterm":string,
"statedTotals":{"amount":number|null,"qty":number|null,"cartons":number|null,"netWeightKg":number|null,"grossWeightKg":number|null,"cbm":number|null},
"items":[{"packageNo":string,"description":string,"hsCode":string,"qty":number|null,"unit":string,"unitPrice":number|null,"amount":number|null,"cartons":number|null,"netWeightKg":number|null,"grossWeightKg":number|null,"cbm":number|null}]}
statedTotals are the TOTAL values printed on the document (null if not printed). Never invent values; use null or "" when absent. Convert weights to kg.`;
export const hasKey = () => !!process.env.LLM_API_KEY;
export const hasVision = () => process.env.LLM_VISION === "1";
const base = () => (process.env.LLM_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
async function chat(content: any, fileName: string): Promise<Doc> {
  const r = await fetch(`${base()}/chat/completions`, { method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.LLM_API_KEY}` },
    body: JSON.stringify({ model: process.env.LLM_MODEL || "gpt-4o-mini", temperature: 0, response_format: { type: "json_object" },
      messages: [{ role: "system", content: PROMPT }, { role: "user", content }] }) });
  if (!r.ok) throw new Error(`Extraction service error ${r.status}`);
  const j = await r.json(); const txt: string = j.choices?.[0]?.message?.content || "{}";
  const d = JSON.parse(txt.replace(/^```json|```$/g, "").trim());
  return { ...d, items: Array.isArray(d.items) ? d.items : [], fileName };
}
/** Text-only path (works with DeepSeek etc.). `text` comes from a PDF text layer or OCR. */
export function extractText(fileName: string, text: string) {
  return chat(`Document text (layout may be imperfect; columns may be split by spaces or lines; OCR text may contain errors):\n\n${text.slice(0, 60000)}`, fileName);
}
/** Vision path, only when LLM_VISION=1 and the model accepts images/PDF parts. */
export function extract(fileName: string, mime: string, b64: string) {
  const part = mime === "application/pdf"
    ? { type: "file", file: { filename: fileName, file_data: `data:application/pdf;base64,${b64}` } }
    : { type: "image_url", image_url: { url: `data:${mime};base64,${b64}` } };
  return chat([{ type: "text", text: "Extract this document." }, part], fileName);
}
