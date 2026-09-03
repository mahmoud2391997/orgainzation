import { NextResponse } from "next/server";
import { getCmsContent, updateCmsContent, type CmsKind } from "@/lib/cms";

export const runtime = "nodejs";

function authorized(request: Request) {
  const expected = process.env.ADMIN_PASSWORD ?? "antitude-demo";
  const headerKey = request.headers.get("x-admin-key");
  const cookieKey = request.headers.get("cookie")?.split("; ").find((item) => item.startsWith("antitude-admin="))?.split("=")[1];
  return headerKey === expected || cookieKey === expected;
}

export async function GET(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getCmsContent());
}

export async function PUT(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json() as { kind?: CmsKind; items?: unknown };
  const validKinds: CmsKind[] = ["services", "technologies", "solutions"];
  if (!body.kind || !validKinds.includes(body.kind) || !Array.isArray(body.items)) return NextResponse.json({ error: "Invalid content update" }, { status: 400 });
  return NextResponse.json(await updateCmsContent(body.kind, body.items as never[]));
}