import "server-only";
import { upstreamFetch } from "./upstream";
import type { AuthLoginData, AuthRefreshData } from "../dto/auth";

export const authUpstream = {
  login: (username: string, password: string) =>
    upstreamFetch<AuthLoginData>("/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),

  refresh: (sessionId: number, refreshToken: string) =>
    upstreamFetch<AuthRefreshData>("/refresh", {
      method: "POST",
      body: JSON.stringify({ sessionId, refreshToken }),
    }),
};
