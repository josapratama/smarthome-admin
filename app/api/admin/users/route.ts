import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/server/auth-cookies";
import { upstreamFetch } from "@/lib/server/upstream";

export async function GET() {
  const token = getAccessToken();
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { res: upstream, payload } = await upstreamFetch("/auth/admin/users", {
    method: "GET",
    headers: { authorization: `Bearer ${token}` },
  });

  return NextResponse.json(payload ?? null, { status: upstream.status });
}
