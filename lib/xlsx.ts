import ExcelJS from "exceljs"; import { Doc, checks } from "./types";
const COLS: [string, string, number][] = [["Source file","fileName",22],["Invoice No","invoiceNo",14],["Package No","packageNo",11],["Description","description",36],["HS Code","hsCode",11],["Qty","qty",9],["Unit","unit",7],["Unit Price","unitPrice",11],["Amount","amount",12],["Currency","currency",9],["Cartons","cartons",9],["N.W. (kg)","netWeightKg",10],["G.W. (kg)","grossWeightKg",10],["CBM","cbm",8]];
export async function build(docs: Doc[]) {
  const wb = new ExcelJS.Workbook(); wb.creator = "PackList2Excel";
  const ws = wb.addWorksheet("Line Items", { views: [{ state: "frozen", ySplit: 1 }] });
  ws.columns = COLS.map(([header, key, width]) => ({ header, key, width }));
  for (const d of docs) for (const it of d.items) ws.addRow({ ...it, fileName: d.fileName, invoiceNo: d.invoiceNo, currency: d.currency });
  const n = ws.rowCount; const tr = ws.addRow({ description: "TOTAL" });
  for (const k of ["qty","amount","cartons","netWeightKg","grossWeightKg","cbm"]) { const c = ws.getColumn(k).letter; tr.getCell(k).value = { formula: `SUM(${c}2:${c}${n})` } as any; }
  tr.font = { bold: true }; ws.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
  ws.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1F4E79" } }; ws.autoFilter = { from: "A1", to: `N1` };
  const h = wb.addWorksheet("Documents");
  h.columns = [["File","fileName",24],["Type","docType",22],["Invoice No","invoiceNo",14],["Date","date",12],["Shipper","shipper",34],["Consignee","consignee",34],["Currency","currency",9],["Incoterm","incoterm",14]].map(([header,key,width]) => ({ header: header as string, key: key as string, width: width as number }));
  docs.forEach(d => h.addRow(d)); h.getRow(1).font = { bold: true };
  const c = wb.addWorksheet("Totals Check"); c.columns = [{header:"File",key:"f",width:24},{header:"Field",key:"field",width:16},{header:"Sum of lines",key:"computed",width:14},{header:"Stated on document",key:"stated",width:18},{header:"Status",key:"s",width:14}];
  c.getRow(1).font = { bold: true };
  for (const d of docs) for (const k of checks(d)) { const r = c.addRow({ f: d.fileName, ...k, s: k.ok == null ? (k.stated == null ? "not stated" : "no line data") : k.ok ? "OK" : "MISMATCH" });
    if (k.ok === false) r.getCell("s").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFC7CE" } }; }
  return Buffer.from(await wb.xlsx.writeBuffer());
}
