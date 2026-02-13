import "server-only";
import { cookies } from "next/headers";

const ACCESS_COOKIE = "admin_token";
const REFRESH_COOKIE = "admin_refresh";

const baseCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function setAuthCookies(
  accessToken: string,
  refreshToken?: string,
) {
  const jar = await cookies();
  jar.set(ACCESS_COOKIE, accessToken, { ...baseCookieOptions });
  if (refreshToken)
    jar.set(REFRESH_COOKIE, refreshToken, { ...baseCookieOptions });
}

export async function clearAuthCookies() {
  const jar = await cookies();
  jar.set(ACCESS_COOKIE, "", { ...baseCookieOptions, maxAge: 0 });
  jar.set(REFRESH_COOKIE, "", { ...baseCookieOptions, maxAge: 0 });
}

export async function getAccessToken() {
  const jar = await cookies();
  return jar.get(ACCESS_COOKIE)?.value ?? null;
}

export async function getRefreshToken() {
  const jar = await cookies();
  return jar.get(REFRESH_COOKIE)?.value ?? null;
}
