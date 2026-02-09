import { NextResponse } from "next/server";
import { apiUpload, ApiError } from "@/lib/api/client";
import { API } from "@/lib/api/endpoints";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    console.log("UPLOAD fields:", Array.from(formData.keys()));
    const data = await apiUpload(API.firmware.upload, formData);
    return NextResponse.json(data);
  } catch (e: unknown) {
    if (e instanceof ApiError) {
      return NextResponse.json(e.payload ?? { message: "Upload failed" }, {
        status: e.status,
      });
    }
    return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
  }
}
