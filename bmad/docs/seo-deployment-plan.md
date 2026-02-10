# SEO Deployment Plan — Henderson EV Charger Pros

## Business NAP (Name, Address, Phone) — MUST BE IDENTICAL EVERYWHERE
```
Business Name: Henderson EV Charger Pros
Address: 1023 Nevada Way, Suite 4, Henderson, NV 89012
Phone: (702) 555-0134
Email: info@hendersonevcharger.com
Website: https://hendersonevcharger.com
Hours: Mon-Fri 7:00 AM - 6:00 PM, Sat 8:00 AM - 2:00 PM
Categories: Electrician, EV Charger Installation, Electric Vehicle Charging Station
```

---

## Phase 1: Pre-Launch Technical SEO Checklist

### Domain & Hosting
- [ ] Purchase `hendersonevcharger.com` (EMD — exact match domain)
- [ ] Set up SSL certificate (HTTPS required)
- [ ] Deploy to Contabo VPS (185.182.187.120) via CyberPanel
- [ ] Configure DNS: A record → VPS IP
- [ ] Set up `www` redirect to non-www (canonical)
- [ ] Verify page load speed < 3 seconds (target < 1.5s)
- [ ] Enable gzip/brotli compression via LiteSpeed

### On-Page Technical
- [ ] Verify all pages return 200 status
- [ ] Verify XML sitemap at `/sitemap.xml` — all 22+ URLs present
- [ ] Verify `robots.txt` at `/robots.txt` — allows all crawlers
- [ ] Verify JSON-LD structured data on every page (LocalBusiness, Service, FAQPage, Article)
- [ ] Verify Open Graph meta tags on every page
- [ ] Verify canonical URLs on every page
- [ ] Verify mobile responsiveness (Google Mobile-Friendly Test)
- [ ] Verify no duplicate title tags or meta descriptions
- [ ] Verify image alt tags contain keywords + location
- [ ] Verify internal linking mesh: every page links to 2-3 related pages
- [ ] Verify 404 page exists and is user-friendly
- [ ] Test Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1

### Schema Markup Verification
Test every page at https://search.google.com/test/rich-results:
- [ ] Homepage: LocalBusiness + Service schemas
- [ ] Service pages: Service schema with areaServed
- [ ] FAQ section: FAQPage schema
- [ ] Blog posts: Article schema with author (EEAT)
- [ ] Area pages: LocalBusiness with specific serviceArea
- [ ] About page: Organization schema with team members

---

## Phase 2: Google Search Console Setup

### Steps:
1. Go to https://search.google.com/search-console
2. Add property: `https://hendersonevcharger.com`
3. Verify via DNS TXT record (preferred) or HTML file upload
4. Submit sitemap: `https://hendersonevcharger.com/sitemap.xml`
5. Request indexing for these priority URLs (in order):
   - `https://hendersonevcharger.com/henderson-ev-charger` (homepage)
   - `https://hendersonevcharger.com/henderson-ev-charger/about`
   - `https://hendersonevcharger.com/henderson-ev-charger/blog`
   - All 8 blog post URLs
   - All 6 area page URLs
6. Monitor for crawl errors weekly
7. Check "Coverage" report after 48 hours

### Google Indexing API (Optional — Faster Indexing)
- Enable Google Indexing API in Google Cloud Console
- Submit all URLs programmatically for instant indexing
- Useful for new blog posts going forward

---

## Phase 3: Google Business Profile (GBP)

