export type UserDTO = {
  id: number;
  username: string;
  email: string;
  role: "USER" | "ADMIN" | string; // kalau nanti ada role lain, tetap aman
  createdAt: string; // ISO string
};

export type HomeDTO = {
  id: number;
  name: string;
  ownerUserId: number;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
};

export type AuthLoginData = {
  accessToken: string;
  refreshToken?: string;
  sessionId: number | string;
  user: UserDTO;
};

export type AuthRefreshData = {
  accessToken: string;
  refreshToken?: string;
  sessionId?: number | string;
};
