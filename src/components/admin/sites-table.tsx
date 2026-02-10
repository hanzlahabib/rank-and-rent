import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getAllSites } from "@/config/sites";
import { blogPosts } from "@/config/blog-posts";
import { hendersonAreas } from "@/config/areas";
import type { SiteStatus } from "@/types";

const statusStyles: Record<SiteStatus, string> = {
  active: "bg-emerald-trust/10 text-emerald-trust border-emerald-trust/20",
  paused: "bg-amber-warm/10 text-amber-warm border-amber-warm/20",
  draft: "bg-slate-100 text-slate-500 border-slate-200",
};

export default function SitesTable() {
  const sites = getAllSites();

  return (
    <div className="rounded-2xl bg-white border border-slate-100 overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-slate-100">
        <div>
          <h3 className="font-display text-lg font-bold text-slate-900">
            Sites
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">
            {sites.length} rank-and-rent properties
          </p>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-slate-100">
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-6">
              Site
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Niche
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Location
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Status
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400 text-right">
              Content
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400 text-right pr-6">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sites.map((site) => {
            const postCount = blogPosts.length;
            const areaCount = hendersonAreas.length;

            return (
              <TableRow
                key={site.id}
                className="hover:bg-slate-50/50 border-slate-100"
              >
                <TableCell className="pl-6">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">
                      {site.businessName}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      {site.domain ?? site.slug}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-slate-600">
                    {site.nicheSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-slate-600">
                    {site.suburb}, {site.state}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "font-medium capitalize rounded-full text-xs",
                      statusStyles[site.status]
                    )}
                  >
                    {site.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="text-sm text-slate-600">
                    <span>{postCount} posts</span>
                    <span className="text-slate-300 mx-1.5">/</span>
                    <span>{areaCount} areas</span>
                  </div>
                </TableCell>
                <TableCell className="text-right pr-6">
                  <Link href={`/sites/${site.slug}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1.5 text-cerulean hover:text-cerulean-light"
                    >
                      <Eye className="h-4 w-4" />
                      Details
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
