import { NextResponse } from "next/server";
import { apiFetch, ApiError } from "@/lib/api/client";
import { API } from "@/lib/api/endpoints";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { deviceId: number; releaseId: number };

    const data = await apiFetch(API.ota.devices(body.deviceId), {
      method: "POST",
      body: JSON.stringify({ releaseId: body.releaseId }),
    });

    return NextResponse.json(data, { status: 201 });
  } catch (e: unknown) {
    if (e instanceof ApiError) {
      return NextResponse.json(e.payload ?? { message: "Trigger failed" }, {
        status: e.status,
      });
    }
    return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
  }
}
