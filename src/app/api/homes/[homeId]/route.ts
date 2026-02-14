import { NextRequest } from "next/server";
import { backendFetch } from "@/lib/api/server/backend";
import { handleApiError } from "@/lib/api/server/error-handler";
import type { HomeDTO, HomeUpdateRequest } from "@/lib/api/dto/homes.dto";

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

    const data = await backendFetch<{ data: HomeDTO }>(
      `/homes/${id}`,
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
  { params }: { params: Promise<{ homeId: string }> },
) {
  try {
    const { homeId } = await params;
    const id = parseInt(homeId);

    if (isNaN(id) || id <= 0) {
      return Response.json({ error: "Invalid home ID" }, { status: 400 });
    }

    const body: HomeUpdateRequest = await request.json();

    const data = await backendFetch(
      `/homes/${id}`,
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ homeId: string }> },
) {
  try {
    const { homeId } = await params;
    const id = parseInt(homeId);

    if (isNaN(id) || id <= 0) {
      return Response.json({ error: "Invalid home ID" }, { status: 400 });
    }

    const data = await backendFetch(
      `/homes/${id}`,
      {
        method: "DELETE",
      },
      { auth: "admin_cookie" },
    );

    return Response.json(data);
  } catch (error) {
    return handleApiError(error);
  }
}
