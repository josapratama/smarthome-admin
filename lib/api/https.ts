export type ApiErrorPayload = unknown;

export class ApiError extends Error {
  status: number;
  payload: ApiErrorPayload;

  constructor(
    status: number,
    message: string,
    payload: ApiErrorPayload = null,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

type FetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function pickMessage(payload: unknown, status: number) {
  if (typeof payload === "string" && payload.trim()) return payload;
  if (isRecord(payload)) {
    const msg = payload["message"];
    const err = payload["error"];
    if (typeof msg === "string" && msg) return msg;
    if (typeof err === "string" && err) return err;
  }
  return `Request failed (${status})`;
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

export async function apiJson<T>(
  input: string,
  init?: FetchOptions,
): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    body: init?.body !== undefined ? JSON.stringify(init.body) : undefined,
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    const payload = await readPayload(res);
    throw new ApiError(
      res.status,
      pickMessage(payload, res.status),
      payload as ApiErrorPayload,
    );
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}
