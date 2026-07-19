import { neon } from "@neondatabase/serverless";

// Lazily-created SQL client so a missing env var doesn't crash the build,
// only the request that actually needs the database.
export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL no está configurada");
  }
  return neon(url);
}

// Creates the waitlist table if it doesn't exist yet. Cheap and idempotent;
// called on each submit so first-run needs no separate migration step.
export async function ensureWaitlistTable() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS waitlist (
      id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      email      TEXT NOT NULL UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
}
