import "./globals.css"; import Link from "next/link"; import { site } from "@/lib/site";
export const metadata = { title: "Packing List to Excel & Commercial Invoice to Excel Converter | PackList2Excel",
  description: "Convert packing lists and commercial invoices (PDF or scan) to clean Excel in seconds. Extracts HS codes, quantities, weights, CBM and cartons, and checks totals." };
export default function Root({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>
    <header><div className="w"><nav><Link className="logo" href="/">PackList2Excel</Link><div><Link href="/app">Converter</Link><Link href="/pricing">Pricing</Link></div></nav></div></header>
    {children}
    <footer><div className="w"><Link href="/pricing">Pricing</Link><Link href="/terms">Terms & Refunds</Link><Link href="/privacy">Privacy Policy</Link>
      {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}<div style={{marginTop:8}}>© {new Date().getFullYear()} PackList2Excel</div></div></footer>
  </body></html>);
}
