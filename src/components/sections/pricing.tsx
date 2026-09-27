import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "MVP Sprint",
    price: "From $9k",
    description: "A focused engagement to validate an idea with real users, fast.",
    features: [
      "2–4 week fixed timeline",
      "One core user flow, built end-to-end",
      "Production deploy included",
      "Async updates + 2 live demos",
    ],
    highlighted: false,
  },
  {
    name: "Product Partnership",
    price: "From $22k",
    description: "The default for teams building a full product with us.",
    features: [
      "Full product build, scoped in phases",
      "Weekly live demos on staging",
      "Design + engineering, one team",
      "30 days of post-launch support",
      "Fixed price per phase",
    ],
    highlighted: true,
  },
  {
    name: "Dedicated Team",
    price: "Custom",
    description: "Embedded senior engineers working inside your roadmap, monthly.",
    features: [
      "1–3 engineers, matched to your stack",
      "Sprint planning with your team",
      "Scale, on-call, and infra ownership",
      "Month-to-month, cancel anytime",
    ],
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow className="mx-auto">Engagements</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance font-display text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
              Transparent, fixed-scope pricing.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-muted">
              Every engagement starts with a scoping call — the numbers below are
              starting points, not the final quote.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <RevealItem key={tier.name}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-2xl border p-8",
                  tier.highlighted
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-surface"
                )}
              >
                <h3 className="font-display text-lg font-medium tracking-tight">
                  {tier.name}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-sm",
                    tier.highlighted ? "text-background/70" : "text-muted"
                  )}
                >
                  {tier.description}
                </p>
                <p className="mt-6 font-display text-3xl font-semibold tracking-tight">
                  {tier.price}
                </p>

                <ul className="mt-8 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <Check
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          tier.highlighted ? "text-accent" : "text-accent-2 dark:text-accent"
                        )}
                        strokeWidth={2}
                      />
                      <span className={tier.highlighted ? "text-background/90" : "text-foreground/80"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  href="#contact"
                  className="mt-8"
                  variant={tier.highlighted ? "primary" : "secondary"}
                >
                  Talk about this
                </Button>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
