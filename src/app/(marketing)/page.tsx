import { Hero } from "@/components/sections/hero";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Work } from "@/components/sections/work";
import { WhyUs } from "@/components/sections/why-us";
import { Pricing } from "@/components/sections/pricing";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { listProjects } from "@/lib/db/queries";

export default async function HomePage() {
  const projects = await listProjects();

  return (
    <>
      <Hero />
      <TechMarquee />
      <Services />
      <Process />
      <Work projects={projects} />
      <WhyUs />
      <Pricing />
      <CtaBanner />
      <Faq />
      <Contact />
    </>
  );
}
