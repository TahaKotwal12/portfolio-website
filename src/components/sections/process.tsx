import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

const steps = [
  {
    n: "01",
    title: "Discover",
    description:
      "A working session on your goals, users, and constraints. We leave with a scoped plan, not a vague proposal.",
  },
  {
    n: "02",
    title: "Design",
    description:
      "Interfaces and data models designed together, reviewed with you at every milestone — no surprise reveals.",
  },
  {
    n: "03",
    title: "Build",
    description:
      "Engineering in short, shippable cycles. You get a staging link and a changelog every week, not radio silence.",
  },
  {
    n: "04",
    title: "Ship",
    description:
      "Production deploy, monitoring, and a handover doc that means your team — or ours — can maintain it confidently.",
  },
  {
    n: "05",
    title: "Support",
    description:
      "Optional ongoing partnership for iteration, scaling, and new features as the product finds its footing.",
  },
];

export function Process() {
  return (
    <section id="process" className="relative py-24 lg:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow className="mx-auto">How we work</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance font-display text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
              A process built to remove guesswork.
            </h2>
          </Reveal>
        </div>

        <RevealGroup className="relative mt-20 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          <div
            aria-hidden="true"
            className="absolute top-6 left-0 right-0 hidden h-px bg-border lg:block"
          />
          {steps.map((step) => (
            <RevealItem key={step.n} className="relative">
              <div className="relative flex size-12 items-center justify-center rounded-full border border-border bg-background font-mono text-sm text-muted">
                {step.n}
              </div>
              <h3 className="mt-5 font-display text-lg font-medium tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
