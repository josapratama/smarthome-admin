export type OverviewDTO = {
  users: number;
  homes: number;
  devices: number;
  onlineDevices: number;
  offlineDevices: number;
  pendingInvitesCount?: number;
  homesList?: Array<{
    id: number;
    name: string;
    city: string | null;
    roleInHome: string;
    devicesOnline: number;
    devicesOffline: number;
    openAlarms: number;
  }>;
};
