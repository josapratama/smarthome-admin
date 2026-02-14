import { NextRequest } from "next/server";
import { backendFetch } from "@/lib/api/server/backend";
import { handleApiError } from "@/lib/api/server/error-handler";
import type { ChangePasswordRequest } from "@/lib/api/dto/auth.dto";

export async function POST(request: NextRequest) {
  try {
    const body: ChangePasswordRequest = await request.json();

    const data = await backendFetch(
      "/api/v1/auth/change-password",
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
