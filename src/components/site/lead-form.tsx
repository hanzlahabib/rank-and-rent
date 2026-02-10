"use client";

import { useState } from "react";
import { Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import type { NicheConfig, SiteConfig } from "@/types";

interface LeadFormProps {
  niche: NicheConfig;
  site: SiteConfig;
}

export default function LeadForm({ niche, site }: LeadFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  function updateField(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          siteId: site.id,
          source: "form",
        }),
      });

      if (response.ok) {
        setIsComplete(true);
        toast.success("Request submitted! We will contact you shortly.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isComplete) {
    return (
      <section id="quote" className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <div className="reveal rounded-2xl bg-emerald-trust/5 border border-emerald-trust/20 p-12">
            <CheckCircle2 className="h-16 w-16 text-emerald-trust mx-auto mb-6" />
            <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">
              Request Received!
            </h3>
            <p className="text-slate-500 text-lg">
              We will get back to you within 30 minutes during business hours.
              For immediate assistance, call{" "}
              <span className="font-semibold text-cerulean">{site.phone}</span>.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Text */}
          <div>
            <span className="inline-block text-sm font-semibold text-cerulean tracking-wide uppercase mb-3">
              Free Estimate
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-6">
              Get Your Free{" "}
              <span className="text-cerulean">{niche.shortName}</span> Quote
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              Fill out the form and we will get back to you within 30 minutes.
              No obligation, no pressure.
            </p>

            {/* Trust elements */}
            <div className="space-y-4">
              {niche.trustSignals.map((signal) => (
                <div key={signal} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-emerald-trust/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-emerald-trust" />
                  </div>
                  <span className="text-slate-600 font-medium">{signal}</span>
                </div>
              ))}
            </div>

            {/* Phone CTA */}
            <div className="mt-10 p-6 rounded-xl bg-navy text-white">
              <p className="text-sm text-slate-400 mb-2">Prefer to call?</p>
              <div className="flex items-center gap-3">
                <Phone className="h-6 w-6 text-amber-warm" />
                <span className="font-display text-2xl font-bold">
                  {site.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 p-8 md:p-10">
            {/* Step indicators */}
            <div className="flex items-center gap-3 mb-8">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      step >= s
                        ? "bg-cerulean text-white"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {s}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      step >= s ? "text-slate-800" : "text-slate-400"
                    }`}
                  >
                    {s === 1 ? "Your Info" : "Details"}
                  </span>
                  {s === 1 && (
                    <div className="w-12 h-[2px] bg-slate-200 mx-1">
                      <div
                        className={`h-full bg-cerulean transition-all duration-500 ${
                          step >= 2 ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <Label htmlFor="name" className="text-slate-700 font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="mt-2 h-12 rounded-xl border-slate-200 focus:border-cerulean"
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="email"
                      className="text-slate-700 font-medium"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="mt-2 h-12 rounded-xl border-slate-200 focus:border-cerulean"
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="phone"
                      className="text-slate-700 font-medium"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="mt-2 h-12 rounded-xl border-slate-200 focus:border-cerulean"
                      required
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full h-12 bg-cerulean hover:bg-cerulean-light text-white font-semibold rounded-xl text-base gap-2"
                    disabled={!formData.name || !formData.email || !formData.phone}
                  >
                    Continue
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <Label
                      htmlFor="service"
                      className="text-slate-700 font-medium"
                    >
                      Service Needed
                    </Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => updateField("service", value)}
                    >
                      <SelectTrigger className="mt-2 h-12 rounded-xl border-slate-200">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {niche.services.map((service) => (
                          <SelectItem key={service.slug} value={service.slug}>
                            {service.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label
                      htmlFor="message"
                      className="text-slate-700 font-medium"
                    >
                      Tell us about your project
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Describe what you need help with..."
                      value={formData.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      className="mt-2 rounded-xl border-slate-200 focus:border-cerulean min-h-[120px]"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="h-12 rounded-xl px-6 font-semibold text-slate-700 border-slate-300"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 h-12 cta-pulse bg-cerulean hover:bg-cerulean-light text-white font-semibold rounded-xl text-base"
                    >
                      {isSubmitting ? "Sending..." : niche.ctaText}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
