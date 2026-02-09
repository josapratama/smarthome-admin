import { NextResponse } from "next/server";
import { cookies } from "next/headers";

function getBaseUrl() {
  const base = process.env.BACKEND_BASE_URL;
  if (!base) throw new Error("Missing BACKEND_BASE_URL");
  return base.replace(/\/$/, "");
}

function getApiPrefix() {
  const p = process.env.BACKEND_API_PREFIX ?? "";
  if (!p) return "";
  return p.startsWith("/") ? p : `/${p}`;
}

export async function GET(
  _: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;

  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  const url = `${getBaseUrl()}${getApiPrefix()}/firmware/releases/${id}/download`;

  const upstream = await fetch(url, {
    method: "GET",
    headers: {
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  });

  const buf = await upstream.arrayBuffer();

  const headers = new Headers();
  const ct = upstream.headers.get("content-type");
  if (ct) headers.set("content-type", ct);

  const cd = upstream.headers.get("content-disposition");
  if (cd) headers.set("content-disposition", cd);

  return new NextResponse(buf, { status: upstream.status, headers });
}
