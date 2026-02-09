import { NextResponse } from "next/server";
import { apiFetch, ApiError } from "@/lib/api/client";
import { API } from "@/lib/api/endpoints";

export async function GET() {
  try {
    const data = await apiFetch(API.devices.list);
    return NextResponse.json(data);
  } catch (e: unknown) {
    if (e instanceof ApiError)
      return NextResponse.json(e.payload ?? { message: "Failed" }, {
        status: e.status,
      });
    return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
  }
}
