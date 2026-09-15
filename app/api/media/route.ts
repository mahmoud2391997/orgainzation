import { NextResponse } from "next/server";
import { getAdminPassword } from "@/lib/env";
import { listMediaAssets, saveUploadedMedia } from "@/lib/media";

export const runtime = "nodejs";

function authorized(request: Request) {
  const expected = getAdminPassword();
  const headerKey = request.headers.get("x-admin-key");
  const cookieKey = request.headers.get("cookie")?.split("; ").find((item) => item.startsWith("antitude-admin="))?.split("=")[1];
  return headerKey === expected || cookieKey === expected;
}

export async function GET(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ media: await listMediaAssets() });
}

export async function POST(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const form = await request.formData();
    const file = form.get("file");
    const alt = String(form.get("alt") ?? "");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Expected an image file field named file." }, { status: 400 });
    }
    const asset = await saveUploadedMedia(file, alt);
    return NextResponse.json({ asset }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
