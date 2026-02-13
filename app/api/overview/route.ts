import { NextRequest } from "next/server";
import { backendFetch } from "@/lib/api/server/backend";
import { ApiError } from "@/lib/api/errors";
import type { OverviewDTO } from "@/lib/api/dto/overview.dto";

export async function GET(request: NextRequest) {
  try {
    const data = await backendFetch<{ data: OverviewDTO }>("/api/v1/overview");
    return Response.json(data);
  } catch (error) {
    if (error instanceof ApiError) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
