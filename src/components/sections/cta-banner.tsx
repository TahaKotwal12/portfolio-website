import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function CtaBanner() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-foreground px-8 py-16 text-center text-background sm:px-16 sm:py-24">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            <h2 className="relative text-balance font-display text-3xl font-medium tracking-tight sm:text-5xl">
              Let&apos;s build something with zero margin for error.
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-balance text-background/70">
              Tell us what you&apos;re building. We reply within one business day with next
              steps, not a sales pitch.
            </p>
            <div className="relative mt-9 flex justify-center">
              <Button href="#contact" size="lg">
                Start a project
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
