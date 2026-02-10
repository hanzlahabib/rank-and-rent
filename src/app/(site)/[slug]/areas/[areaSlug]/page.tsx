import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Zap,
  Phone,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Building2,
  Shield,
  Star,
} from "lucide-react";
import { hendersonEvConfig } from "@/config/sites";
import { evChargerConfig } from "@/config/niches/ev-charger";
import {
  hendersonAreas,
  getAreaBySlug,
  getAllAreaSlugs,
  getNearbyAreas,
} from "@/config/areas";
import Navbar from "@/components/site/navbar";
import Footer from "@/components/site/footer";
import LeadForm from "@/components/site/lead-form";

interface PageProps {
  params: Promise<{ slug: string; areaSlug: string }>;
}

export async function generateStaticParams() {
  const siteSlug = hendersonEvConfig.slug;
  return getAllAreaSlugs().map((areaSlug) => ({
    slug: siteSlug,
    areaSlug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, areaSlug } = await params;
  const site = hendersonEvConfig;
  const area = getAreaBySlug(areaSlug);

  if (!area) return {};

  const title = site.seoConfig.titleTemplate.replace(
    "%s",
    `EV Charger Installation in ${area.name}`
  );
  const description = `Professional EV charger installation in ${area.fullName}. Licensed electricians serving ${area.name} with Level 2 charger installation, Tesla Wall Connectors, and electrical panel upgrades. Call ${site.phone}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${site.seoConfig.canonicalBase}/${slug}/areas/${areaSlug}`,
    },
    alternates: {
      canonical: `${site.seoConfig.canonicalBase}/${slug}/areas/${areaSlug}`,
    },
  };
}

function buildAreaSchema(areaSlug: string, siteSlug: string) {
  const site = hendersonEvConfig;
  const area = getAreaBySlug(areaSlug);
  if (!area) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `EV Charger Installation in ${area.name}`,
    description: `Professional electric vehicle charger installation services in ${area.fullName}. Level 2 and Tesla Wall Connector installation by licensed electricians.`,
    provider: {
      "@type": "LocalBusiness",
      name: site.businessName,
      telephone: site.phone,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.suburb,
        addressRegion: site.state,
        postalCode: site.zipCode,
        addressCountry: "US",
      },
    },
    areaServed: {
      "@type": "Place",
      name: area.fullName,
      address: {
        "@type": "PostalAddress",
        addressLocality: area.name,
        addressRegion: "NV",
        postalCode: area.zipCodes[0],
      },
    },
    serviceType: "EV Charger Installation",
    url: `${site.seoConfig.canonicalBase}/${siteSlug}/areas/${areaSlug}`,
  };
}

