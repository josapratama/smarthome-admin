// lib/api/endpoints.ts

// Konvensi:
// - Semua endpoint dikelompokkan per domain
// - Tidak ada top-level endpoint yang "nyempil"
// - Yang dynamic pakai function

export const API = {
  auth: {
    login: "/auth/login",
    me: "/auth/me",
  },

  admin: {
    users: "/admin/users",
    overview: "/admin/overview", // ✅ Opsi B: endpoint overview real di backend
  },

  homes: {
    list: "/homes",
    detail: (homeId: number) => `/homes/${homeId}`,
    devices: (homeId: number) => `/homes/${homeId}/devices`,
  },

  devices: {
    list: "/devices",
    detail: (deviceId: number) => `/devices/${deviceId}`,
  },

  firmware: {
    releases: "/firmware/releases",
    upload: "/firmware/releases",
    download: (releaseId: number) => `/firmware/releases/${releaseId}/download`,
  },

  ota: {
    trigger: "/ota/trigger",
    devices: (deviceId: number) => `/ota/devices/${deviceId}`,
    jobsByDevice: (deviceId: number) => `/ota/devices/${deviceId}/jobs`,
    jobDetail: (otaJobId: number) => `/ota/jobs/${otaJobId}`,
  },

  monitoring: {
    commands: "/monitoring/commands",
  },
} as const;

// Helper optional: bikin pemakaian endpoint makin konsisten
export const path = <T extends string>(p: T) => p;
