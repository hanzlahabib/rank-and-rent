import type { NicheConfig } from "@/types";

export const junkRemovalConfig: NicheConfig = {
  slug: "junk-removal",
  name: "Junk Removal",
  shortName: "Junk Removal",
  description:
    "Fast, affordable junk removal and hauling services. We handle the heavy lifting so you do not have to.",
  keywords: [
    "junk removal",
    "junk hauling",
    "trash removal",
    "furniture removal",
    "appliance removal",
    "estate cleanout",
    "construction debris removal",
    "garage cleanout",
    "hoarding cleanup",
    "same day junk removal",
  ],
  services: [
    {
      title: "Residential Junk Removal",
      description:
        "Full-service junk removal for homes. We load and haul away furniture, appliances, electronics, yard waste, and general household clutter.",
      icon: "Trash2",
      slug: "residential-junk-removal",
    },
    {
      title: "Construction Debris Removal",
      description:
        "Post-renovation and construction cleanup. We remove drywall, lumber, tile, carpet, and all construction waste safely and efficiently.",
      icon: "HardHat",
      slug: "construction-debris",
    },
    {
      title: "Estate Cleanouts",
      description:
        "Compassionate and thorough estate cleanout services. We handle everything from sorting to donation coordination to complete removal.",
      icon: "Package",
      slug: "estate-cleanouts",
    },
    {
      title: "Commercial Junk Removal",
      description:
        "Office furniture, equipment, and commercial waste removal. Minimize downtime with fast, scheduled commercial cleanouts.",
      icon: "Building2",
      slug: "commercial-junk-removal",
    },
  ],
  faqs: [
    {
      question: "How much does junk removal cost?",
      answer:
        "Pricing is based on volume. A small load starts at $99-$150. A full truckload typically costs $350-$600. We provide upfront pricing before any work begins.",
    },
    {
      question: "What items do you accept?",
      answer:
        "We take almost everything: furniture, appliances, electronics, yard waste, construction debris, and general clutter. We cannot accept hazardous materials.",
    },
    {
      question: "Do you offer same-day junk removal?",
      answer:
        "Yes! We offer same-day and next-day service in most areas. Call before noon for same-day pickup availability.",
    },
    {
      question: "Do you recycle or donate items?",
      answer:
        "Absolutely. We donate usable items to local charities and recycle materials whenever possible. We typically divert 60%+ of items from landfills.",
    },
  ],
  heroTitle: "Fast & Affordable Junk Removal",
  heroSubtitle:
    "Professional junk hauling for homes and businesses. Same-day service available. We do the heavy lifting.",
  ctaText: "Book a Pickup",
  ctaPhoneText: "Call for Instant Quote",
  trustSignals: [
    "Same-Day Service Available",
    "Upfront Transparent Pricing",
    "Eco-Friendly Disposal",
    "Licensed & Insured",
    "60%+ Recycled or Donated",
  ],
  avgCpc: "$15-25",
  revenueRange: "$1.5K-4K/mo",
  difficultyScore: 80,
};