export default async function AreaPage({ params }: PageProps) {
  const { slug, areaSlug } = await params;
  const site = hendersonEvConfig;
  const niche = evChargerConfig;
  const area = getAreaBySlug(areaSlug);

  if (!area) notFound();

  const nearbyAreas = getNearbyAreas(areaSlug);
  const areaSchema = buildAreaSchema(areaSlug, slug);

  return (
    <>
      {areaSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(areaSchema) }}
        />
      )}
      <Navbar niche={niche} site={site} />

      <main className="pt-16">
        {/* Breadcrumbs */}
        <div className="bg-slate-50 border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-1.5 text-sm text-slate-500">
              <Link
                href={`/${slug}`}
                className="hover:text-cerulean transition-colors"
              >
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-slate-800 font-medium">{area.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-navy py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-cerulean-light" />
                  <span className="text-sm font-semibold text-cerulean tracking-wide uppercase">
                    {area.fullName}
                  </span>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
                  EV Charger Installation in{" "}
                  <span className="text-cerulean-light">{area.name}</span>
                </h1>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                  {area.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`/${slug}#quote`}
                    className="inline-flex items-center justify-center gap-2 bg-cerulean hover:bg-cerulean-light text-white font-semibold rounded-xl px-8 py-3 transition-colors"
                  >
                    {niche.ctaText}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <a
                    href={`tel:${site.phone}`}
                    className="inline-flex items-center justify-center gap-2 border border-slate-600 text-white hover:bg-white/5 font-semibold rounded-xl px-8 py-3 transition-colors"
                  >
                    <Phone className="h-5 w-5 text-amber-warm" />
                    {site.phone}
                  </a>
                </div>
              </div>

              {/* Area Stats Card */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-8">
                <h3 className="font-display text-lg font-bold text-white mb-6">
                  {area.name} at a Glance
                </h3>
                <div className="space-y-4">
                  {area.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-cerulean/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-cerulean-light" />
                      </div>
                      <span className="text-slate-300 text-sm leading-relaxed">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <MapPin className="h-4 w-4 text-cerulean-light" />
                    ZIP Codes: {area.zipCodes.join(", ")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why EV Charging Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-block text-sm font-semibold text-cerulean tracking-wide uppercase mb-3">
                Why {area.name} Homeowners Choose Home Charging
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                EV Charger Installation for{" "}
                <span className="text-cerulean">{area.name}</span> Residents
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="rounded-2xl bg-slate-50 p-7 border border-slate-100">
                <div className="h-12 w-12 rounded-xl bg-cerulean/10 flex items-center justify-center mb-5">
                  <Zap className="h-6 w-6 text-cerulean" />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-3">
                  Wake Up Fully Charged
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  With a Level 2 home charger, {area.name} residents can charge
                  their EV overnight and start each day with a full battery. No
                  more trips to public charging stations or waiting in line.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-7 border border-slate-100">
                <div className="h-12 w-12 rounded-xl bg-cerulean/10 flex items-center justify-center mb-5">
                  <Building2 className="h-6 w-6 text-cerulean" />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-3">
                  Increase Property Value
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Homes in {area.name} with installed EV chargers are
                  increasingly attractive to buyers. A professional installation
                  adds real value to your property and appeals to the growing EV
                  market.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-7 border border-slate-100">
                <div className="h-12 w-12 rounded-xl bg-cerulean/10 flex items-center justify-center mb-5">
                  <Shield className="h-6 w-6 text-cerulean" />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-3">
                  Safe & Code-Compliant
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Our licensed electricians ensure every {area.name} installation
                  meets NEC code, City of Henderson permit requirements, and NV
                  Energy standards. Full permits and inspection included.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services in This Area */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-block text-sm font-semibold text-cerulean tracking-wide uppercase mb-3">
                Our Services
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                EV Charger Services in{" "}
                <span className="text-cerulean">{area.name}</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {niche.services.map((service, index) => (
                <div
                  key={service.slug}
                  className="group rounded-2xl bg-white p-7 border border-slate-100 hover:shadow-lg hover:border-cerulean/20 transition-all duration-500"
                >
                  <div className="flex items-start gap-5">
                    <div className="h-14 w-14 rounded-xl bg-cerulean/8 group-hover:bg-cerulean/15 flex items-center justify-center flex-shrink-0 transition-colors">
                      <Zap className="h-7 w-7 text-cerulean" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {service.description} Available for {area.name} and
                        surrounding Henderson neighborhoods.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-12 bg-navy">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="font-display text-3xl font-bold text-white mb-1">
                  {site.contentOverrides.yearsInBusiness}+
                </div>
                <p className="text-sm text-slate-400">Years Experience</p>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-white mb-1">
                  {site.contentOverrides.totalInstallations}
                </div>
                <p className="text-sm text-slate-400">Chargers Installed</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="h-6 w-6 text-amber-warm fill-amber-warm" />
                  <span className="font-display text-3xl font-bold text-white">
                    {site.contentOverrides.googleReviewRating}
                  </span>
                </div>
                <p className="text-sm text-slate-400">
                  Google ({site.contentOverrides.googleReviewCount} reviews)
                </p>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-emerald-trust mb-1">
                  {site.contentOverrides.bbbRating}
                </div>
                <p className="text-sm text-slate-400">BBB Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby Areas */}
        {nearbyAreas.length > 0 && (
          <section className="py-16 md:py-24 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="inline-block text-sm font-semibold text-cerulean tracking-wide uppercase mb-3">
                  Service Areas
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                  Also Serving{" "}
                  <span className="text-cerulean">Nearby Neighborhoods</span>
                </h2>
                <p className="mt-4 text-slate-500 text-lg">
                  In addition to {area.name}, we provide EV charger installation
                  services throughout Henderson.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {nearbyAreas.map((nearby) => (
                  <Link
                    key={nearby.slug}
                    href={`/${slug}/areas/${nearby.slug}`}
                    className="group rounded-2xl bg-slate-50 border border-slate-100 p-6 hover:shadow-md hover:border-cerulean/20 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-lg bg-cerulean/10 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-cerulean" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-cerulean transition-colors">
                        {nearby.name}
                      </h3>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-3">
                      EV charger installation services in {nearby.fullName}.
                    </p>
                    <span className="flex items-center gap-1 text-sm font-semibold text-cerulean">
                      Learn More
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ))}

                {/* All Areas Link */}
                <div className="rounded-2xl border-2 border-dashed border-slate-200 p-6 flex flex-col items-center justify-center text-center">
                  <MapPin className="h-8 w-8 text-slate-300 mb-3" />
                  <p className="text-sm text-slate-500 mb-2">
                    We serve all of Henderson and surrounding Clark County areas.
                  </p>
                  <Link
                    href={`/${slug}#quote`}
                    className="text-sm font-semibold text-cerulean hover:text-cerulean-light transition-colors"
                  >
                    Check Your Area
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Lead Form CTA */}
        <LeadForm niche={niche} site={site} />
      </main>

      <Footer niche={niche} site={site} />
    </>
  );
}
