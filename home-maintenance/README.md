# BaytFix — Home Electrical & Plumbing

WhatsApp + Salla ordering system for **house electrical and plumbing** jobs. Same stack and integrations as the produce ordering product: Next.js, Prisma/PostgreSQL, Salla catalog/orders, WhatsApp Cloud API, and Gemini/Mistral parsing.

This project is a **standalone app**. Put it in its own folder on your PC and its own GitHub repository. Do not nest it inside the Antitude marketing site (`orgainzation`). The original produce repo was not modified.

## Own folder on your PC + independent GitHub repo

This Cloud Agent cannot create a GitHub repository under your account. Create an empty repo, then extract this app into a folder on your machine.

### 1. Create the empty GitHub repo

1. Open [github.com/new](https://github.com/new)
2. Repository name: `baytfix-home-maintenance`
3. Private
4. Do **not** add a README, `.gitignore`, or license
5. Create repository

### 2a. Fastest: unzip the download, then push

Download `baytfix_home_maintenance.zip` from this agent, then:

**macOS / Linux**

```bash
DEST="$HOME/baytfix-home-maintenance"
mkdir -p "$DEST"
unzip -q /path/to/baytfix_home_maintenance.zip -d "$DEST"
cd "$DEST"
git init -b main
git add .
git commit -m "Initial commit: BaytFix home electrical and plumbing ordering"
git remote add origin https://github.com/YOUR_USER/baytfix-home-maintenance.git
git push -u origin main
```

**Windows (PowerShell)**

```powershell
$dest = "$HOME\baytfix-home-maintenance"
New-Item -ItemType Directory -Force -Path $dest | Out-Null
Expand-Archive -Path .\baytfix_home_maintenance.zip -DestinationPath $dest -Force
Set-Location $dest
git init -b main
git add .
git commit -m "Initial commit: BaytFix home electrical and plumbing ordering"
git remote add origin https://github.com/YOUR_USER/baytfix-home-maintenance.git
git push -u origin main
```

If you downloaded `baytfix_home_maintenance.bundle` instead:

```bash
git clone -b main /path/to/baytfix_home_maintenance.bundle "$HOME/baytfix-home-maintenance"
cd "$HOME/baytfix-home-maintenance"
git remote remove origin
git remote add origin https://github.com/YOUR_USER/baytfix-home-maintenance.git
git push -u origin main
```

A `.tar.gz` of the same files is also available if you prefer `tar -xzf` over unzip.

### 2b. Extract from the orgainzation PR branch

If you already cloned `orgainzation` (do **not** merge that PR into the marketing site):

```bash
DEST="$HOME/baytfix-home-maintenance"
git clone -b cursor/home-maintenance-ordering-3cbf --depth 1 --filter=blob:none --sparse \
  https://github.com/mahmoud2391997/orgainzation.git /tmp/orgainzation-baytfix
cd /tmp/orgainzation-baytfix
git sparse-checkout set home-maintenance
bash home-maintenance/scripts/init-pc-folder.sh "$DEST"
cd "$DEST"
git remote add origin https://github.com/YOUR_USER/baytfix-home-maintenance.git
git push -u origin main
```

After that, `$HOME/baytfix-home-maintenance` **is** the independent repo. Open that folder in Cursor / VS Code. You can delete `/tmp/orgainzation-baytfix`.

Replace `YOUR_USER` with your GitHub username if it is not `mahmoud2391997`.

## Run locally

From the BaytFix folder (the repo root — not a nested `home-maintenance/` directory):

```bash
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
