# Infrastructure Roadmap — Rank & Rent Platform

> This document tracks the planned infrastructure work. Only build when needed.

---

## Phase A: First Site Live (NOW)
- [x] Build site template engine with SEO components
- [x] Create EV Charger niche config
- [ ] Buy domain for EV Charger site
- [ ] Deploy to Contabo VPS via CyberPanel
- [ ] SSL via Let's Encrypt (CyberPanel handles this)
- [ ] Google Search Console submission
- [ ] XML sitemap + robots.txt
- [ ] Google Business Profile setup
- [ ] Citation building (Yelp, BBB, Angi, HomeAdvisor)

## Phase B: Lead Capture (When first leads come in ~30-90 days)
- [ ] Connect PostgreSQL database (Neon free tier or local on VPS)
- [ ] Wire up `/api/leads` to save to database
- [ ] Email notification on new lead (Resend or nodemailer)
- [ ] Simple lead inbox page (admin dashboard)
- [ ] Phone tracking setup (CallRail or OpenPhone)

## Phase C: First Tenant (When consistent leads flow)
- [ ] Find local EV charger installer
- [ ] Pitch: "$1,500-2,500/mo for exclusive leads in [suburb]"
- [ ] Set up tenant in system
- [ ] Lead forwarding (email/SMS to tenant)
- [ ] Monthly invoicing

## Phase D: Scale to 3 Sites (Month 2-3)
- [ ] Deploy Smart Home site (different suburb/city)
- [ ] Deploy Water Damage site (different suburb/city)
- [ ] Dashboard becomes useful now — wire up multi-site management
- [ ] Database: full schema with sites, leads, tenants tables
- [ ] `drizzle-kit push` to create production tables

## Phase E: Full Platform (5+ sites, Month 4-6)
- [ ] Multi-domain routing (custom domain per site)
- [ ] Admin authentication (NextAuth or Clerk)
- [ ] "Create Site" wizard in dashboard
- [ ] Tenant self-service portal (view their leads)
- [ ] Analytics integration (Plausible or PostHog)
- [ ] Automated citation building
- [ ] Content generation per suburb (AI-assisted)

## Phase F: Scale to 12 Sites (Month 6-12)
- [ ] Revenue target: $3K-$7.5K/mo
- [ ] Automated deployment pipeline
- [ ] SEO monitoring (rank tracking per keyword)
- [ ] A/B testing on lead forms
- [ ] Retargeting pixel setup

---

## Revenue Projections

| Sites | Avg Rent/mo | Monthly Revenue | Timeline |
|-------|-------------|-----------------|----------|
| 1     | $2,000      | $2,000          | Month 3  |
| 3     | $2,000      | $6,000          | Month 6  |
| 6     | $1,800      | $10,800         | Month 9  |
| 12    | $1,500      | $18,000         | Month 12 |

---

## Tech Decisions Log

| Decision | Choice | Reason |
|----------|--------|--------|
| Framework | Next.js 16 | SSG for speed, App Router for flexibility |
| Runtime | Bun | Fast installs, native TS |
| Styling | Tailwind 4 + shadcn/ui | Rapid UI, consistent design |
| DB (future) | PostgreSQL + Drizzle | Type-safe, serverless-ready |
| Hosting | Contabo VPS + CyberPanel | Already available, full control |
| DNS/SSL | CyberPanel + Let's Encrypt | Free SSL, easy domain management |
