export const qk = {
  devices: () => ["devices"] as const,
  device: (id: number) => ["devices", id] as const,

  otaJobsByDevice: (deviceId: number) =>
    ["ota", "device-jobs", deviceId] as const,
  otaJobDetail: (jobId: number) => ["ota", "job", jobId] as const,
};
