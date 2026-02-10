import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import type { NicheConfig, SiteConfig } from "@/types";

interface FooterProps {
  niche: NicheConfig;
  site: SiteConfig;
}

export default function Footer({ niche, site }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-display text-xl font-bold text-white mb-4">
              {site.businessName}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Professional {niche.name.toLowerCase()} services in{" "}
              {site.suburb}, {site.city}, {site.state}. Licensed, insured, and
              committed to quality.
            </p>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-trust animate-pulse" />
              <span className="text-sm text-emerald-trust font-medium">
                Available Now
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {niche.services.map((service) => (
                <li key={service.slug}>
                  <a
                    href={`/services/${service.slug}`}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${site.slug}/about`}
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href={`/${site.slug}/blog`}
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#quote"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Get a Quote
                </a>
              </li>
              <li>
                <Link
                  href={`/${site.slug}/about#service-areas`}
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Service Areas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-4">
              Contact Us
            </h4>
            <div className="space-y-4">
              <a
                href={`tel:${site.phone}`}
                className="flex items-center gap-3 group"
              >
                <div className="h-9 w-9 rounded-lg bg-cerulean/15 flex items-center justify-center group-hover:bg-cerulean/25 transition-colors">
                  <Phone className="h-4 w-4 text-cerulean-light" />
                </div>
                <span className="text-sm font-medium text-white">
                  {site.phone}
                </span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 group"
              >
                <div className="h-9 w-9 rounded-lg bg-cerulean/15 flex items-center justify-center group-hover:bg-cerulean/25 transition-colors">
                  <Mail className="h-4 w-4 text-cerulean-light" />
                </div>
                <span className="text-sm font-medium text-slate-300">
                  {site.email}
                </span>
              </a>
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-cerulean/15 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4 text-cerulean-light" />
                </div>
                <span className="text-sm text-slate-400">
                  Serving {site.suburb}, {site.city}, {site.state} {site.zipCode}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} {site.businessName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
