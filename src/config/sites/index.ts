import type { SiteConfig } from "@/types";
import { hendersonEvConfig } from "./henderson-ev";

/**
 * Registry of all site configurations keyed by slug.
 * Add new sites here as they are created.
 */
export const SITE_REGISTRY: Record<string, SiteConfig> = {
  "henderson-ev-charger": hendersonEvConfig,
};

/**
 * Look up a site configuration by its slug.
 * Returns null if no site matches the given slug.
 */
export function getSiteBySlug(slug: string): SiteConfig | null {
  return SITE_REGISTRY[slug] ?? null;
}

/**
 * Returns all registered site slugs.
 */
export function getAllSiteSlugs(): string[] {
  return Object.keys(SITE_REGISTRY);
}

/**
 * Returns all registered site configurations.
 */
export function getAllSites(): SiteConfig[] {
  return Object.values(SITE_REGISTRY);
}

/**
 * Returns all active site configurations (status === "active").
 */
export function getActiveSites(): SiteConfig[] {
  return Object.values(SITE_REGISTRY).filter(
    (site) => site.status === "active"
  );
}

export { hendersonEvConfig };
