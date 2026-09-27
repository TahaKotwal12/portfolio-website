# Margin of Error

The marketing site and admin dashboard for **Margin of Error** — a web app / product
engineering studio. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4,
Motion (Framer Motion), Neon Postgres + Drizzle ORM, and Nodemailer.

- Animated, responsive marketing site with light/dark mode
- A `/admin` dashboard (email + password) to manage the projects shown in the **Work**
  section, backed by Neon Postgres — no redeploy needed to add a new case study
- A contact form that emails you via SMTP and stores leads in the database
- Works out of the box with **zero configuration**: without `DATABASE_URL` set, the
  site falls back to bundled demo content so you can preview and deploy immediately,
  then wire up the database and email whenever you're ready

## Stack

| Layer      | Choice                                   |
| ---------- | ----------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack)        |
| Language   | TypeScript                                |
| Styling    | Tailwind CSS v4                           |
| Animation  | Motion (`motion/react`, the Framer Motion successor) |
| Database   | Neon Postgres + Drizzle ORM               |
| Auth       | Custom session cookie (jose + bcrypt), no third-party auth vendor |
| Email      | Nodemailer over SMTP                      |
| Icons      | lucide-react                              |

## Getting started

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000` immediately, using the bundled demo
projects. To unlock the database-backed admin panel and the contact form's email
notifications, configure the environment variables below.

## Environment variables

Copy `.env.example` to `.env.local` and fill in what you need:

```bash
cp .env.example .env.local
```

### 1. Database (Neon Postgres)

1. Create a free project at [neon.tech](https://neon.tech).
2. Copy the connection string it gives you (the "pooled connection" one) into
   `DATABASE_URL`.
3. Push the schema:
   ```bash
   npm run db:push
   ```
4. (Optional) Load the demo case studies into your own database:
   ```bash
   npm run db:seed
   ```

Without `DATABASE_URL`, the site still runs — the Work section shows bundled demo
projects and `/admin` becomes read-only.

### 2. Admin login

1. Generate a password hash:
   ```bash
   npm run admin:hash -- "a-strong-password"
   ```
2. Set `ADMIN_EMAIL` and paste the printed hash into `ADMIN_PASSWORD_HASH`.
3. Set `SESSION_SECRET` to a random 32+ character string:
   ```bash
   openssl rand -base64 32
   ```
4. Sign in at `/admin/login`.

There's exactly one admin account, defined by environment variables — no user table,
no third-party auth vendor, nothing to leak.

### 3. Email (contact form)

The contact form works with any SMTP provider — Gmail (with an
[app password](https://support.google.com/accounts/answer/185833)), Resend, Postmark,
SendGrid, Amazon SES, or your own mail server.

Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, and optionally
`CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL`. Without SMTP configured, the form still
succeeds and stores the lead in the database (if connected); it just won't email you.

## Managing projects

Once the database and admin login are configured, go to `/admin/dashboard` to create,
edit, publish/unpublish, and delete the case studies shown in the **Work** section —
this is also where you'll add your other projects later. Changes appear on the live
site immediately (no redeploy).

Project images are referenced by URL (upload to any image host — Cloudinary, Vercel
Blob, S3, imgur — and paste the URL in). The bundled demo projects use Unsplash stock
photos as placeholders; swap them for real screenshots as you ship work.

## Deployment

### Vercel (recommended)

1. Push this repo to GitHub and [import it on Vercel](https://vercel.com/new).
2. Add the environment variables from `.env.example` in the project's Settings →
   Environment Variables.
3. Deploy. Vercel builds and serves the app with zero extra config — Next.js Route
   Handlers, Server Actions, and the proxy (middleware) all work natively.
4. Point your domain at the Vercel project and set `NEXT_PUBLIC_SITE_URL` to it.

### AWS

Two supported paths, depending on how hands-on you want to be:

**Option A — AWS Amplify Hosting (simplest)**

1. Create a new Amplify app from your GitHub repo.
2. Amplify auto-detects Next.js (SSR) — accept the default build settings.
3. Add the same environment variables under App settings → Environment variables.
4. Deploy. Amplify provisions the CDN, SSR compute, and HTTPS certificate for you.

**Option B — Containerized on ECS/Fargate or App Runner**

1. Build a production image:
   ```dockerfile
   FROM node:22-slim AS base
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```
2. Push the image to ECR.
3. Run it on **App Runner** (simplest) or **ECS/Fargate** behind an ALB, with the
   environment variables above set on the task/service.
4. Put it behind CloudFront + Route 53 for CDN and your domain.

Either way, Neon Postgres and your SMTP provider are reached over the public internet,
so no AWS-side database or mail service is required.

## Project structure

```
src/
  app/
    (marketing)/        # public site: layout, homepage
    admin/               # /admin — login, dashboard, project CRUD (protected)
    api/contact/         # contact form endpoint
    layout.tsx           # fonts, theme provider, global metadata
    opengraph-image.tsx  # generated OG image
    icon.tsx              # generated favicon
  components/
    sections/            # homepage sections (hero, services, work, pricing, ...)
    admin/                # admin-only components
    ui/                   # shared primitives (button, reveal, marquee, container)
  lib/
    db/                   # Drizzle schema, client, queries, demo seed data
    auth/                 # session + credential helpers
    email/                # Nodemailer wrapper
  proxy.ts                 # route protection for /admin/*
scripts/
  seed.ts                 # seeds Neon with the demo projects
  hash-password.ts        # generates ADMIN_PASSWORD_HASH
```

## Scripts

| Command             | Description                                  |
| -------------------- | --------------------------------------------- |
| `npm run dev`         | Start the dev server                          |
| `npm run build`       | Production build                              |
| `npm run start`       | Serve the production build                    |
| `npm run lint`        | Lint                                           |
| `npm run db:push`     | Push the Drizzle schema to `DATABASE_URL`      |
| `npm run db:generate` | Generate SQL migration files                   |
| `npm run db:studio`   | Open Drizzle Studio against `DATABASE_URL`     |
| `npm run db:seed`     | Load demo projects into the database           |
| `npm run admin:hash`  | Generate a bcrypt hash for `ADMIN_PASSWORD_HASH` |
