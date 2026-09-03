import { NextResponse } from "next/server";
import { addLead, readLeads, updateLeadStatus } from "@/lib/leads";
import type { LeadStatus } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const firstName = String(body.firstName ?? "").trim();
    const lastName = String(body.lastName ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const company = String(body.company ?? "").trim();
    const message = String(body.message ?? "").trim();
    if (!firstName || !lastName || !company || !message || !emailPattern.test(email)) {
      return NextResponse.json({ error: "Please complete the required fields with a valid work email." }, { status: 400 });
    }
    const lead = await addLead({ firstName, lastName, email, company, phone: String(body.phone ?? "").trim(), message, preferredDate: String(body.preferredDate ?? "").trim() });
    return NextResponse.json({ lead: { id: lead.id, submittedAt: lead.submittedAt } }, { status: 201 });
  } catch (error) {
    console.error("POST /api/leads failed", error);
    return NextResponse.json({ error: "Unable to save the request right now. Check the PostgreSQL connection." }, { status: 500 });
  }
}

function authorized(request: Request) {
  const expected = process.env.ADMIN_PASSWORD ?? "antitude-demo";
  const headerKey = request.headers.get("x-admin-key");
  const cookieKey = request.headers.get("cookie")?.split("; ").find((item) => item.startsWith("antitude-admin="))?.split("=")[1];
  return headerKey === expected || cookieKey === expected;
}

export async function GET(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    return NextResponse.json({ leads: await readLeads() });
  } catch (error) {
    console.error("GET /api/leads failed", error);
    return NextResponse.json({ error: "Unable to read leads from PostgreSQL." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json() as { id?: string; status?: LeadStatus };
  const validStatuses: LeadStatus[] = ["new", "contacted", "qualified", "lost"];
  if (!body.id || !body.status || !validStatuses.includes(body.status)) return NextResponse.json({ error: "Invalid status update" }, { status: 400 });
  try {
    const lead = await updateLeadStatus(body.id, body.status);
    if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    return NextResponse.json({ lead });
  } catch (error) {
    console.error("PATCH /api/leads failed", error);
    return NextResponse.json({ error: "Unable to update the lead in PostgreSQL." }, { status: 500 });
  }
}
