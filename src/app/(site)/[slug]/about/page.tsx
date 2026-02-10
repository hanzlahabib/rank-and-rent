import type { Metadata } from "next";
import Link from "next/link";
import {
  User,
  Award,
  Shield,
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle2,
  Star,
  Building2,
  Clock,
  BadgeCheck,
  ChevronRight,
} from "lucide-react";
import { hendersonEvConfig } from "@/config/sites";
import { evChargerConfig } from "@/config/niches/ev-charger";
import Navbar from "@/components/site/navbar";
import Footer from "@/components/site/footer";
import JsonLd from "@/components/seo/json-ld";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const site = hendersonEvConfig;

  const title = site.seoConfig.titleTemplate.replace(
    "%s",
    `About Us - Licensed EV Charger Electricians`
  );
  const description = `Meet the team behind ${site.businessName}. ${site.contentOverrides.yearsInBusiness}+ years of experience, ${site.contentOverrides.totalInstallations} chargers installed, ${site.contentOverrides.bbbRating} BBB rated. Licensed & insured in Nevada.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${site.seoConfig.canonicalBase}/${slug}/about`,
    },
    alternates: {
      canonical: `${site.seoConfig.canonicalBase}/${slug}/about`,
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { slug } = await params;
  const site = hendersonEvConfig;
  const niche = evChargerConfig;
  const co = site.contentOverrides;

  const affiliationList = co.affiliations
    ? co.affiliations.split(", ")
    : [];

  return (
    <>
      <JsonLd niche={niche} site={site} pageType="about" />
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
              <span className="text-slate-800 font-medium">About Us</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-navy py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block text-sm font-semibold text-cerulean tracking-wide uppercase mb-3">
                About Us
              </span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
                {site.suburb}&apos;s Trusted{" "}
                <span className="text-cerulean-light">EV Charger</span>{" "}
                Installation Experts
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed">
                {site.businessName} was founded with a simple mission: make
                electric vehicle charging accessible, safe, and affordable for
                every {site.suburb} homeowner. With {co.yearsInBusiness}+ years
                of electrical expertise and {co.totalInstallations} successful
                installations, we are the top-rated EV charger installation team
                in the Henderson area.
              </p>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block text-sm font-semibold text-cerulean tracking-wide uppercase mb-3">
                  Our Story
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-6">
                  From Licensed Electricians to{" "}
                  <span className="text-cerulean">EV Charging Specialists</span>
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    {site.businessName} started when our founder, {co.ownerName},
                    recognized that Henderson homeowners needed reliable,
                    knowledgeable electricians who understood both traditional
                    electrical work and the emerging EV charging industry.
                  </p>
                  <p>
                    With a background spanning {co.yearsInBusiness}+ years in
                    residential and commercial electrical contracting across
                    Southern Nevada, our team saw firsthand the challenges
                    homeowners faced: unlicensed installers cutting corners,
                    inadequate panel assessments, and installations that failed
                    inspection.
                  </p>
                  <p>
                    We built our company on the principle that every installation
                    should be done right the first time -- fully permitted,
                    code-compliant, and backed by our {co.warrantyYears}-year
                    workmanship warranty. Today, we serve homeowners throughout
                    Henderson, Green Valley, Anthem, and the greater Clark County
                    area.
                  </p>
                </div>
              </div>

              {/* Stats Panel */}
              <div className="rounded-2xl bg-navy p-8 md:p-10">
                <h3 className="font-display text-xl font-bold text-white mb-8">
                  By the Numbers
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="rounded-xl bg-white/5 border border-white/10 p-5 text-center">
                    <div className="font-display text-3xl font-bold text-cerulean-light mb-1">
                      {co.yearsInBusiness}+
                    </div>
                    <p className="text-sm text-slate-400">Years in Business</p>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-5 text-center">
                    <div className="font-display text-3xl font-bold text-cerulean-light mb-1">
                      {co.totalInstallations}
                    </div>
                    <p className="text-sm text-slate-400">Installations</p>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-5 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="h-5 w-5 text-amber-warm fill-amber-warm" />
                      <span className="font-display text-3xl font-bold text-cerulean-light">
                        {co.googleReviewRating}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">
                      Google Rating ({co.googleReviewCount})
                    </p>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-5 text-center">
                    <div className="font-display text-3xl font-bold text-emerald-trust mb-1">
                      {co.bbbRating}
                    </div>
                    <p className="text-sm text-slate-400">BBB Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Bios */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-block text-sm font-semibold text-cerulean tracking-wide uppercase mb-3">
                Our Team
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Meet the{" "}
                <span className="text-cerulean">Licensed Professionals</span>{" "}
                Behind Every Installation
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Owner */}
              <div className="rounded-2xl bg-white border border-slate-200 p-8">
                <div className="flex items-center gap-5 mb-6">
                  <div className="h-20 w-20 rounded-full bg-cerulean/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-10 w-10 text-cerulean" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-slate-900">
                      {co.ownerName}
                    </h3>
                    <p className="text-sm font-semibold text-cerulean">
                      {co.ownerTitle}
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  {co.ownerBio}
                </p>
                <div className="pt-5 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Certifications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {co.ownerCertifications?.split(", ").map((cert) => (
                      <span
                        key={cert}
                        className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full"
                      >
                        <Award className="h-3 w-3 text-amber-warm" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tech Lead */}
              <div className="rounded-2xl bg-white border border-slate-200 p-8">
                <div className="flex items-center gap-5 mb-6">
                  <div className="h-20 w-20 rounded-full bg-cerulean/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-10 w-10 text-cerulean" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-slate-900">
                      {co.techLeadName}
                    </h3>
                    <p className="text-sm font-semibold text-cerulean">
                      {co.techLeadTitle}
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  {co.techLeadBio}
                </p>
                <div className="pt-5 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Certifications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {co.techLeadCertifications?.split(", ").map((cert) => (
                      <span
                        key={cert}
                        className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full"
                      >
                        <Award className="h-3 w-3 text-amber-warm" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Licensing & Certifications */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-block text-sm font-semibold text-cerulean tracking-wide uppercase mb-3">
                Credentials
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Licensed, Bonded &{" "}
                <span className="text-cerulean">Fully Insured</span>
              </h2>
              <p className="mt-4 text-slate-500 text-lg">
                We maintain all required licenses, bonds, and insurance to
                protect you and your property on every job.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-6">
                <div className="h-12 w-12 rounded-xl bg-cerulean/10 flex items-center justify-center mb-4">
                  <BadgeCheck className="h-6 w-6 text-cerulean" />
                </div>
                <h3 className="font-display text-base font-bold text-slate-900 mb-2">
                  Nevada Electrical License
                </h3>
                <p className="text-sm text-slate-500 mb-1">
                  License # {co.licenseNumber}
                </p>
                <p className="text-xs text-slate-400">
                  Contractor License # {co.contractorLicense}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-6">
                <div className="h-12 w-12 rounded-xl bg-cerulean/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-cerulean" />
                </div>
                <h3 className="font-display text-base font-bold text-slate-900 mb-2">
                  Bonded & Insured
                </h3>
                <p className="text-sm text-slate-500 mb-1">
                  Bond # {co.bondNumber}
                </p>
                <p className="text-xs text-slate-400">
                  {co.insuranceProvider} - Policy # {co.insurancePolicyNumber}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-6">
                <div className="h-12 w-12 rounded-xl bg-cerulean/10 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-cerulean" />
                </div>
                <h3 className="font-display text-base font-bold text-slate-900 mb-2">
                  Industry Certified
                </h3>
                <p className="text-sm text-slate-500">
                  Tesla Certified, ChargePoint Certified, EVITP Certified
                </p>
              </div>
            </div>

            {/* Affiliations */}
            {affiliationList.length > 0 && (
              <div className="mt-14 max-w-4xl mx-auto">
                <h3 className="font-display text-lg font-bold text-slate-900 text-center mb-6">
                  Industry Affiliations
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {affiliationList.map((org) => (
                    <span
                      key={org}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200 px-4 py-2 rounded-full"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-trust" />
                      {org}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Service Area Map Placeholder */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-sm font-semibold text-cerulean tracking-wide uppercase mb-3">
                  Service Area
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-6">
                  Serving All of{" "}
                  <span className="text-cerulean">{site.suburb}</span> &
                  Surrounding Areas
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed mb-6">
                  {co.serviceAreaDescription}
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-cerulean flex-shrink-0" />
                    <span className="text-slate-600 text-sm">
                      {co.address}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-cerulean flex-shrink-0" />
                    <span className="text-slate-600 text-sm">
                      Service radius: {co.serviceRadius} from Henderson
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-cerulean flex-shrink-0" />
                    <span className="text-slate-600 text-sm">
                      {co.businessHours}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/${slug}#quote`}
                  className="inline-flex items-center gap-2 bg-cerulean hover:bg-cerulean-light text-white font-semibold rounded-xl px-8 py-3 transition-colors"
                >
                  {niche.ctaText}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>

              {/* Map Placeholder */}
              <div className="rounded-2xl bg-navy/5 border-2 border-dashed border-slate-200 aspect-square max-h-[400px] flex flex-col items-center justify-center text-center p-8">
                <MapPin className="h-12 w-12 text-slate-300 mb-4" />
                <h3 className="font-display text-lg font-bold text-slate-400 mb-2">
                  Service Area Map
                </h3>
                <p className="text-sm text-slate-400">
                  Henderson, Green Valley, Anthem, MacDonald Ranch, Lake Las
                  Vegas, Inspirada, Cadence, Seven Hills
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals / Why Choose Us */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-block text-sm font-semibold text-cerulean tracking-wide uppercase mb-3">
                Why Choose Us
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                The {site.businessName}{" "}
                <span className="text-cerulean">Difference</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-6 text-center">
                <div className="h-12 w-12 rounded-xl bg-emerald-trust/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-emerald-trust" />
                </div>
                <h3 className="font-display text-base font-bold text-slate-900 mb-2">
                  {co.warrantyYears}-Year Warranty
                </h3>
                <p className="text-sm text-slate-500">
                  {co.warrantyDescription}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-6 text-center">
                <div className="h-12 w-12 rounded-xl bg-emerald-trust/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-6 w-6 text-emerald-trust" />
                </div>
                <h3 className="font-display text-base font-bold text-slate-900 mb-2">
                  Satisfaction Guarantee
                </h3>
                <p className="text-sm text-slate-500">
                  {co.satisfactionGuarantee}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-6 text-center">
                <div className="h-12 w-12 rounded-xl bg-emerald-trust/10 flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-emerald-trust" />
                </div>
                <h3 className="font-display text-base font-bold text-slate-900 mb-2">
                  BBB {co.bbbRating} Rated
                </h3>
                <p className="text-sm text-slate-500">
                  BBB accredited business with an {co.bbbRating} rating.{" "}
                  {co.googleReviewRating} stars across {co.googleReviewCount}{" "}
                  Google reviews and {co.yelpReviewRating} stars on Yelp with{" "}
                  {co.yelpReviewCount} reviews.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-6 text-center">
                <div className="h-12 w-12 rounded-xl bg-cerulean/10 flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-cerulean" />
                </div>
                <h3 className="font-display text-base font-bold text-slate-900 mb-2">
                  Emergency Service
                </h3>
                <p className="text-sm text-slate-500">
                  {co.emergencyService}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-6 text-center">
                <div className="h-12 w-12 rounded-xl bg-cerulean/10 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-6 w-6 text-cerulean" />
                </div>
                <h3 className="font-display text-base font-bold text-slate-900 mb-2">
                  Financing Available
                </h3>
                <p className="text-sm text-slate-500">
                  {co.financingDescription}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-6 text-center">
                <div className="h-12 w-12 rounded-xl bg-cerulean/10 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-cerulean" />
                </div>
                <h3 className="font-display text-base font-bold text-slate-900 mb-2">
                  Convenient Hours
                </h3>
                <p className="text-sm text-slate-500">
                  {co.businessHours}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-navy py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Contact our team for a free, no-obligation estimate on your EV
              charger installation. We serve all of {site.suburb} and
              surrounding areas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                Call {site.phone}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer niche={niche} site={site} />
    </>
  );
}
