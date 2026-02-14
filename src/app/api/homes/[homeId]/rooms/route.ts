import { NextRequest } from "next/server";
import { backendFetch } from "@/lib/api/server/backend";
import { handleApiError } from "@/lib/api/server/error-handler";
import type { RoomDTO, RoomCreateRequest } from "@/lib/api/dto/rooms.dto";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ homeId: string }> },
) {
  try {
    const { homeId } = await params;
    const id = parseInt(homeId);

    if (isNaN(id) || id <= 0) {
      return Response.json({ error: "Invalid home ID" }, { status: 400 });
    }

    const data = await backendFetch<{ data: RoomDTO[] }>(
      `/homes/${id}/rooms`,
      {},
      { auth: "admin_cookie" },
    );
    return Response.json(data);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ homeId: string }> },
) {
  try {
    const { homeId } = await params;
    const id = parseInt(homeId);

    if (isNaN(id) || id <= 0) {
      return Response.json({ error: "Invalid home ID" }, { status: 400 });
    }

    const body: RoomCreateRequest = await request.json();

    const data = await backendFetch(
      `/homes/${id}/rooms`,
      {
        method: "POST",
        body: JSON.stringify(body),
      },
      { auth: "admin_cookie" },
    );

    return Response.json(data);
  } catch (error) {
    return handleApiError(error);
  }
}
