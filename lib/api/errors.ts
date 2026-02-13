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

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

export function pickMessage(payload: unknown, status: number) {
  if (typeof payload === "string" && payload.trim()) return payload;

  if (isRecord(payload)) {
    const msg = payload["message"];
    const err = payload["error"];

    if (typeof msg === "string" && msg) return msg;
    if (typeof err === "string" && err) return err;

    // kadang { error: { message: "..." } }
    if (isRecord(err) && typeof err["message"] === "string")
      return err["message"];
  }

  return `Request failed (${status})`;
}
