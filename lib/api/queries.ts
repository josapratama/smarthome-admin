import { apiFetch } from "./client";
import { API } from "./endpoints";

export type OverviewResponse = {
  users: number;
  homes: number;
  devices: number;
  onlineDevices: number;
  offlineDevices: number;
};

export async function getOverview() {
  return apiFetch<OverviewResponse>(API.overview);
}
