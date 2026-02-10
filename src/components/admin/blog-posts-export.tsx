"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportToCsv } from "@/lib/csv-export";
import { blogPosts } from "@/config/blog-posts";
import { hendersonEvConfig } from "@/config/sites";

export default function BlogPostsExport() {
  function handleExport() {
    const site = hendersonEvConfig;
    const rows = blogPosts.map((post) => ({
      Title: post.title,
      Slug: post.slug,
      Category: post.category,
      Author: post.author,
      "Author Bio": post.authorBio,
      "Publish Date": post.publishDate,
      "Read Time": post.readTime,
      "Meta Description": post.metaDescription,
      Tags: post.tags.join("; "),
      "Related Posts": post.relatedSlugs.join("; "),
      URL: `${site.seoConfig.canonicalBase}/${site.slug}/blog/${post.slug}`,
      "Content Length (chars)": post.content.length,
    }));
    exportToCsv("blog-posts-export.csv", rows);
  }

  return (
    <Button
      variant="outline"
      className="gap-2 rounded-xl"
      onClick={handleExport}
    >
      <Download className="h-4 w-4" />
      Export CSV
    </Button>
  );
}
