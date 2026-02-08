import { apiFetch, apiUpload } from "./client";
import { API } from "./endpoints";

/** Dashboard */
export type OverviewResponse = {
  users: number;
  homes: number;
  devices: number;
  onlineDevices: number;
  offlineDevices: number;
};

export async function getOverview() {
  return apiFetch<OverviewResponse>(API.admin.overview);
}

/** Devices */
export type DeviceListItem = {
  id: number;
  name?: string | null;
  status?: boolean | null; // online/offline
  lastSeenAt?: string | null; // sesuaikan field asli (kalau beda, ganti)
  homeId?: number | null;
};

export async function listDevices() {
  // asumsi backend return { data: DeviceDTO[] }
  return apiFetch<{ data: DeviceListItem[] }>(API.devices.list);
}

/** Firmware */
export type FirmwareRelease = {
  id: number;
  version: string;
  createdAt?: string;
};

export async function listFirmwareReleases() {
  return apiFetch<{ data: FirmwareRelease[] }>(API.firmware.releases);
}

/** OTA */
export type OtaJob = {
  id: number;
  deviceId: number;
  status: "SENT" | "DOWNLOADING" | "APPLIED" | "FAILED" | "TIMEOUT" | string;
  createdAt?: string;
};

export async function listOtaJobsByDevice(deviceId: number) {
  return apiFetch<{ data: OtaJob[] }>(API.ota.jobsByDevice(deviceId));
}

/** Monitoring */
export type CommandHistoryItem = {
  id: number;
  deviceId: number;
  status: "PENDING" | "SENT" | "ACKED" | "FAILED" | "TIMEOUT" | string;
  createdAt?: string;
};

export async function listCommands() {
  return apiFetch<{ data: CommandHistoryItem[] }>(API.monitoring.commands);
}

export type UploadFirmwareResponse = {
  data?: unknown;
  message?: string;
};

export async function uploadFirmwareRelease(input: {
  version: string;
  notes?: string;
  file: File;
}) {
  const form = new FormData();
  form.append("version", input.version);
  if (input.notes) form.append("notes", input.notes);
  form.append("file", input.file);

  return apiUpload<UploadFirmwareResponse>(API.firmware.upload, form);
}
