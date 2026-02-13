export type OtaJobStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED";

export type OtaJobDTO = {
  id: number;
  deviceId: number;
  firmwareReleaseId: number;
  status: OtaJobStatus;
  progress: number;
  errorMessage: string | null;
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string;
};

export type OtaTriggerRequest = {
  deviceId: number;
  firmwareReleaseId: number;
};
