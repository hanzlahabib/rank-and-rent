import type { NicheConfig } from "@/types";

export const pressureWashingConfig: NicheConfig = {
  slug: "pressure-washing",
  name: "Pressure Washing",
  shortName: "Pressure Washing",
  description:
    "Professional pressure washing and power washing services for homes and businesses. Restore your property curb appeal.",
  keywords: [
    "pressure washing",
    "power washing",
    "driveway pressure washing",
    "house washing",
    "deck cleaning",
    "concrete cleaning",
    "roof washing",
    "commercial pressure washing",
    "soft washing",
    "exterior cleaning",
  ],
  services: [
    {
      title: "House & Siding Washing",
      description:
        "Gentle soft washing for vinyl, brick, stucco, and wood siding. Remove years of dirt, algae, and mildew without damage.",
      icon: "Home",
      slug: "house-washing",
    },
    {
      title: "Driveway & Concrete Cleaning",
      description:
        "High-pressure cleaning for driveways, sidewalks, patios, and garage floors. Remove oil stains, tire marks, and embedded grime.",
      icon: "Car",
      slug: "driveway-cleaning",
    },
    {
      title: "Deck & Fence Restoration",
      description:
        "Pressure washing and restoration for wood and composite decks and fences. Bring back the natural beauty of your outdoor spaces.",
      icon: "Fence",
      slug: "deck-fence-cleaning",
    },
    {
      title: "Commercial Pressure Washing",
      description:
        "Storefront, parking lot, and building exterior cleaning for businesses. Maintain a professional appearance that attracts customers.",
      icon: "Building2",
      slug: "commercial-pressure-washing",
    },
  ],
  faqs: [
    {
      question: "How much does pressure washing cost?",
      answer:
        "Driveway cleaning starts at $100-$250. House washing ranges from $200-$600. We provide free on-site estimates based on square footage and surface type.",
    },
    {
      question: "Will pressure washing damage my surfaces?",
      answer:
        "No, when done professionally. We use the right pressure and techniques for each surface. Soft washing for delicate materials, higher pressure for concrete.",
    },
    {
      question: "How often should I pressure wash my home?",
      answer:
        "We recommend annually for most homes. Homes in humid climates or shaded areas may benefit from cleaning every 6-12 months to prevent algae growth.",
    },
    {
      question: "Do you use chemicals or just water?",
      answer:
        "We use eco-friendly, biodegradable cleaning solutions when needed. For soft washing, detergents are essential for killing algae and mold at the root.",
    },
  ],
  heroTitle: "Professional Pressure Washing",
  heroSubtitle:
    "Restore your property curb appeal with expert pressure washing. Driveways, siding, decks, and more. Free estimates.",
  ctaText: "Get a Free Estimate",
  ctaPhoneText: "Call for Same-Day Quote",
  trustSignals: [
    "Fully Licensed & Insured",
    "Eco-Friendly Solutions",
    "Same-Week Service Available",
    "Satisfaction Guaranteed",
    "Free On-Site Estimates",
  ],
  avgCpc: "$8-15",
  revenueRange: "$1K-3K/mo",
  difficultyScore: 82,
};
