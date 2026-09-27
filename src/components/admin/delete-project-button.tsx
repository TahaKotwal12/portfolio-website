"use client";

import * as React from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteProjectAction } from "@/app/admin/actions";

export function DeleteProjectButton({ id, disabled }: { id: number; disabled?: boolean }) {
  const [pending, startTransition] = React.useTransition();

  function handleDelete() {
    if (!window.confirm("Delete this project? This can't be undone.")) return;
    startTransition(() => {
      deleteProjectAction(id);
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={disabled || pending}
      aria-label="Delete project"
      className="text-muted transition-colors hover:text-danger disabled:pointer-events-none disabled:opacity-40"
    >
      {pending ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
    </button>
  );
}
