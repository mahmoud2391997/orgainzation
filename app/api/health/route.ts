import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { getCmsContent } from "@/lib/cms";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await getDb().execute(sql`select 1`);
    const content = await getCmsContent();
    return NextResponse.json({
      status: "ok",
      service: "antitude-technology-partner",
      database: "ok",
      contentSource: content.source,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("GET /api/health database check failed", error);
    return NextResponse.json({
      status: "degraded",
      service: "antitude-technology-partner",
      database: "unavailable",
      contentSource: "json",
      message: "App running with JSON fallback storage",
      timestamp: new Date().toISOString(),
    }, { status: 200 });
  }
}
