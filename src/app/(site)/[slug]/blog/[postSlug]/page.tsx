import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Phone,
  Shield,
  Award,
} from "lucide-react";
import { hendersonEvConfig } from "@/config/sites";
import { evChargerConfig } from "@/config/niches/ev-charger";
import { blogPosts } from "@/config/blog-posts";
import type { BlogPost } from "@/config/blog-posts/types";
import Navbar from "@/components/site/navbar";
import Footer from "@/components/site/footer";

interface PageProps {
  params: Promise<{ slug: string; postSlug: string }>;
}

export async function generateStaticParams() {
  const siteSlug = hendersonEvConfig.slug;
  return blogPosts.map((post) => ({
    slug: siteSlug,
    postSlug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, postSlug } = await params;
  const site = hendersonEvConfig;
  const post = blogPosts.find((p) => p.slug === postSlug);

  if (!post) return {};

  return {
    title: site.seoConfig.titleTemplate.replace("%s", post.title),
    description: post.metaDescription,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.author],
      url: `${site.seoConfig.canonicalBase}/${slug}/blog/${postSlug}`,
    },
    alternates: {
      canonical: `${site.seoConfig.canonicalBase}/${slug}/blog/${postSlug}`,
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

function renderMarkdown(content: string): React.ReactNode[] {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let key = 0;

  function flushList() {
    if (listItems.length > 0) {
      elements.push(
        <ul key={key++} className="list-disc list-inside space-y-2 text-slate-600 leading-relaxed my-4 ml-4">
          {listItems.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  }

  function renderInline(text: string): React.ReactNode {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let partKey = 0;

    while (remaining.length > 0) {
      const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
      if (boldMatch && boldMatch.index !== undefined) {
        if (boldMatch.index > 0) {
          parts.push(
            <span key={partKey++}>{remaining.substring(0, boldMatch.index)}</span>
          );
        }
        parts.push(
          <strong key={partKey++} className="font-semibold text-slate-800">
            {boldMatch[1]}
          </strong>
        );
        remaining = remaining.substring(boldMatch.index + boldMatch[0].length);
      } else {
        const italicMatch = remaining.match(/\*([^*]+)\*/);
        if (italicMatch && italicMatch.index !== undefined) {
          if (italicMatch.index > 0) {
            parts.push(
              <span key={partKey++}>{remaining.substring(0, italicMatch.index)}</span>
            );
          }
          parts.push(
            <em key={partKey++} className="italic text-slate-500">
              {italicMatch[1]}
            </em>
          );
          remaining = remaining.substring(italicMatch.index + italicMatch[0].length);
        } else {
          parts.push(<span key={partKey++}>{remaining}</span>);
          remaining = "";
        }
      }
    }

    return <>{parts}</>;
  }

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === "") {
      flushList();
      continue;
    }

    if (trimmed === "---") {
      flushList();
      elements.push(<hr key={key++} className="my-8 border-slate-200" />);
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h3
          key={key++}
          className="font-display text-xl font-bold text-slate-900 mt-8 mb-3"
        >
          {trimmed.replace("### ", "")}
        </h3>
      );
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h2
          key={key++}
          className="font-display text-2xl font-bold text-slate-900 mt-10 mb-4"
        >
          {trimmed.replace("## ", "")}
        </h2>
      );
      continue;
    }

    if (trimmed.startsWith("- ")) {
      listItems.push(trimmed.replace(/^-\s+/, ""));
      continue;
    }

    flushList();
    elements.push(
      <p key={key++} className="text-slate-600 leading-relaxed my-4">
        {renderInline(trimmed)}
      </p>
    );
  }

  flushList();
  return elements;
}

function getRelatedPosts(post: BlogPost): BlogPost[] {
  return post.relatedSlugs
    .map((relSlug) => blogPosts.find((p) => p.slug === relSlug))
    .filter((p): p is BlogPost => p !== undefined)
    .slice(0, 3);
}

function buildArticleSchema(post: BlogPost, siteSlug: string) {
  const site = hendersonEvConfig;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    author: {
      "@type": "Person",
      name: post.author,
      description: post.authorBio,
    },
    publisher: {
      "@type": "Organization",
      name: site.businessName,
      url: site.seoConfig.canonicalBase,
    },
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.seoConfig.canonicalBase}/${siteSlug}/blog/${post.slug}`,
    },
    image: post.heroImage,
    articleSection: post.category,
    keywords: post.tags.join(", "),
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug, postSlug } = await params;
  const site = hendersonEvConfig;
  const niche = evChargerConfig;
  const post = blogPosts.find((p) => p.slug === postSlug);

  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post);
  const articleSchema = buildArticleSchema(post, slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navbar niche={niche} site={site} />

      <main className="pt-16">
        {/* Breadcrumbs */}
        <div className="bg-slate-50 border-b border-slate-200">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-1.5 text-sm text-slate-500">
              <Link
                href={`/${slug}`}
                className="hover:text-cerulean transition-colors"
              >
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link
                href={`/${slug}/blog`}
                className="hover:text-cerulean transition-colors"
              >
                Blog
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-slate-800 font-medium truncate max-w-[250px]">
                {post.title}
              </span>
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <section className="bg-navy py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <span className="inline-block text-xs font-semibold text-cerulean bg-cerulean/15 px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(post.publishDate)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-12 md:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="prose-custom max-w-none">
              {(() => {
                const rendered = renderMarkdown(post.content);
                const midPoint = Math.floor(rendered.length * 0.4);
                const firstHalf = rendered.slice(0, midPoint);
                const secondHalf = rendered.slice(midPoint);
                return (
                  <>
                    {firstHalf}
                    {/* Mid-Article CTA */}
                    <div className="my-10 rounded-xl bg-cerulean/5 border border-cerulean/20 p-6 md:p-8">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex-1">
                          <p className="font-display text-lg font-bold text-slate-900 mb-1">
                            Need a professional installation quote?
                          </p>
                          <p className="text-sm text-slate-600">
                            {site.businessName} handles everything — permits, wiring, and installation. Free estimates, no obligation.
                          </p>
                        </div>
                        <Link
                          href={`/${slug}#quote`}
                          className="inline-flex items-center gap-2 bg-cerulean hover:bg-cerulean-light text-white font-semibold rounded-lg px-6 py-2.5 text-sm transition-colors whitespace-nowrap"
                        >
                          Get Free Quote
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                    {secondHalf}
                  </>
                );
              })()}
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Author Bio Box (EEAT) */}
        <section className="bg-slate-50 py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-white border border-slate-200 p-6 md:p-8">
              <div className="flex items-start gap-5">
                <div className="h-16 w-16 rounded-full bg-cerulean/10 flex items-center justify-center flex-shrink-0">
                  <User className="h-8 w-8 text-cerulean" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg font-bold text-slate-900 mb-1">
                    About the Author
                  </h3>
                  <p className="text-sm font-semibold text-cerulean mb-3">
                    {post.author}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {post.authorBio}
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Shield className="h-3.5 w-3.5 text-emerald-trust" />
                      Licensed & Insured
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Award className="h-3.5 w-3.5 text-amber-warm" />
                      EVITP Certified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-8">
                Related Articles
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/${slug}/blog/${related.slug}`}
                    className="group rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-cerulean/20 transition-all"
                  >
                    <span className="text-xs font-semibold text-cerulean mb-2 block">
                      {related.category}
                    </span>
                    <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-cerulean transition-colors mb-2 line-clamp-2">
                      {related.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span>{formatDate(related.publishDate)}</span>
                      <span>{related.readTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Lead Capture CTA */}
        <section className="bg-navy py-16">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
              Need Professional EV Charger Installation?
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              {site.businessName} provides licensed, insured EV charger
              installation throughout {site.suburb} and surrounding areas. Get
              your free estimate today.
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
                <Phone className="h-5 w-5 text-amber-warm" />
                Call {site.phone}
              </a>
            </div>
          </div>
        </section>

        {/* Back to Blog */}
        <div className="bg-slate-50 py-6">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Link
              href={`/${slug}/blog`}
              className="inline-flex items-center gap-2 text-sm font-medium text-cerulean hover:text-cerulean-light transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Articles
            </Link>
          </div>
        </div>
      </main>

      <Footer niche={niche} site={site} />
    </>
  );
}
