"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, CheckCircle2, Loader2, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const budgets = ["< $10k", "$10k – $25k", "$25k – $50k", "$50k+", "Not sure yet"];

const inputClasses =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/70 transition-colors focus:border-foreground/40 focus:outline-none";

export function Contact() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Reveal>
              <Eyebrow>Get in touch</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-balance font-display text-3xl font-medium tracking-tight sm:text-4xl">
                Tell us about your project.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-sm text-muted">
                Share a few details and we&apos;ll come back with next steps, a rough
                timeline, and a straight answer on whether we&apos;re the right fit.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-10 space-y-4">
              <a
                href="mailto:hello@marginoferror.dev"
                className="group flex items-center gap-3 text-sm"
              >
                <span className="flex size-10 items-center justify-center rounded-full border border-border">
                  <Mail className="size-4" strokeWidth={1.75} />
                </span>
                <span className="flex items-center gap-1.5">
                  hello@marginoferror.dev
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
              <div className="flex items-center gap-3 text-sm text-muted">
                <span className="flex size-10 items-center justify-center rounded-full border border-border">
                  <MapPin className="size-4" strokeWidth={1.75} />
                </span>
                Remote-first, working across US &amp; EU time zones
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <CheckCircle2 className="size-10 text-accent-2 dark:text-accent" strokeWidth={1.5} />
                    <h3 className="mt-5 font-display text-xl font-medium">Message sent.</h3>
                    <p className="mt-2 max-w-xs text-sm text-muted">
                      Thanks — we&apos;ll get back to you within one business day.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-6 text-sm font-medium text-foreground underline underline-offset-4"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-xs font-medium text-muted">
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          required
                          maxLength={160}
                          className={inputClasses}
                          placeholder="Jane Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-2 block text-xs font-medium text-muted">
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          maxLength={320}
                          className={inputClasses}
                          placeholder="jane@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="company" className="mb-2 block text-xs font-medium text-muted">
                          Company <span className="text-muted/60">(optional)</span>
                        </label>
                        <input
                          id="company"
                          name="company"
                          maxLength={160}
                          className={inputClasses}
                          placeholder="Acme Inc."
                        />
                      </div>
                      <div>
                        <label htmlFor="budget" className="mb-2 block text-xs font-medium text-muted">
                          Budget range
                        </label>
                        <select id="budget" name="budget" className={cn(inputClasses, "appearance-none")} defaultValue="">
                          <option value="" disabled>
                            Select a range
                          </option>
                          {budgets.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="mb-2 block text-xs font-medium text-muted">
                        Project details
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        maxLength={4000}
                        className={cn(inputClasses, "resize-none")}
                        placeholder="What are you building, and what does success look like?"
                      />
                    </div>

                    {/* honeypot field, hidden from real users */}
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden="true"
                    />

                    {status === "error" && (
                      <p className="text-sm text-danger">{errorMessage}</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent text-sm font-medium text-accent-foreground transition-all hover:shadow-[0_0_0_1px_var(--accent),0_8px_30px_-6px_var(--accent)] disabled:opacity-60"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send message
                          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
