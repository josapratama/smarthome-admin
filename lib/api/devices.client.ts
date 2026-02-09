import { apiJson } from "./https";
import type { Device } from "./types";
import { normalizeList } from "./normalize";

type ApiListResponse<T> = { data: T };

export async function fetchDevices(): Promise<Device[]> {
  const payload = await apiJson<Device[] | ApiListResponse<Device[]>>(
    `/api/devices`,
    {
      method: "GET",
    },
  );
  return normalizeList(payload);
}

export async function fetchDevice(deviceId: number): Promise<Device> {
  return apiJson<Device>(`/api/devices/${deviceId}`, { method: "GET" });
}
