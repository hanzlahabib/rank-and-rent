# Rank & Rent - Complete Project Context

> **Purpose**: This document is a complete context dump for any LLM or developer to pick up this project and continue work immediately. It covers every aspect of the codebase, architecture, active site configuration, SEO strategy, deployment plan, and next steps.

---

## 1. Project Overview

**Rank & Rent** is a digital real estate platform that generates hyper-local service websites, ranks them on Google, and rents the lead flow to local contractors.

- **Architecture**: Multi-tenant, config-driven. A single Next.js codebase generates unique service websites per site config.
- **First live site**: Henderson EV Charger Pros (EV charger installation in Henderson, NV)
- **Business model**: Build niche service sites targeting low-competition local keywords, capture leads via forms and phone calls, then rent the monthly lead flow to verified local contractors for recurring revenue.
- **Revenue target per site**: $1K-8K/month depending on niche and location.

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router, Turbopack) | 16.1.6 |
| React | React + React DOM | 19.2.3 |
| Language | TypeScript (strict mode) | ^5 |
| Styling | Tailwind CSS 4 + shadcn/ui + tw-animate-css | ^4 |
| ORM | Drizzle ORM (neon-http driver) | ^0.45.1 |
| Database | Neon PostgreSQL (serverless) | @neondatabase/serverless ^1.0.2 |
| SMS/Voice | Twilio SDK | ^5.12.1 |
| Forms | React Hook Form + Zod 4 | ^7.71.1 / ^4.3.6 |
| Icons | Lucide React | ^0.563.0 |
| Toasts | Sonner | ^2.0.7 |
| Package Manager | pnpm | - |
| Build | Turbopack (dev), Next.js build (prod) | - |
| React Compiler | Enabled (babel-plugin-react-compiler) | 1.0.0 |
| Deployment Target | Contabo VPS (185.182.187.120) | Ubuntu 22.04 |

### Key Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `next.config.ts` | Next.js config (React Compiler enabled) |
| `tsconfig.json` | TypeScript strict mode, `@/*` path alias to `./src/*` |
| `drizzle.config.ts` | Drizzle Kit config (schema path, PostgreSQL dialect) |
| `postcss.config.mjs` | PostCSS with `@tailwindcss/postcss` |
| `components.json` | shadcn/ui component config |
| `.env.example` | All required environment variables |

---

## 3. Complete File Map

### Root Config Files
```
/
  package.json              # Dependencies, scripts (dev/build/start/lint)
  next.config.ts            # Next.js config - React Compiler enabled
  tsconfig.json             # TypeScript strict, @/* path alias
  drizzle.config.ts         # Drizzle Kit - schema at ./src/lib/db/schema.ts, output ./drizzle
  postcss.config.mjs        # PostCSS with Tailwind
  components.json           # shadcn/ui component config
  .env.example              # Environment variable template
  eslint.config.mjs         # ESLint config
```

### `src/app/` - Next.js App Router Pages & API Routes

```
src/app/
  layout.tsx                # Root layout - DM Sans + Bricolage Grotesque fonts, Sonner toaster
  page.tsx                  # Platform landing page - shows 5 niches with CPC/revenue data
  globals.css               # Tailwind imports + custom design system (navy, cerulean, etc.)
  favicon.ico               # Site favicon
  robots.ts                 # robots.txt - allows all, links sitemap
  sitemap.ts                # Dynamic sitemap - homepage, services, areas, blog posts, about

  (site)/[slug]/
    page.tsx                # Site homepage - Navbar, Hero, Services, Testimonials, LeadForm, FAQ, Footer + JSON-LD
    about/page.tsx          # About page - team bios, credentials, EEAT signals, service area
    blog/page.tsx           # Blog listing - all 8 posts sorted by date, grid layout
    blog/[postSlug]/page.tsx # Blog post detail - markdown rendering, mid-article CTA, author bio, related posts, Article JSON-LD
    areas/[areaSlug]/page.tsx # Area page - neighborhood-specific landing page with local content, services, trust signals, nearby areas

  (admin)/
    layout.tsx              # Admin layout - sidebar + content area (260px sidebar)
    dashboard/page.tsx      # Main dashboard - StatsCards, LeadsTable, SitesTable
    sites/page.tsx          # Sites listing table
    sites/[siteId]/page.tsx # Site detail - all config data, EEAT signals, team, SEO, services, keywords, blog posts, areas, CSV exports
    leads/page.tsx          # Leads management table with search/filter/CSV export
    blog-posts/page.tsx     # Blog posts management with CSV export
    tenants/page.tsx        # Tenants management page

  api/
    leads/route.ts          # POST - Lead capture (save to DB + SMS notification via Twilio, graceful degradation)
    contractors/route.ts    # GET/POST - List/add contractors for a site
    contractors/bulk/route.ts # POST - Bulk add contractors
    outbound/route.ts       # POST/GET - Initiate outbound calls to contractors, list contractors
    outbound/twiml/route.ts # POST - TwiML for outbound contractor pitch call
    outbound/status/route.ts # POST - Outbound call status webhook
    outbound/response/route.ts # POST - Outbound call keypress response handler
    webhooks/twilio/
      voice/route.ts        # POST - Inbound call webhook (logs call, creates lead, returns TwiML)
      call-status/route.ts  # POST - Call status update webhook
      recording/route.ts    # POST - Recording completed webhook
      sms/route.ts          # POST - Inbound SMS webhook
```

