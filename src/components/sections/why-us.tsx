import { ShieldCheck, Eye, Users, Timer } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

const reasons = [
  {
    icon: Users,
    title: "Senior engineers only",
    description:
      "No junior devs learning on your bill. Every line is written or reviewed by someone who has shipped production software before.",
  },
  {
    icon: Eye,
    title: "Radical visibility",
    description:
      "A shared staging environment and a weekly demo, not a status report. You watch the product get built in real time.",
  },
  {
    icon: ShieldCheck,
    title: "You own everything",
    description:
      "Source code, infrastructure, and accounts are yours from day one. No vendor lock-in, no held-hostage repositories.",
  },
  {
    icon: Timer,
    title: "Fixed scope, fixed price",
    description:
      "We scope tightly up front so the number we quote is the number you pay — change requests are proposed, not sprung on you.",
  },
];

export function WhyUs() {
  return (
    <section className="border-y border-border bg-surface/40 py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <div>
            <Reveal>
              <Eyebrow>Why Margin of Error</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-balance font-display text-3xl font-medium tracking-tight sm:text-4xl">
                Named for the thing we refuse to leave in.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-muted">
                Most software fails quietly — slow queries, brittle deploys, a design
                that never quite matched the mock. We built this studio around removing
                that margin, one decision at a time.
              </p>
            </Reveal>
          </div>

          <RevealGroup className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {reasons.map((reason) => (
              <RevealItem key={reason.title}>
                <reason.icon className="size-5 text-accent-2 dark:text-accent" strokeWidth={1.5} />
                <h3 className="mt-4 font-display text-base font-medium tracking-tight">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {reason.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
