export type DeviceType =
  | "LIGHT"
  | "FAN"
  | "BELL"
  | "DOOR"
  | "SENSOR_NODE"
  | "POWER_METER"
  | "OTHER";

export type DeviceDTO = {
  id: number;
  deviceName: string;
  roomId: number | null;
  status: boolean;
  updatedAt: string;
  lastSeenAt: string | null;
  mqttClientId: string | null;
  deviceKey: string | null;
  deviceType: DeviceType;
  capabilities: unknown | null;
  pairedByUserId: number;
  homeId: number;
};

export type DeviceCreateRequest = {
  deviceName: string;
  roomId?: number | null;
  mqttClientId?: string;
  deviceKey?: string | null;
  deviceType?: DeviceType;
  capabilities?: unknown | null;
};

export type DeviceUpdateRequest = {
  deviceName?: string;
  roomId?: number | null;
  status?: boolean;
  lastSeenAt?: string | null;
  mqttClientId?: string | null;
  deviceKey?: string | null;
  deviceType?: DeviceType;
  capabilities?: unknown | null;
};
