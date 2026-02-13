import "server-only";

import { cookies, headers } from "next/headers";
import { ApiError, pickMessage } from "../errors";
import { readPayload } from "../payload";

import { shouldSetJsonContentType, toHeaders } from "./helpers";
import type { FetchRawResult } from "./types";

export async function getAppOrigin() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  if (!host) throw new Error("Missing host header");
  return `${proto}://${host}`;
}

export async function getCookieHeaderFromJar() {
  const jar = await cookies();
  const all = jar.getAll();
  if (!all.length) return "";
  return all.map(({ name, value }) => `${name}=${value}`).join("; ");
}

export async function appFetchRaw<T = unknown>(
  path: string,
  init: RequestInit = {},
): Promise<FetchRawResult<T>> {
  const origin = await getAppOrigin();
  const p = path.startsWith("/") ? path : `/${path}`;
  const url = `${origin}${p}`;

  const h = toHeaders(init.headers);

  if (!h.has("cookie")) {
    const cookieHeader = await getCookieHeaderFromJar();
    if (cookieHeader) h.set("cookie", cookieHeader);
  }

  if (!h.has("content-type") && shouldSetJsonContentType(init.body)) {
    h.set("content-type", "application/json");
  }

  const res = await fetch(url, { ...init, headers: h, cache: "no-store" });
  const payload = (await readPayload(res)) as T | null;

  return { res, payload };
}

export async function appFetch<T = unknown>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const { res, payload } = await appFetchRaw<T>(path, init);

  if (!res.ok) {
    throw new ApiError(res.status, pickMessage(payload, res.status), payload);
  }

  return payload as T;
}
