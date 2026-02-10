import Link from "next/link";
import {
  Zap,
  Lightbulb,
  Droplets,
  Sparkles,
  Trash2,
  ArrowRight,
  Globe,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const niches = [
  {
    name: "EV Charger Installation",
    slug: "henderson-ev-charger",
    location: "Henderson, NV",
    icon: Zap,
    score: 95,
    cpc: "$30-50+",
    revenue: "$3K-8K/mo",
    live: true,
  },
  {
    name: "Smart Home Installation",
    slug: "henderson-ev-charger",
    location: "Coming Soon",
    icon: Lightbulb,
    score: 90,
    cpc: "$25-40",
    revenue: "$3K-8K/mo",
    live: false,
  },
  {
    name: "Water Damage Restoration",
    slug: "henderson-ev-charger",
    location: "Coming Soon",
    icon: Droplets,
    score: 88,
    cpc: "$31+",
    revenue: "$2K-6K/mo",
    live: false,
  },
  {
    name: "Pressure Washing",
    slug: "henderson-ev-charger",
    location: "Coming Soon",
    icon: Sparkles,
    score: 82,
    cpc: "$8-15",
    revenue: "$1K-3K/mo",
    live: false,
  },
  {
    name: "Junk Removal",
    slug: "henderson-ev-charger",
    location: "Coming Soon",
    icon: Trash2,
    score: 80,
    cpc: "$15-25",
    revenue: "$1.5K-4K/mo",
    live: false,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-navy hero-clip overflow-hidden">
        <div className="absolute inset-0 dot-grid" />
        <div className="absolute top-20 right-20 w-[500px] h-[500px] rounded-full bg-cerulean/10 blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-[300px] h-[300px] rounded-full bg-cerulean-light/8 blur-[80px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-36 md:pt-32 md:pb-44">
          <div className="text-center max-w-4xl mx-auto">
            <div className="reveal inline-flex items-center gap-2 rounded-full glass-card px-4 py-2 mb-8">
              <Globe className="h-4 w-4 text-cerulean-light" />
              <span className="text-sm font-medium text-slate-300">
                Rank & Rent Digital Real Estate
              </span>
            </div>

            <h1 className="reveal reveal-delay-1 font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
              <span className="text-gradient">Build Local</span>
              <br />
              <span className="text-cerulean-light">Lead Machines</span>
            </h1>

            <p className="reveal reveal-delay-2 mt-6 text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Generate hyper-local service websites that rank on Google and
              capture leads. Rent the lead flow to service providers.
            </p>

            <div className="reveal reveal-delay-3 mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="cta-pulse bg-cerulean hover:bg-cerulean-light text-white font-semibold text-base px-8 py-6 rounded-xl shadow-lg shadow-cerulean/25"
                asChild
              >
                <Link href="/dashboard">
                  Open Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-slate-600 text-white hover:bg-navy-light font-semibold text-base px-8 py-6 rounded-xl"
                asChild
              >
                <Link href="/henderson-ev-charger">View Demo Site</Link>
              </Button>
            </div>

            {/* Stats row */}
            <div className="reveal reveal-delay-4 mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-white stat-number">
                  5
                </p>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">
                  Niches
                </p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-white stat-number">
                  $8K
                </p>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">
                  Max Revenue
                </p>
              </div>
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-white stat-number">
                  &lt;20
                </p>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">
                  KD Score
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Niche Cards */}
      <section className="py-20 md:py-28 bg-slate-50 -mt-16 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-sm font-semibold text-cerulean tracking-wide uppercase mb-3">
              Proven Niches
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Top 5 Easiest Niches to Rank
            </h2>
            <p className="mt-4 text-slate-500 text-lg">
              Data-backed niche selection from keyword difficulty, CPC, and
              revenue potential analysis.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {niches.map((niche, index) => {
              const cardClass = `reveal reveal-delay-${index + 1} group relative rounded-2xl bg-white p-7 border border-slate-100 transition-all duration-500 ${
                niche.live
                  ? "hover:shadow-xl hover:border-cerulean/20 hover:-translate-y-1 cursor-pointer"
                  : "opacity-70"
              }`;
              const cardContent = (
                <>
                  {/* Score badge */}
                  <div className="absolute top-5 right-5">
                    {niche.live ? (
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-trust/10 text-emerald-trust text-xs font-bold">
                        <TrendingUp className="h-3 w-3" />
                        {niche.score}/100
                      </div>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-400 text-xs font-bold">
                        {niche.location}
                      </span>
                    )}
                  </div>

                  {/* Icon */}
                  <div className="h-14 w-14 rounded-xl bg-cerulean/8 group-hover:bg-cerulean/15 flex items-center justify-center mb-5 transition-colors duration-300">
                    <niche.icon className="h-7 w-7 text-cerulean" />
                  </div>

                  <h3 className="font-display text-lg font-bold text-slate-900 mb-4 group-hover:text-cerulean transition-colors">
                    {niche.name}
                  </h3>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="h-4 w-4 text-amber-warm" />
                      <span className="text-slate-500">
                        CPC:{" "}
                        <span className="font-semibold text-slate-700">
                          {niche.cpc}
                        </span>
                      </span>
                    </div>
                    <div className="text-slate-300">|</div>
                    <span className="text-slate-500">
                      <span className="font-semibold text-slate-700">
                        {niche.revenue}
                      </span>
                    </span>
                  </div>

                  {/* Hover accent */}
                  {niche.live && (
                    <div className="absolute bottom-0 left-6 right-6 h-[3px] rounded-t-full bg-cerulean scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  )}
                </>
              );
              return niche.live ? (
                <Link
                  key={`${niche.name}-${index}`}
                  href={`/${niche.slug}`}
                  className={cardClass}
                >
                  {cardContent}
                </Link>
              ) : (
                <div
                  key={`${niche.name}-${index}`}
                  className={cardClass}
                >
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy py-12 text-center">
        <p className="text-sm text-slate-500">
          Rank & Rent Platform &mdash; Built with BMAD Method
        </p>
      </footer>
    </div>
  );
}
