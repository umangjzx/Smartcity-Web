"use client";

import { motion } from "framer-motion";
import { Building2, Calendar, Fingerprint, CheckCircle2 } from "lucide-react";

const timeline = [
  { year: "2021", title: "Charter Year", description: "Established on 17 May 2021 with a founding vision to develop young leaders." },
  { year: "2022", title: "Growth Phase", description: "Expanded membership and laid the foundation for long-term community projects." },
  { year: "2023", title: "Community Expansion", description: "Launched multi-district initiatives impacting thousands of lives across Coimbatore." },
  { year: "2024", title: "Leadership Excellence", description: "Focused on professional growth and skill enhancement for all members." },
  { year: "2025", title: "International Recognition", description: "Achieved global recognition for outstanding sustainable community service." },
  { year: "2026", title: "New Horizons", description: "Pioneering the future of Rotaract with digital innovation and global reach." },
];

const values = [
  "Fellowship & Brotherhood",
  "Leadership Development",
  "Community Service",
  "Professional Excellence",
];

export default function About() {
  return (
    <section id="about" className="py-12 md:py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-50">
        <div className="absolute top-20 right-0 w-96 h-96 bg-[var(--color-rotaract-red)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-[var(--color-rotary-gold)]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">

        {/* Section header */}
        <div className="mb-10 sm:mb-14 md:mb-20">
          <div className="flex items-center gap-3 mb-2 sm:mb-4">
            <div className="h-px w-8 sm:w-10 bg-[var(--color-rotaract-red)]" />
            <span className="font-inter text-[var(--color-rotaract-red)] text-xs font-semibold tracking-[0.2em] uppercase">Our Story</span>
          </div>
          <h2 className="font-montserrat font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[var(--color-charcoal)] max-w-xl leading-tight">
            A Legacy of <span className="text-[var(--color-rotaract-red)]">Excellence</span> Since 2021
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-start">

          {/* Left — club info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="font-inter text-[var(--color-warm-gray)] text-lg leading-relaxed mb-10">
              We are a vibrant community of young professionals and students dedicated to making a positive impact in Coimbatore and beyond. Through leadership, service, and innovation, we strive to transform our community while building lifelong skills.
            </p>

            {/* Values */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {values.map((v) => (
                <div key={v} className="flex items-center gap-2.5 bg-[var(--color-cream)] rounded-xl px-4 py-3">
                  <CheckCircle2 size={16} className="text-[var(--color-rotaract-red)] shrink-0" />
                  <span className="font-inter text-sm font-medium text-[var(--color-charcoal)]">{v}</span>
                </div>
              ))}
            </div>

            {/* Club details cards */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-5 border border-[var(--border)] rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-[var(--color-rotary-gold)]/10 flex items-center justify-center shrink-0">
                  <Calendar size={20} className="text-[var(--color-rotary-gold)]" />
                </div>
                <div>
                  <p className="font-inter text-xs text-[var(--color-warm-gray)] uppercase tracking-wider mb-0.5">Established</p>
                  <p className="font-poppins font-semibold text-[var(--color-charcoal)]">17 May 2021</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 border border-[var(--border)] rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-[var(--color-rotaract-red)]/10 flex items-center justify-center shrink-0">
                  <Fingerprint size={20} className="text-[var(--color-rotaract-red)]" />
                </div>
                <div>
                  <p className="font-inter text-xs text-[var(--color-warm-gray)] uppercase tracking-wider mb-0.5">Club ID</p>
                  <p className="font-poppins font-semibold text-[var(--color-charcoal)]">8823645</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 border border-[var(--border)] rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-[var(--color-royal-blue)]/10 flex items-center justify-center shrink-0">
                  <Building2 size={20} className="text-[var(--color-royal-blue)]" />
                </div>
                <div>
                  <p className="font-inter text-xs text-[var(--color-warm-gray)] uppercase tracking-wider mb-0.5">Sponsored By</p>
                  <p className="font-poppins font-semibold text-[var(--color-charcoal)]">Rotary Club of Coimbatore Smartcity</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — timeline */}
          <div className="relative">
            <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-[var(--color-rotaract-red)] via-[var(--color-rotary-gold)] to-transparent" />

            <div className="flex flex-col gap-6">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative pl-14 group"
                >
                  {/* Dot */}
                  <div className="absolute left-[14px] top-2 w-3 h-3 rounded-full bg-white border-2 border-[var(--color-rotaract-red)] group-hover:bg-[var(--color-rotaract-red)] transition-colors shadow-sm" />

                  <div className="bg-white border border-[var(--border)] rounded-2xl px-5 py-4 shadow-sm group-hover:shadow-md group-hover:border-[var(--color-rotary-gold)]/40 transition-all">
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="font-montserrat font-black text-xl text-[var(--color-rotaract-red)]">{item.year}</span>
                      <span className="font-poppins font-semibold text-sm text-[var(--color-charcoal)]">{item.title}</span>
                    </div>
                    <p className="font-inter text-sm text-[var(--color-warm-gray)] leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
