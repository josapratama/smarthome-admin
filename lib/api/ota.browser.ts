import { apiFetchBrowser } from "./client-browser";
import type { OtaJob } from "./types";

export type ApiListResponse<T> = { data: T };

export async function fetchOtaJobsByDevice(deviceId: number) {
  const payload = await apiFetchBrowser<ApiListResponse<OtaJob[]> | OtaJob[]>(
    `/api/ota/devices/${deviceId}/jobs`,
    { method: "GET" },
  );

  // support {data: ...} atau array langsung
  if (Array.isArray(payload)) return payload;
  return payload.data;
}

export async function triggerOta(deviceId: number, releaseId: number) {
  return apiFetchBrowser<{ ok?: boolean; message?: string }>(
    `/api/ota/trigger`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ deviceId, releaseId }),
    },
  );
}

export async function fetchOtaJobDetail(jobId: number) {
  return apiFetchBrowser<OtaJob>(`/api/ota/jobs/${jobId}`, { method: "GET" });
}
