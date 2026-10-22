"use client"; import { useState, useEffect } from "react";
type R = { docs: any[]; errors?: string[]; demo?: boolean; error?: string };
export default function Converter({ live, initial }: { live: boolean; initial?: R }) {
  const [files, setFiles] = useState<File[]>([]); const [lic, setLic] = useState(""); const [busy, setBusy] = useState(false); const [r, setR] = useState<R | null>(initial || null);
  async function run(demo: boolean) { setBusy(true); setR(null); const fd = new FormData();
    if (demo) fd.append("demo", "1"); else { files.forEach(f => fd.append("files", f)); fd.append("license", lic); }
    const res = await fetch("/api/extract", { method: "POST", body: fd }); setR(await res.json()); setBusy(false); }
  async function dl() { const res = await fetch("/api/export", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ docs: r!.docs }) });
    const a = document.createElement("a"); a.href = URL.createObjectURL(await res.blob()); a.download = "packing-list.xlsx"; a.click(); }
  return (<div>
    <div className="drop">
      {live ? <><input type="file" multiple accept="application/pdf,image/png,image/jpeg,image/webp" onChange={e => setFiles(Array.from(e.target.files || []))} />
        <p className="muted">PDF, PNG, JPG or WEBP · up to 20 files, merged into one workbook · 10 MB each</p>
        <input placeholder="License key (Pro / credits, optional)" value={lic} onChange={e => setLic(e.target.value)} style={{padding:8,width:280}} /><br /><br />
        <button className="btn" disabled={busy || !files.length} onClick={() => run(false)}>{busy ? "Extracting…" : `Convert ${files.length || ""} file(s)`}</button>{" "}</>
        : <p className="muted">Live extraction is being switched on. Meanwhile, see exactly what you get with our sample document.</p>}
      <button id="demo" className="btn alt" disabled={busy} onClick={() => run(true)}>Try the sample packing list</button>
      {" "}<a href="/sample-packing-list.svg" target="_blank">view sample document</a>
    </div>
    {r?.error && <p className="bad">{r.error}</p>}
    {r?.errors?.map(e => <p key={e} className="bad">{e}</p>)}
    {r?.docs?.length ? <div className="card" id="result">
      <button id="dl" className="btn" onClick={dl}>Download Excel (.xlsx)</button>
      {r.docs.map((d, i) => <div key={i}><h3>{d.fileName} — {d.docType}</h3>
        <p className="muted">Invoice {d.invoiceNo} · {d.date} · {d.currency} · {d.incoterm}<br />Shipper: {d.shipper}<br />Consignee: {d.consignee}</p>
        <table><thead><tr>{["Pkg","Description","HS","Qty","Unit","Price","Amount","Ctns","N.W.","G.W.","CBM"].map(h => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>{d.items.map((x: any, j: number) => <tr key={j}><td>{x.packageNo}</td><td>{x.description}</td><td>{x.hsCode}</td><td>{x.qty}</td><td>{x.unit}</td><td>{x.unitPrice}</td><td>{x.amount}</td><td>{x.cartons}</td><td>{x.netWeightKg}</td><td>{x.grossWeightKg}</td><td>{x.cbm}</td></tr>)}</tbody></table>
        <h4>Totals check</h4><table><thead><tr><th>Field</th><th>Sum of lines</th><th>Stated</th><th>Status</th></tr></thead>
          <tbody>{d.checks.map((c: any) => <tr key={c.field}><td>{c.field}</td><td>{c.computed}</td><td>{c.stated ?? "—"}</td><td className={c.ok === false ? "bad" : "ok"}>{c.ok == null ? "not stated" : c.ok ? "✓ OK" : "✗ MISMATCH"}</td></tr>)}</tbody></table></div>)}
    </div> : null}
  </div>);
}
