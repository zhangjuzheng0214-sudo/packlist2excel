import { site } from "@/lib/site"; export const dynamic = "force-dynamic";
export const metadata = { title: "Pricing – PackList2Excel" };
function Buy({ url, label }: { url: string; label: string }) { return url ? <a className="btn" href={url}>{label}</a> : <a className="btn" href="/app">Start free</a>; }
export default function P() { return (<main className="w"><h1>Pricing</h1><p>Prices in USD. Payments are processed by our merchant of record, which handles VAT/sales tax.</p>
  <div className="grid">
    <div className="card"><h2>Free</h2><div className="price">$0</div><p>3 pages per day<br />All export features<br />No sign-up</p><a className="btn alt" href="/app">Start converting</a></div>
    <div className="card"><h2>Pro</h2><div className="price">$9<span className="muted" style={{fontSize:16}}>/month</span></div><p>Up to 500 pages per month (fair use)<br />Batch merge up to 20 files<br />Priority email support<br />Cancel anytime</p><Buy url={site.pro} label="Subscribe to Pro" /></div>
    <div className="card"><h2>Credit packs</h2><div className="price">$5 / $19</div><p>100 pages for $5, 500 pages for $19<br />One-time payment, valid 12 months<br />No subscription</p>
      <Buy url={site.c100} label="Buy 100 pages" /> <Buy url={site.c500} label="Buy 500 pages" /></div>
  </div><p>After purchase you receive a license key by email; paste it into the converter to remove the daily limit. See <a href="/terms">Terms & Refund Policy</a>.</p></main>); }