### Setup Steps:
1. Go to https://business.google.com
2. Create listing with EXACT NAP above
3. **Primary Category**: Electrician
4. **Secondary Categories**: Electric Vehicle Charging Station, Electrical Installation Service
5. **Service Area**: Henderson, NV (25-mile radius) — include: Green Valley, Anthem, Lake Las Vegas, Seven Hills, Inspirada, MacDonald Ranch, Paradise, Spring Valley, Enterprise, Summerlin
6. **Description** (750 chars max):
```
Henderson EV Charger Pros is your trusted local electrician for professional EV charger installation in Henderson, NV. We specialize in Tesla Wall Connector installation, Level 2 home charging stations, commercial EV charging solutions, and electrical panel upgrades. Licensed (NV-EC-2024-087431), bonded, and insured with 1,200+ installations completed. Serving Henderson, Green Valley, Anthem, Lake Las Vegas, and surrounding areas. Call (702) 555-0134 for a free estimate.
```
7. **Hours**: Mon-Fri 7 AM - 6 PM, Sat 8 AM - 2 PM
8. **Website**: https://hendersonevcharger.com/henderson-ev-charger
9. **Appointment URL**: https://hendersonevcharger.com/henderson-ev-charger#quote
10. Add 10+ photos (EV charger installations, team, van, office)
11. Enable messaging
12. Add all services with descriptions and prices

### GBP Posts Schedule (Weekly):
- Week 1: "EV Charger Installation Special — Free Estimate in Henderson"
- Week 2: "Tesla Wall Connector vs ChargePoint Home — Which is Right for You?"
- Week 3: "NV Energy EV Charger Rebates — Save Up to $500"
- Week 4: "Commercial EV Charging Now Available for Henderson Businesses"
- Repeat with seasonal/relevant topics

### Review Generation:
- After every job, send SMS with direct Google review link
- Target: 10 reviews in first month, 5/month ongoing
- Response protocol: Reply to ALL reviews within 24 hours

---

## Phase 4: Citation Building (NAP Consistency Critical)

### Tier 1 — Essential Directories (Do First)
Submit EXACT NAP to each. Every character must match.

| # | Directory | URL | Priority |
|---|-----------|-----|----------|
| 1 | Google Business Profile | business.google.com | CRITICAL |
| 2 | Bing Places | bingplaces.com | CRITICAL |
| 3 | Apple Maps | mapsconnect.apple.com | CRITICAL |
| 4 | Yelp | biz.yelp.com | CRITICAL |
| 5 | Facebook Business | business.facebook.com | CRITICAL |
| 6 | BBB | bbb.org/get-listed | HIGH |
| 7 | Nextdoor | business.nextdoor.com | HIGH |
| 8 | Yellow Pages | yellowpages.com | HIGH |
| 9 | Superpages | superpages.com | HIGH |
| 10 | Whitepages | whitepages.com | HIGH |