### `src/components/` - React Components

```
src/components/
  site/                     # Public-facing site components
    navbar.tsx              # Site navigation bar with phone CTA
    hero.tsx                # Hero section with headline, CTA buttons, trust signals
    services.tsx            # Services grid displaying niche services
    lead-form.tsx           # Multi-step lead capture form (2 steps: contact info + service details)
    faq.tsx                 # FAQ accordion section
    testimonials.tsx        # Customer testimonials section
    footer.tsx              # Site footer with business info, links, copyright

  seo/                      # SEO-specific components
    json-ld.tsx             # JSON-LD structured data (LocalBusiness, Service, FAQPage)
    eeat-meta.tsx           # Organization + BreadcrumbList schemas, OG meta, author meta

  admin/                    # Admin dashboard components
    sidebar.tsx             # Admin sidebar navigation
    stats-cards.tsx         # Dashboard statistics cards
    sites-table.tsx         # Sites listing table
    leads-table.tsx         # Leads table with search, filter, status badges
    blog-posts-export.tsx   # Blog posts with CSV export
    csv-export-button.tsx   # Reusable CSV export button component
    site-detail-exports.tsx # CSV export dropdown for site detail page

  ui/                       # shadcn/ui components
    alert-dialog.tsx        # Alert dialog component
    badge.tsx               # Badge component
    button.tsx              # Button component (with variants)
    card.tsx                # Card component
    dialog.tsx              # Dialog/modal component
    dropdown-menu.tsx       # Dropdown menu component
    form.tsx                # Form component (react-hook-form integration)
    input.tsx               # Input component
    label.tsx               # Label component
    select.tsx              # Select dropdown component
    separator.tsx           # Visual separator
    sheet.tsx               # Sheet/drawer component
    sonner.tsx              # Sonner toast provider
    table.tsx               # Data table component
    tabs.tsx                # Tabs component
    textarea.tsx            # Textarea component
```

### `src/config/` - All Site/Niche/Content Configuration

```
src/config/
  sites/
    index.ts                # SITE_REGISTRY - maps slugs to SiteConfig objects + helper functions
    henderson-ev.ts         # Henderson EV Charger Pros site config (all EEAT, SEO, business data)

  niches/
    types.ts                # NICHE_REGISTRY - lazy-loaded niche configs + getNicheConfig()
    ev-charger.ts           # EV Charger Installation niche (services, FAQs, keywords, CTA text)
    smart-home.ts           # Smart Home Installation niche config
    water-damage.ts         # Water Damage Restoration niche config
    pressure-washing.ts     # Pressure Washing niche config
    junk-removal.ts         # Junk Removal niche config

  areas.ts                  # Henderson area configs - 6 neighborhoods with descriptions, highlights, ZIP codes

  blog-posts/
    types.ts                # BlogPost interface definition
    index.ts                # blogPosts array - all 8 blog post objects
    ev-charger-cost.ts      # "How Much Does EV Charger Installation Cost in Henderson, NV?"
    tesla-vs-nema.ts        # Tesla Wall Connector vs NEMA 14-50 comparison
    permit-requirements.ts  # Henderson EV charger permit requirements guide
    level-1-vs-level-2.ts   # Level 1 vs Level 2 charger comparison
    best-ev-chargers-2026.ts # Best EV chargers for 2026
    nv-energy-rebates.ts    # NV Energy EV charger rebates guide
    panel-upgrade-cost.ts   # Electrical panel upgrade cost breakdown
    apartment-ev-charging.ts # EV charging for apartment/condo owners

  blog-posts.ts             # Re-export barrel file for blog posts
```

### `src/lib/` - Shared Libraries

```
src/lib/
  db/
    index.ts                # Database connection - lazy Proxy pattern, isDbConfigured() check
    schema.ts               # Drizzle schema - sites, leads, tenants, callLogs, notificationLogs, contractors
  twilio.ts                 # Twilio client - SMS notifications, inbound TwiML, outbound pitch calls
  csv-export.ts             # Client-side CSV export utility
  utils.ts                  # cn() utility (clsx + tailwind-merge)
```

