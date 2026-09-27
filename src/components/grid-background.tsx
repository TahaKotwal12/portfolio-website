"use client";

import { motion, useMotionTemplate, type MotionValue } from "motion/react";

type GridBackgroundProps = {
  /** Pointer position in pixels, relative to the containing section. */
  x: MotionValue<number>;
  y: MotionValue<number>;
  /** 0 when the pointer is outside the section, 1 when hovering. */
  hover: MotionValue<number>;
};

export function GridBackground({ x, y, hover }: GridBackgroundProps) {
  const torchMask = useMotionTemplate`radial-gradient(300px circle at ${x}px ${y}px, black 0%, transparent 75%)`;
  const glowBackground = useMotionTemplate`radial-gradient(340px circle at ${x}px ${y}px, color-mix(in srgb, var(--accent-2) 12%, transparent) 0%, transparent 70%)`;

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Base grid, always faintly visible */}
      <div className="grid-backdrop absolute inset-0" />

      {/* Brighter grid lines, revealed in a torch-like circle that follows the cursor */}
      <motion.div
        className="grid-backdrop-bright absolute inset-0"
        style={{ maskImage: torchMask, WebkitMaskImage: torchMask, opacity: hover }}
      />

      {/* Soft color glow that trails the cursor */}
      <motion.div className="absolute inset-0" style={{ background: glowBackground, opacity: hover }} />

      <div className="absolute left-1/2 top-[-10%] size-[60rem] -translate-x-1/2 rounded-full bg-accent-2/10 blur-[140px] dark:bg-accent-2/15" />
      <div className="absolute right-[-10%] top-[30%] size-[40rem] rounded-full bg-accent/10 blur-[140px]" />
    </div>
  );
}
