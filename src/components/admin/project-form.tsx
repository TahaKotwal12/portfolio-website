"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/db/schema";
import type { ProjectFormState } from "@/app/admin/actions";

type Action = (state: ProjectFormState, formData: FormData) => Promise<ProjectFormState>;

const inputClasses =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-foreground/40";
const labelClasses = "mb-2 block text-xs font-medium text-muted";

export function ProjectForm({
  action,
  project,
  submitLabel,
}: {
  action: Action;
  project?: Project;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, {} as ProjectFormState);

  return (
    <form action={formAction} className="space-y-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className={labelClasses}>
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={project?.title}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="slug" className={labelClasses}>
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            required
            pattern="[a-z0-9-]+"
            placeholder="orbit-finance"
            defaultValue={project?.slug}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="client" className={labelClasses}>
            Client <span className="text-muted/60">(optional)</span>
          </label>
          <input
            id="client"
            name="client"
            defaultValue={project?.client ?? ""}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="category" className={labelClasses}>
            Category
          </label>
          <input
            id="category"
            name="category"
            required
            placeholder="SaaS, Fintech, E-commerce..."
            defaultValue={project?.category}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="year" className={labelClasses}>
            Year <span className="text-muted/60">(optional)</span>
          </label>
          <input
            id="year"
            name="year"
            defaultValue={project?.year ?? ""}
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="summary" className={labelClasses}>
          Summary (shown on the card)
        </label>
        <textarea
          id="summary"
          name="summary"
          required
          rows={2}
          defaultValue={project?.summary}
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="description" className={labelClasses}>
          Full description <span className="text-muted/60">(optional)</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={project?.description}
          className={inputClasses}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="imageUrl" className={labelClasses}>
            Cover image URL
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            required
            placeholder="https://..."
            defaultValue={project?.imageUrl}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="techStack" className={labelClasses}>
            Tech stack (comma separated)
          </label>
          <input
            id="techStack"
            name="techStack"
            placeholder="Next.js, PostgreSQL, Stripe"
            defaultValue={project?.techStack?.join(", ")}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="liveUrl" className={labelClasses}>
            Live URL <span className="text-muted/60">(optional)</span>
          </label>
          <input
            id="liveUrl"
            name="liveUrl"
            type="url"
            defaultValue={project?.liveUrl ?? ""}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="repoUrl" className={labelClasses}>
            Repo URL <span className="text-muted/60">(optional)</span>
          </label>
          <input
            id="repoUrl"
            name="repoUrl"
            type="url"
            defaultValue={project?.repoUrl ?? ""}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={project?.featured}
            className="size-4 rounded border-border accent-[var(--accent)]"
          />
          Featured (full-width card)
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="published"
            defaultChecked={project?.published ?? true}
            className="size-4 rounded border-border accent-[var(--accent)]"
          />
          Published
        </label>
        <div className="flex items-center gap-2">
          <label htmlFor="sortOrder" className="text-sm text-muted">
            Sort order
          </label>
          <input
            id="sortOrder"
            name="sortOrder"
            type="number"
            defaultValue={project?.sortOrder ?? 0}
            className="w-20 rounded-lg border border-border bg-background px-2 py-1.5 text-sm outline-none"
          />
        </div>
      </div>

      {state.error && <p className="text-sm text-danger">{state.error}</p>}

      <div className="flex items-center gap-3 border-t border-border pt-6">
        <button
          type="submit"
          disabled={pending}
          className="h-11 rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground disabled:opacity-60"
        >
          {pending ? "Saving..." : submitLabel}
        </button>
        <Link href="/admin/dashboard" className="text-sm text-muted hover:text-foreground">
          Cancel
        </Link>
      </div>
    </form>
  );
}
