import { upstreamFetch } from "@/lib/api/server/upstream";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  const { res: upstream, payload } = await upstreamFetch("/forgot-password", {
    method: "POST",
    body: JSON.stringify(body),
  });

  return NextResponse.json(payload ?? null, { status: upstream.status });
}
