import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNicheConfig } from "@/config/niches/types";
import { getSiteBySlug, getAllSiteSlugs } from "@/config/sites";
import type { NicheSlug } from "@/types";
import Navbar from "@/components/site/navbar";
import Hero from "@/components/site/hero";
import Services from "@/components/site/services";
import LeadForm from "@/components/site/lead-form";
import Faq from "@/components/site/faq";
import Testimonials from "@/components/site/testimonials";
import Footer from "@/components/site/footer";
import JsonLd from "@/components/seo/json-ld";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSiteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const site = getSiteBySlug(slug);
  if (!site) return {};

  const niche = await getNicheConfig(site.nicheSlug as NicheSlug);
  if (!niche) return {};

  const title = site.seoConfig.titleTemplate.replace("%s", niche.name);
  const description = site.seoConfig.descriptionTemplate.replace(
    "%s",
    niche.name.toLowerCase()
  );

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: site.businessName,
    },
    alternates: {
      canonical: site.seoConfig.canonicalBase,
    },
  };
}

export default async function SitePage({ params }: PageProps) {
  const { slug } = await params;
  const site = getSiteBySlug(slug);
  if (!site) notFound();

  const niche = await getNicheConfig(site.nicheSlug as NicheSlug);
  if (!niche) notFound();

  return (
    <>
      <JsonLd niche={niche} site={site} pageType="home" />
      <Navbar niche={niche} site={site} />
      <main className="pt-16">
        <Hero niche={niche} site={site} />
        <Services niche={niche} site={site} />
        <Testimonials niche={niche} site={site} />
        <LeadForm niche={niche} site={site} />
        <Faq niche={niche} site={site} />
      </main>
      <Footer niche={niche} site={site} />
    </>
  );
}
