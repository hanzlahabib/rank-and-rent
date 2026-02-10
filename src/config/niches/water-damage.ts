import type { NicheConfig } from "@/types";

export const waterDamageConfig: NicheConfig = {
  slug: "water-damage-restoration",
  name: "Water Damage Restoration",
  shortName: "Water Damage",
  description:
    "24/7 emergency water damage restoration services. Fast water extraction, drying, and repair to protect your property.",
  keywords: [
    "water damage restoration",
    "water damage repair",
    "flood cleanup",
    "water extraction",
    "emergency water removal",
    "basement flooding",
    "burst pipe repair",
    "water damage company",
    "mold remediation",
    "storm damage restoration",
  ],
  services: [
    {
      title: "Emergency Water Extraction",
      description:
        "24/7 emergency water removal services. Industrial-grade pumps and extraction equipment to remove standing water fast and prevent further damage.",
      icon: "Droplets",
      slug: "emergency-water-extraction",
    },
    {
      title: "Structural Drying & Dehumidification",
      description:
        "Professional-grade drying equipment and moisture monitoring. We dry your property completely to prevent mold growth and structural damage.",
      icon: "Wind",
      slug: "structural-drying",
    },
    {
      title: "Mold Remediation",
      description:
        "Complete mold inspection, testing, and removal. We eliminate mold at its source and treat affected areas to prevent recurrence.",
      icon: "Bug",
      slug: "mold-remediation",
    },
    {
      title: "Water Damage Repair & Restoration",
      description:
        "Full reconstruction services after water damage. Drywall, flooring, painting, and structural repairs to restore your property.",
      icon: "Hammer",
      slug: "water-damage-repair",
    },
  ],
  faqs: [
    {
      question: "How fast can you respond to water damage?",
      answer:
        "We offer 24/7 emergency response with typical arrival times of 30-60 minutes in our service area. Fast response is critical to minimize damage.",
    },
    {
      question: "Does insurance cover water damage restoration?",
      answer:
        "Most homeowner insurance policies cover sudden water damage (burst pipes, appliance failures). We work directly with all major insurance companies and help with claims.",
    },
    {
      question: "How long does water damage restoration take?",
      answer:
        "Water extraction takes 1-2 days. Complete drying typically requires 3-5 days. Full restoration including repairs can take 1-4 weeks depending on severity.",
    },
    {
      question: "Will I get mold after water damage?",
      answer:
        "Mold can begin growing within 24-48 hours of water exposure. That is why fast professional drying is essential. We monitor moisture levels to ensure complete drying.",
    },
  ],
  heroTitle: "24/7 Water Damage Restoration",
  heroSubtitle:
    "Fast emergency water extraction and restoration. Insurance-approved, IICRC-certified technicians ready to respond now.",
  ctaText: "Get Emergency Help Now",
  ctaPhoneText: "Call 24/7 Emergency Line",
  trustSignals: [
    "24/7 Emergency Response",
    "IICRC Certified Technicians",
    "Insurance Claim Assistance",
    "30-60 Minute Response Time",
    "Satisfaction Guaranteed",
  ],
  avgCpc: "$31+",
  revenueRange: "$2K-6K/mo",
  difficultyScore: 88,
};
