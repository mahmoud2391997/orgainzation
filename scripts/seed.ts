import "dotenv/config";
import { seedLeads } from "@/lib/content";
import { closeDb, getDb } from "@/lib/db";
import { leads } from "@/db/schema";

async function main() {
  await getDb().insert(leads).values(seedLeads.map((lead) => ({ ...lead, submittedAt: new Date(lead.submittedAt) }))).onConflictDoNothing();
  console.log(`Seeded ${seedLeads.length} consultation leads (existing rows were preserved).`);
  await closeDb();
}

main().catch(async (error) => {
  console.error("Seed failed:", error);
  await closeDb();
  process.exitCode = 1;
});
