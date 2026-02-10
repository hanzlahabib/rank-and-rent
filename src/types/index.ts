export type SiteStatus = "active" | "paused" | "draft";
export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "converted"
  | "lost";
export type LeadSource = "form" | "call" | "chat";
export type TenantStatus = "active" | "paused" | "cancelled";
export type NicheSlug =
  | "ev-charger-installation"
  | "smart-home-installation"
  | "water-damage-restoration"
  | "pressure-washing"
  | "junk-removal";

export interface SiteConfig {
  id: string;
  slug: string;
  domain: string | null;
  nicheSlug: NicheSlug;
  businessName: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  suburb: string;
  zipCode: string;
  status: SiteStatus;
  seoConfig: SeoConfig;
  contentOverrides: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

export interface SeoConfig {
  titleTemplate: string;
  descriptionTemplate: string;
  ogImage: string | null;
  canonicalBase: string;
}

export interface Lead {
  id: string;
  siteId: string;
  tenantId: string | null;
  name: string;
  email: string;
  phone: string;
  message: string;
  service: string;
  source: LeadSource;
  status: LeadStatus;
  createdAt: Date;
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  monthlyRate: number;
  status: TenantStatus;
  createdAt: Date;
}

export interface NicheConfig {
  slug: NicheSlug;
  name: string;
  shortName: string;
  description: string;
  keywords: string[];
  services: ServiceItem[];
  faqs: FaqItem[];
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
  ctaPhoneText: string;
  trustSignals: string[];
  avgCpc: string;
  revenueRange: string;
  difficultyScore: number;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  slug: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PageData {
  site: SiteConfig;
  niche: NicheConfig;
  pageType: "home" | "service" | "about" | "contact" | "faq" | "area";
  slug: string[];
}
