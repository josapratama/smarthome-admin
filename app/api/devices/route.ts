// app/api/devices/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { upstreamFetch } from "@/lib/api/server/upstream";

export async function GET(req: Request) {
  const jar = await cookies();
  const token = jar.get("admin_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // pass query params (homeId/status) kalau ada
  const url = new URL(req.url);
  const qs = url.searchParams.toString();
  const path = qs ? `/devices?${qs}` : "/devices";

  const { res, payload } = await upstreamFetch(path, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json(payload ?? { message: "Failed" }, {
      status: res.status,
    });
  }

  // backend returns { data: [...] }
  return NextResponse.json(payload);
}
