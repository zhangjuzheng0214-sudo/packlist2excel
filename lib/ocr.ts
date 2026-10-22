"use client";
// Browser-side OCR (eng + chi_sim) for images and scanned PDFs; keeps the serverless function light.
export async function ocrFile(f: File, onStatus: (s: string) => void): Promise<string> {
  const { createWorker } = await import("tesseract.js");
  const worker = await createWorker(["eng", "chi_sim"]);
  await worker.setParameters({ tessedit_pageseg_mode: "3" as any, preserve_interword_spaces: "1" }); // keeps table columns apart
  try {
    const images: (Blob | HTMLCanvasElement)[] = [];
    if (f.type === "application/pdf") {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
      const pdf = await pdfjs.getDocument({ data: await f.arrayBuffer() }).promise;
      for (let i = 1; i <= Math.min(pdf.numPages, 5); i++) { const page = await pdf.getPage(i); const vp = page.getViewport({ scale: 3 });
        const c = document.createElement("canvas"); c.width = vp.width; c.height = vp.height;
        await page.render({ canvasContext: c.getContext("2d")!, viewport: vp }).promise; images.push(c); }
    } else { // upscale small photos/screenshots: tesseract is much more accurate at ~300 dpi
      const bmp = await createImageBitmap(f); const k = bmp.width < 1600 ? Math.min(3, 2000 / bmp.width) : 1;
      const c = document.createElement("canvas"); c.width = bmp.width * k; c.height = bmp.height * k;
      const g = c.getContext("2d")!; g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height); g.drawImage(bmp, 0, 0, c.width, c.height); images.push(c); }
    let out = "";
    for (let i = 0; i < images.length; i++) { onStatus(`Reading ${f.name} (page ${i + 1}/${images.length})…`);
      const { data } = await worker.recognize(images[i] as any); out += data.text + "\n"; }
    return out;
  } finally { await worker.terminate(); }
}
