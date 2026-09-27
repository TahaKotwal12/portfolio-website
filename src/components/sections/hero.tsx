"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GridBackground } from "@/components/grid-background";
import { Eyebrow } from "@/components/ui/eyebrow";

const words = ["Precise.", "Considered.", "Shipped."];

const stats = [
  { value: "0", label: "acceptable defect rate" },
  { value: "<3wk", label: "to a live MVP" },
  { value: "100%", label: "code ownership, yours" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-28">
      <GridBackground />
      <Container>
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Eyebrow>
              <Sparkles className="size-3" />
              Now booking Q1 2026 engagements
            </Eyebrow>
          </motion.div>

          <h1 className="mt-8 max-w-4xl text-balance font-display text-[2.5rem] font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="block"
            >
              We build web apps with
            </motion.span>
            <span className="mt-1 flex flex-wrap items-center justify-center gap-x-4">
              {words.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className={i === 1 ? "italic text-accent-2 dark:text-accent" : ""}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-7 max-w-xl text-balance text-base leading-relaxed text-muted sm:text-lg"
          >
            Margin of Error is a product engineering studio. We design, build, and scale
            custom software for startups and teams who can&apos;t afford to get it wrong —
            from first commit to production.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Button href="#contact" size="lg">
              Start a project
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
            <Button href="#work" variant="secondary" size="lg">
              See our work
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-20 grid w-full max-w-2xl grid-cols-3 gap-6 border-t border-border pt-10"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  {stat.value}
                </span>
                <span className="mt-1 text-center text-xs text-muted sm:text-sm">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
