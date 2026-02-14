/**
 * OTA (Over-The-Air) Update DTOs
 */

export interface OtaJobDTO {
  id: number;
  deviceId: number;
  firmwareReleaseId: number;
  status: string;
  progress?: number;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
}

export interface OtaTriggerRequest {
  deviceId: number;
  firmwareReleaseId: number;
}
