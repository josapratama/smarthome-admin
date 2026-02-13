import "server-only";

export function normalizeToken(token?: string | null) {
  if (!token) return null;
  let t = token.replace(/^"+|"+$/g, "");
  t = t.replace(/^Bearer\s+/i, "");
  return t;
}

export function shouldSetJsonContentType(body: unknown) {
  return !(typeof FormData !== "undefined" && body instanceof FormData);
}

export function toHeaders(initHeaders?: HeadersInit) {
  return new Headers(initHeaders ?? {});
}
