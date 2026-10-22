import { Doc } from "./types";
// Bundled demo document (fictional companies). Mirrors public/sample-packing-list.svg.
// The printed CBM total (9.9) intentionally differs from the line sum (9.7) to showcase the MISMATCH flag.
export const SAMPLE: Doc = { fileName: "sample-packing-list.svg", docType: "Commercial Invoice & Packing List",
  shipper: "Ningbo Sample Housewares Co., Ltd.", consignee: "Example Imports LLC, Los Angeles, CA, USA",
  invoiceNo: "NSH-2026-0815", date: "2026-08-15", currency: "USD", incoterm: "FOB Ningbo",
  statedTotals: { amount: 9180, qty: 3600, cartons: 150, netWeightKg: 1635, grossWeightKg: 1860, cbm: 9.9 },
  items: [
    { packageNo: "1-50", description: "Stainless steel water bottle 500ml", hsCode: "9617.00", qty: 1200, unit: "PCS", unitPrice: 3.2, amount: 3840, cartons: 50, netWeightKg: 480, grossWeightKg: 550, cbm: 3.1 },
    { packageNo: "51-110", description: "Silicone food storage lid set", hsCode: "3924.10", qty: 1800, unit: "SETS", unitPrice: 1.8, amount: 3240, cartons: 60, netWeightKg: 855, grossWeightKg: 930, cbm: 4.2 },
    { packageNo: "111-150", description: "Bamboo cutting board 30x20cm", hsCode: "4419.11", qty: 600, unit: "PCS", unitPrice: 3.5, amount: 2100, cartons: 40, netWeightKg: 300, grossWeightKg: 380, cbm: 2.4 } ] };
