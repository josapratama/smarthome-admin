import { NextRequest } from "next/server";
import { backendFetch } from "@/lib/api/server/backend";
import { handleApiError } from "@/lib/api/server/error-handler";
import type { DeviceDTO, DeviceUpdateRequest } from "@/lib/api/dto/devices.dto";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ deviceId: string }> },
) {
  try {
    const { deviceId } = await params;
    const id = parseInt(deviceId);

    if (isNaN(id) || id <= 0) {
      return Response.json({ error: "Invalid device ID" }, { status: 400 });
    }

    const data = await backendFetch<{ data: DeviceDTO }>(
      `/devices/${id}`,
      {},
      { auth: "admin_cookie" },
    );
    return Response.json(data);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ deviceId: string }> },
) {
  try {
    const { deviceId } = await params;
    const id = parseInt(deviceId);

    if (isNaN(id) || id <= 0) {
      return Response.json({ error: "Invalid device ID" }, { status: 400 });
    }

    const body: DeviceUpdateRequest = await request.json();

    const data = await backendFetch(
      `/devices/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(body),
      },
      { auth: "admin_cookie" },
    );

    return Response.json(data);
  } catch (error) {
    return handleApiError(error);
  }
}
