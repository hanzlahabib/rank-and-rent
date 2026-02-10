import {
  Globe,
  FileText,
  MapPin,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllSites, getActiveSites } from "@/config/sites";
import { blogPosts } from "@/config/blog-posts";
import { hendersonAreas } from "@/config/areas";
import { evChargerConfig } from "@/config/niches/ev-charger";

interface StatCardData {
  label: string;
  value: string;
  sublabel: string;
  icon: typeof Globe;
  color: string;
}

function getStats(): StatCardData[] {
  const allSites = getAllSites();
  const activeSites = getActiveSites();

  return [
    {
      label: "Total Sites",
      value: String(allSites.length),
      sublabel: `${activeSites.length} active`,
      icon: Globe,
      color: "bg-cerulean/10 text-cerulean",
    },
    {
      label: "Blog Posts",
      value: String(blogPosts.length),
      sublabel: `${blogPosts.length} published`,
      icon: FileText,
      color: "bg-emerald-trust/10 text-emerald-trust",
    },
    {
      label: "Area Pages",
      value: String(hendersonAreas.length),
      sublabel: `${hendersonAreas.reduce((acc, a) => acc + a.zipCodes.length, 0)} zip codes covered`,
      icon: MapPin,
      color: "bg-amber-warm/10 text-amber-warm",
    },
    {
      label: "Services Listed",
      value: String(evChargerConfig.services.length),
      sublabel: `${evChargerConfig.keywords.length} target keywords`,
      icon: Wrench,
      color: "bg-violet-500/10 text-violet-500",
    },
  ];
}

export default function StatsCards() {
  const stats = getStats();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group rounded-2xl bg-white border border-slate-100 p-6 hover:shadow-lg hover:border-slate-200 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div
              className={cn(
                "h-11 w-11 rounded-xl flex items-center justify-center",
                stat.color
              )}
            >
              <stat.icon className="h-5 w-5" />
            </div>
          </div>
          <p className="font-display text-3xl font-bold text-slate-900 stat-number">
            {stat.value}
          </p>
          <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
          <p className="text-xs text-slate-400 mt-0.5">{stat.sublabel}</p>
        </div>
      ))}
    </div>
  );
}
