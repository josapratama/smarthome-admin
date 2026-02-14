/**
 * Server-side utility to call upstream backend API
 * Used in Next.js API routes to proxy authentication requests
 */

const BACKEND_URL = process.env.BACKEND_BASE_URL || "http://localhost:3000";
const API_PREFIX = process.env.BACKEND_API_PREFIX || "/api/v1";

interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    sessionId: number;
    user: {
      id: number;
      username: string;
      email: string;
      role: "USER" | "ADMIN";
      createdAt: string;
    };
  };
}

interface ErrorResponse {
  error: string;
  message?: string;
}

export const authUpstream = {
  async login(username: string, password: string) {
    const url = `${BACKEND_URL}${API_PREFIX}/login`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const payload = await res.json().catch(() => null);

      return { res, payload: payload as LoginResponse | ErrorResponse };
    } catch (error) {
      return {
        res: { ok: false, status: 500 } as Response,
        payload: { error: "NETWORK_ERROR", message: String(error) },
      };
    }
  },

  async refresh(sessionId: number, refreshToken: string) {
    const url = `${BACKEND_URL}${API_PREFIX}/refresh`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, refreshToken }),
      });

      const payload = await res.json().catch(() => null);

      return { res, payload: payload as LoginResponse | ErrorResponse };
    } catch (error) {
      return {
        res: { ok: false, status: 500 } as Response,
        payload: { error: "NETWORK_ERROR", message: String(error) },
      };
    }
  },

  async logout(sessionId: number) {
    const url = `${BACKEND_URL}${API_PREFIX}/logout`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      return { res };
    } catch (error) {
      return {
        res: { ok: false, status: 500 } as Response,
      };
    }
  },
};
