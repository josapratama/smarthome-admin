import { cookies } from "next/headers";

class ApiError extends Error {
  status: number;
  payload: unknown;
  constructor(status: number, payload: unknown) {
    super(`API Error: ${status}`);
    this.status = status;
    this.payload = payload;
  }
}

function getBaseUrl() {
  const base = process.env.BACKEND_BASE_URL;
  if (!base) throw new Error("Missing BACKEND_BASE_URL");
  return base.replace(/\/$/, "");
}

function getApiPrefix() {
  const p = process.env.BACKEND_API_PREFIX ?? "";
  return p.startsWith("/") ? p : `/${p}`;
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const cookieStore = await cookies(); // ✅ penting
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

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const payload = isJson
    ? await res.json().catch(() => null)
    : await res.text().catch(() => null);

  if (!res.ok) throw new ApiError(res.status, payload);
  return payload as T;
}

export { ApiError };
