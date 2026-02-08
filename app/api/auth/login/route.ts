import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const base = process.env.BACKEND_BASE_URL?.replace(/\/$/, "");
  const prefix = (process.env.BACKEND_API_PREFIX ?? "").startsWith("/")
    ? (process.env.BACKEND_API_PREFIX ?? "")
    : `/${process.env.BACKEND_API_PREFIX ?? ""}`;

  if (!base)
    return NextResponse.json(
      { message: "Missing BACKEND_BASE_URL" },
      { status: 500 },
    );

  // sesuaikan path backend login kamu di bawah ini jika berbeda
  const upstream = await fetch(`${base}${prefix}/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

  const payload = await upstream.json().catch(() => null);

  if (!upstream.ok) {
    return NextResponse.json(payload ?? { message: "Login failed" }, {
      status: upstream.status,
    });
  }

  // asumsi backend mengembalikan { token: "..." }
  const token = payload?.token;
  if (!token) {
    return NextResponse.json(
      { message: "Missing token from backend" },
      { status: 502 },
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  return res;
}
