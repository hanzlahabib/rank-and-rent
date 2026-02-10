import type { NicheConfig, SiteConfig } from "@/types";

interface JsonLdProps {
  niche: NicheConfig;
  site: SiteConfig;
  pageType: "home" | "service" | "faq" | "about" | "contact" | "area";
}

function buildLocalBusinessSchema(site: SiteConfig, niche: NicheConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.businessName,
    description: niche.description,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.state,
      postalCode: site.zipCode,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: `${site.suburb}, ${site.city}`,
    },
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "07:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
    },
  };
}

function buildServiceSchema(
  site: SiteConfig,
  niche: NicheConfig,
  service?: { title: string; description: string }
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service?.title || niche.name,
    description: service?.description || niche.description,
    provider: {
      "@type": "LocalBusiness",
      name: site.businessName,
    },
    areaServed: {
      "@type": "City",
      name: `${site.suburb}, ${site.city}, ${site.state}`,
    },
    serviceType: niche.name,
  };
}

function buildFaqSchema(niche: NicheConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: niche.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export default function JsonLd({ niche, site, pageType }: JsonLdProps) {
  const schemas: Record<string, unknown>[] = [buildLocalBusinessSchema(site, niche)];

  if (pageType === "home" || pageType === "service") {
    schemas.push(buildServiceSchema(site, niche));
  }

  if (pageType === "home" || pageType === "faq") {
    schemas.push(buildFaqSchema(niche));
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
