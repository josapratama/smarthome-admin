import { NextResponse } from "next/server";
import { setAuthCookies } from "@/lib/api/server/auth-cookies";
import { authUpstream } from "@/lib/api/server/auth-upstream";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body?.username || !body?.password) {
    return NextResponse.json(
      { message: "username dan password wajib" },
      { status: 400 },
    );
  }

  const { res, payload } = await authUpstream.login(
    String(body.username),
    String(body.password),
  );

  if (!res.ok) {
    return NextResponse.json(payload ?? { message: "Login gagal" }, {
      status: res.status,
    });
  }

  const data = payload?.data;
  if (!data?.accessToken) {
    return NextResponse.json(
      { message: "Backend tidak mengirim accessToken" },
      { status: 502 },
    );
  }

  await setAuthCookies(data.accessToken, data.refreshToken);

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
