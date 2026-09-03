import "dotenv/config";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { closeDb, getDb } from "@/lib/db";

async function main() {
  await migrate(getDb(), { migrationsFolder: "./drizzle" });
  console.log("PostgreSQL migrations applied.");
  await closeDb();
}

main().catch(async (error) => {
  console.error("Migration failed:", error);
  await closeDb();
  process.exitCode = 1;
});
