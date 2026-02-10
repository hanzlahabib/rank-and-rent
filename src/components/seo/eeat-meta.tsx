interface BreadcrumbItem {
  name: string;
  url: string;
}

interface EeatMetaProps {
  pageTitle: string;
  pageDescription: string;
  pageUrl: string;
  breadcrumbs: BreadcrumbItem[];
  isArticle?: boolean;
  authorName?: string;
}

function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Henderson EV Charger Pros",
    url: "https://hendersonevcharger.com",
    logo: "https://hendersonevcharger.com/images/logo.png",
    description:
      "Professional electric vehicle charger installation for homes and businesses in Henderson, NV. Licensed & insured electricians.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1023 Nevada Way, Suite 4",
      addressLocality: "Henderson",
      addressRegion: "NV",
      postalCode: "89012",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "(702) 555-0134",
      contactType: "customer service",
      areaServed: "Henderson, NV",
      availableLanguage: "English",
    },
    sameAs: [
      "https://www.facebook.com/hendersonevchargerpros",
      "https://www.instagram.com/hendersonevchargerpros",
      "https://www.yelp.com/biz/henderson-ev-charger-pros",
      "https://www.bbb.org/us/nv/henderson/henderson-ev-charger-pros",
    ],
    foundingDate: "2017-03-15",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 8,
      maxValue: 12,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "187",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

function buildBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

export default function EeatMeta({
  pageTitle,
  pageDescription,
  pageUrl,
  breadcrumbs,
  isArticle = false,
  authorName = "Mike Castillo",
}: EeatMetaProps) {
  const organizationSchema = buildOrganizationSchema();
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbs);

  return (
    <>
      {/* Author meta tags */}
      <meta name="author" content={authorName} />

      {/* Article-specific meta tags */}
      {isArticle && (
        <>
          <meta property="article:author" content={authorName} />
          <meta
            property="article:publisher"
            content="Henderson EV Charger Pros"
          />
        </>
      )}

      {/* Open Graph base tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content="Henderson EV Charger Pros" />

      {/* Organization structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      {/* Breadcrumb structured data */}
      {breadcrumbs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      )}
    </>
  );
}
