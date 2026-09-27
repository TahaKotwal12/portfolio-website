import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/lib/db/schema";
import { seedProjects } from "../src/lib/db/seed-data";

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set. Add it to .env.local and re-run.");
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql, { schema });

  console.log(`Seeding ${seedProjects.length} demo projects...`);
  for (const project of seedProjects) {
    await db
      .insert(schema.projects)
      .values(project)
      .onConflictDoUpdate({
        target: schema.projects.slug,
        set: { ...project, updatedAt: new Date() },
      });
    console.log(`  ✓ ${project.title}`);
  }

  console.log("Done. Visit /admin to manage projects.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
