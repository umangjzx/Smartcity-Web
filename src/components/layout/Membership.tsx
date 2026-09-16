"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const benefits = [
  {
    number: "01",
    title: "Lead & Grow",
    desc: "Take charge of projects, events, and teams from day one. Build confidence that stays with you forever.",
    accent: "var(--color-dhruvam-gold-light)",
    accentBg: "rgba(255,214,90,0.08)",
    icon: "/assets/dhruvam/icons/filled/team.svg",
  },
  {
    number: "02",
    title: "Serve & Impact",
    desc: "Create real, measurable change in Coimbatore through community service and professional outreach.",
    accent: "var(--color-aurora-teal)",
    accentBg: "rgba(47,191,166,0.08)",
    icon: "/assets/dhruvam/icons/filled/community.svg",
  },
  {
    number: "03",
    title: "Connect & Belong",
    desc: "Join a global fellowship of 1 million+ Rotaractors. Build a network that opens doors worldwide.",
    accent: "var(--color-aurora-blue)",
    accentBg: "rgba(74,127,217,0.08)",
    icon: "/assets/dhruvam/icons/outline/global.svg",
  },
];

const marqueeText = "LEAD · SERVE · GROW · CONNECT · DHRUVAM · THE STAR THAT GUIDES · ";

export default function Membership() {
  return (
    <section id="join" className="pt-24 md:pt-32 relative overflow-hidden">
      {/* Starry Sky Background */}
      <div
        className="absolute inset-0 z-0 opacity-35 mix-blend-screen"
        style={{
          backgroundImage: "url('/assets/dhruvam/backgrounds/starry-sky.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-dhruvam-950)] via-transparent to-[var(--color-dhruvam-950)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pb-0">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">

          {/* Left — CTA panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative bg-white/5 backdrop-blur-md border border-white/10 p-10 md:p-14 rounded-3xl"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-[var(--color-dhruvam-gold-light)]" />
              <span className="font-inter text-[var(--color-dhruvam-gold-light)] text-xs font-semibold tracking-[0.2em] uppercase">
                Join the Constellation
              </span>
            </div>

            <h2 className="font-montserrat font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.0] mb-6">
              Become a<br />
              <span className="text-[var(--color-dhruvam-gold-light)] drop-shadow-[0_0_24px_rgba(246,181,27,0.35)]">
                Rotaractor
              </span>
            </h2>

            <p className="font-inter text-white/65 text-sm sm:text-base leading-relaxed mb-10 max-w-md">
              Join a global network of young leaders aged 18–30, dedicated to creating positive change while building professional skills that last a lifetime.
            </p>

            {/* CTA with star-glow behind button */}
            <div className="relative inline-block">
              {/* Guiding-star glow behind button */}
              <img
                src="/assets/dhruvam/effects/star-glow.svg"
                alt=""
                aria-hidden="true"
                className="absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-20 opacity-60 pointer-events-none"
              />
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="relative group inline-flex items-center gap-3 px-10 py-5 bg-[var(--color-dhruvam-gold)] hover:bg-[var(--color-dhruvam-gold-light)] text-[var(--color-dhruvam-950)] rounded-full font-poppins font-bold text-sm transition-colors shadow-[0_8px_40px_rgba(246,181,27,0.35)] hover:shadow-[0_12px_50px_rgba(246,181,27,0.55)]"
              >
                Apply Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            {/* Small text below CTA */}
            <p className="font-inter text-xs text-white/30 mt-4">
              Ages 18–30 · No experience required · Open to all
            </p>
          </motion.div>

          {/* Right — tall numbered benefit panels */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-4"
          >
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ x: 4 }}
                className="group relative flex items-center gap-5 p-6 rounded-2xl border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300 overflow-hidden"
                style={{ background: b.accentBg }}
              >
                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl opacity-50 group-hover:opacity-100 transition-opacity"
                  style={{ background: b.accent }}
                />

                {/* Large number */}
                <span
                  className="font-montserrat font-black text-5xl leading-none shrink-0 ml-2"
                  style={{ color: b.accent, opacity: 0.7 }}
                >
                  {b.number}
                </span>

                {/* Icon + text */}
                <div className="flex items-start gap-3">
                  <img src={b.icon} alt="" aria-hidden="true" className="w-8 h-8 mt-0.5 shrink-0 opacity-80" />
                  <div>
                    <h4 className="font-poppins font-bold text-base text-white mb-1">{b.title}</h4>
                    <p className="font-inter text-xs text-white/50 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Gold Marquee Strip ── */}
      <div className="relative z-10 mt-16 border-t border-b border-[var(--color-dhruvam-gold-light)]/15 py-4 overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap">
          {/* Duplicate content for seamless loop */}
          {[...Array(2)].map((_, idx) => (
            <span key={idx} className="inline-flex items-center">
              {marqueeText.split("·").map((segment, j) => (
                <span key={j} className="inline-flex items-center">
                  <span className="font-montserrat font-bold text-xs sm:text-sm tracking-[0.3em] text-[var(--color-dhruvam-gold-light)]/50 uppercase px-4">
                    {segment.trim()}
                  </span>
                  {j < marqueeText.split("·").length - 1 && (
                    <img
                      src="/assets/dhruvam/decorations/stars-four-point.svg"
                      alt=""
                      aria-hidden="true"
                      className="w-3 h-3 opacity-30 mx-1"
                    />
                  )}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