### `src/types/` and `src/middleware.ts`

```
src/types/
  index.ts                  # All TypeScript interfaces: SiteConfig, NicheConfig, Lead, Tenant, etc.

src/middleware.ts            # Subdomain routing middleware (admin subdomain, site slug detection)
```

---

## 4. Architecture

### Config-Driven Multi-Tenancy

The platform does NOT store site content in the database. Instead, all site configuration is defined as TypeScript objects:

1. **Site Configs** (`src/config/sites/`): Each site is a `SiteConfig` object with business info, SEO config, and `contentOverrides` (a Record<string, string> for all EEAT data, team bios, license numbers, etc.)
2. **Niche Configs** (`src/config/niches/`): Each niche defines services, FAQs, keywords, hero text, CTA copy, trust signals, and market data (CPC, revenue range, difficulty score)
3. **Blog Posts** (`src/config/blog-posts/`): Full articles as TypeScript objects with markdown content strings
4. **Area Pages** (`src/config/areas.ts`): Neighborhood landing pages with descriptions, highlights, ZIP codes

### Site Registry Pattern

```typescript
// src/config/sites/index.ts
export const SITE_REGISTRY: Record<string, SiteConfig> = {
  "henderson-ev-charger": hendersonEvConfig,
  // Add new sites here
};

// Helper functions:
getSiteBySlug(slug)      // Lookup by URL slug
getAllSiteSlugs()         // For static generation
getAllSites()             // All configs
getActiveSites()          // Only status === "active"
```

### Niche Registry Pattern (Lazy Loading)

```typescript
// src/config/niches/types.ts
export const NICHE_REGISTRY: Record<NicheSlug, () => Promise<NicheConfig>> = {
  "ev-charger-installation": () => import("./ev-charger").then(m => m.evChargerConfig),
  "smart-home-installation": () => import("./smart-home").then(m => m.smartHomeConfig),
  // ...
};
```

### Routing Architecture

- **Platform Landing**: `/` shows all niches with CPC/revenue data
- **Site Pages**: `/(site)/[slug]/` catches the site slug from URL
- **Blog**: `/(site)/[slug]/blog/` and `/(site)/[slug]/blog/[postSlug]/`
- **Areas**: `/(site)/[slug]/areas/[areaSlug]/`
- **About**: `/(site)/[slug]/about/`
- **Admin**: `/(admin)/dashboard`, `/(admin)/sites`, `/(admin)/leads`, `/(admin)/blog-posts`, `/(admin)/tenants`
- **API**: `/api/leads`, `/api/contractors`, `/api/outbound`, `/api/webhooks/twilio/*`

### Middleware

The middleware (`src/middleware.ts`) handles:
- Admin subdomain detection (rewrites to `/admin/*`)
- Site slug detection from subdomains (sets `x-site-slug` header)
- Static file, API, and `_next` paths are excluded

### Database Connection (Lazy Proxy)

```typescript
// src/lib/db/index.ts
export const db = new Proxy({} as NeonHttpDatabase<typeof schema>, {
  get(_target, prop) {
    return getDb()[prop as keyof NeonHttpDatabase<typeof schema>];
  },
});
```

The database connection is only established on first DB operation. If `DATABASE_URL` is not set, the app still functions -- API routes catch DB errors and continue (graceful degradation).

---

## 5. Active Site: Henderson EV Charger Pros

### Core Details

| Property | Value |
|----------|-------|
| **ID / Slug** | `henderson-ev-charger` |
| **Domain** | hendersonevcharger.com |
| **Business Name** | Henderson EV Charger Pros |
| **Phone** | (702) 555-0134 |
| **Email** | info@hendersonevcharger.com |
| **Address** | 1023 Nevada Way, Suite 4, Henderson, NV 89012 |
| **City** | Las Vegas |
| **Suburb** | Henderson |
| **State** | NV |
| **ZIP** | 89012 |
| **Niche** | ev-charger-installation |
| **Status** | active |

### EEAT Signals (contentOverrides)

| Category | Key Details |
|----------|-------------|
| **License** | NV-EC-2024-087431 |
| **Contractor License** | NV-C2E-0082194 |
| **Bond** | SUR-2024-NV-55219 |
| **Insurance** | State Farm Commercial (SF-NV-COM-2024-91847) |
| **Owner** | Mike Castillo - Owner & Master Electrician (18+ years, EVITP, Tesla, ChargePoint certified) |
| **Tech Lead** | Sarah Chen - Lead Installation Technician (12 years, 400+ installations) |
| **Years in Business** | 8 |
| **Total Installations** | 1,200+ |
| **Google Reviews** | 4.9 stars (187 reviews) |
| **Yelp Reviews** | 4.8 stars (64 reviews) |
| **BBB Rating** | A+ (Accredited) |
| **Warranty** | 5-year workmanship warranty |
| **Affiliations** | NECA, IEC, EVITP, Henderson Chamber of Commerce, NV State Contractors Board |

