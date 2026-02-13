export const API = {
  auth: {
    login: "/api/auth/login",
    logout: "/api/auth/logout",
    refresh: "/api/auth/refresh",
    me: "/api/auth/me",
    changePassword: "/api/auth/change-password",
    forgotPassword: "/api/auth/forgot-password",
    resetPassword: "/api/auth/reset-password",
  },

  admin: {
    overview: "/api/admin/overview",
    users: "/api/admin/users",
  },

  homes: {
    list: "/api/homes",
    detail: (homeId: number) => `/api/homes/${homeId}`,
    devices: (homeId: number) => `/api/homes/${homeId}/devices`,
  },

  devices: {
    list: "/api/devices",
    detail: (deviceId: number) => `/api/devices/${deviceId}`,
  },

  firmware: {
    releases: "/api/firmware/releases",
    upload: "/api/firmware/releases",
    download: (releaseId: number) =>
      `/api/firmware/releases/${releaseId}/download`,
  },

  ota: {
    trigger: "/api/ota/trigger",
    devices: (deviceId: number) => `/api/ota/devices/${deviceId}`,
    jobsByDevice: (deviceId: number) => `/api/ota/devices/${deviceId}/jobs`,
    jobDetail: (otaJobId: number) => `/api/ota/jobs/${otaJobId}`,
  },

  monitoring: {
    commands: "/api/monitoring/commands",
  },
} as const;
