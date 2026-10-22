const mem = new Map<string, number>();
const day = () => new Date().toISOString().slice(0, 10);
export const FREE = () => Number(process.env.FREE_PAGES_PER_DAY || 3);
async function upstash(cmd: string[]) {
  const r = await fetch(process.env.UPSTASH_REDIS_REST_URL!, { method: "POST", headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` }, body: JSON.stringify(cmd) });
  return (await r.json()).result;
}
/** Adds n pages to today's usage for this visitor; returns new used count. */
export async function use(ip: string, cookieUsed: number, n: number) {
  const k = `use:${day()}:${ip}`;
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    const v = await upstash(["INCRBY", k, String(n)]); await upstash(["EXPIRE", k, "90000"]); return Number(v);
  }
  const v = Math.max(mem.get(k) || 0, cookieUsed) + n; mem.set(k, v); return v;
}
export async function used(ip: string, cookieUsed: number) {
  const k = `use:${day()}:${ip}`;
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) return Math.max(Number(await upstash(["GET", k]) || 0), cookieUsed);
  return Math.max(mem.get(k) || 0, cookieUsed);
}
export const cookieName = () => `p2e_${day()}`;
