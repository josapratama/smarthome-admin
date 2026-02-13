// lib/api/normalize.ts
export type ApiListResponse<T> = { data: T };

export function normalizeList<T>(payload: T[] | ApiListResponse<T[]>): T[] {
  return Array.isArray(payload) ? payload : payload.data;
}
