// app/api/admin/overview/route.ts
import { NextResponse } from "next/server";
import { upstreamFetch } from "@/lib/server/upstream";
import { cookies } from "next/headers";

type BackendDashboardHome = {
  id: number;
  name: string;
  city: string | null;
  updatedAt: string;
  roleInHome: "OWNER" | "MEMBER" | string;
  devicesOnline: number;
  devicesOffline: number;
  openAlarms: number;
};

type BackendDashboardResponse = {
  data: {
    myHomesCount: number;
    pendingInvitesCount: number;
    homes: BackendDashboardHome[];
  };
};

export async function GET() {
  const jar = await cookies();
  const token = jar.get("admin_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // ✅ HARUS pakai path backend yang benar
  const { res, payload } = await upstreamFetch("/dashboard", {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json(
      payload ?? { message: "Failed to load overview" },
      { status: res.status },
    );
  }

  const p = payload as BackendDashboardResponse;
  const homes = Array.isArray(p?.data?.homes) ? p.data.homes : [];

  const onlineDevices = homes.reduce(
    (acc, h) => acc + (h.devicesOnline ?? 0),
    0,
  );
  const offlineDevices = homes.reduce(
    (acc, h) => acc + (h.devicesOffline ?? 0),
    0,
  );

  return NextResponse.json({
    users: 0,
    homes: p.data.myHomesCount ?? homes.length,
    devices: onlineDevices + offlineDevices,
    onlineDevices,
    offlineDevices,
    pendingInvitesCount: p.data.pendingInvitesCount ?? 0,
    homesList: homes,
  });
}
