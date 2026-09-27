"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How long does a typical build take?",
    a: "An MVP sprint runs 2–4 weeks. A full product build usually lands between 6 and 12 weeks, split into fixed-price phases so you always know what's next and what it costs.",
  },
  {
    q: "Who actually owns the code and infrastructure?",
    a: "You do — from the first commit. Repositories, cloud accounts, and domains are created under your organization, and we work inside them. Nothing is held back at the end of an engagement.",
  },
  {
    q: "What tech stack do you build with?",
    a: "Primarily Next.js, TypeScript, and PostgreSQL (usually via Neon), deployed on Vercel or AWS. We adapt to an existing stack if you already have one — we don't force a rewrite.",
  },
  {
    q: "Do you work with early-stage startups with no product yet?",
    a: "Yes — that's most of our work. We're comfortable turning a rough idea and a whiteboard sketch into a scoped plan and a live product.",
  },
  {
    q: "What happens after launch?",
    a: "Every engagement includes a post-launch support window. After that, teams either move to a month-to-month Dedicated Team engagement or take the codebase in-house — both are common.",
  },
];

export function Faq() {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <section id="faq" className="py-24 lg:py-32">
      <Container className="max-w-3xl">
        <div className="text-center">
          <Reveal>
            <Eyebrow className="mx-auto">FAQ</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Questions, answered upfront.
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 divide-y divide-border border-y border-border">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-medium tracking-tight sm:text-lg">
                    {item.q}
                  </span>
                  <Plus
                    className={cn(
                      "size-5 shrink-0 text-muted transition-transform duration-300",
                      isOpen && "rotate-45 text-foreground"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-sm leading-relaxed text-muted">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
