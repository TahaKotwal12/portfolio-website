import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:shadow-[0_0_0_1px_var(--accent),0_8px_30px_-6px_var(--accent)] active:scale-[0.98]",
  secondary:
    "bg-surface text-foreground border border-border hover:border-foreground/30 active:scale-[0.98]",
  ghost: "text-foreground hover:bg-surface active:scale-[0.98]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

type ButtonOwnProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = ButtonOwnProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonOwnProps &
  Omit<React.ComponentProps<typeof Link>, keyof ButtonOwnProps | "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const shimmer = (
  <span
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
  />
);

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, href, ...domProps } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes} {...(domProps as Omit<ButtonAsLink, keyof ButtonOwnProps | "href">)}>
        {variant === "primary" && shimmer}
        <span className="relative inline-flex items-center gap-2">{children}</span>
      </Link>
    );
  }

  return (
    <button className={classes} {...(domProps as Omit<ButtonAsButton, keyof ButtonOwnProps | "href">)}>
      {variant === "primary" && shimmer}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </button>
  );
}
