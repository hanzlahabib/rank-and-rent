import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let _db: NeonHttpDatabase<typeof schema> | null = null;

/**
 * Get the database connection. Lazily initialized on first call.
 * Throws if DATABASE_URL is not configured.
 */
export function getDb() {
  if (!_db) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL not configured");
    }
    const sql = neon(connectionString);
    _db = drizzle(sql, { schema });
  }
  return _db;
}

/**
 * Check if database is configured (DATABASE_URL env var exists).
 */
export function isDbConfigured(): boolean {
  return !!process.env.DATABASE_URL;
}

// Backward compat: proxy that lazily initializes
export const db = new Proxy({} as NeonHttpDatabase<typeof schema>, {
  get(_target, prop) {
    return getDb()[prop as keyof NeonHttpDatabase<typeof schema>];
  },
});
