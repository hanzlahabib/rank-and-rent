import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { hendersonEvConfig } from "@/config/sites";
import { evChargerConfig } from "@/config/niches/ev-charger";
import { blogPosts } from "@/config/blog-posts";
import Navbar from "@/components/site/navbar";
import Footer from "@/components/site/footer";
import JsonLd from "@/components/seo/json-ld";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const site = hendersonEvConfig;

  const title = site.seoConfig.titleTemplate.replace(
    "%s",
    "EV Charger Installation Blog & Expert Resources"
  );
  const description = `Expert articles on EV charger installation, costs, rebates, and guides for ${site.suburb}, ${site.state} homeowners. Written by licensed electricians.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${site.seoConfig.canonicalBase}/${slug}/blog`,
    },
    alternates: {
      canonical: `${site.seoConfig.canonicalBase}/${slug}/blog`,
    },
  };
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getExcerpt(content: string, maxLength: number = 150): string {
  const plainText = content
    .replace(/^##\s+.*$/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^-\s+/gm, "")
    .replace(/^#+\s+/gm, "")
    .replace(/\n+/g, " ")
    .trim();

  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength).replace(/\s+\S*$/, "") + "...";
}

export default async function BlogListingPage({ params }: PageProps) {
  const { slug } = await params;
  const site = hendersonEvConfig;
  const niche = evChargerConfig;

  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

  return (
    <>
      <JsonLd niche={niche} site={site} pageType="home" />
      <Navbar niche={niche} site={site} />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-navy py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block text-sm font-semibold text-cerulean tracking-wide uppercase mb-3">
                Expert Resources
              </span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
                EV Charger Installation{" "}
                <span className="text-cerulean-light">Blog & Guides</span>
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed">
                Expert articles written by licensed electricians covering EV charger
                costs, installation guides, rebates, and everything {site.suburb}{" "}
                homeowners need to know about home charging.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/${slug}/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:border-cerulean/20 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Card Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-cerulean/10 to-navy/5 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-xl bg-cerulean/15 flex items-center justify-center">
                      <span className="font-display text-2xl font-bold text-cerulean">
                        {post.title.charAt(0)}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col flex-1 p-6">
                    {/* Category Badge */}
                    <span className="inline-block self-start text-xs font-semibold text-cerulean bg-cerulean/8 px-3 py-1 rounded-full mb-3">
                      {post.category}
                    </span>

                    <h2 className="font-display text-lg font-bold text-slate-900 mb-3 group-hover:text-cerulean transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                      {getExcerpt(post.content)}
                    </p>

                    {/* Meta Row */}
                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(post.publishDate)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Author Row */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="flex items-center gap-2 text-xs text-slate-500">
                        <User className="h-3.5 w-3.5" />
                        {post.author.split(",")[0]}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-semibold text-cerulean group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-navy">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Install Your EV Charger?
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Our licensed electricians are ready to help. Get a free estimate
              for your {site.suburb} home today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${slug}#quote`}
                className="inline-flex items-center justify-center gap-2 bg-cerulean hover:bg-cerulean-light text-white font-semibold rounded-xl px-8 py-3 transition-colors"
              >
                {niche.ctaText}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href={`tel:${site.phone}`}
                className="inline-flex items-center justify-center gap-2 border border-slate-600 text-white hover:bg-white/5 font-semibold rounded-xl px-8 py-3 transition-colors"
              >
                Call {site.phone}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer niche={niche} site={site} />
    </>
  );
}
