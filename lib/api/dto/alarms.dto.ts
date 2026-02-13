export type AlarmSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type AlarmStatus = "OPEN" | "ACKNOWLEDGED" | "RESOLVED";

export type AlarmEventDTO = {
  id: number;
  deviceId: number;
  eventType: string;
  severity: AlarmSeverity;
  status: AlarmStatus;
  message: string;
  metadata: unknown | null;
  triggeredAt: string;
  acknowledgedAt: string | null;
  resolvedAt: string | null;
  createdAt: string;
};
