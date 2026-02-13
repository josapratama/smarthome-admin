// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { clearAuthCookies } from "@/lib/server/auth-cookies";
import { upstreamFetch } from "@/lib/server/upstream";
import { cookies } from "next/headers";

export async function POST() {
  const jar = await cookies();
  const sessionId = jar.get("admin_session_id")?.value ?? null;

  // best effort logout ke backend
  if (sessionId) {
    await upstreamFetch("/api/v1/logout", {
      method: "POST",
      body: JSON.stringify({ sessionId: Number(sessionId) }),
    }).catch(() => null);
  }

  await clearAuthCookies();

  const resp = NextResponse.json({ ok: true }, { status: 200 });
  resp.cookies.set("admin_session_id", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return resp;
}