### Services (4)

1. **Level 2 Home Charger Installation** (slug: `level-2-home-charger`)
2. **Tesla Wall Connector Installation** (slug: `tesla-wall-connector`)
3. **Commercial EV Charging Stations** (slug: `commercial-ev-charging`)
4. **Electrical Panel Upgrade** (slug: `electrical-panel-upgrade`)

### Area Pages (6 Henderson Neighborhoods)

| Area | Slug | ZIP Codes |
|------|------|-----------|
| Green Valley | `green-valley` | 89014, 89052, 89074 |
| Anthem | `anthem` | 89052, 89044 |
| Lake Las Vegas | `lake-las-vegas` | 89011 |
| Seven Hills | `seven-hills` | 89052 |
| Inspirada | `inspirada` | 89044 |
| MacDonald Ranch | `macdonald-ranch` | 89012 |

### Blog Posts (8)

| Title | Slug | Category |
|-------|------|----------|
| How Much Does EV Charger Installation Cost in Henderson, NV? | `how-much-does-ev-charger-installation-cost-henderson-nv` | Cost Guides |
| Tesla Wall Connector vs NEMA 14-50 | `tesla-vs-nema` | Comparison |
| Henderson EV Charger Permit Requirements | `permit-requirements` | Regulations |
| Level 1 vs Level 2 EV Charger | `level-1-vs-level-2-ev-charger` | Education |
| Best EV Chargers for 2026 | `best-ev-chargers-2026` | Reviews |
| NV Energy EV Charger Rebates | `nv-energy-ev-charger-rebates-henderson` | Rebates |
| Electrical Panel Upgrade Cost | `electrical-panel-upgrade-cost-henderson-nv` | Cost Guides |
| EV Charging for Apartments/Condos | `apartment-ev-charging` | Guides |

### Target Keywords (10)

```
ev charger installation, electric vehicle charger, level 2 charger installation,
home ev charger, tesla charger installation, ev charging station installation,
electric car charger, ev charger electrician, 240v outlet installation,
nema 14-50 installation
```

### Niche Market Data

| Metric | Value |
|--------|-------|
| Average CPC | $30-50+ |
| Revenue Range | $3K-8K/mo |
| Difficulty Score | 95/100 |

---

## 6. SEO Strategy

### Reference Documents
- `bmad/docs/seo-deployment-plan.md` -- Full SEO execution checklist (50+ citation directories, GBP setup, link building plan)
- `bmad/docs/keyword-analysis-complete.md` -- Complete keyword research with search volumes, competition data, and content mapping

### On-Page SEO Infrastructure

**Dynamic Meta Tags**: Every page uses `generateMetadata()` with site-specific title templates and descriptions.

**JSON-LD Structured Data** (via `src/components/seo/json-ld.tsx` and `src/components/seo/eeat-meta.tsx`):
- `LocalBusiness` schema on all site pages (business name, address, phone, hours, aggregate rating)
- `Service` schema on homepage and service pages
- `FAQPage` schema on homepage (from niche FAQs)
- `Article` schema on blog posts (author, publisher, dates, keywords)
- `Organization` schema (via EEAT meta component)
- `BreadcrumbList` schema on blog posts and area pages

**Sitemap** (`src/app/sitemap.ts`):
- Homepage (priority 1.0, weekly)
- 4 service pages (priority 0.9, monthly)
- 6 area pages (priority 0.8, monthly)
- Blog listing (priority 0.7, weekly)
- 8 blog posts (priority 0.7, monthly)
- About page (priority 0.6, monthly)

**Robots.txt** (`src/app/robots.ts`): Allows all crawlers, points to sitemap.

**Content Strategy**:
- Blog posts target long-tail informational keywords ("how much does ev charger installation cost henderson nv")
- Area pages target geo-modified service keywords ("ev charger installation green valley henderson")
- Mid-article CTAs in blog posts drive traffic to the lead form
- Each blog post has related posts for internal linking
- Author bios with credentials on every article for EEAT

**EEAT Signals** embedded throughout:
- Real team bios with certifications and credentials
- License and bond numbers displayed on About page and in structured data
- Google review count, Yelp reviews, BBB rating prominently displayed
- Business hours, address, payment methods listed
- Industry affiliations (NECA, IEC, EVITP, Chamber of Commerce)
- 5-year workmanship warranty and satisfaction guarantee

---

## 7. Lead Capture Flow

### Multi-Step Form (`src/components/site/lead-form.tsx`)

