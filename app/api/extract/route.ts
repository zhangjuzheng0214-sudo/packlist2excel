import { NextRequest, NextResponse } from "next/server";
import { extract, extractText, hasKey, hasVision } from "@/lib/llm"; import { pdfText } from "@/lib/pdftext";
import { SAMPLE } from "@/lib/sample"; import { checks, Doc } from "@/lib/types";
import { use, used, FREE, cookieName } from "@/lib/limit";
export const runtime = "nodejs"; export const maxDuration = 60;
const ALLOWED = ["application/pdf","image/png","image/jpeg","image/webp"];
/** Accepts `files` (PDF/images) and/or `text:<fileName>` fields (OCR text produced in the browser).
 *  Files that need OCR (images, scanned PDFs) come back in `needsOcr` when no vision model is configured. */
export async function POST(req: NextRequest) {
  const fd = await req.formData();
  if (fd.get("demo") === "1") { const d = SAMPLE; return NextResponse.json({ demo: true, docs: [{ ...d, checks: checks(d) }] }); }
  if (!hasKey()) return NextResponse.json({ error: "Extraction is temporarily unavailable. Try the sample document." }, { status: 503 });
  const files = fd.getAll("files").filter((f): f is File => typeof f !== "string").slice(0, 20);
  const texts: [string, string][] = []; fd.forEach((v, k) => { if (k.startsWith("text:") && typeof v === "string") texts.push([k.slice(5), v]); });
  if (!files.length && !texts.length) return NextResponse.json({ error: "No files" }, { status: 400 });
  for (const f of files) { if (!ALLOWED.includes(f.type)) return NextResponse.json({ error: `Unsupported type: ${f.name}` }, { status: 400 });
    if (f.size > 10e6) return NextResponse.json({ error: `${f.name} is over 10 MB` }, { status: 400 }); }
  const lic = String(fd.get("license") || "").trim();
  const pro = !!lic && (process.env.LICENSE_KEYS || "").split(",").map(s => s.trim()).filter(Boolean).includes(lic);
  const ip = (req.headers.get("x-forwarded-for") || "local").split(",")[0].trim();
  const ck = Number(req.cookies.get(cookieName())?.value || 0);
  if (!pro && (await used(ip, ck)) + files.length + texts.length > FREE())
    return NextResponse.json({ error: `Free limit is ${FREE()} pages per day. Upgrade on the Pricing page.`, limit: true }, { status: 429 });
  const docs: (Doc & { checks: any })[] = []; const errors: string[] = []; const needsOcr: string[] = [];
  const push = (d: Doc) => docs.push({ ...d, checks: checks(d) });
  for (const f of files) { try {
      const buf = new Uint8Array(await f.arrayBuffer());
      if (f.type === "application/pdf") { const t = await pdfText(buf);
        if (t.replace(/\s/g, "").length >= 40) { push(await extractText(f.name, t)); continue; } }
      if (hasVision()) push(await extract(f.name, f.type, Buffer.from(buf).toString("base64"))); else needsOcr.push(f.name);
    } catch (e: any) { errors.push(`${f.name}: ${e.message}`); } }
  for (const [n, t] of texts) { try { if (t.replace(/\s/g, "").length < 20) throw new Error("no readable text found"); push(await extractText(n, t)); } catch (e: any) { errors.push(`${n}: ${e.message}`); } }
  const res = NextResponse.json({ docs, errors, needsOcr });
  if (!pro && docs.length) { const n = await use(ip, ck, docs.length); res.cookies.set(cookieName(), String(n), { maxAge: 90000, httpOnly: true, sameSite: "lax" }); }
  return res;
}
