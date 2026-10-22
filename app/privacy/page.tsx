import { site } from "@/lib/site"; export const dynamic = "force-dynamic"; export const metadata = { title: "Privacy Policy – PackList2Excel" };
export default function P() { return (<main className="w"><h1>Privacy Policy</h1><p className="muted">Last updated: October 22, 2026</p>
<h2>What we process</h2><p>Documents you upload are sent to our AI extraction provider to read their content, and the results are returned to your browser. We do not store uploaded files or extracted data after the request completes.</p>
<h2>Usage data</h2><p>To enforce the free daily limit we keep a counter tied to a cookie and your IP address for up to 25 hours. Hosting logs (IP, time, page) are kept by our hosting provider for security.</p>
<h2>Payments</h2><p>Payments are handled by our merchant of record; we never see your full card details. We receive your email and order details to deliver license keys and support.</p>
<h2>Sub-processors</h2><p>Hosting (Vercel), AI extraction provider (OpenAI-compatible API), payment processor (merchant of record).</p>
<h2>Your rights</h2><p>You may request access to or deletion of data we hold about you by emailing {site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : "the support address in the footer"}.</p>
<h2>Cookies</h2><p>We use one functional cookie for the free-usage counter. No advertising cookies.</p></main>); }
