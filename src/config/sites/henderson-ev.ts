import type { SiteConfig } from "@/types";

export const hendersonEvConfig: SiteConfig = {
  id: "henderson-ev-charger",
  slug: "henderson-ev-charger",
  domain: "hendersonevcharger.com",
  nicheSlug: "ev-charger-installation",
  businessName: "Henderson EV Charger Pros",
  phone: "(702) 555-0134",
  email: "info@hendersonevcharger.com",
  city: "Las Vegas",
  state: "NV",
  suburb: "Henderson",
  zipCode: "89012",
  status: "active",
  seoConfig: {
    titleTemplate: "%s | Henderson EV Charger Pros | Licensed Electricians",
    descriptionTemplate:
      "%s in Henderson, NV. Licensed & insured electricians serving Henderson, Green Valley, Anthem & surrounding areas. Call (702) 555-0134 for a free estimate.",
    ogImage: null,
    canonicalBase: "https://hendersonevcharger.com",
  },
  contentOverrides: {
    // EEAT: Physical business address for Google Business Profile trust
    address: "1023 Nevada Way, Suite 4, Henderson, NV 89012",

    // EEAT: License & certification numbers for authority signals
    licenseNumber: "NV-EC-2024-087431",
    contractorLicense: "NV-C2E-0082194",
    bondNumber: "SUR-2024-NV-55219",
    insuranceProvider: "State Farm Commercial",
    insurancePolicyNumber: "SF-NV-COM-2024-91847",

    // EEAT: Service area coverage for local SEO
    primaryServiceArea: "Henderson",
    serviceAreas:
      "Henderson, Green Valley, Anthem, MacDonald Highlands, Lake Las Vegas, Inspirada, Cadence, Seven Hills, Tuscany Village, Paradise Hills",
    serviceRadius: "25 miles",
    serviceAreaDescription:
      "Proudly serving Henderson and all of Clark County including Green Valley, Anthem, MacDonald Highlands, Lake Las Vegas, Inspirada, Cadence, Seven Hills, Tuscany Village, and Paradise Hills.",

    // EEAT: Team bios for expertise signals
    ownerName: "Mike Castillo",
    ownerTitle: "Owner & Master Electrician",
    ownerBio:
      "Mike Castillo is a Nevada-licensed master electrician with over 18 years of experience in residential and commercial electrical work. He founded Henderson EV Charger Pros to help Southern Nevada homeowners transition to electric vehicles with safe, code-compliant charger installations. Mike holds certifications from Tesla, ChargePoint, and the Electric Vehicle Infrastructure Training Program (EVITP).",
    ownerCertifications:
      "Nevada Master Electrician License, EVITP Certified, Tesla Certified Installer, ChargePoint Certified Partner, OSHA 30-Hour",
    ownerImage: "/images/team/mike-castillo.jpg",

    techLeadName: "Sarah Chen",
    techLeadTitle: "Lead Installation Technician",
    techLeadBio:
      "Sarah Chen brings 12 years of electrical contracting experience to every installation. She specializes in complex panel upgrades and multi-unit commercial EV charging deployments. Sarah is EVITP certified and has completed over 400 EV charger installations across the Las Vegas valley.",
    techLeadCertifications:
      "Nevada Journeyman Electrician, EVITP Certified, NABCEP PV Associate, JuiceBox Certified Installer",
    techLeadImage: "/images/team/sarah-chen.jpg",

    // EEAT: Trust signals and social proof
    yearsInBusiness: "8",
    totalInstallations: "1,200+",
    googleReviewCount: "187",
    googleReviewRating: "4.9",
    yelpReviewCount: "64",
    yelpReviewRating: "4.8",
    bbbRating: "A+",
    bbbAccredited: "true",

    // EEAT: Industry affiliations for authority
    affiliations:
      "NECA (National Electrical Contractors Association), IEC (Independent Electrical Contractors), EVITP (Electric Vehicle Infrastructure Training Program), Henderson Chamber of Commerce, Nevada State Contractors Board",

    // EEAT: Warranty & guarantee details
    warrantyYears: "5",
    warrantyDescription:
      "Every installation comes with our 5-year workmanship warranty. If anything related to our installation fails within 5 years, we fix it at no cost. Most EV charger manufacturers provide additional product warranties of 3-5 years.",
    satisfactionGuarantee:
      "100% satisfaction guarantee on every installation. If you are not completely satisfied with our work, we will make it right or refund your money.",

    // Local SEO: Business hours
    businessHours: "Mon-Fri: 7:00 AM - 6:00 PM, Sat: 8:00 AM - 2:00 PM, Sun: Closed",
    emergencyService: "24/7 emergency service available for existing customers",

    // Local SEO: Payment and financing
    paymentMethods: "Cash, Check, Visa, Mastercard, American Express, Discover, Financing Available",
    financingAvailable: "true",
    financingDescription:
      "0% APR financing available for qualified homeowners on installations over $1,000. Apply online or ask your technician for details.",

    // Content: Blog author information for EEAT
    blogAuthorName: "Mike Castillo",
    blogAuthorTitle: "Master Electrician & EV Charging Specialist",
    blogAuthorBio:
      "Mike Castillo is a Nevada-licensed master electrician and the founder of Henderson EV Charger Pros. With 18+ years of electrical experience and certifications from Tesla, ChargePoint, and EVITP, Mike writes about EV charging technology, installation best practices, and Nevada electrical code requirements.",
    blogAuthorImage: "/images/team/mike-castillo.jpg",

    // Schema markup: LocalBusiness structured data
    schemaType: "Electrician",
    schemaPriceRange: "$$",
    schemaAreaServed: "Henderson, NV",
    schemaFoundingDate: "2017-03-15",
    schemaNumberOfEmployees: "8-12",
    schemaSameAs:
      "https://www.facebook.com/hendersonevchargerpros,https://www.instagram.com/hendersonevchargerpros,https://www.yelp.com/biz/henderson-ev-charger-pros,https://www.bbb.org/us/nv/henderson/henderson-ev-charger-pros",

    // Nearby landmarks and neighborhoods for local relevance
    nearbyLandmarks:
      "The District at Green Valley Ranch, Galleria at Sunset, Henderson Pavilion, Lake Mead National Recreation Area, Cowabunga Canyon",
  },
  createdAt: new Date("2025-01-15T00:00:00Z"),
  updatedAt: new Date("2025-01-15T00:00:00Z"),
};
