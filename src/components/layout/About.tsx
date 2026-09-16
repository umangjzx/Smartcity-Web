"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Building2, Calendar, Fingerprint } from "lucide-react";

const timeline = [
  {
    year: "2021",
    title: "Charter Year",
    description: "Established on 17 May 2021 with a founding vision to develop young leaders.",
    featured: false,
  },
  {
    year: "2022",
    title: "Growth Phase",
    description: "Expanded membership and laid the foundation for long-term community projects.",
    featured: false,
  },
  {
    year: "2023",
    title: "Community Expansion",
    description: "Launched multi-district initiatives impacting thousands of lives across Coimbatore.",
    featured: false,
  },
  {
    year: "2024",
    title: "Leadership Excellence",
    description: "Focused on professional growth and skill enhancement for all members.",
    featured: false,
  },
  {
    year: "2025",
    title: "International Recognition",
    description: "Achieved global recognition for outstanding sustainable community service.",
    featured: false,
  },
  {
    year: "2026",
    title: "DHRUVAM — The Star That Guides",
    description: "Entering the 2026–27 year guided by direction, unity, wisdom, courage and gratitude.",
    featured: true,
  },
];

const values = [
  "Fellowship & Brotherhood",
  "Leadership Development",
  "Community Service",
  "Professional Excellence",
];

