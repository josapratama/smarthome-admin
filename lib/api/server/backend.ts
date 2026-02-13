import "server-only";

import { cookies } from "next/headers";
import { ApiError, pickMessage } from "../errors";
import { readPayload } from "../payload";

import { joinBackendUrl } from "./backend-url";
import { normalizeToken, shouldSetJsonContentType, toHeaders } from "./helpers";
import type { BackendAuthMode, FetchRawResult } from "./types";

export async function backendFetchRaw<T = unknown>(
  path: string,
  init: RequestInit = {},
  auth: BackendAuthMode = { auth: "admin_cookie" },
): Promise<FetchRawResult<T>> {
  const url = joinBackendUrl(path);
  const h = toHeaders(init.headers);

  if (auth.auth === "token") {
    h.set("authorization", `Bearer ${normalizeToken(auth.token) ?? ""}`);
  } else if (auth.auth === "admin_cookie") {
    const jar = await cookies();
    const token = normalizeToken(jar.get("admin_token")?.value);
    if (token) h.set("authorization", `Bearer ${token}`);
  }

  if (!h.has("content-type") && shouldSetJsonContentType(init.body)) {
    h.set("content-type", "application/json");
  }

  const res = await fetch(url, { ...init, headers: h, cache: "no-store" });
  const payload = (await readPayload(res)) as T | null;

  return { res, payload };
}

export async function backendFetch<T = unknown>(
  path: string,
  init: RequestInit = {},
  auth: BackendAuthMode = { auth: "admin_cookie" },
): Promise<T> {
  const { res, payload } = await backendFetchRaw<T>(path, init, auth);

  if (!res.ok) {
    throw new ApiError(res.status, pickMessage(payload, res.status), payload);
  }

  return payload as T;
}

export async function backendUpload<T = unknown>(
  path: string,
  form: FormData,
  auth: BackendAuthMode = { auth: "admin_cookie" },
): Promise<T> {
  const { res, payload } = await backendFetchRaw<T>(
    path,
    { method: "POST", body: form },
    auth,
  );

  if (!res.ok) {
    throw new ApiError(res.status, pickMessage(payload, res.status), payload);
  }

  return payload as T;
}
