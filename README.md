# Antitude Technology Partner

A full-stack Next.js App Router migration of the supplied AI Technology Partner Website. The visual language preserves the original Antitude direction: deep navy, cyan signal accents, grid texture, pragmatic copy, and editorial case-study layouts.

## Run locally

```bash
pnpm install
pnpm dev
```

The site runs at `http://localhost:3000`. Copy `.env.example` to `.env.local`, set `DATABASE_URL` to your PostgreSQL connection string, set `ADMIN_PASSWORD`, then run `pnpm db:setup` before opening the admin portal.

## Full-stack features

The consultation form submits to `POST /api/leads` and persists requests in PostgreSQL through Drizzle ORM. The client portal is available at `/admin`; sign in through `/admin/login`, then review and update lead statuses through the protected `GET` and `PATCH /api/leads` endpoints. The deployment health check is available at `/api/health`.

Set both `DATABASE_URL` and `ADMIN_PASSWORD` before deploying. Run `pnpm db:setup` once against the target PostgreSQL database to apply the migration and insert the initial demo rows. The database layer uses a pooled `postgres` client with server-only access, and the migration is stored in `drizzle/0000_brief_jack_murdock.sql`. For production, use a managed PostgreSQL instance and a strong admin password.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Marketing landing page |
| `/services` | Capability overview |
| `/services/[slug]` | Service detail pages |
| `/technologies` | Technology radar |
| `/solutions` | Industry solutions |
| `/projects` | Filterable case-study index |
| `/projects/[slug]` | Case-study detail pages |
| `/appointment` | Consultation lead capture |
| `/admin/login` | Portal sign-in |
| `/admin` | Protected lead dashboard |
| `/api/health` | Health check |
| `/api/leads` | Lead submission and protected management API |

## Build

```bash
pnpm typecheck
pnpm build
```

Database commands:

```bash
pnpm db:generate   # regenerate SQL after changing db/schema.ts
pnpm db:migrate    # apply migrations
pnpm db:seed       # insert demo leads without overwriting existing rows
pnpm db:setup      # migrate + seed
```
