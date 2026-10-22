import Converter from "../Converter"; import { hasKey } from "@/lib/llm"; import { SAMPLE } from "@/lib/sample"; import { checks } from "@/lib/types";
export const dynamic = "force-dynamic";
export const metadata = { title: "Converter – Packing List & Commercial Invoice to Excel" };
export default function P({ searchParams }: { searchParams: { demo?: string } }) {
  const initial = searchParams.demo === "1" ? { demo: true, docs: [{ ...SAMPLE, checks: checks(SAMPLE) }] } : undefined;
  return <main className="w"><h1>Convert documents to Excel</h1><Converter live={hasKey()} initial={initial} /></main>; }
