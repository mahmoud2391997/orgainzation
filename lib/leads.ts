import "server-only";

import { desc, eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { leads, type LeadRow } from "@/db/schema";
import { getDb } from "@/lib/db";
import type { Lead, LeadStatus } from "@/lib/content";

const leadsJsonPath = path.join(process.cwd(), "data/leads.json");

async function readLeadsFromJson(): Promise<Lead[]> {
  try {
    const data = await readFile(leadsJsonPath, "utf8");
    return JSON.parse(data) as Lead[];
  } catch {
    return [];
  }
}

async function writeLeadsToJson(leadsData: Lead[]): Promise<void> {
  await writeFile(leadsJsonPath, JSON.stringify(leadsData, null, 2));
}

function toLead(row: LeadRow): Lead {
  return {
    id: row.id,
    firstName: row.firstName,
    lastName: row.lastName,
    email: row.email,
    phone: row.phone,
    company: row.company,
    message: row.message,
    preferredDate: row.preferredDate,
    status: row.status as LeadStatus,
    submittedAt: row.submittedAt.toISOString(),
  };
}

export async function readLeads(): Promise<Lead[]> {
  try {
    const rows = await getDb().select().from(leads).orderBy(desc(leads.submittedAt));
    return rows.map(toLead);
  } catch (error) {
    console.log("Database unavailable, using JSON fallback for leads");
    return readLeadsFromJson();
  }
}

export async function addLead(input: Omit<Lead, "id" | "status" | "submittedAt">): Promise<Lead> {
  try {
    const [row] = await getDb().insert(leads).values({
      id: `l_${randomUUID()}`,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
      company: input.company,
      message: input.message,
      preferredDate: input.preferredDate,
      status: "new",
    }).returning();
    if (!row) throw new Error("Lead insert did not return a row.");
    return toLead(row);
  } catch (error) {
    console.log("Database unavailable, using JSON fallback for leads");
    const leadsData = await readLeadsFromJson();
    const newLead: Lead = {
      id: `l_${randomUUID()}`,
      ...input,
      status: "new",
      submittedAt: new Date().toISOString(),
    };
    leadsData.unshift(newLead);
    await writeLeadsToJson(leadsData);
    return newLead;
  }
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<Lead | null> {
  try {
    const [row] = await getDb().update(leads).set({ status }).where(eq(leads.id, id)).returning();
    return row ? toLead(row) : null;
  } catch (error) {
    console.log("Database unavailable, using JSON fallback for leads");
    const leadsData = await readLeadsFromJson();
    const index = leadsData.findIndex((lead) => lead.id === id);
    if (index === -1) return null;
    leadsData[index].status = status;
    await writeLeadsToJson(leadsData);
    return leadsData[index];
  }
}
