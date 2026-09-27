"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-mounted";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-foreground/30",
        className
      )}
    >
      {mounted ? (
        isDark ? (
          <Sun className="size-4" strokeWidth={1.75} />
        ) : (
          <Moon className="size-4" strokeWidth={1.75} />
        )
      ) : (
        <span className="size-4" />
      )}
    </button>
  );
}
