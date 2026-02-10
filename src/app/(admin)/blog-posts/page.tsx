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
import { ExternalLink } from "lucide-react";
import { blogPosts } from "@/config/blog-posts";
import { hendersonEvConfig } from "@/config/sites";
import BlogPostsExport from "@/components/admin/blog-posts-export";

export default function BlogPostsPage() {
  const site = hendersonEvConfig;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900 tracking-tight">
            Blog Posts
          </h1>
          <p className="text-slate-500 mt-1">
            {blogPosts.length} articles published for {site.businessName}
          </p>
        </div>
        <BlogPostsExport />
      </div>

      <div className="rounded-2xl bg-white border border-slate-100 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-slate-100">
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-6">
                Title
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Category
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Author
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Date
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Read Time
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Tags
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-400 text-right pr-6">
                View
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogPosts.map((post) => (
              <TableRow
                key={post.slug}
                className="hover:bg-slate-50/50 border-slate-100"
              >
                <TableCell className="pl-6 max-w-[300px]">
                  <p className="font-semibold text-slate-900 text-sm truncate">
                    {post.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">
                    {post.metaDescription}
                  </p>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="font-medium rounded-full text-xs bg-cerulean/10 text-cerulean border-cerulean/20"
                  >
                    {post.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-slate-600">{post.author}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-slate-600">
                    {post.publishDate}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-slate-600">
                    {post.readTime}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="text-[10px] text-slate-400">
                        +{post.tags.length - 2}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right pr-6">
                  <Link
                    href={`/${site.slug}/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs text-cerulean hover:text-cerulean-light"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
