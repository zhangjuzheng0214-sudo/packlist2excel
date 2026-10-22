export default function r() { return { rules: { userAgent: "*", allow: "/" }, sitemap: (process.env.SITE_URL || "https://packlist2excel.vercel.app") + "/sitemap.xml" }; }
