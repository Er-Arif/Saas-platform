# Company Platform

Production-style monorepo for a software company platform that sells downloadable and deployable software products.

## What is included

- `apps/web`: public company website and marketing/catalog flows
- `apps/portal`: customer dashboard for organization-owned assets
- `apps/admin`: internal operations console
- `apps/docs`: product integration documentation starter
- `apps/api`: FastAPI backend for auth, catalog, billing, licensing, support, and product-client APIs
- `apps/gateway`: future-ready gateway starter kept for later service expansion
- `packages/ui`: shared React UI primitives
- `packages/types`: shared TypeScript domain types
- `packages/sdk`: starter fetch client
- `database/migrations`: Alembic migrations
- `database/seeds`: realistic demo seed data
- `infrastructure/docker`: local Postgres, Redis, MinIO, and Mailpit
- `docs-internal`: architecture notes and roadmap

## Core architecture

- Platform Auth is only for `company.com`, `app.company.com`, and `admin.company.com`
- Commercial assets belong to organizations, not individual users
- Products may keep independent product-internal auth and tenants
- The active platform focus is product commerce, distribution, licensing, updates, and support
- Future services and APIs remain possible later without defining today's experience around them

## Local setup

### 1. Copy environment variables

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

### 2. Start infrastructure

```bash
docker compose -f infrastructure/docker/docker-compose.yml up -d
```

### 3. Install frontend workspace dependencies

PowerShell on this machine blocks `npm.ps1`, so use:

```powershell
cmd /c npm install
```

### 4. Install Python apps

```powershell
python -m pip install -e apps/api
python -m pip install -e apps/gateway
```

### 5. Run migrations and seed demo data

```powershell
alembic upgrade head
python database/seeds/seed_demo.py
```

### 6. Run apps

```powershell
cmd /c npm run dev
python -m uvicorn app.main:app --app-dir apps/api --reload --port 8000
python -m uvicorn gateway.main:app --app-dir apps/gateway --reload --port 8100
```

## Demo accounts

- Super admin: `admin@company.local` / `AdminPass123!`
- Billing admin: `billing@company.local` / `BillingPass123!`
- Customer user: `ops@sunrisefoods.example` / `CustomerPass123!`

## Implemented domains

- organization-first identity and memberships
- marketing website and catalog pages
- customer portal pages for downloads, licenses, billing, products, and support
- admin console pages for operations
- product catalog schema plus future-ready service scope
- pricing plans, orders, subscriptions, invoices, payments
- India-first billing abstractions with Razorpay primary and Cashfree-ready support
- GST invoice fields and helper calculations
- private download file metadata and signed delivery
- license registry, devices, activations, events, and product-client verification endpoints
- support tickets, messages, and lead intake records
- future-ready gateway starter with request logging

## Phase commit history

- `chore: bootstrap company platform monorepo and infrastructure`
- `feat(api): add core platform schema, gateway foundation, and migrations`
- `feat(auth): implement platform identity and organization-based access`
- `feat(web): launch marketing site and catalog domain`
- `feat(portal): add customer dashboard, entitlements, and support workflows`
- `feat(billing): add india payment flows, gst invoices, and webhook processing`
- `feat(services): add api access management and gateway capabilities`
- `feat(admin): deliver internal operations console`

## Next recommended execution steps

1. Install dependencies and run the local stack.
2. Replace demo billing/provider stubs with live Razorpay flows.
3. Connect the Next.js forms and tables to live API queries and mutations.
4. Replace demo private files with real installer uploads and signed object storage in production.
5. Wire each desktop product to the `product-client` endpoints for activation, verification, update checks, and downloads.
