export type Device = {
  id: number;
  name?: string | null;
  serial?: string | null;

  // status fields (sesuaikan mapping di UI kalau backend pakai nama lain)
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
