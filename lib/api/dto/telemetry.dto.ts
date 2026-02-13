export type TelemetryDTO = {
  id: number;
  deviceId: number;
  current: number | null;
  gasPpm: number | null;
  flame: boolean | null;
  binLevel: number | null;
  powerW: number | null;
  energyKwh: number | null;
  timestamp: string;
  createdAt: string;
};
