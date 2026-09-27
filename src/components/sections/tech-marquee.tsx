import { Container } from "@/components/ui/container";
import { Marquee } from "@/components/ui/marquee";

const stack = [
  "Next.js",
  "TypeScript",
  "React",
  "PostgreSQL",
  "Neon",
  "Drizzle ORM",
  "Tailwind CSS",
  "Node.js",
  "AWS",
  "Vercel",
  "Stripe",
  "GraphQL",
  "tRPC",
  "Docker",
  "Claude API",
];

export function TechMarquee() {
  return (
    <section className="border-y border-border py-10">
      <Container>
        <p className="mb-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted">
          The stack we ship with
        </p>
      </Container>
      <Marquee>
        {stack.map((tech) => (
          <span
            key={tech}
            className="font-display text-xl font-medium text-foreground/25 transition-colors hover:text-foreground/70 sm:text-2xl"
          >
            {tech}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
