import { ProjectForm } from "@/components/admin/project-form";
import { createProjectAction } from "@/app/admin/actions";

export default function NewProjectPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl font-medium tracking-tight">New project</h1>
      <p className="mt-1 text-sm text-muted">Add a case study to the public Work section.</p>

      <div className="mt-8">
        <ProjectForm action={createProjectAction} submitLabel="Create project" />
      </div>
    </div>
  );
}
