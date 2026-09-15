# BaytFix — Home Electrical & Plumbing

WhatsApp + Salla ordering system for **house electrical and plumbing** jobs. Same stack and integrations as the produce ordering product: Next.js, Prisma/PostgreSQL, Salla catalog/orders, WhatsApp Cloud API, and Gemini/Mistral parsing.

This copy lives in `home-maintenance/` so the original WhatsApp produce repo is left unchanged.

## Run locally

```bash
cd home-maintenance
cp .env.example .env.local
npm install
npx prisma generate
npm run dev
```

Dashboard: `http://localhost:3000/dashboard`

## Business catalog

| Category | Examples |
|---|---|
| Electrical | Outlet repair, lighting, breakers, wiring diagnosis, emergency callout |
| Plumbing | Faucets, leaks, drains, toilets, pipe replacement |
| Inspection | Home inspection, preventive visit, annual contract |

Customer price tiers stay in the same fields: homeowner (`retail`), building (`shop`), contractor (`wholesale`).

## Integrations

Salla OAuth, product/order/customer sync, WhatsApp webhooks, HyperPay / Geidea / Tamara, and the operator dashboard are unchanged from the source system. Point `.env` at your own Salla app, WhatsApp number, and PostgreSQL database.

See `DEPLOYMENT_GUIDE.md` and `docs/salla-whatsapp-setup-ar.md`.
