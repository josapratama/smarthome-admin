import { ApiError, pickMessage } from "./errors";
import { readPayload } from "./payload";

type BrowserFetchOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
  retryOn401?: boolean;
};

async function doFetch(path: string, init: BrowserFetchOptions) {
  return fetch(path, {
    ...init,
    headers: { ...(init.headers ?? {}) },
    credentials: "include",
    cache: "no-store",
  });
}

export async function apiFetchBrowser<T>(
  path: string,
  init: BrowserFetchOptions = {},
): Promise<T> {
  const retryOn401 = init.retryOn401 ?? true;

  let res = await doFetch(path, init);

  if (res.status === 401 && retryOn401) {
    const r = await doFetch("/api/auth/refresh", {
      method: "POST",
      retryOn401: false,
    });
    if (r.ok) {
      res = await doFetch(path, { ...init, retryOn401: false });
    }
  }

  const payload = await readPayload(res);

  if (!res.ok) {
    throw new ApiError(res.status, pickMessage(payload, res.status), payload);
  }

  return payload as T;
}
