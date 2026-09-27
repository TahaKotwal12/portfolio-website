"use client";

import { useActionState } from "react";
import { Lock } from "lucide-react";
import { loginAction, type LoginState } from "@/app/admin/actions";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center py-16">
      <span className="flex size-12 items-center justify-center rounded-full border border-border bg-surface">
        <Lock className="size-5 text-muted" strokeWidth={1.75} />
      </span>
      <h1 className="mt-5 font-display text-2xl font-medium tracking-tight">Admin sign in</h1>
      <p className="mt-2 text-center text-sm text-muted">
        Manage the projects shown in the Work section.
      </p>

      <form action={formAction} className="mt-8 w-full space-y-4">
        <div>
          <label htmlFor="email" className="mb-2 block text-xs font-medium text-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="username"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-foreground/40"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block text-xs font-medium text-muted">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-foreground/40"
          />
        </div>

        {state.error && <p className="text-sm text-danger">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="h-12 w-full rounded-xl bg-accent text-sm font-medium text-accent-foreground transition-opacity disabled:opacity-60"
        >
          {pending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
