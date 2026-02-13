export type FirmwareReleaseDTO = {
  id: number;
  version: string;
  deviceType: string;
  filePath: string;
  fileSize: number;
  checksum: string;
  releaseNotes: string | null;
  isStable: boolean;
  createdAt: string;
};

export type FirmwareUploadRequest = {
  version: string;
  deviceType: string;
  releaseNotes?: string;
  isStable?: boolean;
};