1. **Step 1**: Name, Email, Phone (required fields)
2. **Step 2**: Service selection (dropdown from niche services), Message (optional)
3. **Submit**: POSTs to `/api/leads`

### API Handler (`src/app/api/leads/route.ts`)

```
POST /api/leads
Body: { name, email, phone, service, message, siteId, source }

Flow:
1. Validate required fields (name, email, phone, siteId)
2. Insert into `leads` table via Drizzle (try/catch - continues without DB)
3. Send SMS notification via Twilio (try/catch - continues without Twilio)
4. Return { success: true, leadId } with 201 status

Graceful degradation: Works without DB or Twilio configured.
```

### SMS Notification Format

```
NEW LEAD from henderson-ev-charger
Name: John Smith
Phone: (702) 555-1234
Email: john@example.com
Service: Level 2 Home Charger Installation
Message: I need a charger installed in my garage
Reply CALL to auto-dial this lead.
```

---

## 8. Twilio Integration

### Configuration

| Env Var | Description |
|---------|-------------|
| `TWILIO_ACCOUNT_SID` | Twilio account SID |
| `TWILIO_AUTH_TOKEN` | Twilio auth token |
| `TWILIO_PHONE_NUMBER` | Twilio phone number (702 area code for Henderson) |
| `OWNER_PHONE_NUMBER` | Owner's personal phone for forwarding |
| `OWNER_EMAIL` | Owner's email for notifications |

### Capabilities

**1. SMS Notifications on New Leads**
- `sendLeadSmsNotification()` in `src/lib/twilio.ts`
- Sends formatted SMS to owner when form is submitted

**2. Inbound Call Handling**
- Webhook: `POST /api/webhooks/twilio/voice?site=henderson-ev-charger`
- Creates a lead record from the call
- Logs the call to `callLogs` table
- Returns TwiML: greeting -> forward to owner (30s timeout) -> voicemail if no answer
- Recording enabled on answered calls

**3. Voicemail**
- `generateVoicemailTwiml()` - plays message, records up to 120s, transcribes

**4. Outbound Contractor Pitch Calls**
- `POST /api/outbound` - initiates call to contractor
- `generateOutboundPitchTwiml()` - AI pitch script introducing the lead service
- Contractor presses 1 to learn more, 2 to opt out
- Status tracking via `/api/outbound/status` webhook

### Webhook Routes

| Route | Purpose |
|-------|---------|
| `/api/webhooks/twilio/voice` | Inbound call handler (TwiML response) |
| `/api/webhooks/twilio/call-status` | Call status updates |
| `/api/webhooks/twilio/recording` | Recording completed notifications |
| `/api/webhooks/twilio/sms` | Inbound SMS handler |

---

## 9. Environment Variables

From `.env.example`:

```bash
# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@host:5432/rankrent

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ADMIN_URL=http://admin.localhost:3000

# Twilio
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+17025550134

# Owner Notifications
OWNER_PHONE_NUMBER=+1XXXXXXXXXX
OWNER_EMAIL=your@email.com

# Twilio Webhook Signing (optional)
TWILIO_WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 10. Database Schema

### Provider

Neon PostgreSQL (serverless, HTTP-based). Connected via `@neondatabase/serverless` with `drizzle-orm/neon-http` driver.

### Schema (`src/lib/db/schema.ts`)

**Enums:**
- `site_status`: active, paused, draft
- `lead_status`: new, contacted, qualified, converted, lost
- `lead_source`: form, call, chat, sms
- `tenant_status`: active, paused, cancelled
- `call_status`: initiated, ringing, in-progress, completed, no-answer, busy, failed

**Tables:**

#### `sites`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | auto-generated |
| slug | varchar(255) | unique, not null |
| domain | varchar(255) | nullable |
| niche_slug | varchar(100) | not null |
| business_name | varchar(255) | not null |
| phone | varchar(20) | not null |
| email | varchar(255) | not null |
| city | varchar(100) | not null |
| state | varchar(50) | not null |
| suburb | varchar(100) | not null |
| zip_code | varchar(10) | not null |
| status | site_status | default 'draft' |
| seo_config | jsonb | title/description templates |
| content_overrides | jsonb | key-value EEAT data |
| tenant_id | uuid (FK) | references tenants |
| created_at | timestamp | auto |
| updated_at | timestamp | auto |

#### `leads`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | auto-generated |
| site_slug | varchar(255) | not null |
| tenant_id | uuid (FK) | references tenants |
| name | varchar(255) | not null |
| email | varchar(255) | not null |
| phone | varchar(20) | not null |
| message | text | nullable |
| service | varchar(255) | nullable |
| source | lead_source | default 'form' |
| status | lead_status | default 'new' |
| notified_at | timestamp | nullable |
| twilio_call_sid | varchar(64) | nullable |
| created_at | timestamp | auto |

#### `tenants`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | auto-generated |
| name | varchar(255) | not null |
| email | varchar(255) | not null |
| phone | varchar(20) | not null |
| monthly_rate | integer | default 0 |
| status | tenant_status | default 'active' |
| created_at | timestamp | auto |

#### `call_logs`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | auto-generated |
| site_slug | varchar(255) | not null |
| lead_id | uuid (FK) | references leads |
| twilio_call_sid | varchar(64) | unique |
| direction | varchar(20) | 'inbound' or 'outbound' |
| from_number | varchar(20) | not null |
| to_number | varchar(20) | not null |
| status | call_status | default 'initiated' |
| duration | integer | default 0 |
| recording_url | text | nullable |
| transcription | text | nullable |
| created_at | timestamp | auto |

#### `notification_logs`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | auto-generated |
| lead_id | uuid (FK) | references leads |
| type | varchar(20) | 'sms' or 'email' |
| to_address | varchar(255) | not null |
| message | text | not null |
| status | varchar(20) | default 'sent' |
| twilio_sid | varchar(64) | nullable |
| created_at | timestamp | auto |

#### `contractors`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid (PK) | auto-generated |
| name | varchar(255) | not null |
| business_name | varchar(255) | nullable |
| phone | varchar(20) | not null |
| email | varchar(255) | nullable |
| site_slug | varchar(255) | not null |
| status | varchar(20) | default 'prospect' (prospect/contacted/interested/signed/rejected) |
| last_contacted_at | timestamp | nullable |
| notes | text | nullable |
| monthly_rate | integer | default 0 |
| created_at | timestamp | auto |

### Relations
- `sites` -> `tenants` (many-to-one via tenant_id)
- `sites` -> `leads` (one-to-many)
- `leads` -> `tenants` (many-to-one via tenant_id)
- `tenants` -> `sites` (one-to-many)
- `tenants` -> `leads` (one-to-many)

### Migrations

```bash
# Push schema to database (development)
npx drizzle-kit push

