"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exportToCsv } from "@/lib/csv-export";
import type { SiteConfig } from "@/types";
import { blogPosts } from "@/config/blog-posts";
import { hendersonAreas } from "@/config/areas";
import { evChargerConfig } from "@/config/niches/ev-charger";

interface SiteDetailExportsProps {
  site: SiteConfig;
}

export default function SiteDetailExports({ site }: SiteDetailExportsProps) {
  function exportBusinessInfo() {
    const co = site.contentOverrides;
    exportToCsv(`${site.slug}-business-info.csv`, [
      {
        "Business Name": site.businessName,
        Phone: site.phone,
        Email: site.email,
        Domain: site.domain ?? "",
        Address: co.address ?? "",
        City: site.city,
        State: site.state,
        Suburb: site.suburb,
        "Zip Code": site.zipCode,
        Status: site.status,
        "Business Hours": co.businessHours ?? "",
        "Years in Business": co.yearsInBusiness ?? "",
        "License Number": co.licenseNumber ?? "",
        "Contractor License": co.contractorLicense ?? "",
        "Google Rating": co.googleReviewRating ?? "",
        "Google Reviews": co.googleReviewCount ?? "",
        "BBB Rating": co.bbbRating ?? "",
        "Service Areas": co.serviceAreas ?? "",
      },
    ]);
  }

  function exportBlogPosts() {
    const rows = blogPosts.map((post) => ({
      Title: post.title,
      Slug: post.slug,
      Category: post.category,
      Author: post.author,
      "Publish Date": post.publishDate,
      "Read Time": post.readTime,
      "Meta Description": post.metaDescription,
      Tags: post.tags.join("; "),
      URL: `${site.seoConfig.canonicalBase}/${site.slug}/blog/${post.slug}`,
    }));
    exportToCsv(`${site.slug}-blog-posts.csv`, rows);
  }

  function exportAreaPages() {
    const rows = hendersonAreas.map((area) => ({
      Name: area.name,
      Slug: area.slug,
      "Full Name": area.fullName,
      "ZIP Codes": area.zipCodes.join("; "),
      "Nearby Areas": area.nearbyAreas.join("; "),
      Highlights: area.highlights.join("; "),
      URL: `${site.seoConfig.canonicalBase}/${site.slug}/areas/${area.slug}`,
    }));
    exportToCsv(`${site.slug}-area-pages.csv`, rows);
  }

  function exportServices() {
    const rows = evChargerConfig.services.map((svc) => ({
      Title: svc.title,
      Slug: svc.slug,
      Description: svc.description,
      Icon: svc.icon,
    }));
    exportToCsv(`${site.slug}-services.csv`, rows);
  }

  function exportKeywords() {
    const rows = evChargerConfig.keywords.map((kw) => ({
      Keyword: kw,
      Niche: evChargerConfig.name,
      "Avg CPC": evChargerConfig.avgCpc,
      "Revenue Range": evChargerConfig.revenueRange,
    }));
    exportToCsv(`${site.slug}-keywords.csv`, rows);
  }

  function exportSeoConfig() {
    const co = site.contentOverrides;
    exportToCsv(`${site.slug}-seo-config.csv`, [
      {
        "Title Template": site.seoConfig.titleTemplate,
        "Description Template": site.seoConfig.descriptionTemplate,
        "Canonical Base": site.seoConfig.canonicalBase,
        "Schema Type": co.schemaType ?? "",
        "Price Range": co.schemaPriceRange ?? "",
        "Area Served": co.schemaAreaServed ?? "",
        "Founding Date": co.schemaFoundingDate ?? "",
        "Same As Links": co.schemaSameAs ?? "",
      },
    ]);
  }

  function exportAllData() {
    const co = site.contentOverrides;
    const rows = Object.entries(co).map(([key, value]) => ({
      Key: key,
      Value: value,
    }));
    exportToCsv(`${site.slug}-all-config.csv`, rows);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 rounded-xl"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={exportBusinessInfo}>
          Business Info
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportBlogPosts}>
          Blog Posts
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportAreaPages}>
          Area Pages
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportServices}>
          Services
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportKeywords}>
          Keywords
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportSeoConfig}>
          SEO Config
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportAllData}>
          All Config Data
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
