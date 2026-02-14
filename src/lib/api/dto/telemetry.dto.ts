/**
 * Telemetry DTOs
 */

export interface TelemetryDTO {
  id: number;
  deviceId: number;
  timestamp: string;
  data: Record<string, any>;
}
