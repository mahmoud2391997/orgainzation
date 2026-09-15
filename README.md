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

Set both `DATABASE_URL` and `ADMIN_PASSWORD` before deploying. Run `pnpm db:setup` once against the target PostgreSQL database to apply the migration and insert the initial demo rows. The database layer uses a pooled `postgres` client with server-only access, and the migration is stored in `drizzle/0000_brief_jack_murdock.sql`.

In production, `ADMIN_PASSWORD` is required (the app will not fall back to the demo password). Likewise, the app does **not** fall back to local JSON storage by default in production — this makes misconfigured database deployments fail loudly.

### Hostinger / managed PostgreSQL notes

- **Use SSL**: many managed providers require TLS. The simplest approach is to append `?sslmode=require` to `DATABASE_URL`.
- **Keep pools small**: shared hosting environments can hit connection limits quickly. Start with `DATABASE_POOL_MAX=2..5`.
- **One-time DB setup**: after the first deploy, run `pnpm db:setup` once (via SSH / terminal in your hosting panel) to apply migrations and seed demo rows.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Marketing landing page |
| `/services` | Capability overview |
| `/services/[slug]` | Service detail pages |
| `/technologies` | Technology radar |
| `/solutions` | Industry solutions |
| `/examples` | Filterable case-study index |
| `/about` | Company profile |
| `/contact` | Contact page (alias of `/appointment`) |
| `/appointment` | Consultation lead capture |
| `/admin/login` | Portal sign-in |
| `/admin` | Protected lead dashboard + CMS |
| `/api/health` | Health check |
| `/api/leads` | Lead submission and protected management API |
| `/api/content` | Protected CMS content read/update |
| `/api/admin/login` | Portal sign-in / sign-out |

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
