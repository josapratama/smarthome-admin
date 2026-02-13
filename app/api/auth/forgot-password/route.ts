import { NextResponse } from "next/server";
import { upstreamFetch } from "@/lib/server/upstream";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  const { res: upstream, payload } = await upstreamFetch(
    "/auth/forgot-password",
    {
      method: "POST",
      body: JSON.stringify(body),
    },
  );

  return NextResponse.json(payload ?? null, { status: upstream.status });
}
