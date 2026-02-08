import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // protect all admin routes
  const isAdminRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/devices") ||
    pathname.startsWith("/firmware") ||
    pathname.startsWith("/ota") ||
    pathname.startsWith("/monitoring");

  if (!isAdminRoute) return NextResponse.next();

  const token = req.cookies.get("admin_token")?.value;
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/devices/:path*",
    "/firmware/:path*",
    "/ota/:path*",
    "/monitoring/:path*",
  ],
};
