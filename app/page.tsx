import Converter from "./Converter"; import Link from "next/link"; import { hasKey } from "@/lib/llm";
export const dynamic = "force-dynamic";
const faq = [["How do I convert a packing list to Excel?","Upload the PDF or a photo of the packing list. We read every line (package numbers, description, quantity, cartons, net and gross weight, CBM) and give you an .xlsx with one row per line item plus a totals row."],
 ["Can it convert a commercial invoice to Excel?","Yes. Invoice number, date, shipper, consignee, currency, Incoterm, HS codes, unit prices and amounts are extracted into separate columns."],
 ["What is the totals check?","We add up quantity, amount, cartons, weights and CBM across all lines and compare them with the totals printed on the document. Differences are flagged as MISMATCH so you catch errors before customs filing."],
 ["Can I merge several documents?","Yes. Upload up to 20 files at once; all line items go into one workbook with a source-file column."],
 ["Are my documents stored?","No. Files are processed in memory and not kept after the conversion. See the Privacy Policy."]];
export default function Home() {
  return (<main>
    <section className="hero w"><h1>Packing List to Excel in seconds</h1>
      <p>Turn packing lists and commercial invoices — PDF or scanned — into a clean Excel sheet. HS codes, quantities, weights, CBM and cartons extracted, totals automatically checked.</p>
      <p style={{marginTop:20}}><Link className="btn" href="/app">Convert a document</Link> <Link className="btn alt" href="/pricing">See pricing</Link></p>
      <p className="muted">Free: 3 pages per day, no sign-up.</p></section>
    <section className="w"><Converter live={hasKey()} /></section>
    <section className="w grid" style={{marginTop:24}}>
      {[["Built for exporters & forwarders","Stop retyping supplier packing lists into your booking, customs or ERP templates."],["Totals you can trust","Sum of lines vs stated totals for amount, qty, cartons, N.W., G.W. and CBM."],["Batch merge","Many invoices or packing lists in, one tidy workbook out."]].map(([t,d]) => <div className="card" key={t}><h3>{t}</h3><p>{d}</p></div>)}
    </section>
    <section className="w"><h2>Commercial invoice to Excel — and back to work</h2>
      <p>Freight forwarders and export clerks spend hours copying line items from PDF invoices into spreadsheets for customs declarations, ISF/AMS filings and booking confirmations. PackList2Excel reads the document layout with AI, maps each column to a standard schema, and outputs an Excel file with three sheets: Line Items, Documents (header data) and Totals Check.</p>
      <h2>FAQ</h2>{faq.map(([q,a]) => <div key={q}><h3>{q}</h3><p>{a}</p></div>)}</section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context":"https://schema.org","@type":"FAQPage", mainEntity: faq.map(([q,a]) => ({ "@type":"Question", name:q, acceptedAnswer:{ "@type":"Answer", text:a } })) }) }} />
  </main>);
}
