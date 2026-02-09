import { ApiError } from "./https";

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

export async function apiFetchBrowser<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  // token tidak diambil di browser karena httpOnly cookie.
  // Panggil endpoint Next (/api/...) yang akan meneruskan auth.
  const res = await fetch(path, {
    ...init,
    cache: "no-store",
    credentials: "include",
  });

  const payload = await readPayload(res);

  if (!res.ok) {
    throw new ApiError(res.status, `API Error: ${res.status}`, payload);
  }

  return payload as T;
}
