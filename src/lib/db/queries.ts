import { desc, eq } from "drizzle-orm";
import { getDb } from "./index";
import { projects, messages, type Project, type NewProject, type NewMessage } from "./schema";
import { seedProjects } from "./seed-data";

function withSeedIds(): Project[] {
  const now = new Date();
  return seedProjects.map((p, i) => ({
    id: i + 1,
    createdAt: now,
    updatedAt: now,
    client: p.client ?? null,
    category: p.category ?? "Web App",
    description: p.description ?? "",
    techStack: p.techStack ?? [],
    liveUrl: p.liveUrl ?? null,
    repoUrl: p.repoUrl ?? null,
    featured: p.featured ?? false,
    sortOrder: p.sortOrder ?? 0,
    year: p.year ?? null,
    published: p.published ?? true,
    ...p,
  }));
}

export async function listProjects(): Promise<Project[]> {
  const db = getDb();
  if (!db) return withSeedIds();

  try {
    const rows = await db
      .select()
      .from(projects)
      .where(eq(projects.published, true))
      .orderBy(projects.sortOrder, desc(projects.createdAt));
    return rows.length > 0 ? rows : withSeedIds();
  } catch {
    return withSeedIds();
  }
}

export async function listAllProjectsForAdmin(): Promise<Project[]> {
  const db = getDb();
  if (!db) return withSeedIds();
  try {
    return await db.select().from(projects).orderBy(projects.sortOrder, desc(projects.createdAt));
  } catch {
    return withSeedIds();
  }
}

export async function getProjectById(id: number): Promise<Project | null> {
  const db = getDb();
  if (!db) return withSeedIds().find((p) => p.id === id) ?? null;
  const rows = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createProject(data: NewProject) {
  const db = getDb();
  if (!db) throw new Error("Database not configured");
  const [row] = await db.insert(projects).values(data).returning();
  return row;
}

export async function updateProject(id: number, data: Partial<NewProject>) {
  const db = getDb();
  if (!db) throw new Error("Database not configured");
  const [row] = await db
    .update(projects)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(projects.id, id))
    .returning();
  return row;
}

export async function deleteProject(id: number) {
  const db = getDb();
  if (!db) throw new Error("Database not configured");
  await db.delete(projects).where(eq(projects.id, id));
}

export async function saveMessage(data: NewMessage) {
  const db = getDb();
  if (!db) return null;
  const [row] = await db.insert(messages).values(data).returning();
  return row;
}
