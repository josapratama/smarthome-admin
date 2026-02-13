export function getBackendBase() {
  const base = process.env.BACKEND_BASE_URL?.replace(/\/+$/, "");
  const prefixRaw = (process.env.BACKEND_API_PREFIX ?? "").trim();

  const prefix = prefixRaw
    ? `/${prefixRaw}`.replace(/^\/+/, "/").replace(/\/+$/, "")
    : "";

  if (!base) throw new Error("Missing BACKEND_BASE_URL");
  return { base, prefix };
}

export async function upstreamFetch(path: string, init: RequestInit) {
  const { base, prefix } = getBackendBase();
  const p = path.startsWith("/") ? path : `/${path}`;
  const url = `${base}${prefix}${p}`;

  const res = await fetch(url, {
    ...init,
    headers: {
      ...(init.headers ?? {}),
      "content-type": "application/json",
    },
    cache: "no-store",
  });

  const payload = await res.json().catch(() => null);
  return { res, payload };
}
