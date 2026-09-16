"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Compass, Users, BookOpen, ShieldCheck, HeartHandshake } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { backgrounds, characters } from "@/lib/dhruvamAssets";

const principles = [
  {
    icon: Compass,
    title: "Direction",
    description: "A constant source of direction, purpose, and hope.",
    detail: "Every project this year starts by asking one question: where is this pointing us?",
    accent: "var(--color-dhruvam-gold-light)",
    glow: "rgba(255,214,90,0.2)",
    border: "rgba(255,214,90,0.25)",
  },
  {
    icon: Users,
    title: "Unity",
    description: "Unity and collective strength through interlinked hands.",
    detail: "We grow by working alongside each other, not in spite of each other.",
    accent: "var(--color-aurora-teal)",
    glow: "rgba(47,191,166,0.2)",
    border: "rgba(47,191,166,0.25)",
  },
  {
    icon: BookOpen,
    title: "Wisdom",
    description: "Thinking, acting, and leading with integrity and wisdom.",
    detail: "Good intentions need good judgment — we try to bring both to every decision.",
    accent: "var(--color-aurora-blue)",
    glow: "rgba(74,127,217,0.2)",
    border: "rgba(74,127,217,0.25)",
  },
  {
    icon: ShieldCheck,
    title: "Courage",
    description: "Standing firm and guiding with unwavering courage.",
    detail: "Real service sometimes means the harder, less comfortable choice.",
    accent: "var(--color-aurora-violet)",
    glow: "rgba(140,127,224,0.2)",
    border: "rgba(140,127,224,0.25)",
  },
  {
    icon: HeartHandshake,
    title: "Gratitude",
    description: "Staying grounded and helping others move toward light.",
    detail: "We remember whose shoulders we stand on, and pay it forward.",
    accent: "var(--color-aurora-emerald)",
    glow: "rgba(62,203,146,0.2)",
    border: "rgba(62,203,146,0.25)",
  },
];

