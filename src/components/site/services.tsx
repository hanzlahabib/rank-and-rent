import {
  Zap,
  Battery,
  Building2,
  Settings,
  Lightbulb,
  Thermometer,
  Shield,
  Smartphone,
  Droplets,
  Wind,
  Bug,
  Hammer,
  Home,
  Car,
  Fence,
  Trash2,
  HardHat,
  Package,
} from "lucide-react";
import type { NicheConfig, SiteConfig } from "@/types";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Battery,
  Building2,
  Settings,
  Lightbulb,
  Thermometer,
  Shield,
  Smartphone,
  Droplets,
  Wind,
  Bug,
  Hammer,
  Home,
  Car,
  Fence,
  Trash2,
  HardHat,
  Package,
};

interface ServicesProps {
  niche: NicheConfig;
  site: SiteConfig;
}

export default function Services({ niche, site }: ServicesProps) {
  return (
    <section className="relative py-20 md:py-28 bg-slate-50">
      {/* Subtle angle connector from hero */}
      <div className="absolute top-0 left-0 right-0 h-16 -mt-16 bg-slate-50" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-cerulean tracking-wide uppercase mb-3">
            Our Services
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {niche.name} Services in{" "}
            <span className="text-cerulean">
              {site.suburb}, {site.city}
            </span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg leading-relaxed">
            {niche.description}
          </p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {niche.services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Zap;
            return (
              <div
                key={service.slug}
                className={`reveal reveal-delay-${index + 1} group relative rounded-2xl bg-white p-7 shadow-sm border border-slate-100 hover:shadow-lg hover:border-cerulean/20 transition-all duration-500 hover:-translate-y-1`}
              >
                {/* Icon container */}
                <div className="h-14 w-14 rounded-xl bg-cerulean/8 group-hover:bg-cerulean/15 flex items-center justify-center mb-5 transition-colors duration-300">
                  <IconComponent className="h-7 w-7 text-cerulean group-hover:text-cerulean-light transition-colors" />
                </div>

                <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Hover accent bar */}
                <div className="absolute bottom-0 left-6 right-6 h-[3px] rounded-t-full bg-cerulean scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
