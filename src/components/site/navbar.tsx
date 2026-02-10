"use client";

import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { NicheConfig, SiteConfig } from "@/types";

interface NavbarProps {
  niche: NicheConfig;
  site: SiteConfig;
}

export default function Navbar({ niche, site }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Blog", href: `/${site.slug}/blog` },
    { label: "About", href: `/${site.slug}/about` },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#quote" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/90 backdrop-blur-lg border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-cerulean flex items-center justify-center">
              <span className="font-display font-bold text-white text-sm">
                {site.businessName.charAt(0)}
              </span>
            </div>
            <span className="font-display text-lg font-bold text-white hidden sm:block">
              {site.businessName}
            </span>
          </a>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${site.phone}`}
              className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="h-4 w-4 text-amber-warm" />
              {site.phone}
            </a>
            <Button
              size="sm"
              className="bg-cerulean hover:bg-cerulean-light text-white font-semibold rounded-lg px-5"
              asChild
            >
              <a href="#quote">{niche.ctaText}</a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-navy border-t border-white/5">
          <div className="px-4 py-4 space-y-2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-white/5 space-y-3">
              <a
                href={`tel:${site.phone}`}
                className="flex items-center gap-2 px-4 text-sm font-medium text-amber-warm"
              >
                <Phone className="h-4 w-4" />
                {site.phone}
              </a>
              <Button
                className="w-full bg-cerulean hover:bg-cerulean-light text-white font-semibold rounded-lg"
                asChild
              >
                <a href="#quote">{niche.ctaText}</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
