import { NextResponse } from "next/server";
import { apiFetch, ApiError } from "@/lib/api/client";
import { API } from "@/lib/api/endpoints";

export async function GET(
  _: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await ctx.params;
    const jobId = Number(id);

    const data = await apiFetch(API.ota.jobDetail(jobId));
    return NextResponse.json(data);
  } catch (e: unknown) {
    if (e instanceof ApiError) {
      return NextResponse.json(e.payload ?? { message: "Failed" }, {
        status: e.status,
      });
    }
    return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
  }
}
