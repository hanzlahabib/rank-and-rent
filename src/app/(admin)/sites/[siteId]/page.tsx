import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Globe,
  Phone,
  Mail,
  MapPin,
  Shield,
  Award,
  Star,
  Clock,
  FileText,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getSiteBySlug } from "@/config/sites";
import { blogPosts } from "@/config/blog-posts";
import { hendersonAreas } from "@/config/areas";
import { evChargerConfig } from "@/config/niches/ev-charger";
import type { SiteStatus } from "@/types";
import SiteDetailExports from "@/components/admin/site-detail-exports";

interface PageProps {
  params: Promise<{ siteId: string }>;
}

const statusStyles: Record<SiteStatus, string> = {
  active: "bg-emerald-trust/10 text-emerald-trust border-emerald-trust/20",
  paused: "bg-amber-warm/10 text-amber-warm border-amber-warm/20",
  draft: "bg-slate-100 text-slate-500 border-slate-200",
};

export default async function SiteDetailPage({ params }: PageProps) {
  const { siteId } = await params;
  const site = getSiteBySlug(siteId);

  if (!site) notFound();

  const niche = evChargerConfig;
  const co = site.contentOverrides;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link
            href="/sites"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-cerulean transition-colors mb-3"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sites
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-3xl font-bold text-slate-900 tracking-tight">
              {site.businessName}
            </h1>
            <Badge
              variant="outline"
              className={cn(
                "font-medium capitalize rounded-full text-xs",
                statusStyles[site.status]
              )}
            >
              {site.status}
            </Badge>
          </div>
          <p className="text-slate-500 mt-1">
            {site.suburb}, {site.city}, {site.state} {site.zipCode}
          </p>
        </div>
        <SiteDetailExports site={site} />
      </div>

      {/* Business Info */}
      <div className="rounded-2xl bg-white border border-slate-100 p-6">
        <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
          Business Information
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoRow icon={Globe} label="Domain" value={site.domain ?? "Not set"} />
          <InfoRow icon={Phone} label="Phone" value={site.phone} />
          <InfoRow icon={Mail} label="Email" value={site.email} />
          <InfoRow icon={MapPin} label="Address" value={co.address ?? "Not set"} />
          <InfoRow icon={Clock} label="Hours" value={co.businessHours ?? "Not set"} />
          <InfoRow icon={MapPin} label="Service Radius" value={co.serviceRadius ?? "Not set"} />
        </div>
      </div>

      {/* EEAT Signals */}
      <div className="rounded-2xl bg-white border border-slate-100 p-6">
        <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
          EEAT Trust Signals
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoRow icon={Shield} label="License Number" value={co.licenseNumber ?? ""} />
          <InfoRow icon={Shield} label="Contractor License" value={co.contractorLicense ?? ""} />
          <InfoRow icon={Shield} label="Bond Number" value={co.bondNumber ?? ""} />
          <InfoRow icon={Shield} label="Insurance" value={co.insuranceProvider ?? ""} />
          <InfoRow icon={Star} label="Google Reviews" value={`${co.googleReviewRating ?? ""} (${co.googleReviewCount ?? ""} reviews)`} />
          <InfoRow icon={Star} label="Yelp Reviews" value={`${co.yelpReviewRating ?? ""} (${co.yelpReviewCount ?? ""} reviews)`} />
          <InfoRow icon={Award} label="BBB Rating" value={co.bbbRating ?? ""} />
          <InfoRow icon={Award} label="Years in Business" value={co.yearsInBusiness ?? ""} />
          <InfoRow icon={Award} label="Total Installations" value={co.totalInstallations ?? ""} />
        </div>
      </div>

      {/* Team */}
      <div className="rounded-2xl bg-white border border-slate-100 p-6">
        <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
          Team Members
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <TeamCard
            name={co.ownerName ?? ""}
            title={co.ownerTitle ?? ""}
            bio={co.ownerBio ?? ""}
            certs={co.ownerCertifications ?? ""}
          />
          <TeamCard
            name={co.techLeadName ?? ""}
            title={co.techLeadTitle ?? ""}
            bio={co.techLeadBio ?? ""}
            certs={co.techLeadCertifications ?? ""}
          />
        </div>
      </div>

      {/* SEO Config */}
      <div className="rounded-2xl bg-white border border-slate-100 p-6">
        <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
          SEO Configuration
        </h2>
        <div className="space-y-3">
          <KVRow label="Title Template" value={site.seoConfig.titleTemplate} />
          <KVRow label="Description Template" value={site.seoConfig.descriptionTemplate} />
          <KVRow label="Canonical Base" value={site.seoConfig.canonicalBase} />
          <KVRow label="Schema Type" value={co.schemaType ?? ""} />
          <KVRow label="Price Range" value={co.schemaPriceRange ?? ""} />
          <KVRow label="Founding Date" value={co.schemaFoundingDate ?? ""} />
        </div>
      </div>

      {/* Services */}
      <div className="rounded-2xl bg-white border border-slate-100 p-6">
        <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
          Services ({niche.services.length})
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {niche.services.map((service) => (
            <div
              key={service.slug}
              className="rounded-xl border border-slate-100 p-4"
            >
              <p className="font-semibold text-slate-900 text-sm">
                {service.title}
              </p>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {service.description}
              </p>
              <p className="text-xs text-slate-400 mt-2">
                slug: {service.slug}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Target Keywords */}
      <div className="rounded-2xl bg-white border border-slate-100 p-6">
        <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
          Target Keywords ({niche.keywords.length})
        </h2>
        <div className="flex flex-wrap gap-2">
          {niche.keywords.map((kw) => (
            <span
              key={kw}
              className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* Blog Posts */}
      <div className="rounded-2xl bg-white border border-slate-100 p-6">
        <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
          Blog Posts ({blogPosts.length})
        </h2>
        <div className="space-y-3">
          {blogPosts.map((post) => (
            <div
              key={post.slug}
              className="flex items-center justify-between rounded-xl border border-slate-100 p-4"
            >
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-900 text-sm truncate">
                  {post.title}
                </p>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                  <span>{post.category}</span>
                  <span>{post.readTime}</span>
                  <span>{post.publishDate}</span>
                </div>
              </div>
              <Link
                href={`/${site.slug}/blog/${post.slug}`}
                className="flex items-center gap-1 text-xs text-cerulean hover:text-cerulean-light ml-4"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Area Pages */}
      <div className="rounded-2xl bg-white border border-slate-100 p-6">
        <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
          Area Pages ({hendersonAreas.length})
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hendersonAreas.map((area) => (
            <div
              key={area.slug}
              className="rounded-xl border border-slate-100 p-4"
            >
              <p className="font-semibold text-slate-900 text-sm">
                {area.name}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                ZIP: {area.zipCodes.join(", ")}
              </p>
              <Link
                href={`/${site.slug}/areas/${area.slug}`}
                className="flex items-center gap-1 text-xs text-cerulean hover:text-cerulean-light mt-2"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View Page
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* All Content Overrides (raw key-value) */}
      <div className="rounded-2xl bg-white border border-slate-100 p-6">
        <h2 className="font-display text-lg font-bold text-slate-900 mb-4">
          All Configuration Data ({Object.keys(co).length} fields)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-400 py-2 pr-4">
                  Key
                </th>
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-slate-400 py-2">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(co).map(([key, value]) => (
                <tr key={key} className="border-b border-slate-50">
                  <td className="py-2 pr-4 text-slate-600 font-mono text-xs whitespace-nowrap">
                    {key}
                  </td>
                  <td className="py-2 text-slate-800 text-xs max-w-[500px] truncate">
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Globe;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
      <Icon className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
      <div className="min-w-0">
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm text-slate-900 font-medium truncate">{value}</p>
      </div>
    </div>
  );
}

function KVRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 py-2 border-b border-slate-50 last:border-0">
      <span className="text-xs text-slate-400 w-40 flex-shrink-0">{label}</span>
      <span className="text-sm text-slate-800">{value}</span>
    </div>
  );
}

function TeamCard({
  name,
  title,
  bio,
  certs,
}: {
  name: string;
  title: string;
  bio: string;
  certs: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-10 w-10 rounded-full bg-cerulean/10 flex items-center justify-center">
          <FileText className="h-5 w-5 text-cerulean" />
        </div>
        <div>
          <p className="font-semibold text-slate-900 text-sm">{name}</p>
          <p className="text-xs text-cerulean">{title}</p>
        </div>
      </div>
      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
        {bio}
      </p>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {certs.split(", ").map((cert) => (
          <span
            key={cert}
            className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full"
          >
            {cert}
          </span>
        ))}
      </div>
    </div>
  );
}
