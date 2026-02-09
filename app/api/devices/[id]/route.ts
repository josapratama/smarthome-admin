import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/api/client";
import { API } from "@/lib/api/endpoints";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const jobId = Number(params.id);
  if (!Number.isFinite(jobId)) {
    return NextResponse.json({ message: "Invalid job id" }, { status: 400 });
  }

  const data = await apiFetch(API.ota.jobDetail(jobId), { method: "GET" });
  return NextResponse.json(data);
}
