// lib/api/queries.ts
export const qk = {
  // Overview
  overview: () => ["overview"] as const,

  // Auth
  me: () => ["auth", "me"] as const,

  // Homes
  homes: (params?: Record<string, unknown>) => ["homes", params] as const,
  home: (id: number) => ["homes", id] as const,
  homeRooms: (homeId: number) => ["homes", homeId, "rooms"] as const,
  homeDevices: (homeId: number) => ["homes", homeId, "devices"] as const,

  // Rooms
  rooms: (homeId?: number) => ["rooms", homeId] as const,
  room: (id: number) => ["rooms", id] as const,

  // Devices
  devices: (params?: Record<string, unknown>) => ["devices", params] as const,
  device: (id: number) => ["devices", id] as const,
  deviceTelemetry: (deviceId: number, params?: Record<string, unknown>) =>
    ["devices", deviceId, "telemetry", params] as const,

  // Commands
  commands: (params?: Record<string, unknown>) => ["commands", params] as const,
  command: (id: number) => ["commands", id] as const,

  // Alarms
  alarms: (params?: Record<string, unknown>) => ["alarms", params] as const,
  alarm: (id: number) => ["alarms", id] as const,

  // Notifications
  notificationEndpoints: () => ["notifications", "endpoints"] as const,
  notificationLogs: (params?: Record<string, unknown>) =>
    ["notifications", "logs", params] as const,

  // Firmware
  firmwareReleases: () => ["firmware", "releases"] as const,
  firmwareRelease: (id: number) => ["firmware", "releases", id] as const,

  // OTA
  otaJobs: (params?: Record<string, unknown>) =>
    ["ota", "jobs", params] as const,
  otaJob: (id: number) => ["ota", "jobs", id] as const,
  otaJobsByDevice: (deviceId: number) =>
    ["ota", "device-jobs", deviceId] as const,
  otaJobDetail: (jobId: number) => ["ota", "job", jobId] as const,

  // Invites
  invites: (params?: Record<string, unknown>) => ["invites", params] as const,
  invite: (id: number) => ["invites", id] as const,

  // Monitoring
  heartbeat: () => ["monitoring", "heartbeat"] as const,
};
