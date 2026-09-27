import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/project-form";
import { updateProjectAction } from "@/app/admin/actions";
import { getProjectById } from "@/lib/db/queries";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectId = Number(id);
  if (!Number.isFinite(projectId)) notFound();

  const project = await getProjectById(projectId);
  if (!project) notFound();

  const action = updateProjectAction.bind(null, projectId);

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl font-medium tracking-tight">Edit project</h1>
      <p className="mt-1 text-sm text-muted">{project.title}</p>

      <div className="mt-8">
        <ProjectForm action={action} project={project} submitLabel="Save changes" />
      </div>
    </div>
  );
}
