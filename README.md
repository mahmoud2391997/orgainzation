# Antitude Technology Partner

A full-stack Next.js App Router migration of the supplied AI Technology Partner Website. The visual language preserves the original Antitude direction: deep navy, cyan signal accents, grid texture, pragmatic copy, and editorial case-study layouts.

## Run locally

```bash
pnpm install
cp .env.example .env.local
# set DATABASE_URL + ADMIN_PASSWORD, then:
pnpm db:setup
pnpm dev
```

The site runs at `http://localhost:3000`. With PostgreSQL connected, the admin portal at `/admin` is the single source of truth for services, technologies, solutions, examples, and uploaded images. Without a database, non-production falls back to seed content / `data/cms.json`.

## Full-stack features

The consultation form submits to `POST /api/leads` and persists requests in PostgreSQL through Drizzle ORM. Public marketing content lives in typed CMS tables (`cms_services`, `cms_technologies`, `cms_solutions`, `cms_examples`) plus `media_assets` for uploads under `/public/uploads`. The client portal is available at `/admin`; sign in through `/admin/login`, then edit content (including images) and manage lead statuses.

Set both `DATABASE_URL` and `ADMIN_PASSWORD` before deploying. Run `pnpm db:setup` once against the target PostgreSQL database to apply migrations and insert the initial demo rows. The database layer uses a pooled `postgres` client with server-only access.

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
| `/api/content` | Protected CMS content read/update (services, technologies, solutions, examples) |
| `/api/media` | Protected image upload + media library |
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
pnpm db:seed       # insert demo leads + CMS rows without overwriting existing content
pnpm db:setup      # migrate + seed
```