const infoCards = [
  {
    label: "Established",
    value: "17 May 2021",
    icon: Calendar,
    accent: "var(--color-dhruvam-gold-light)",
    borderColor: "rgba(255,214,90,0.4)",
    glowColor: "rgba(255,214,90,0.1)",
  },
  {
    label: "Club ID",
    value: "8823645",
    icon: Fingerprint,
    accent: "var(--color-aurora-cyan)",
    borderColor: "rgba(77,217,227,0.4)",
    glowColor: "rgba(77,217,227,0.1)",
  },
  {
    label: "Sponsored By",
    value: "Rotary Club of Coimbatore Smartcity",
    icon: Building2,
    accent: "var(--color-aurora-emerald)",
    borderColor: "rgba(62,203,146,0.4)",
    glowColor: "rgba(62,203,146,0.1)",
  },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="mb-12 md:mb-20">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-[var(--color-dhruvam-gold-light)]/60" />
            <span className="font-inter text-[var(--color-dhruvam-gold-light)] text-xs font-semibold tracking-[0.2em] uppercase">
              Our Story
            </span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-montserrat font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight"
          >
            A Legacy of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-dhruvam-gold-light)] to-[var(--color-dhruvam-gold-deep)]">
              Excellence
            </span>
            <br className="hidden md:block" /> Since 2021
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-start">
          {/* ── LEFT: Club info ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Ghost watermark */}
            <div className="relative">
              <span
                className="absolute -top-8 -left-4 font-montserrat font-black text-[8rem] leading-none text-white/[0.025] select-none pointer-events-none"
                aria-hidden="true"
              >
                2021
              </span>

              <p className="relative font-inter text-white/60 text-base md:text-lg leading-relaxed mb-10">
                We are a vibrant community of young professionals and students dedicated to making a positive impact in Coimbatore and beyond. Through leadership, service, and innovation, we strive to transform our community while building lifelong skills.
              </p>
            </div>

            {/* Values — using four-point stars from the design system */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {values.map((v, i) => (
                <motion.div
                  key={v}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:border-[var(--color-dhruvam-gold-light)]/25 transition-colors group"
                >
                  <img
                    src="/assets/dhruvam/decorations/stars-four-point.svg"
                    alt=""
                    aria-hidden="true"
                    className="w-4 h-4 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="font-inter text-sm font-medium text-white/80">{v}</span>
                </motion.div>
              ))}
            </div>

            {/* Info cards — accent left border */}
            <div className="space-y-4">
              {infoCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="relative flex items-center gap-4 p-5 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/[0.07] transition-all overflow-hidden group"
                  >
                    {/* Colored left accent bar */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl opacity-60 group-hover:opacity-100 transition-opacity"
                      style={{ background: card.accent }}
                    />
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: card.glowColor, border: `1px solid ${card.borderColor}` }}
                    >
                      <Icon size={20} style={{ color: card.accent }} />
                    </div>
                    <div>
                      <p className="font-inter text-xs text-white/40 uppercase tracking-wider mb-0.5">
                        {card.label}
                      </p>
                      <p className="font-poppins font-semibold text-white text-sm leading-snug">
                        {card.value}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* ── RIGHT: Timeline ── */}
          <div className="relative">
            {/* Ghost text behind timeline */}
            <span
              className="absolute -top-4 -right-2 lg:-right-6 font-montserrat font-black text-[5rem] lg:text-[7rem] leading-none text-white/[0.03] select-none pointer-events-none whitespace-nowrap"
              aria-hidden="true"
            >
              JOURNEY
            </span>

            {/* Decorative Penguin Lantern */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="absolute -top-16 -right-4 lg:-right-12 z-0 w-32 lg:w-40 opacity-65 pointer-events-none mix-blend-screen hidden sm:block section-float"
            >
              <img
                src="/assets/dhruvam/characters/penguin-lantern.jpg"
                alt=""
                aria-hidden="true"
                className="w-full h-auto drop-shadow-2xl rounded-3xl"
                style={{
                  maskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)",
                  WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)",
                }}
              />
            </motion.div>

            {/* Background timeline line */}
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-white/8 z-0" />
            {/* Scroll-driven foreground line */}
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-[19px] top-2 w-px bg-gradient-to-b from-[var(--color-dhruvam-gold-light)] via-[var(--color-aurora-teal)] to-transparent z-10 origin-top"
            />

            <div ref={containerRef} className="flex flex-col gap-5 relative z-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative pl-14 group"
                >
                  {/* Node — larger + gold glow for DHRUVAM entry */}
                  <div className={`absolute left-[6px] top-1 z-20 ${item.featured ? "w-8 h-8 -left-[1px]" : "w-6 h-6"}`}>
                    {item.featured ? (
                      <>
                        {/* Glow ring for the special 2026 entry */}
                        <div className="absolute inset-0 rounded-full dhruvam-glow-ring border border-[var(--color-dhruvam-gold-light)]/40" />
                        <img
                          src="/assets/dhruvam/effects/guiding-star.svg"
                          alt=""
                          aria-hidden="true"
                          className="w-full h-full drop-shadow-[0_0_12px_rgba(246,181,27,0.8)]"
                        />
                      </>
                    ) : (
                      <img
                        src="/assets/dhruvam/decorations/stars-four-point.svg"
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full opacity-40 group-hover:opacity-90 group-hover:scale-125 transition-all duration-300 drop-shadow-[0_0_6px_rgba(246,181,27,0.4)]"
                      />
                    )}
                  </div>

                  {/* Card — featured DHRUVAM 2026 gets special treatment */}
                  <div
                    className={`rounded-2xl px-5 py-4 backdrop-blur-sm transition-all duration-300 ${
                      item.featured
                        ? "bg-gradient-to-br from-[rgba(246,181,27,0.08)] to-[rgba(255,214,90,0.03)] border border-[var(--color-dhruvam-gold-light)]/40 shadow-[0_4px_24px_rgba(246,181,27,0.12)]"
                        : "bg-white/5 border border-white/10 group-hover:border-[var(--color-dhruvam-gold-light)]/30"
                    }`}
                  >
                    <div className="flex items-baseline gap-3 mb-1">
                      <span
                        className={`font-montserrat font-black text-xl ${
                          item.featured ? "text-[var(--color-dhruvam-gold-light)]" : "text-[var(--color-dhruvam-gold-light)]"
                        }`}
                      >
                        {item.year}
                      </span>
                      <span
                        className={`font-poppins font-semibold text-sm ${
                          item.featured ? "text-[var(--color-dhruvam-gold-light)]/90" : "text-white"
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>
                    <p className="font-inter text-sm text-white/50 leading-relaxed">
                      {item.description}
                    </p>
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
