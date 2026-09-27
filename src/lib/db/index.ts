import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let cached: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

/**
 * Lazily creates the Drizzle client so the app (and `next build`) can run
 * without a DATABASE_URL — callers fall back to static seed content instead.
 */
export function getDb() {
  if (!process.env.DATABASE_URL) return null;
  if (!cached) {
    const sql = neon(process.env.DATABASE_URL);
    cached = drizzle(sql, { schema });
  }
  return cached;
}
