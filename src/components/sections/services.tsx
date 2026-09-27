import {
  LayoutGrid,
  Rocket,
  ShoppingCart,
  Cpu,
  ServerCog,
  PenTool,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

const services = [
  {
    icon: LayoutGrid,
    title: "Web App Development",
    description:
      "Full-stack applications built on modern, boring-in-a-good-way infrastructure — fast, typed, and built to last past the first hire.",
  },
  {
    icon: Rocket,
    title: "MVP Sprints",
    description:
      "From idea to a live, testable product in weeks, not quarters. Scoped tightly so you learn fast without burning runway.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce & Storefronts",
    description:
      "Headless storefronts tuned for speed and conversion, integrated with the commerce and payment stack you already run on.",
  },
  {
    icon: Cpu,
    title: "AI-Native Features",
    description:
      "LLM-powered search, assistants, and automation woven into your product — grounded in your data, not a demo that falls apart.",
  },
  {
    icon: ServerCog,
    title: "Platform & DevOps",
    description:
      "CI/CD, infrastructure-as-code, observability, and scaling plans so the app that works in week one still works at 100x.",
  },
  {
    icon: PenTool,
    title: "Product Design",
    description:
      "Interface and interaction design done alongside engineering, so what ships matches what was designed — pixel for pixel.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 lg:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow className="mx-auto">What we do</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance font-display text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
              One team, the entire build.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-balance text-muted">
              No handoffs between a design shop and a dev shop. We scope, design, build,
              and operate — so nothing gets lost in translation.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <RevealItem key={service.title}>
              <div className="group relative h-full bg-background p-8 transition-colors hover:bg-surface">
                <service.icon
                  className="size-6 text-accent-2 dark:text-accent"
                  strokeWidth={1.5}
                />
                <h3 className="mt-6 font-display text-lg font-medium tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
