export type Item = { packageNo?: string; description?: string; hsCode?: string; qty?: number|null; unit?: string; unitPrice?: number|null; amount?: number|null; cartons?: number|null; netWeightKg?: number|null; grossWeightKg?: number|null; cbm?: number|null };
export type Doc = { fileName: string; docType?: string; shipper?: string; consignee?: string; invoiceNo?: string; date?: string; currency?: string; incoterm?: string;
  statedTotals?: { amount?: number|null; qty?: number|null; cartons?: number|null; netWeightKg?: number|null; grossWeightKg?: number|null; cbm?: number|null };
  items: Item[] };
export type Check = { field: string; computed: number; stated: number|null; ok: boolean|null };
const F: [keyof NonNullable<Doc["statedTotals"]>, keyof Item][] = [["amount","amount"],["qty","qty"],["cartons","cartons"],["netWeightKg","netWeightKg"],["grossWeightKg","grossWeightKg"],["cbm","cbm"]];
export function checks(d: Doc): Check[] {
  return F.map(([s,i]) => { const computed = Math.round(d.items.reduce((a,x)=>a+(Number(x[i])||0),0)*1000)/1000;
    const st = d.statedTotals?.[s]; const stated = st==null?null:Number(st); const hasLines = d.items.some(x => x[i] != null && x[i] !== "");
    return { field: s, computed, stated, ok: stated==null||!hasLines?null: Math.abs(computed-stated) <= Math.max(0.01, Math.abs(stated)*0.001) }; });
}
