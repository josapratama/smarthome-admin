export type CommandStatus =
  | "PENDING"
  | "SENT"
  | "ACKNOWLEDGED"
  | "FAILED"
  | "TIMEOUT";

export type CommandDTO = {
  id: number;
  deviceId: number;
  command: string;
  payload: unknown | null;
  status: CommandStatus;
  sentAt: string | null;
  acknowledgedAt: string | null;
  createdAt: string;
};

export type CommandCreateRequest = {
  deviceId: number;
  command: string;
  payload?: unknown | null;
};
