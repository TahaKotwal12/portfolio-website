"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/db/schema";

export function Work({ projects }: { projects: Project[] }) {
  const categories = React.useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects]
  );
  const [active, setActive] = React.useState("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="work" className="py-24 lg:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow>Selected work</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-balance font-display text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
                Products we&apos;ve shipped.
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
                  active === cat
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </Reveal>
        </div>

        <LayoutGroup>
          <motion.div layout className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {filtered.length === 0 && (
          <p className="mt-14 text-center text-sm text-muted">
            No projects in this category yet.
          </p>
        )}
      </Container>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const card = (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, delay: index < 2 ? index * 0.06 : 0, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-shadow duration-500 hover:border-accent-2/40 hover:shadow-[0_0_0_1px_var(--accent-2),0_20px_60px_-20px_var(--accent-2)] dark:hover:border-accent/30 dark:hover:shadow-[0_0_0_1px_var(--accent),0_20px_60px_-20px_var(--accent)]",
        project.featured && "md:col-span-2"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          project.featured ? "aspect-[16/8]" : "aspect-[16/10]"
        )}
      >
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes={project.featured ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 font-mono text-[11px] text-white backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-medium tracking-tight">
            {project.title}
          </h3>
          {project.year && (
            <span className="shrink-0 font-mono text-xs text-muted">{project.year}</span>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
            View project
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </motion.article>
  );

  if (!project.liveUrl) return card;

  return (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noreferrer"
      className="rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {card}
    </a>
  );
}