# Generate migration files
npx drizzle-kit generate

# Run migrations
npx drizzle-kit migrate
```

### Lazy Connection Pattern

The app works without a database configured. The `db` export uses a Proxy that only connects on first operation. API routes wrap DB calls in try/catch to continue without DB.

---

## 11. Admin Dashboard

### Routes

| URL | Description |
|-----|-------------|
| `/dashboard` | Main overview - stats cards, recent leads, sites table |
| `/sites` | All registered sites from SITE_REGISTRY |
| `/sites/[siteId]` | Full site detail page with all config data |
| `/leads` | Leads table with search, filter, CSV export |
| `/blog-posts` | All blog posts with CSV export |
| `/tenants` | Tenants management page |

### Site Detail Page Features

The site detail page (`/sites/henderson-ev-charger`) shows:
- Business information (domain, phone, email, address, hours)
- EEAT trust signals (licenses, reviews, BBB rating, years in business)
- Team members (owner + tech lead bios and certifications)
- SEO configuration (title template, description template, canonical, schema type)
- Services list (4 services)
- Target keywords (10 keywords)
- Blog posts (8 posts with links to view)
- Area pages (6 neighborhoods with links)
- All content overrides (raw key-value table)

### CSV Export

The `SiteDetailExports` component provides a dropdown with export options:
- Business Info
- Blog Posts
- Area Pages
- Services
- Keywords
- SEO Config
- All Config Data

Uses `src/lib/csv-export.ts` for client-side CSV generation and download.

---

## 12. Design System

### Fonts
- **Body**: DM Sans (variable: `--font-dm-sans`, class: `font-sans`)
- **Display/Headings**: Bricolage Grotesque (variable: `--font-bricolage`, class: `font-display`)
- **Monospace**: Geist Mono (variable: `--font-geist-mono`, class: `font-mono`)

### Color Palette (defined in `globals.css`)
| Token | Hex | Usage |
|-------|-----|-------|
| `navy` | #0c1425 | Dark backgrounds, headers |
| `navy-light` | #162038 | Hover states on dark backgrounds |
| `cerulean` | #2563eb | Primary brand color, CTAs, links |
| `cerulean-light` | #3b82f6 | Hover states, accents |
| `amber-warm` | #f59e0b | Phone icons, highlights |
| `emerald-trust` | #10b981 | Trust signals, success states |
| `slate-50` to `slate-900` | Standard | Text hierarchy, borders |

### Custom CSS Classes
- `.dot-grid` -- Dot pattern background overlay
- `.hero-clip` -- Diagonal clip-path on hero sections
- `.glass-card` -- Frosted glass card effect
- `.cta-pulse` -- Pulsing ring animation on CTA buttons
- `.reveal` + `.reveal-delay-{1-5}` -- Staggered entrance animations
- `.trust-shimmer` -- Shimmer effect on trust badges
- `.text-gradient` -- White-to-slate gradient text
- `.stat-number` -- Tabular number styling
- `.sidebar-active` -- Active indicator for admin sidebar

---

## 13. Deployment Plan

### Target Server
- **Provider**: Contabo VPS
- **IP**: 185.182.187.120
- **OS**: Ubuntu 22.04.5 LTS
- **RAM**: 15GB
- **Disk**: 400GB SSD
- **Control Panel**: CyberPanel (https://185.182.187.120:8090)
- **Node.js**: v20.20.0
- **pnpm**: 10.14.0

### Deployment Steps

1. **Create website in CyberPanel** for hendersonevcharger.com
2. **Clone repository** to server
3. **Install dependencies**: `pnpm install`
4. **Configure environment**: Create `.env` with production DATABASE_URL, Twilio credentials, NEXT_PUBLIC_APP_URL
5. **Build**: `pnpm build`
6. **Start with PM2**: `pm2 start npm --name "hendersonevcharger" -- start`
7. **Configure reverse proxy** in CyberPanel/LiteSpeed to proxy port 3000
8. **SSL certificate** via CyberPanel's Let's Encrypt integration
9. **DNS**: Point hendersonevcharger.com A record to 185.182.187.120
10. **Twilio webhook URLs**: Update to https://hendersonevcharger.com/api/webhooks/twilio/*
11. **Google Search Console**: Verify domain ownership
12. **Submit sitemap**: https://hendersonevcharger.com/sitemap.xml
13. **Google Business Profile**: Create and verify listing

---

## 14. Running Locally

```bash
cd /home/hanzla/development/vibe-coding/rank-and-rent
pnpm install
pnpm dev  # Starts on http://localhost:3000
```

### Local URLs

| URL | What It Shows |
|-----|---------------|
| http://localhost:3000 | Platform landing page (5 niches) |
| http://localhost:3000/henderson-ev-charger | Henderson EV Charger site homepage |
| http://localhost:3000/henderson-ev-charger/about | About page with team bios |
| http://localhost:3000/henderson-ev-charger/blog | Blog listing (8 articles) |
| http://localhost:3000/henderson-ev-charger/blog/how-much-does-ev-charger-installation-cost-henderson-nv | Example blog post |
| http://localhost:3000/henderson-ev-charger/areas/green-valley | Example area page |
| http://localhost:3000/dashboard | Admin dashboard |
| http://localhost:3000/sites | Admin sites listing |
| http://localhost:3000/sites/henderson-ev-charger | Admin site detail with exports |
| http://localhost:3000/leads | Admin leads table |
| http://localhost:3000/blog-posts | Admin blog posts |

### Notes
- App works without DATABASE_URL (API routes degrade gracefully)
- App works without Twilio credentials (SMS/calls fail silently)
- Static generation via `generateStaticParams()` for site pages, blog posts, and area pages

---

## 15. Available Niches (Pre-Configured)

| Niche | Slug | Avg CPC | Revenue | Difficulty |
|-------|------|---------|---------|------------|
| EV Charger Installation | ev-charger-installation | $30-50+ | $3K-8K/mo | 95 |
| Smart Home Installation | smart-home-installation | $25-40 | $3K-8K/mo | 90 |
| Water Damage Restoration | water-damage-restoration | $31+ | $2K-6K/mo | 88 |
| Pressure Washing | pressure-washing | $8-15 | $1K-3K/mo | 82 |
| Junk Removal | junk-removal | $15-25 | $1.5K-4K/mo | 80 |

Each niche has a full config file with services, FAQs, keywords, hero copy, CTA text, and trust signals. Only EV Charger Installation has a live site currently.

---

## 16. Type Definitions

### Core Types (`src/types/index.ts`)

```typescript
type SiteStatus = "active" | "paused" | "draft";
type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "lost";
type LeadSource = "form" | "call" | "chat";
type TenantStatus = "active" | "paused" | "cancelled";
type NicheSlug = "ev-charger-installation" | "smart-home-installation" | "water-damage-restoration" | "pressure-washing" | "junk-removal";

