"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { NicheConfig, SiteConfig } from "@/types";

interface FaqProps {
  niche: NicheConfig;
  site: SiteConfig;
}

export default function Faq({ niche, site }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-28 bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-semibold text-cerulean tracking-wide uppercase mb-3">
            FAQ
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Common Questions About{" "}
            <span className="text-cerulean">{niche.name}</span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg">
            in {site.suburb}, {site.city}
          </p>
        </div>

        {/* FAQ accordion */}
        <div className="space-y-3">
          {niche.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? "bg-white border-cerulean/20 shadow-md shadow-cerulean/5"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-5 md:p-6 text-left"
                >
                  <h3
                    className={`font-display text-base md:text-lg font-semibold pr-4 transition-colors ${
                      isOpen ? "text-cerulean" : "text-slate-900"
                    }`}
                  >
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "rotate-180 text-cerulean"
                        : "text-slate-400"
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="px-5 md:px-6 pb-5 md:pb-6 text-slate-500 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
