import "server-only";

export type FetchRawResult<T = unknown> = {
  res: Response;
  payload: T | null;
};

export type BackendAuthMode =
  | { auth: "none" }
  | { auth: "admin_cookie" }
  | { auth: "token"; token: string };
