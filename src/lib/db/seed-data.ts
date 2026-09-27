import type { NewProject } from "./schema";

/**
 * Demo case studies shown until real client work is added via /admin.
 * These illustrate the range of products the studio can ship.
 */
export const seedProjects: NewProject[] = [
  {
    slug: "orbit-finance",
    title: "Orbit Finance",
    client: "Orbit",
    category: "Fintech",
    summary:
      "A real-time spend-management platform for startups — multi-currency cards, approval flows, and live budget analytics.",
    description:
      "Orbit needed a finance operations platform that could handle multi-entity accounting, card issuing, and approval workflows without feeling like enterprise software. We designed and built the entire product from data model to pixel: a Next.js + Postgres core, event-driven ledger, and a dashboard that renders complex financial data in real time without jank.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe Treasury", "Tailwind CSS"],
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    liveUrl: "https://example.com",
    repoUrl: null,
    featured: true,
    sortOrder: 1,
    year: "2025",
    published: true,
  },
  {
    slug: "lumen-health",
    title: "Lumen Health",
    client: "Lumen",
    category: "Healthtech",
    summary:
      "A HIPAA-conscious telehealth scheduling and intake system built to cut patient no-shows by 40%.",
    description:
      "Lumen's clinics were losing hours to manual scheduling and paper intake forms. We shipped a booking engine with SMS reminders, dynamic intake forms, and a provider dashboard — architected around strict data-handling requirements from day one.",
    techStack: ["Next.js", "Neon Postgres", "Drizzle ORM", "Twilio", "Framer Motion"],
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1600&auto=format&fit=crop",
    liveUrl: "https://example.com",
    repoUrl: null,
    featured: true,
    sortOrder: 2,
    year: "2025",
    published: true,
  },
  {
    slug: "northstar-commerce",
    title: "Northstar Commerce",
    client: "Northstar",
    category: "E-commerce",
    summary:
      "A headless storefront and merchandising engine handling 8-figure GMV with sub-second page loads.",
    description:
      "Northstar outgrew their templated storefront. We rebuilt it headless on top of their existing commerce backend, focused on Core Web Vitals, personalized merchandising, and a checkout flow tuned for conversion.",
    techStack: ["Next.js", "Shopify Hydrogen", "Redis", "Vercel Edge", "GraphQL"],
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1600&auto=format&fit=crop",
    liveUrl: "https://example.com",
    repoUrl: null,
    featured: true,
    sortOrder: 3,
    year: "2024",
    published: true,
  },
  {
    slug: "pulsegrid-analytics",
    title: "PulseGrid Analytics",
    client: "PulseGrid",
    category: "SaaS / AI",
    summary:
      "A self-serve analytics SaaS with an AI query assistant that turns plain English into live dashboards.",
    description:
      "PulseGrid wanted to let non-technical teams query their own data. We built a natural-language-to-SQL pipeline backed by a permissioned data layer, with generated charts users can save, share, and turn into scheduled reports.",
    techStack: ["Next.js", "tRPC", "PostgreSQL", "Claude API", "Recharts"],
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-a5e6b70bff3d?q=80&w=1600&auto=format&fit=crop",
    liveUrl: "https://example.com",
    repoUrl: null,
    featured: false,
    sortOrder: 4,
    year: "2024",
    published: true,
  },
  {
    slug: "fieldwork-ops",
    title: "Fieldwork Ops",
    client: "Fieldwork",
    category: "Marketplace",
    summary:
      "A two-sided marketplace connecting field technicians with service requests, with offline-first mobile support.",
    description:
      "Technicians work in basements and rural sites with no signal. We built an offline-first PWA that queues job updates locally and syncs the moment connectivity returns, paired with a dispatcher web console for operations teams.",
    techStack: ["Next.js", "React Native", "PostgreSQL", "WebSockets", "PWA"],
    imageUrl:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1600&auto=format&fit=crop",
    liveUrl: "https://example.com",
    repoUrl: null,
    featured: false,
    sortOrder: 5,
    year: "2024",
    published: true,
  },
  {
    slug: "atlas-crm",
    title: "Atlas CRM",
    client: "Atlas",
    category: "Internal Tools",
    summary:
      "A bespoke CRM replacing three disconnected spreadsheets, cutting sales-ops admin time by 12 hours a week.",
    description:
      "Atlas' sales team was stitching together spreadsheets and a legacy CRM nobody liked. We shipped a lean, purpose-built CRM matched exactly to their pipeline stages, with automated follow-up reminders and reporting their leadership actually reads.",
    techStack: ["Next.js", "Neon Postgres", "Drizzle ORM", "Resend", "Tailwind CSS"],
    imageUrl:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1600&auto=format&fit=crop",
    liveUrl: "https://example.com",
    repoUrl: null,
    featured: false,
    sortOrder: 6,
    year: "2023",
    published: true,
  },
];
