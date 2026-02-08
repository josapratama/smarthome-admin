class ApiError extends Error {
  status: number;
  payload: unknown;
  constructor(status: number, payload: unknown) {
    super(`API Error: ${status}`);
    this.status = status;
    this.payload = payload;
  }
}

export async function apiFetchBrowser<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  // token tidak diambil di browser karena kita simpan di httpOnly cookie.
  // Solusi: panggil endpoint Next (/api/...) atau backend yang pakai cookie-based auth.
  const res = await fetch(path, { ...init, cache: "no-store" });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const payload = isJson
    ? await res.json().catch(() => null)
    : await res.text().catch(() => null);

  if (!res.ok) throw new ApiError(res.status, payload);
  return payload as T;
}
