## Browser smoke test — 2026-09-03

The production Next.js server rendered `/` successfully. The landing page showed the Antitude navigation, dark grid hero, cyan gradient headline, stats strip, service cards, featured projects, CTA panel, and footer with no visible runtime error.

The `/appointment` route rendered successfully with required first name, last name, work email, company, message fields, optional phone, preferred date, loading-ready submit button, and consistent responsive styling. The page displayed no visible runtime error.

The `/admin/login` route rendered correctly. Submitting the local demo credential redirected to `/admin`, where the protected dashboard loaded three seeded leads, summary counts, refresh/sign-out controls, and status selectors. The cookie-protected API flow was also verified with command-line requests: `/api/health` returned 200, unauthenticated `/api/leads` returned 401, and authenticated `/api/leads` returned the lead list.

## PostgreSQL integration verification — 2026-09-03

A local PostgreSQL 16 instance was started for end-to-end testing. The generated Drizzle migration applied successfully, the idempotent seed inserted three lead rows, and the database contained the expected `new`, `contacted`, and `qualified` status distribution. With `DATABASE_URL` configured, `/api/health` returned `status: ok`, admin login returned 200, authenticated `GET /api/leads` returned three rows, and authenticated `PATCH /api/leads` successfully changed a lead status in PostgreSQL.

The application no longer reads or writes `data/leads.json`; PostgreSQL is now the only lead persistence layer.
