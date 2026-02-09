import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/api/client";
import { API } from "@/lib/api/endpoints";

export async function GET() {
  const data = await apiFetch(API.devices.list, { method: "GET" });
  return NextResponse.json(data);
}
