import { apiFetchServer, apiUploadServer } from "./client.server";
import { API } from "./endpoints";

export type OverviewResponse = {
  users: number;
  homes: number;
  devices: number;
  onlineDevices: number;
  offlineDevices: number;
  pendingInvitesCount?: number;
  homesList?: Array<{
    id: number;
    name: string;
    city?: string | null;
    roleInHome: string;
    devicesOnline: number;
    devicesOffline: number;
    openAlarms: number;
    updatedAt: string;
  }>;
};

export async function getOverview() {
  // ini memanggil NEXT API (bukan backend)
  return apiFetchServer<OverviewResponse>(API.admin.overview, {
    method: "GET",
  });
}

/** Devices */
export type DeviceListItem = {
  id: number;
  name?: string | null;
  status?: boolean | null; // kalau backend pakai status online/offline
  lastSeenAt?: string | null;
  homeId?: number | null;
};

export async function listDevices() {
  return apiFetchServer<{ data: DeviceListItem[] }>(API.devices.list);
}

/** Firmware */
export type FirmwareRelease = {
  id: number;
  version: string;
  createdAt?: string;
};

export async function listFirmwareReleases() {
  return apiFetchServer<{ data: FirmwareRelease[] }>(API.firmware.releases);
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

  return apiUploadServer<UploadFirmwareResponse>(API.firmware.upload, form);
}

/** OTA */
export type ServerOtaJob = {
  id: number;
  deviceId: number;
  status: string;
  createdAt?: string;
};

export async function listOtaJobsByDevice(deviceId: number) {
  return apiFetchServer<{ data: ServerOtaJob[] }>(
    API.ota.jobsByDevice(deviceId),
  );
}

/** Monitoring */
export type CommandHistoryItem = {
  id: number;
  deviceId: number;
  status: string;
  createdAt?: string;
};

export async function listCommands() {
  return apiFetchServer<{ data: CommandHistoryItem[] }>(
    API.monitoring.commands,
  );
}
