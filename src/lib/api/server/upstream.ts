/**
 * Server-side utility to call upstream backend API without authentication
 * Used for public endpoints like forgot-password, reset-password
 */

const BACKEND_URL = process.env.BACKEND_BASE_URL || "http://localhost:3000";
const API_PREFIX = process.env.BACKEND_API_PREFIX || "/api/v1";

export async function upstreamFetch<T = any>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const url = `${BACKEND_URL}${API_PREFIX}${path}`;

  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: "UNKNOWN_ERROR",
      message: response.statusText,
    }));

    throw {
      status: response.status,
      ...error,
    };
  }

  return response.json();
}
