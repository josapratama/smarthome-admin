/**
 * Firmware DTOs
 */

export interface FirmwareReleaseDTO {
  id: number;
  version: string;
  description?: string;
  fileUrl: string;
  fileSize: number;
  checksum: string;
  isActive: boolean;
  createdAt: string;
}
