import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";
import { getDatabasePoolMax, getDatabaseSslConfig } from "@/lib/env";

let client: ReturnType<typeof postgres> | undefined;
let database: PostgresJsDatabase<typeof schema> | undefined;

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is required to use the PostgreSQL data layer.");
  if (!database) {
    client = postgres(url, {
      max: getDatabasePoolMax(),
      idle_timeout: 20,
      connect_timeout: 10,
      prepare: false,
      ssl: getDatabaseSslConfig(url),
    });
    database = drizzle(client, { schema });
  }
  return database;
}

export async function closeDb() {
  if (client) await client.end({ timeout: 5 });
  client = undefined;
  database = undefined;
}
