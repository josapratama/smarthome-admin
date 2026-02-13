import "server-only";
import { backendFetchRaw } from "./backend";
import type { FetchRawResult } from "./types";

export type ApiEnvelope<T> = {
  data?: T;
  message?: string;
  error?: string;
};

export async function upstreamFetch<T = unknown>(
  path: string,
  init: RequestInit = {},
): Promise<FetchRawResult<ApiEnvelope<T>>> {
  return backendFetchRaw<ApiEnvelope<T>>(path, init, { auth: "none" });
}
