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
      {/* Slow-drifting, softly colored blobs — the "aurora" layer */}
      <div className="aurora-blob aurora-blob-a left-[10%] top-[-20%] size-[34rem] bg-[var(--accent-2)]/20" />
      <div className="aurora-blob aurora-blob-b right-[5%] top-[-10%] size-[30rem] bg-[var(--aurora-blue)]/14" />
      <div className="aurora-blob aurora-blob-c left-[35%] top-[20%] size-[28rem] bg-[var(--aurora-rose)]/10" />

      {/* Grid lines sit above the aurora so they read as a fine overlay */}
      <div className="grid-backdrop absolute inset-0" />

      {/* Brighter grid lines, revealed in a torch-like circle that follows the cursor */}
      <motion.div
        className="grid-backdrop-bright absolute inset-0"
        style={{ maskImage: torchMask, WebkitMaskImage: torchMask, opacity: hover }}
      />

      {/* Soft color glow that trails the cursor */}
      <motion.div className="absolute inset-0" style={{ background: glowBackground, opacity: hover }} />
    </div>
  );
}
