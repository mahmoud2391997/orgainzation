function isProduction() {
  return process.env.NODE_ENV === "production";
}

export const DEFAULT_ADMIN_PASSWORD = "antitude-demo";

export function getAdminPassword() {
  const value = process.env.ADMIN_PASSWORD?.trim();
  return value || DEFAULT_ADMIN_PASSWORD;
}

export function allowJsonFallback() {
  if (process.env.ALLOW_JSON_FALLBACK === "true") return true;
  return !isProduction();
}

export function getDatabasePoolMax() {
  const raw = process.env.DATABASE_POOL_MAX;
  if (!raw) return 5;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) return 5;
  return Math.floor(parsed);
}

export function getDatabaseSslConfig(databaseUrl: string) {
  // Prefer URL-driven sslmode when present (e.g. ?sslmode=require).
  try {
    const url = new URL(databaseUrl);
    if (url.searchParams.has("sslmode")) return undefined;
  } catch {
    // Ignore URL parsing errors; postgres.js will handle valid connection strings.
  }

  const sslMode = (process.env.DATABASE_SSLMODE ?? "").trim().toLowerCase();
  if (!sslMode) return undefined;
  if (sslMode === "disable" || sslMode === "false" || sslMode === "0") return false;
  if (sslMode === "no-verify") return { rejectUnauthorized: false } as const;
  if (sslMode === "prefer" || sslMode === "require" || sslMode === "true" || sslMode === "1") return sslMode === "true" || sslMode === "1" ? true : sslMode;
  return undefined;
}

