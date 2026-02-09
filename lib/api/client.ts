import { cookies } from "next/headers";
import { ApiError } from "./https";

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

async function readPayload(res: Response): Promise<unknown> {
  const isJson = res.headers.get("content-type")?.includes("application/json");
  if (isJson) {
    try {
      return await res.json();
    } catch {
      return null;
    }
  }
  try {
    return await res.text();
  } catch {
    return null;
  }
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  const res = await fetch(`${getBaseUrl()}${getApiPrefix()}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });

  const payload = await readPayload(res);

  if (!res.ok)
    throw new ApiError(res.status, `API Error: ${res.status}`, payload);

  return payload as T;
}

export async function apiUpload<T>(path: string, form: FormData): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  const res = await fetch(`${getBaseUrl()}${getApiPrefix()}${path}`, {
    method: "POST",
    headers: {
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      // jangan set content-type untuk FormData; biar boundary otomatis
    },
    body: form,
    cache: "no-store",
  });

  const payload = await readPayload(res);

  if (!res.ok)
    throw new ApiError(res.status, `API Error: ${res.status}`, payload);

  return payload as T;
}
