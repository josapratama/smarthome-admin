import "server-only";

import { appFetch } from "./app";

export type OverviewData = {
  users: number;
  homes: number;
  devices: number;
  onlineDevices: number;
  offlineDevices: number;
  pendingInvitesCount: number;
  homesList: Array<{
    id: number;
    name: string;
    city: string | null;
    updatedAt: string;
    roleInHome: string;
    devicesOnline: number;
    devicesOffline: number;
    openAlarms: number;
  }>;
};

export async function getOverview(): Promise<OverviewData> {
  // Panggil Next route internal, bukan backend langsung
  return appFetch<OverviewData>("/api/admin/overview", { method: "GET" });
}
