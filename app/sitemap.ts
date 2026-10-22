export default function s() { const b = process.env.SITE_URL || "https://packlist2excel.vercel.app"; return ["", "/app", "/pricing", "/terms", "/privacy"].map(p => ({ url: b + p })); }
