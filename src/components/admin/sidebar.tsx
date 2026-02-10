"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Globe,
  Inbox,
  FileText,
  Settings,
  ChevronLeft,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllSites, getActiveSites } from "@/config/sites";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Sites",
    href: "/sites",
    icon: Globe,
  },
  {
    label: "Leads",
    href: "/leads",
    icon: Inbox,
  },
  {
    label: "Blog Posts",
    href: "/blog-posts",
    icon: FileText,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const activeSiteCount = getActiveSites().length;
  const totalSiteCount = getAllSites().length;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-navy flex flex-col border-r border-slate-800 transition-all duration-300 z-50",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* Logo area */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-800">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-9 w-9 rounded-xl bg-cerulean flex items-center justify-center flex-shrink-0">
            <Zap className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <span className="font-display text-lg font-bold text-white truncate">
              RankRent
            </span>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform",
              collapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-cerulean/15 text-cerulean-light sidebar-active"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive && "text-cerulean-light")} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-3 border-t border-slate-800">
        {!collapsed && (
          <div className="rounded-xl bg-cerulean/8 border border-cerulean/15 p-4">
            <p className="text-xs font-semibold text-cerulean-light mb-1">
              Active Sites
            </p>
            <p className="text-2xl font-display font-bold text-white stat-number">
              {activeSiteCount}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              of {totalSiteCount} total
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