### Tier 2 — Industry & Local Directories
| # | Directory | URL | Priority |
|---|-----------|-----|----------|
| 11 | Angi (Angie's List) | angi.com | HIGH |
| 12 | HomeAdvisor | homeadvisor.com | HIGH |
| 13 | Thumbtack | thumbtack.com | HIGH |
| 14 | Houzz | houzz.com | HIGH |
| 15 | Porch | porch.com | MEDIUM |
| 16 | Bark | bark.com | MEDIUM |
| 17 | Fixr | fixr.com | MEDIUM |
| 18 | Networx | networx.com | MEDIUM |
| 19 | CraftJack | craftjack.com | MEDIUM |
| 20 | BuildZoom | buildzoom.com | MEDIUM |

### Tier 3 — Data Aggregators (Feed Hundreds of Sites)
| # | Aggregator | URL | Impact |
|---|-----------|-----|--------|
| 21 | Data Axle (InfoGroup) | dataaxle.com | Feeds 70+ sites |
| 22 | Neustar Localeze | neustarlocaleze.biz | Feeds 60+ sites |
| 23 | Factual (Foursquare) | foursquare.com/businesses | Feeds 50+ sites |
| 24 | Acxiom | acxiom.com | Feeds 40+ sites |

### Tier 4 — EV / Electrician Specific
| # | Directory | URL | Priority |
|---|-----------|-----|----------|
| 25 | PlugShare | plugshare.com | HIGH (EV specific) |
| 26 | ChargeHub | chargehub.com | HIGH (EV specific) |
| 27 | OpenChargeMap | openchargemap.org | MEDIUM (EV specific) |
| 28 | EVITP Installer Directory | evitp.org | HIGH (EV certification) |
| 29 | NECA Contractor Directory | necanet.org | MEDIUM |
| 30 | Electrical Contractor Magazine | ecmag.com | MEDIUM |

### Tier 5 — Local Henderson/Vegas Directories
| # | Directory | URL | Priority |
|---|-----------|-----|----------|
| 31 | Henderson Chamber of Commerce | hendersonchamber.com | HIGH |
| 32 | Las Vegas Chamber of Commerce | lvchamber.com | HIGH |
| 33 | Nevada State Contractors Board | nscb.state.nv.us | HIGH (license verification) |
| 34 | Las Vegas Review-Journal Business Directory | reviewjournal.com | MEDIUM |
| 35 | VegasNearMe | vegasnearme.com | MEDIUM |
| 36 | Henderson Now | hendersonnow.com | MEDIUM |
| 37 | Vegas.com Business Listings | vegas.com | MEDIUM |
| 38 | NV Energy Qualified Contractor List | nvenergy.com | HIGH |

### Tier 6 — General Business Directories
| # | Directory | URL |
|---|-----------|-----|
| 39 | Manta | manta.com |
| 40 | Hotfrog | hotfrog.com |
| 41 | Brownbook | brownbook.net |
| 42 | Cylex | cylex.us.com |
| 43 | EZlocal | ezlocal.com |
| 44 | ShowMeLocal | showmelocal.com |
| 45 | LocalStack | localstack.com |
| 46 | CitySquares | citysquares.com |
| 47 | Tupalo | tupalo.com |
| 48 | n49 | n49.com |
| 49 | Spoke | spoke.com |
| 50 | Chamberofcommerce.com | chamberofcommerce.com |

### Citation Building Schedule:
- **Week 1**: Tier 1 (10 directories) + Tier 3 (4 aggregators)
- **Week 2**: Tier 2 (10 directories) + Tier 4 (6 EV-specific)
- **Week 3**: Tier 5 (8 local directories)
- **Week 4**: Tier 6 (12 general directories)
- **Ongoing**: Audit monthly for NAP consistency using BrightLocal or Moz Local

---

## Phase 5: Backlink Strategy

### Natural Link Building (White Hat Only)
1. **Local Sponsorships**: Sponsor Henderson community events, Little League, school EV awareness programs — get backlink from event/org website
2. **HARO / Connectively**: Sign up, respond to journalist queries about EV charging, home electrical, green energy — earn backlinks from news sites
3. **Guest Posts**: Write for local Henderson blogs, Las Vegas real estate blogs, green living sites — include link back
4. **NV Energy Partnership**: Get listed on NV Energy's qualified installer page (high DA backlink)
5. **EV Community Forums**: Helpful posts on Tesla Motors Club, MyNissanLeaf, InsideEVs forums with profile link
6. **Local News PR**: Submit press release about "New EV Charger Installation Service Launches in Henderson" to local news outlets
7. **Supplier Directories**: Get listed on Tesla Certified Installer, ChargePoint Partner, ClipperCreek installer directories

### Link Targets (by DA):
| Source | Target DA | Strategy |
|--------|-----------|----------|
| NV Energy installer page | 60+ | Apply for qualified installer listing |
| Henderson Chamber | 40+ | Join chamber, get directory listing |
| Tesla Certified Installer | 80+ | Apply for Tesla Wall Connector certification |
| Local news coverage | 50+ | Press release about launch |
| Houzz, Angi profiles | 70+ | Create detailed profiles with portfolio |
| EV community forums | 40-60 | Helpful answers with profile link |

### Links to AVOID (Penalty Risk):
- PBN (Private Blog Networks) — Google penalty guaranteed
- Paid links from link farms — instant manual action
- Directory spam (submitting to 500+ low-quality directories)
- Exact match anchor text over-optimization
- Link exchanges / reciprocal links at scale
- Auto-generated or spun article links

---

## Phase 6: Content Calendar (Blog Posts)

### Already Published (8 Posts at Launch):
1. "How Much Does EV Charger Installation Cost in Henderson?" — `ev-charger-cost`
2. "Tesla Wall Connector vs NEMA 14-50 Outlet" — `tesla-vs-nema`
3. "EV Charger Permit Requirements in Nevada" — `permit-requirements`
4. "Level 1 vs Level 2 EV Chargers: Complete Guide" — `level-1-vs-level-2`
5. "Best EV Chargers for Home in 2026" — `best-ev-chargers-2026`
6. "NV Energy EV Charger Rebates and Incentives" — `nv-energy-rebates`
7. "Electrical Panel Upgrade Cost in Henderson" — `panel-upgrade-cost`
8. "EV Charging Solutions for Apartments and Condos" — `apartment-ev-charging`

### Month 1 (2 New Posts):
9. "How Long Does EV Charger Installation Take?" — Target: "ev charger installation time"
10. "Do I Need a Dedicated Circuit for My EV Charger?" — Target: "dedicated circuit ev charger"

### Month 2 (2 New Posts):
11. "ChargePoint Home Flex vs Tesla Wall Connector: Which Is Better?" — Target: "chargepoint vs tesla charger"
12. "EV Charger Installation for New Construction in Henderson" — Target: "new construction ev charger henderson"

### Month 3 (2 New Posts):
13. "How to Choose the Right EV Charger for Your Home" — Target: "how to choose ev charger"
14. "EV Charger Maintenance: What You Need to Know" — Target: "ev charger maintenance"

### Month 4+ (Ongoing — 2/month):
- Seasonal content (summer heat impact on EV charging, winter range tips)
- New EV model-specific guides (Rivian, Ford Lightning, Chevy Equinox EV)
- Local Henderson content (new HOA rules, community EV programs)
- Comparison guides (different charger brands)
- Cost guides (updated pricing)

### Blog Post Requirements:
- 1,200-2,000 words minimum
- Author byline: Mike Castillo, Master Electrician (EEAT)
- Include 2-3 internal links to service/area pages
- Include 1-2 external links to authoritative sources
- Target 1 primary keyword + 3-5 secondary keywords
- Add FAQ section with 3-5 questions (generates FAQ schema)
- Include at least 2 images with keyword-rich alt text
- Publish date + "Last Updated" date visible

---

## Phase 7: Social Signals

### Profiles to Create:
| Platform | Handle | Purpose |
|----------|--------|---------|
| Facebook | @HendersonEVChargerPros | Business page, reviews, posts |
| Instagram | @hendersonevcharger | Installation photos, reels |
| YouTube | Henderson EV Charger Pros | Installation videos, how-tos |
| TikTok | @hendersonevcharger | Short-form EV tips |
| LinkedIn | Henderson EV Charger Pros | B2B, commercial installs |
| Twitter/X | @HendersonEVPros | Industry news, tips |
| Pinterest | Henderson EV Charger Pros | Installation boards, infographics |

### Posting Schedule:
- **Facebook**: 3x/week (tips, before/after, reviews)
- **Instagram**: 3x/week (installation photos, reels, stories)
- **YouTube**: 1x/month (full installation walkthrough, cost breakdown)
- **TikTok**: 2x/week (30-second EV tips, satisfying install clips)
- **LinkedIn**: 1x/week (commercial EV charging, industry insights)

### Content Types:
1. Before/after installation photos
2. Time-lapse installation videos
3. Customer testimonial videos
4. EV charging tips (short-form)
5. "Did you know?" educational posts
6. Local Henderson community content
7. Team/culture behind-the-scenes

---

## Phase 8: Monthly SEO Maintenance

### Weekly Tasks:
- [ ] Check Google Search Console for errors/warnings
- [ ] Post 1 GBP update
- [ ] Respond to all new reviews
- [ ] Share 2-3 social media posts

### Monthly Tasks:
- [ ] Publish 2 new blog posts
- [ ] Audit citations for NAP consistency (use BrightLocal)
- [ ] Check keyword rankings (track top 20 keywords)
- [ ] Review Google Analytics / Search Console for traffic trends
- [ ] Build 2-3 new backlinks
- [ ] Update any outdated content (prices, rebates, regulations)
- [ ] Check Core Web Vitals — fix any regressions
- [ ] Monitor competitor activity

### Quarterly Tasks:
- [ ] Full technical SEO audit
- [ ] Content gap analysis (what competitors rank for that we don't)
- [ ] Review and update schema markup
- [ ] Update GBP photos and description
- [ ] Refresh old blog posts with new data

---

## Phase 9: Ranking Timeline Expectations

| Timeline | Expected Result |
|----------|-----------------|
| Week 1-2 | Google discovers and indexes all pages |
| Week 3-4 | Start appearing in search results (page 5-10) |
| Month 2 | Blog posts start ranking for long-tail keywords |
| Month 3 | Homepage enters page 2-3 for money keywords |
| Month 4-6 | Homepage reaches page 1 for low-competition keywords |
| Month 6-9 | Consistent page 1 rankings for Henderson-specific keywords |
| Month 9-12 | Dominant local pack presence, 20+ keywords on page 1 |

### Key Metrics to Track:
| Metric | Tool | Target |
|--------|------|--------|
| Organic traffic | Google Analytics | 500+ visits/month by month 6 |
| Keyword rankings | Ahrefs/SEMrush | Top 3 for 5+ money keywords by month 9 |
| GBP impressions | GBP Insights | 1000+/month by month 3 |
| Lead conversion rate | Internal tracking | 5-10% of organic visitors |
| Domain authority | Moz/Ahrefs | DA 15+ by month 6 |
| Backlink count | Ahrefs | 50+ quality backlinks by month 6 |
| Citation accuracy | BrightLocal | 95%+ NAP consistency |

---

## Penalty Avoidance Checklist (EEAT Compliance)

### NEVER Do:
- Keyword stuffing (>3% keyword density)
- Hidden text or links
- Cloaking (showing different content to Google vs users)
- Link schemes (buying links, link exchanges)
- Duplicate content across pages
- Auto-generated/AI content without human review and editing
- Fake reviews or testimonials
- Misleading structured data (fabricated ratings, fake reviews in schema)
- Doorway pages (thin pages targeting different keywords with same content)

### ALWAYS Do:
- Unique, helpful content on every page (800+ words for service pages)
- Real author attribution with credentials (Mike Castillo, Master Electrician)
- Accurate business information everywhere
- Regular content updates (shows site is maintained)
- Proper internal linking (helps Google understand site structure)
- Fast page load times (Core Web Vitals green)
- Mobile-first design
- HTTPS everywhere
- Clear privacy policy and terms of service
- Accessible design (proper headings, alt text, ARIA labels)

---

## Quick Reference: All Site URLs for Indexing

### Core Pages:
```
https://hendersonevcharger.com/henderson-ev-charger
https://hendersonevcharger.com/henderson-ev-charger/about
https://hendersonevcharger.com/henderson-ev-charger/blog
```

### Blog Posts (8):
```
https://hendersonevcharger.com/henderson-ev-charger/blog/ev-charger-cost
https://hendersonevcharger.com/henderson-ev-charger/blog/tesla-vs-nema
https://hendersonevcharger.com/henderson-ev-charger/blog/permit-requirements
https://hendersonevcharger.com/henderson-ev-charger/blog/level-1-vs-level-2
https://hendersonevcharger.com/henderson-ev-charger/blog/best-ev-chargers-2026
https://hendersonevcharger.com/henderson-ev-charger/blog/nv-energy-rebates
https://hendersonevcharger.com/henderson-ev-charger/blog/panel-upgrade-cost
https://hendersonevcharger.com/henderson-ev-charger/blog/apartment-ev-charging
```

### Area Pages (6):
```
https://hendersonevcharger.com/henderson-ev-charger/areas/green-valley
https://hendersonevcharger.com/henderson-ev-charger/areas/anthem
https://hendersonevcharger.com/henderson-ev-charger/areas/lake-las-vegas
https://hendersonevcharger.com/henderson-ev-charger/areas/seven-hills
https://hendersonevcharger.com/henderson-ev-charger/areas/inspirada
https://hendersonevcharger.com/henderson-ev-charger/areas/macdonald-ranch
```
