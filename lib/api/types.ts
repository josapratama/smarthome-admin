export type Device = {
  id: number;
  name?: string | null;
  serial?: string | null;

  online?: boolean | null;
  lastSeen?: string | null; // ISO
};

export type OtaJob = {
  id: number;
  deviceId: number;

  releaseId?: number;
  status: string;
  progress?: number | null;

  createdAt?: string;
  updatedAt?: string;

  error?: string | null;
  logs?: string | null;
};