interface SiteConfig {
  id: string;
  slug: string;
  domain: string | null;
  nicheSlug: NicheSlug;
  businessName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  suburb: string;
  zipCode: string;
  status: SiteStatus;
  seoConfig: SeoConfig;
  contentOverrides: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

interface NicheConfig {
  slug: NicheSlug;
  name: string;
  shortName: string;
  description: string;
  keywords: string[];
  services: ServiceItem[];
  faqs: FaqItem[];
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
  ctaPhoneText: string;
  trustSignals: string[];
  avgCpc: string;
  revenueRange: string;
  difficultyScore: number;
}

interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  author: string;
  authorBio: string;
  publishDate: string;
  category: string;
  readTime: string;
  heroImage: string;
  content: string;        // Markdown string
  tags: string[];
  relatedSlugs: string[];
}

interface AreaConfig {
  slug: string;
  name: string;
  fullName: string;
  description: string;
  highlights: string[];
  zipCodes: string[];
  nearbyAreas: string[];  // slugs of related areas
}
```

---

## 17. API Reference

### Lead Capture
```
POST /api/leads
Body: { name, email, phone, service?, message?, siteId, source? }
Response: { success: true, message: "Lead captured successfully", leadId }
Status: 201
```

### Contractors
```
GET /api/contractors?site=henderson-ev-charger
Response: { contractors: [...] }

