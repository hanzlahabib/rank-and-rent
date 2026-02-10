# Product Requirements Document: Rank & Rent Platform

## Vision
A multi-tenant platform that programmatically generates hyper-local service websites optimized for search engine ranking, captures leads, and rents the lead flow to local service providers.

## Problem Statement
Local service businesses struggle to rank in search results. Building individual websites for each suburb/service area is manual and expensive. This platform automates the creation of SEO-optimized local service pages at scale.

## Target Niches (Data-Backed)

| Rank | Niche | KD | CPC | Revenue/mo | Score |
|------|-------|-----|-----|-----------|-------|
| 1 | EV Charger Installation | <20 | $30-50+ | $3K-8K | 95/100 |
| 2 | Smart Home Installation | <25 | $25-40 | $3K-8K | 90/100 |
| 3 | Water Damage Restoration | 18 | $31+ | $2K-6K | 88/100 |
| 4 | Pressure Washing | 26 | $8-15 | $1K-3K | 82/100 |
| 5 | Junk Removal | 28 | $15-25 | $1.5K-4K | 80/100 |

## Geographic Strategy
- Target cities: 50K-300K population
- Suburb-level keywords (NOT city-level)
- Pattern: "[service] in [suburb], [city]"
- Example: "EV charger installation in Summerlin, Las Vegas"

## Core Features

### 1. Site Generation Engine
- Programmatic page creation from niche templates
- Dynamic content per suburb/city
- Service area pages with unique content
- About, contact, FAQ, service detail pages

### 2. SEO Engine
- JSON-LD structured data (LocalBusiness, Service, FAQPage)
- Dynamic meta tags (title, description, OG)
- Auto-generated XML sitemaps
- Internal linking strategy
- Schema markup for rich snippets

### 3. Lead Capture System
- Multi-step lead forms
- Click-to-call tracking
- Form submission to admin dashboard
- Email/SMS notifications
- Lead scoring by source

### 4. Admin Dashboard
- Site management (create, edit, pause sites)
- Lead inbox with status tracking
- Tenant management (assign leads to renters)
- Analytics overview (traffic, leads, conversion)
- Niche/city configuration

### 5. Multi-Tenant Architecture
- Single codebase serves multiple sites
- Subdomain or custom domain routing
- Per-site content configuration
- Tenant-specific lead routing

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Database**: PostgreSQL + Drizzle ORM
- **Package Manager**: pnpm
- **Deployment**: Vercel or self-hosted

## Success Metrics
- 3 sites live by month 3
- 12 sites live by month 12
- Revenue target: $3K-$7.5K/mo by month 12
- Top 5 ranking for target suburb keywords within 90 days
