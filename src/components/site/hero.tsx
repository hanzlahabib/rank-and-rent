import { Phone, ShieldCheck, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { NicheConfig, SiteConfig } from "@/types";

interface HeroProps {
  niche: NicheConfig;
  site: SiteConfig;
}

export default function Hero({ niche, site }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy hero-clip">
      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid" />

      {/* Gradient mesh background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-cerulean/10 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-cerulean-light/8 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-32 md:pt-28 md:pb-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text */}
          <div>
            {/* Trust badge */}
            <div className="reveal inline-flex items-center gap-2 rounded-full glass-card px-4 py-2 mb-8">
              <ShieldCheck className="h-4 w-4 text-emerald-trust" />
              <span className="text-sm font-medium text-slate-200">
                {niche.trustSignals[0]}
              </span>
            </div>

            <h1 className="reveal reveal-delay-1 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08]">
              <span className="text-gradient">{niche.heroTitle}</span>
              <br />
              <span className="text-cerulean-light">
                in {site.suburb}, {site.city}
              </span>
            </h1>

            <p className="reveal reveal-delay-2 mt-6 text-lg text-slate-400 leading-relaxed max-w-xl">
              {niche.heroSubtitle}
            </p>

            {/* CTA Buttons */}
            <div className="reveal reveal-delay-3 mt-10 flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="cta-pulse bg-cerulean hover:bg-cerulean-light text-white font-semibold text-base px-8 py-6 rounded-xl shadow-lg shadow-cerulean/25 transition-all duration-300 hover:shadow-xl hover:shadow-cerulean/30"
              >
                {niche.ctaText}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-slate-600 text-white hover:bg-navy-light font-semibold text-base px-8 py-6 rounded-xl gap-2"
              >
                <Phone className="h-5 w-5 text-amber-warm" />
                {site.phone}
              </Button>
            </div>

            {/* Micro trust signals row */}
            <div className="reveal reveal-delay-4 mt-10 flex flex-wrap gap-6">
              {niche.trustSignals.slice(1, 4).map((signal) => (
                <div key={signal} className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-warm fill-amber-warm" />
                  <span className="text-sm text-slate-400">{signal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Floating card */}
          <div className="reveal reveal-delay-3 hidden lg:block">
            <div className="relative">
              {/* Main glass card */}
              <div className="glass-card rounded-2xl p-8 trust-shimmer">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-cerulean/20 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-cerulean-light" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">
                      {niche.ctaPhoneText}
                    </p>
                    <p className="text-slate-400 text-sm">
                      Available 7 days a week
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  {niche.services.slice(0, 3).map((service) => (
                    <div
                      key={service.slug}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/8 transition-colors"
                    >
                      <div className="h-8 w-8 rounded-lg bg-cerulean/15 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="h-4 w-4 text-cerulean-light" />
                      </div>
                      <span className="text-sm text-slate-200 font-medium">
                        {service.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating stat badge */}
              <div className="absolute -top-4 -right-4 glass-card rounded-xl px-5 py-3 flex items-center gap-2">
                <Clock className="h-5 w-5 text-emerald-trust" />
                <div>
                  <p className="text-white font-bold text-sm stat-number">
                    24/7
                  </p>
                  <p className="text-slate-400 text-xs">Response</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
