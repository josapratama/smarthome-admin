import "server-only";

export function getBackendBase() {
  const base = process.env.BACKEND_BASE_URL?.trim();
  if (!base) throw new Error("Missing BACKEND_BASE_URL");
  return base.replace(/\/+$/, "");
}

export function getBackendPrefix() {
  const raw = (process.env.BACKEND_API_PREFIX ?? "").trim();
  if (!raw) return "";
  return `/${raw}`.replace(/^\/+/, "/").replace(/\/+$/, "");
}

export function joinBackendUrl(path: string) {
  const base = getBackendBase();
  const prefix = getBackendPrefix();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${prefix}${p}`;
}
