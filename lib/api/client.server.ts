import { cookies } from "next/headers";
import { ApiError, pickMessage } from "./errors";
import { readPayload } from "./payload";

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

function joinUrl(path: string) {
  const base = getBaseUrl();
  const prefix = getApiPrefix();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${prefix}${p}`;
}

export async function apiFetchServer<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const jar = await cookies();
  const token = jar.get("admin_token")?.value;

  const res = await fetch(joinUrl(path), {
    ...init,
    headers: {
      ...(init.headers ?? {}),
      // set json content-type by default (boleh di-override)
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  });

  const payload = await readPayload(res);

  if (!res.ok) {
    throw new ApiError(res.status, pickMessage(payload, res.status), payload);
  }

  return payload as T;
}

export async function apiUploadServer<T>(
  path: string,
  form: FormData,
): Promise<T> {
  const jar = await cookies();
  const token = jar.get("admin_token")?.value;

  const res = await fetch(joinUrl(path), {
    method: "POST",
    headers: {
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      // jangan set content-type FormData
    },
    body: form,
    cache: "no-store",
  });

  const payload = await readPayload(res);

  if (!res.ok) {
    throw new ApiError(res.status, pickMessage(payload, res.status), payload);
  }

  return payload as T;
}
