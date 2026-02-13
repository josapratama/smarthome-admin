export type InviteStatus = "PENDING" | "ACCEPTED" | "EXPIRED" | "REVOKED";

export type HomeInviteTokenDTO = {
  id: number;
  homeId: number;
  token: string;
  invitedEmail: string;
  roleInHome: string;
  status: InviteStatus;
  expiresAt: string;
  createdAt: string;
  usedAt: string | null;
};

export type InviteCreateRequest = {
  homeId: number;
  invitedEmail: string;
  roleInHome?: string;
};
