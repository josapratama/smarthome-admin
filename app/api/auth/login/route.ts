import { NextResponse } from "next/server";
import { setAuthCookies } from "@/lib/server/auth-cookies";
import { upstreamFetch } from "@/lib/server/upstream";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.username || !body?.password) {
    return NextResponse.json(
      { message: "username dan password wajib" },
      { status: 400 },
    );
  }

  // teruskan ke backend Hono: /api/v1/login
  const { res, payload } = await upstreamFetch("/login", {
    method: "POST",
    body: JSON.stringify({
      username: String(body.username),
      password: String(body.password),
    }),
  });

  if (!res.ok) {
    // backend kamu biasanya balikin {error: "..."} atau {data:...}
    return NextResponse.json(payload ?? { message: "Login gagal" }, {
      status: res.status,
    });
  }

  // backend handlerLogin: { data: { accessToken, refreshToken, sessionId, user } }
  const data = payload?.data;
  if (!data?.accessToken) {
    return NextResponse.json(
      { message: "Backend tidak mengirim accessToken" },
      { status: 502 },
    );
  }

  // simpan cookie httpOnly untuk FE
  await setAuthCookies(data.accessToken, data.refreshToken);

  // simpan sessionId juga (opsional, tapi refresh BE kamu butuh sessionId)
  // RefreshBody backend: { sessionId, refreshToken }
  // Jadi FE perlu simpan sessionId di cookie httpOnly juga.
  const resp = NextResponse.json(
    { data: { user: data.user } },
    { status: 200 },
  );

  resp.cookies.set("admin_session_id", String(data.sessionId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return resp;
}
