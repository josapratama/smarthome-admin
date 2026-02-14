/**
 * Alarm DTOs
 */

export interface AlarmEventDTO {
  id: number;
  deviceId: number;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  message: string;
  source: "DEVICE" | "BACKEND" | "AI";
  isAcknowledged: boolean;
  createdAt: string;
}
