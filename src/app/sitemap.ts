import type { MetadataRoute } from "next";
import { evChargerConfig } from "@/config/niches/ev-charger";
import { hendersonAreas } from "@/config/areas";
import { blogPosts } from "@/config/blog-posts";

const SITE_URL =
  process.env.SITE_URL || "https://hendersonevcharger.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Homepage
  const homeEntry: MetadataRoute.Sitemap[number] = {
    url: SITE_URL,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1.0,
  };

  // Service pages
  const serviceEntries: MetadataRoute.Sitemap = evChargerConfig.services.map(
    (service) => ({
      url: `${SITE_URL}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })
  );

  // Area pages
  const areaEntries: MetadataRoute.Sitemap = hendersonAreas.map((area) => ({
    url: `${SITE_URL}/areas/${area.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Blog posts
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishDate),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // About page
  const aboutEntry: MetadataRoute.Sitemap[number] = {
    url: `${SITE_URL}/about`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  };

  // Blog listing page
  const blogListingEntry: MetadataRoute.Sitemap[number] = {
    url: `${SITE_URL}/blog`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  };

  return [
    homeEntry,
    ...serviceEntries,
    ...areaEntries,
    blogListingEntry,
    ...blogEntries,
    aboutEntry,
  ];
}
