import type { NicheConfig } from "@/types";

export const smartHomeConfig: NicheConfig = {
  slug: "smart-home-installation",
  name: "Smart Home Installation",
  shortName: "Smart Home",
  description:
    "Professional smart home installation and automation services. Transform your home with connected technology.",
  keywords: [
    "smart home installation",
    "home automation",
    "smart home setup",
    "smart thermostat installation",
    "smart lighting installation",
    "home security system installation",
    "smart home wiring",
    "whole home automation",
    "smart home electrician",
    "connected home setup",
  ],
  services: [
    {
      title: "Smart Lighting Installation",
      description:
        "Professional smart lighting setup with dimmers, scenes, and voice control. Energy-efficient LED systems that respond to your schedule.",
      icon: "Lightbulb",
      slug: "smart-lighting",
    },
    {
      title: "Smart Thermostat Installation",
      description:
        "Nest, Ecobee, and Honeywell smart thermostat installation. Save up to 23% on energy bills with intelligent climate control.",
      icon: "Thermometer",
      slug: "smart-thermostat",
    },
    {
      title: "Home Security Systems",
      description:
        "Complete smart security installation including cameras, doorbell cameras, smart locks, and monitoring integration.",
      icon: "Shield",
      slug: "home-security",
    },
    {
      title: "Whole Home Automation",
      description:
        "Full-home automation with centralized control. Lights, climate, security, entertainment all connected and controllable from your phone.",
      icon: "Smartphone",
      slug: "whole-home-automation",
    },
  ],
  faqs: [
    {
      question: "How much does smart home installation cost?",
      answer:
        "Basic smart home setups start at $500-$1,500. Full home automation packages range from $3,000-$15,000+ depending on the scope and equipment chosen.",
    },
    {
      question: "Do I need special wiring for a smart home?",
      answer:
        "Many smart devices work on your existing WiFi. However, for the most reliable setup, we may recommend structured wiring for devices like cameras and whole-home audio.",
    },
    {
      question: "Which smart home platform is best?",
      answer:
        "We work with all major platforms: Apple HomeKit, Google Home, Amazon Alexa, and Samsung SmartThings. We help you choose based on your existing devices.",
    },
    {
      question: "Can I add smart home features to an older home?",
      answer:
        "Absolutely. Wireless smart devices can be added to any home. We specialize in retrofitting older homes with modern smart technology without major renovations.",
    },
  ],
  heroTitle: "Expert Smart Home Installation",
  heroSubtitle:
    "Transform your home with professional smart home setup. Voice control, automation, and energy savings from certified technicians.",
  ctaText: "Get a Free Consultation",
  ctaPhoneText: "Call for Smart Home Assessment",
  trustSignals: [
    "Certified Smart Home Installers",
    "All Major Platforms Supported",
    "Same-Week Appointments",
    "1-Year Setup Warranty",
    "Lifetime Tech Support",
  ],
  avgCpc: "$25-40",
  revenueRange: "$3K-8K/mo",
  difficultyScore: 90,
};
