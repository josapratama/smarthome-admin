export type UserDTO = {
  id: number;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: string;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  data: {
    accessToken: string;
    refreshToken: string;
    sessionId: number;
    user: UserDTO;
  };
};

export type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type ForgotPasswordRequest = {
  username: string;
};

export type ResetPasswordRequest = {
  token: string;
  newPassword: string;
};
