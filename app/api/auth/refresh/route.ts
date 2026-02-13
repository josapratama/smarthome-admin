// app/api/auth/refresh/route.ts
import { NextResponse } from "next/server";
import {
  getRefreshToken,
  setAuthCookies,
  clearAuthCookies,
} from "@/lib/server/auth-cookies";
import { upstreamFetch } from "@/lib/server/upstream";
import { cookies } from "next/headers";

export async function POST() {
  const jar = await cookies();

  const refreshToken = await getRefreshToken();
  const sessionId = jar.get("admin_session_id")?.value ?? null;

  if (!refreshToken || !sessionId) {
    await clearAuthCookies();
    return NextResponse.json(
      { message: "No refresh session" },
      { status: 401 },
    );
  }

  const { res, payload } = await upstreamFetch("/api/v1/refresh", {
    method: "POST",
    body: JSON.stringify({
      sessionId: Number(sessionId),
      refreshToken,
    }),
  });

  if (!res.ok) {
    await clearAuthCookies();
    return NextResponse.json(payload ?? { message: "Refresh gagal" }, {
      status: 401,
    });
  }

  const data = payload?.data;
  if (!data?.accessToken) {
    await clearAuthCookies();
    return NextResponse.json(
      { message: "Backend tidak mengirim accessToken" },
      { status: 502 },
    );
  }

  // refresh rotate token -> set cookie baru
  await setAuthCookies(data.accessToken, data.refreshToken);

  const resp = NextResponse.json({ ok: true }, { status: 200 });

  // update sessionId jika backend ngasih (biasanya sama)
  if (data.sessionId) {
    resp.cookies.set("admin_session_id", String(data.sessionId), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }

  return resp;
}
