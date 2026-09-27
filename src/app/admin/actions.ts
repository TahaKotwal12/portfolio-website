"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { verifyAdminCredentials } from "@/lib/auth/credentials";
import { createSessionToken, setSessionCookie, clearSessionCookie, getSession } from "@/lib/auth/session";
import { createProject, updateProject, deleteProject } from "@/lib/db/queries";

export type LoginState = { error?: string };

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Enter a valid email and password." };
  }

  let valid: boolean;
  try {
    valid = await verifyAdminCredentials(parsed.data.email, parsed.data.password);
  } catch {
    return { error: "Admin login isn't configured yet. Set ADMIN_EMAIL / ADMIN_PASSWORD_HASH." };
  }

  if (!valid) {
    return { error: "Invalid email or password." };
  }

  const token = await createSessionToken(parsed.data.email);
  await setSessionCookie(token);
  redirect("/admin/dashboard");
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/admin/login");
}

const projectSchema = z.object({
  title: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and dashes."),
  client: z.string().optional(),
  category: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().optional().default(""),
  techStack: z.string().optional().default(""),
  imageUrl: z.string().url(),
  liveUrl: z.string().url().optional().or(z.literal("")),
  repoUrl: z.string().url().optional().or(z.literal("")),
  year: z.string().optional(),
  featured: z.coerce.boolean().optional(),
  published: z.coerce.boolean().optional(),
  sortOrder: z.coerce.number().optional().default(0),
});

export type ProjectFormState = { error?: string };

async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
}

function parseProjectForm(formData: FormData) {
  return projectSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    client: formData.get("client") || undefined,
    category: formData.get("category"),
    summary: formData.get("summary"),
    description: formData.get("description") || "",
    techStack: formData.get("techStack") || "",
    imageUrl: formData.get("imageUrl"),
    liveUrl: formData.get("liveUrl") || "",
    repoUrl: formData.get("repoUrl") || "",
    year: formData.get("year") || undefined,
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    sortOrder: formData.get("sortOrder") || 0,
  });
}

export async function createProjectAction(
  _prev: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  await requireAdmin();
  const parsed = parseProjectForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid project data." };
  }

  try {
    await createProject({
      ...parsed.data,
      client: parsed.data.client || null,
      liveUrl: parsed.data.liveUrl || null,
      repoUrl: parsed.data.repoUrl || null,
      year: parsed.data.year || null,
      techStack: parsed.data.techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to create project." };
  }

  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  redirect("/admin/dashboard");
}

export async function updateProjectAction(
  id: number,
  _prev: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  await requireAdmin();
  const parsed = parseProjectForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid project data." };
  }

  try {
    await updateProject(id, {
      ...parsed.data,
      client: parsed.data.client || null,
      liveUrl: parsed.data.liveUrl || null,
      repoUrl: parsed.data.repoUrl || null,
      year: parsed.data.year || null,
      techStack: parsed.data.techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to update project." };
  }

  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  redirect("/admin/dashboard");
}

export async function deleteProjectAction(id: number) {
  await requireAdmin();
  await deleteProject(id);
  revalidatePath("/");
  revalidatePath("/admin/dashboard");
}
