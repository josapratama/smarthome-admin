import { NextResponse } from "next/server";
import { apiUpload } from "@/lib/api/client";
import { API } from "@/lib/api/endpoints";

export async function POST(req: Request) {
  const formData = await req.formData();
  const data = await apiUpload(API.firmware.upload, formData);
  return NextResponse.json(data);
}
