import { NextRequest } from "next/server"; import { build } from "@/lib/xlsx";
export const runtime = "nodejs";
export async function POST(req: NextRequest) {
  const { docs } = await req.json(); const buf = await build(docs || []);
  return new Response(buf, { headers: { "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Content-Disposition": 'attachment; filename="packing-list.xlsx"' } });
}
