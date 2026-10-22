import { extractText, getDocumentProxy } from "unpdf";
export async function pdfText(buf: Uint8Array) {
  const pdf = await getDocumentProxy(buf); const { text } = await extractText(pdf, { mergePages: true });
  return (Array.isArray(text) ? text.join("\n") : text).trim();
}
