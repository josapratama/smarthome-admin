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
  status?: boolean | null; // online/offline (kalau backend pakai ini)
  lastSeenAt?: string | null;
  homeId?: number | null;
};

export async function listDevices() {
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

/** OTA */
export type ServerOtaJob = {
  id: number;
  deviceId: number;
  status: string;
  createdAt?: string;
};

export async function listOtaJobsByDevice(deviceId: number) {
  return apiFetch<{ data: ServerOtaJob[] }>(API.ota.jobsByDevice(deviceId));
}

/** Monitoring */
export type CommandHistoryItem = {
  id: number;
  deviceId: number;
  status: string;
  createdAt?: string;
};

export async function listCommands() {
  return apiFetch<{ data: CommandHistoryItem[] }>(API.monitoring.commands);
}