POST /api/contractors
Body: { name, businessName?, phone, email?, siteSlug, notes? }
Response: { contractor: {...} }
Status: 201

POST /api/contractors/bulk
Body: { contractors: [{ name, phone, siteSlug, ... }] }
```

### Outbound Calls
```
POST /api/outbound
Body: { contractorId?, siteSlug }
Response: { success: true, callSid, contractor: { id, name, phone } }

GET /api/outbound?site=henderson-ev-charger
Response: { contractors: [...] }
```

### Twilio Webhooks (POST, form-encoded)
```
/api/webhooks/twilio/voice?site=henderson-ev-charger  -> TwiML XML
/api/webhooks/twilio/call-status?site=...             -> 200 OK
/api/webhooks/twilio/recording?site=...               -> 200 OK
/api/webhooks/twilio/sms                              -> 200 OK
```

---

## 18. Current State and What's Next

### Completed

- Full Henderson EV Charger site with all pages (home, about, blog, areas)
- 8 SEO-optimized blog posts with markdown content, mid-article CTAs, author bios
- 6 area pages targeting Henderson neighborhoods
- Complete SEO infrastructure (JSON-LD structured data, dynamic meta tags, sitemap, robots.txt)
- Multi-step lead capture form with API
- Lead storage in PostgreSQL via Drizzle (with graceful degradation)
- Twilio integration: SMS notifications, inbound call handling, outbound contractor pitch calls
- Admin dashboard with real data from config, search/filter, CSV export
- Site detail page with comprehensive config view and export options
- 5 niche configs pre-built (only EV Charger has a live site)
- Custom design system (navy/cerulean theme, animations, responsive)

### Next Steps (In Priority Order)

1. **Deploy to Contabo VPS** -- Set up hendersonevcharger.com in CyberPanel, configure reverse proxy, SSL
2. **Purchase domain** -- hendersonevcharger.com
3. **Set up Neon PostgreSQL** -- Create database, run `npx drizzle-kit push`
4. **Configure Twilio** -- Buy (702) number, set webhook URLs
5. **Google Search Console** -- Verify domain, submit sitemap
6. **Google Business Profile** -- Create listing with NAP data matching site
7. **Build citations** -- Submit to 50+ local directories per SEO deployment plan
8. **Monitor rankings** -- Track target keywords weekly
9. **Build second site** -- Smart Home Installation (niche config already exists)
10. **Contractor outreach** -- Use outbound call system to pitch Henderson EV installers

---

## 19. How to Add a New Site

1. Create a new site config in `src/config/sites/` (copy henderson-ev.ts as template)
2. Register it in `SITE_REGISTRY` in `src/config/sites/index.ts`
3. Choose an existing niche slug or create a new niche config in `src/config/niches/`
4. Create area configs if needed (new file or extend `src/config/areas.ts`)
5. Create blog posts in `src/config/blog-posts/` and register in index
6. The routing automatically picks up the new site via `[slug]` parameter
7. Deploy and configure DNS for the new domain

### How to Add a New Niche

1. Create niche config in `src/config/niches/` implementing `NicheConfig` interface
2. Add the niche slug to the `NicheSlug` type union in `src/types/index.ts`
3. Register the lazy loader in `NICHE_REGISTRY` in `src/config/niches/types.ts`

---

## 20. Existing Documentation

| Document | Path | Description |
|----------|------|-------------|
| Architecture | `bmad/docs/architecture.md` | System architecture overview |
| PRD | `bmad/docs/prd.md` | Product requirements document |
| Infrastructure Roadmap | `bmad/docs/infra-roadmap.md` | Infrastructure and deployment roadmap |
| SEO Deployment Plan | `bmad/docs/seo-deployment-plan.md` | Full SEO execution checklist with citation directories, link building |
| Keyword Analysis | `bmad/docs/keyword-analysis-complete.md` | Complete keyword research with search volumes and competition data |
| SEO Keyword Research | `bmad/docs/seo-keyword-research.md` | Initial keyword research notes |
