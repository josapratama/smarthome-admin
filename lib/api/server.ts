import { cookies, headers } from "next/headers";
import { ApiError, pickMessage } from "./errors";
import { readPayload } from "./payload";

export type FetchRawResult<T = unknown> = {
  res: Response;
  payload: T | null;
};

function normalizeToken(token?: string | null) {
  if (!token) return null;
  let t = token.replace(/^"+|"+$/g, ""); // buang quote kalau ada
  t = t.replace(/^Bearer\s+/i, ""); // buang Bearer kalau kebawa ke cookie
  return t;
}

// =========================
// BACKEND URL builder (1 sumber)
// =========================
function getBackendBase() {
  const base = process.env.BACKEND_BASE_URL?.trim();
  if (!base) throw new Error("Missing BACKEND_BASE_URL");
  return base.replace(/\/+$/, "");
}

function getBackendPrefix() {
  const raw = (process.env.BACKEND_API_PREFIX ?? "").trim();
  if (!raw) return "";
  return `/${raw}`.replace(/^\/+/, "/").replace(/\/+$/, "");
}

function joinBackendUrl(path: string) {
  const base = getBackendBase();
  const prefix = getBackendPrefix();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${prefix}${p}`;
}

type BackendAuthMode =
  | { auth: "none" }
  | { auth: "admin_cookie" }
  | { auth: "token"; token: string };

function shouldSetJsonContentType(body: unknown) {
  // jangan set content-type kalau FormData
  return !(typeof FormData !== "undefined" && body instanceof FormData);
}

function toHeaders(initHeaders?: HeadersInit) {
  return new Headers(initHeaders ?? {});
}

// =========================
// BACKEND fetch (RAW + THROW)
// =========================
export async function backendFetchRaw<T = unknown>(
  path: string,
  init: RequestInit = {},
  auth: BackendAuthMode = { auth: "admin_cookie" },
): Promise<FetchRawResult<T>> {
  const url = joinBackendUrl(path);

  const h = toHeaders(init.headers);

  // inject auth
  if (auth.auth === "token") {
    h.set("authorization", `Bearer ${normalizeToken(auth.token) ?? ""}`);
  } else if (auth.auth === "admin_cookie") {
    const jar = await cookies();
    const token = normalizeToken(jar.get("admin_token")?.value);
    if (token) h.set("authorization", `Bearer ${token}`);
  }

  // default JSON content-type (kecuali FormData)
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

// =========================
// NEXT internal fetch (RAW + THROW)
// dipakai kalau kamu mau call /api/... (Next route) dari Server Component
// =========================
async function getAppOrigin() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  if (!host) throw new Error("Missing host header");
  return `${proto}://${host}`;
}

async function getCookieHeaderFromJar() {
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

  // forward cookies supaya route handler bisa baca admin_token
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

export type OverviewData = {
  users: number;
  homes: number;
  devices: number;
  onlineDevices: number;
  offlineDevices: number;
  pendingInvitesCount: number;
  homesList: Array<{
    id: number;
    name: string;
    city: string | null;
    updatedAt: string;
    roleInHome: string;
    devicesOnline: number;
    devicesOffline: number;
    openAlarms: number;
  }>;
};

export async function getOverview(): Promise<OverviewData> {
  // Panggil Next route internal, bukan backend langsung
  return appFetch<OverviewData>("/api/admin/overview", { method: "GET" });
}
