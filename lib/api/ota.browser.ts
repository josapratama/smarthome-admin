import { apiFetchBrowser } from "./client.browser";
import { normalizeList } from "./normalize";
import type { OtaJob } from "./types";
import { API } from "./endpoints";

export async function fetchOtaJobsByDevice(deviceId: number) {
  const payload = await apiFetchBrowser<OtaJob[] | { data: OtaJob[] }>(
    API.ota.jobsByDevice(deviceId),
    { method: "GET" },
  );
  return normalizeList(payload);
}

export async function triggerOta(deviceId: number, releaseId: number) {
  return apiFetchBrowser<{ ok?: boolean; message?: string }>(API.ota.trigger, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ deviceId, releaseId }),
  });
}

export async function fetchOtaJobDetail(jobId: number) {
  return apiFetchBrowser<OtaJob>(API.ota.jobDetail(jobId), { method: "GET" });
}
