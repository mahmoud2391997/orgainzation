import "server-only";

import { desc, eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { leads, type LeadRow } from "@/db/schema";
import { getDb } from "@/lib/db";
import type { Lead, LeadStatus } from "@/lib/content";

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
  const rows = await getDb().select().from(leads).orderBy(desc(leads.submittedAt));
  return rows.map(toLead);
}

export async function addLead(input: Omit<Lead, "id" | "status" | "submittedAt">): Promise<Lead> {
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
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<Lead | null> {
  const [row] = await getDb().update(leads).set({ status }).where(eq(leads.id, id)).returning();
  return row ? toLead(row) : null;
}
