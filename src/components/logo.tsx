import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn("size-7", className)}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="9" className="fill-foreground" />
      <path
        d="M8 22V10L16 17L24 10V22"
        stroke="var(--background)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="24" cy="9" r="2.6" className="fill-accent" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 font-display", className)}>
      <LogoMark />
      <span className="text-[15px] font-semibold tracking-tight text-foreground">
        Margin<span className="text-muted">of</span>Error
      </span>
    </span>
  );
}
