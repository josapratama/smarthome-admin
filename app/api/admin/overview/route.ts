import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/api/client";
import { API } from "@/lib/api/endpoints";

type Overview = {
  users: number;
  homes: number;
  devices: number;
  onlineDevices: number;
  offlineDevices: number;
};

export async function GET() {
  // pakai endpoint yang sudah ada (no backend changes)
  const [usersRes, homesRes, devicesRes] = await Promise.all([
    apiFetch<{ data: unknown[] }>(API.admin.users),
    apiFetch<{ data: unknown[] }>(API.homes.list),
    apiFetch<{ data: { status: boolean }[] }>(API.devices.list),
  ]);

  const users = usersRes.data.length;
  const homes = homesRes.data.length;
  const devices = devicesRes.data.length;

  const onlineDevices = devicesRes.data.filter((d) => d.status === true).length;
  const offlineDevices = devices - onlineDevices;

  const out: Overview = {
    users,
    homes,
    devices,
    onlineDevices,
    offlineDevices,
  };
  return NextResponse.json(out);
}
