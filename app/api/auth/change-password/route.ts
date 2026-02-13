import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/api/server/auth-cookies";
import { upstreamFetch } from "@/lib/api/server/upstream";

export async function POST(req: Request) {
  const token = getAccessToken();
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));

  const { res: upstream, payload } = await upstreamFetch("/change-password", {
    method: "POST",
    headers: { authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });

  return NextResponse.json(payload ?? null, { status: upstream.status });
}
