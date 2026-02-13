import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/api/server/auth-cookies";
import { upstreamFetch } from "@/lib/api/server/upstream";

export async function GET() {
  const token = getAccessToken();
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { res: upstream, payload } = await upstreamFetch("/me", {
    method: "GET",
    headers: { authorization: `Bearer ${token}` },
  });

  return NextResponse.json(payload ?? null, { status: upstream.status });
}
