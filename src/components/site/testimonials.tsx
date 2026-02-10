import { Star, Quote } from "lucide-react";
import type { NicheConfig, SiteConfig } from "@/types";

interface TestimonialsProps {
  niche: NicheConfig;
  site: SiteConfig;
}

const TESTIMONIAL_TEMPLATES = [
  {
    name: "Sarah M.",
    role: "Homeowner",
    text: "Incredible service from start to finish. They were professional, on time, and the quality of work exceeded my expectations. Highly recommend to anyone in {suburb}!",
    rating: 5,
  },
  {
    name: "Mike T.",
    role: "Business Owner",
    text: "I compared multiple companies in {city} and these guys were by far the best value. Fast response, fair pricing, and excellent workmanship.",
    rating: 5,
  },
  {
    name: "Jennifer L.",
    role: "Homeowner",
    text: "Called them for an estimate and they came out the same day. The team was respectful of our property and explained everything clearly. Will use again!",
    rating: 5,
  },
];

export default function Testimonials({ niche, site }: TestimonialsProps) {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-sm font-semibold text-cerulean tracking-wide uppercase mb-3">
            Testimonials
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 text-amber-warm fill-amber-warm"
                />
              ))}
            </div>
            <span className="text-slate-500 font-medium">
              4.9/5 from 100+ reviews
            </span>
          </div>
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIAL_TEMPLATES.map((testimonial, index) => (
            <div
              key={index}
              className={`reveal reveal-delay-${index + 1} group relative rounded-2xl border border-slate-100 bg-white p-7 hover:shadow-lg hover:border-cerulean/15 transition-all duration-500`}
            >
              {/* Quote icon */}
              <Quote className="h-8 w-8 text-cerulean/15 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-amber-warm fill-amber-warm"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-slate-600 leading-relaxed mb-6">
                {testimonial.text
                  .replace("{suburb}", site.suburb)
                  .replace("{city}", site.city)}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-cerulean/10 flex items-center justify-center">
                  <span className="font-display font-bold text-cerulean text-sm">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-slate-400 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
