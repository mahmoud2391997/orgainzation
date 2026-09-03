import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await getDb().execute(sql`select 1`);
    return NextResponse.json({ status: "ok", service: "antitude-technology-partner", database: "ok", timestamp: new Date().toISOString() });
  } catch (error) {
    console.error("GET /api/health database check failed", error);
    return NextResponse.json({ status: "error", service: "antitude-technology-partner", database: "unavailable" }, { status: 503 });
  }
}
