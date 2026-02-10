# System Architecture: Rank & Rent Platform

## High-Level Architecture

```
[Browser] --> [Next.js Middleware (subdomain routing)]
                    |
            [App Router - Dynamic Routes]
                    |
        +-----------+-----------+
        |           |           |
  [Site Pages]  [Admin API]  [Lead API]
        |           |           |
  [Niche Config]  [Auth]   [Notifications]
        |           |           |
        +-----------+-----------+
                    |
            [Drizzle ORM]
                    |
            [PostgreSQL]
```

## Directory Structure

```
src/
├── app/
│   ├── (admin)/              # Admin dashboard routes
│   │   ├── dashboard/
│   │   ├── sites/
│   │   ├── leads/
│   │   └── tenants/
│   ├── (site)/               # Public site routes
│   │   └── [[...slug]]/      # Catch-all for dynamic pages
│   ├── api/                  # API routes
│   │   ├── leads/
│   │   ├── sites/
│   │   └── admin/
│   └── layout.tsx
├── components/
│   ├── admin/                # Admin UI components
│   ├── site/                 # Public site components
│   │   ├── hero.tsx
│   │   ├── services.tsx
│   │   ├── testimonials.tsx
│   │   ├── lead-form.tsx
│   │   └── footer.tsx
│   ├── seo/                  # SEO components
│   │   ├── json-ld.tsx
│   │   └── meta-tags.tsx
│   └── ui/                   # shadcn/ui components
├── config/
│   └── niches/               # Niche configurations
│       ├── types.ts
│       ├── ev-charger.ts
│       ├── smart-home.ts
│       ├── water-damage.ts
│       ├── pressure-washing.ts
│       └── junk-removal.ts
├── lib/
│   ├── db/
│   │   ├── index.ts          # Drizzle client
│   │   ├── schema.ts         # Database schema
│   │   └── seed.ts           # Seed data
│   ├── seo/
│   │   ├── sitemap.ts
│   │   └── structured-data.ts
│   └── utils.ts
├── middleware.ts              # Multi-tenant routing
└── types/
    └── index.ts
```

## Multi-Tenant Routing Strategy

### Approach: Subdomain-based routing
1. Each site gets a subdomain: `ev-charger-summerlin.rankrent.com`
2. Middleware extracts subdomain and resolves to site config
3. Dynamic catch-all route renders pages based on site + slug

### Middleware Flow:
```
Request → Extract hostname → Lookup site by domain
  → Found? Inject site context → Render page
  → Not found? → 404 or redirect to admin
```

## Database Schema (Core Tables)

### sites
- id, slug, domain, niche_id, city, state, suburb
- business_name, phone, email
- status (active/paused/draft)
- seo_config (JSON), content_overrides (JSON)
- created_at, updated_at

### leads
- id, site_id, tenant_id
- name, email, phone, message
- source (form/call/chat)
- status (new/contacted/qualified/converted/lost)
- created_at

### tenants
- id, name, email, phone
- sites (relation), monthly_rate
- status (active/paused)
- created_at

### niches
- id, slug, name
- default_keywords, default_services
- template_config (JSON)

## SEO Strategy

### On-Page Optimization:
1. **Title Tag**: "[Service] in [Suburb], [City] | [Business Name]"
2. **Meta Description**: Unique per page with suburb/city + CTA
3. **H1**: One per page, keyword-rich
4. **JSON-LD**: LocalBusiness + Service + FAQPage schemas
5. **Internal Links**: Service pages link to area pages and vice versa

### Technical SEO:
1. Auto-generated XML sitemap per site
2. Canonical URLs
3. robots.txt per site
4. Fast page load (static generation where possible)
5. Mobile-first responsive design

## Deployment Strategy
- Vercel for Next.js hosting (or self-hosted)
- PostgreSQL on Neon/Supabase/self-hosted
- Wildcard DNS for subdomain routing
- SSL via Let's Encrypt or Vercel
