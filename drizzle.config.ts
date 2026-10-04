import { defineConfig } from "drizzle-kit";

// Only used to generate SQL migrations from src/db/schema.ts (npm run db:generate).
// Applying them is scripts/migrate.ts, which works for PGlite and Postgres alike.
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./db/migrations",
});
