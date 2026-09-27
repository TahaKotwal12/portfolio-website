import Link from "next/link";
import Image from "next/image";
import { Plus, ExternalLink, AlertTriangle } from "lucide-react";
import { listAllProjectsForAdmin } from "@/lib/db/queries";
import { isDatabaseConfigured } from "@/lib/db";
import { DeleteProjectButton } from "@/components/admin/delete-project-button";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [projects, dbConfigured] = await Promise.all([
    listAllProjectsForAdmin(),
    Promise.resolve(isDatabaseConfigured()),
  ]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium tracking-tight">Projects</h1>
          <p className="mt-1 text-sm text-muted">
            These power the Work section on the public site.
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex h-10 items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-accent-foreground"
        >
          <Plus className="size-4" />
          New project
        </Link>
      </div>

      {!dbConfigured && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-accent-2 dark:text-accent" />
          <p>
            <strong>No database connected.</strong> You&apos;re viewing read-only demo
            data. Set <code className="font-mono">DATABASE_URL</code> to a Neon Postgres
            connection string to create, edit, or delete projects.
          </p>
        </div>
      )}

      <div className="mt-8 overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-surface text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-5 py-3 font-medium">Project</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-md bg-surface-2">
                      <Image
                        src={project.imageUrl}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{project.title}</p>
                      <p className="text-xs text-muted">/{project.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-muted">{project.category}</td>
                <td className="px-5 py-3">
                  <span
                    className={
                      project.published
                        ? "rounded-full bg-accent/15 px-2.5 py-1 text-xs text-accent-2 dark:text-accent"
                        : "rounded-full bg-muted/15 px-2.5 py-1 text-xs text-muted"
                    }
                  >
                    {project.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted transition-colors hover:text-foreground"
                        aria-label="Open live site"
                      >
                        <ExternalLink className="size-4" />
                      </a>
                    )}
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="text-xs font-medium text-foreground underline underline-offset-4"
                    >
                      Edit
                    </Link>
                    <DeleteProjectButton id={project.id} disabled={!dbConfigured} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
