import type { NicheConfig } from "@/types";

export const evChargerConfig: NicheConfig = {
  slug: "ev-charger-installation",
  name: "EV Charger Installation",
  shortName: "EV Charger",
  description:
    "Professional electric vehicle charger installation for homes and businesses. Level 2 and DC fast charging solutions.",
  keywords: [
    "ev charger installation",
    "electric vehicle charger",
    "level 2 charger installation",
    "home ev charger",
    "tesla charger installation",
    "ev charging station installation",
    "electric car charger",
    "ev charger electrician",
    "240v outlet installation",
    "nema 14-50 installation",
  ],
  services: [
    {
      title: "Level 2 Home Charger Installation",
      description:
        "Expert installation of Level 2 (240V) EV chargers for your home. Charge your vehicle overnight and wake up to a full battery every morning.",
      icon: "Zap",
      slug: "level-2-home-charger",
    },
    {
      title: "Tesla Wall Connector Installation",
      description:
        "Certified Tesla Wall Connector installation. Maximize your Tesla charging speed with professional electrical setup.",
      icon: "Battery",
      slug: "tesla-wall-connector",
    },
    {
      title: "Commercial EV Charging Stations",
      description:
        "Multi-unit EV charging solutions for businesses, parking garages, and commercial properties. Attract EV-driving customers.",
      icon: "Building2",
      slug: "commercial-ev-charging",
    },
    {
      title: "Electrical Panel Upgrade",
      description:
        "Panel upgrades to support your new EV charger. We ensure your home electrical system can handle the added load safely.",
      icon: "Settings",
      slug: "electrical-panel-upgrade",
    },
  ],
  faqs: [
    {
      question: "How much does EV charger installation cost?",
      answer:
        "EV charger installation typically costs between $500-$2,500 depending on your electrical setup, charger type, and distance from your panel. We provide free estimates.",
    },
    {
      question: "How long does installation take?",
      answer:
        "Most residential EV charger installations are completed in 2-4 hours. Complex installations requiring panel upgrades may take a full day.",
    },
    {
      question: "Do I need a permit for EV charger installation?",
      answer:
        "Yes, most municipalities require an electrical permit. We handle all permitting and inspections as part of our service.",
    },
    {
      question: "What Level 2 charger should I get?",
      answer:
        "We recommend 48-amp Level 2 chargers for most EVs. Popular options include the Tesla Wall Connector, ChargePoint Home Flex, and JuiceBox 48.",
    },
    {
      question: "Can I install an EV charger in my apartment?",
      answer:
        "Yes, with landlord permission. We work with property managers to install shared and dedicated EV charging in multi-unit buildings.",
    },
  ],
  heroTitle: "Professional EV Charger Installation",
  heroSubtitle:
    "Fast, safe, and code-compliant electric vehicle charger installation for your home or business. Licensed electricians, same-week scheduling.",
  ctaText: "Get a Free Quote",
  ctaPhoneText: "Call Now for Same-Day Estimate",
  trustSignals: [
    "Licensed & Insured Electricians",
    "Same-Week Installation",
    "All Permits Handled",
    "5-Year Workmanship Warranty",
    "100+ Chargers Installed",
  ],
  avgCpc: "$30-50+",
  revenueRange: "$3K-8K/mo",
  difficultyScore: 95,
};