export default function DhruvamTheme() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="dhruvam" className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* Subtle aurora-sky background layer for depth differentiation from Hero */}
      <div
        className="absolute inset-0 z-0 opacity-[0.07] mix-blend-screen pointer-events-none"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 20%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%)",
        }}
      >
        <Image src={backgrounds.auroraSky} alt="" fill sizes="100vw" className="object-cover" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeader
          title="The DHRUVAM Philosophy"
          eyebrow="Our Guiding Star"
          subtitle="Like Dhruva Tara, the fixed star that has guided travellers for millennia, DHRUVAM is our constant point of direction — five principles that steady every step our club takes this year."
        />

        {/* ── Desktop: Orbital Layout ────────────────────────────────── */}
        <div className="hidden md:flex relative justify-center items-center h-[480px] mt-8 mb-24">
          {/* Outermost orbit ring — slow rotation */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
            className="absolute w-[380px] h-[380px] border border-[#F6B51B]/10 rounded-full border-dashed pointer-events-none"
          />
          {/* Inner orbit ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            className="absolute w-[240px] h-[240px] border border-white/8 rounded-full pointer-events-none"
          />

          {/* Central guiding star — pulsing glow ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative z-20 flex flex-col items-center justify-center"
          >
            {/* Outer glow ring */}
            <div
              className="dhruvam-glow-ring absolute w-52 h-52 rounded-full border border-[#F6B51B]/30"
              style={{ boxShadow: "0 0 40px rgba(246,181,27,0.15), inset 0 0 40px rgba(246,181,27,0.05)" }}
            />
            <div
              className="flex flex-col items-center justify-center bg-[#06152B]/90 rounded-full w-36 h-36 border border-[#F6B51B]/50 shadow-[0_0_60px_rgba(246,181,27,0.4)] backdrop-blur-md cursor-default"
            >
              <img
                src="/assets/dhruvam/decorations/guiding-star-large.svg"
                alt="Guiding Star"
                className="w-20 h-20 dhruvam-guiding-star"
              />
            </div>
          </motion.div>

          {/* ── Orbital Principles ── */}
          {principles.map((p, i) => {
            const angle = (i * (360 / principles.length) - 90) * (Math.PI / 180);
            const radius = 210;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const Icon = p.icon;

            return (
              <motion.div
                key={p.title}
                // FIX: start from a position near the center, not from 0,0
                initial={{ opacity: 0, x: x * 0.15, y: y * 0.15 }}
                whileInView={{ opacity: 1, x, y }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 + i * 0.12, type: "spring", damping: 18 }}
                className="absolute flex flex-col items-center justify-center w-44 text-center"
              >
                {/* Dashed line from center */}
                <svg
                  className="absolute pointer-events-none"
                  style={{
                    width: "420px",
                    height: "420px",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    overflow: "visible",
                  }}
                >
                  <motion.line
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.6 + i * 0.12, ease: "easeInOut" }}
                    x1="210" y1="210"
                    x2={210 + x} y2={210 + y}
                    stroke={p.accent}
                    strokeOpacity="0.2"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                </svg>

                {/* Principle card — click to reveal how we live it */}
                <motion.div
                  layout
                  whileHover={{ scale: 1.06, y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={activeIndex === i}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveIndex(activeIndex === i ? null : i);
                    }
                  }}
                  className="relative group rounded-2xl p-4 border backdrop-blur-md cursor-pointer overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, rgba(6,21,43,0.9), rgba(2,11,28,0.95))`,
                    borderColor: activeIndex === i ? p.accent : p.border,
                    boxShadow: activeIndex === i ? `0 0 28px ${p.glow}` : `0 0 20px ${p.glow}`,
                  }}
                >
                  {/* Accent bottom glow on hover/active */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 transition-opacity duration-300 ${activeIndex === i ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                    style={{ background: p.accent }}
                  />
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                    style={{ background: p.glow }}
                  >
                    <Icon size={20} style={{ color: p.accent }} />
                  </div>
                  <h3 className="font-poppins font-bold text-sm text-white mb-1 uppercase tracking-wider">
                    {p.title}
                  </h3>
                  <p className="font-inter text-[10px] text-white/55 leading-snug">
                    {p.description}
                  </p>
                  <AnimatePresence initial={false}>
                    {activeIndex === i && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="font-inter text-[10px] leading-snug pt-2 mt-2 border-t overflow-hidden"
                        style={{ color: p.accent, borderColor: p.border }}
                      >
                        {p.detail}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Mobile: Stacked Layout ──────────────────────────────────── */}
        <div className="md:hidden flex flex-col gap-4 mt-8 mb-16">
          {/* Central star */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="dhruvam-glow-ring absolute inset-0 rounded-full border border-[#F6B51B]/30" />
              <div className="flex flex-col items-center justify-center bg-[#06152B]/90 rounded-full w-20 h-20 border border-[#F6B51B]/50 shadow-[0_0_40px_rgba(246,181,27,0.35)]">
                <img src="/assets/dhruvam/decorations/guiding-star-large.svg" alt="" className="w-12 h-12 dhruvam-guiding-star" />
              </div>
            </div>
          </div>

          {principles.map((p, i) => {
            const Icon = p.icon;
            const isActive = activeIndex === i;
            return (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => setActiveIndex(isActive ? null : i)}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveIndex(isActive ? null : i);
                  }
                }}
                className="flex items-start gap-4 rounded-2xl p-4 border backdrop-blur-md cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, rgba(6,21,43,0.85), rgba(2,11,28,0.9))",
                  borderColor: isActive ? p.accent : p.border,
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: p.glow }}
                >
                  <Icon size={22} style={{ color: p.accent }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-poppins font-bold text-sm text-white uppercase tracking-wider mb-0.5">
                    {p.title}
                  </h3>
                  <p className="font-inter text-xs text-white/55 leading-snug">{p.description}</p>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="font-inter text-xs leading-snug pt-2 mt-2 border-t overflow-hidden"
                        style={{ color: p.accent, borderColor: p.border }}
                      >
                        {p.detail}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Decorative Penguin */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="absolute bottom-0 right-4 lg:right-32 z-0 w-32 lg:w-48 opacity-45 pointer-events-none mix-blend-screen hidden md:block section-float"
        >
          <Image
            src={characters.penguinBack}
            alt=""
            aria-hidden="true"
            sizes="(min-width: 1024px) 12rem, 8rem"
            className="w-full h-auto drop-shadow-2xl rounded-3xl"
            style={{
              maskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
