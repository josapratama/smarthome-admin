import { NextRequest } from "next/server";
import { backendFetch } from "@/lib/api/server/backend";
import { handleApiError } from "@/lib/api/server/error-handler";
import type {
  HomesListResponse,
  HomeCreateRequest,
} from "@/lib/api/dto/homes.dto";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = new URLSearchParams();

    // Forward query params with sanitization
    if (searchParams.get("limit")) {
      const limit = parseInt(searchParams.get("limit")!);
      if (!isNaN(limit) && limit > 0 && limit <= 100) {
        params.set("limit", limit.toString());
      }
    }

    if (searchParams.get("cursor")) {
      const cursor = parseInt(searchParams.get("cursor")!);
      if (!isNaN(cursor) && cursor > 0) {
        params.set("cursor", cursor.toString());
      }
    }

    if (searchParams.get("ownerId")) {
      const ownerId = parseInt(searchParams.get("ownerId")!);
      if (!isNaN(ownerId) && ownerId > 0) {
        params.set("ownerId", ownerId.toString());
      }
    }

    if (searchParams.get("ownerEmail")) {
      params.set("ownerEmail", searchParams.get("ownerEmail")!);
    }

    if (searchParams.get("city")) {
      params.set("city", searchParams.get("city")!);
    }

    const queryString = params.toString();
    const url = queryString ? `/homes?${queryString}` : "/homes";

    const data = await backendFetch<HomesListResponse>(
      url,
      {},
      { auth: "admin_cookie" },
    );
    return Response.json(data);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: HomeCreateRequest = await request.json();

    const data = await backendFetch(
      "/homes",
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
