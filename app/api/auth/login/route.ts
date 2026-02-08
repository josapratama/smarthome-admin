import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  const base = process.env.BACKEND_BASE_URL?.replace(/\/$/, "");
  const prefixRaw = process.env.BACKEND_API_PREFIX ?? "";
  const prefix = prefixRaw
    ? prefixRaw.startsWith("/")
      ? prefixRaw
      : `/${prefixRaw}`
    : "";

  if (!base)
    return NextResponse.json(
      { message: "Missing BACKEND_BASE_URL" },
      { status: 500 },
    );

  // OpenAPI: POST /api/v1/auth/login
  const upstream = await fetch(`${base}${prefix}/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body), // expects { identifier, password }
  });

  const payload = await upstream.json().catch(() => null);

  if (!upstream.ok) {
    return NextResponse.json(payload ?? { message: "Login failed" }, {
      status: upstream.status,
    });
  }

  // OpenAPI: AuthLoginResponse -> payload.data.accessToken
  const token = payload?.data?.accessToken;
  if (!token) {
    return NextResponse.json(
      { message: "Missing accessToken from backend" },
      { status: 502 },
    );
  }

  const res = NextResponse.json({
    ok: true,
    user: payload?.data?.user ?? null,
  });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  return res;
}
