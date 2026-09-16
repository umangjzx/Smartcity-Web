"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Users, Star, Award, Globe } from "lucide-react";
import GuidingStar from "@/components/dhruvam/GuidingStar";

const stats = [
  { icon: Users,  value: "100+",  label: "Active Members",      color: "text-[var(--color-dhruvam-gold-light)]" },
  { icon: Star,   value: "5+",    label: "Years of Excellence",  color: "text-white/70" },
  { icon: Award,  value: "50+",   label: "Service Projects",     color: "text-[var(--color-dhruvam-gold-light)]" },
  { icon: Globe,  value: "1M+",   label: "Community Reach",      color: "text-white/70" },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  // Subtle depth parallax: the night sky drifts slower than the content fades/rises.
  const skyY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 60]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Hero-specific aurora background overlay */}
      <motion.div style={{ y: skyY }} className="absolute inset-0 z-0 opacity-60 mix-blend-screen">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/assets/dhruvam/backgrounds/hero-aurora.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dhruvam-950)] via-[var(--color-dhruvam-950)]/40 to-transparent" />
      </motion.div>

      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-dhruvam-gold-light)]/60 to-transparent" />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          {/* Eyebrow */}
          <motion.div variants={item} className="flex items-center gap-3 mb-8">
            <GuidingStar size={18} />
            <span className="font-inter text-[var(--color-dhruvam-gold-light)] text-sm font-semibold tracking-[0.2em] uppercase">
              Rotaract Club of Coimbatore Smartcity · 2026–27
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="font-montserrat font-black leading-[1.02] mb-4"
          >
            <span
              className="block text-6xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-dhruvam-gold-light)] via-[#FBFAFF] to-[var(--color-dhruvam-gold-light)] animate-text-shimmer"
              style={{ filter: "drop-shadow(0 0 28px rgba(246, 181, 27, 0.35))" }}
            >
              DHRUVAM
            </span>
          </motion.h1>
          <motion.p variants={item} className="font-montserrat text-2xl md:text-3xl text-white/85 font-semibold mb-8">
            The Star That Guides
          </motion.p>

          {/* Subline */}
          <motion.p
            variants={item}
            className="text-white/55 font-inter text-lg md:text-xl max-w-2xl leading-relaxed mb-12"
          >
            A community of young leaders transforming Coimbatore through service, professional development, and meaningful connections.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-4 mb-20">
            <Link
              href="#dhruvam"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-dhruvam-gold)] hover:bg-[var(--color-dhruvam-gold-light)] text-[var(--color-dhruvam-950)] rounded-full font-poppins font-semibold text-sm shadow-[0_8px_32px_rgba(246,181,27,0.25)] hover:shadow-[0_12px_40px_rgba(246,181,27,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              Explore Our Journey
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="#leadership"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 hover:border-white/40 text-white/80 hover:text-white rounded-full font-poppins font-semibold text-sm hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
            >
              Meet Our Team
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={item}
            className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-white/10 pt-10"
          >
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className={`flex flex-col gap-2 px-6 py-4 ${i > 0 ? "border-l border-white/10" : ""}`}
                >
                  <Icon size={20} className={s.color} />
                  <span className="font-montserrat font-black text-3xl text-white">{s.value}</span>
                  <span className="font-inter text-xs text-white/45 uppercase tracking-wider leading-tight">{s.label}</span>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative Penguin Graphic */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
        className="absolute bottom-0 right-4 lg:right-20 z-10 w-48 lg:w-72 opacity-90 pointer-events-none mix-blend-screen hidden md:block"
      >
        <img 
          src="/assets/dhruvam/characters/penguin-main.jpg" 
          alt="Dhruvam Penguin Guide" 
          className="w-full h-auto drop-shadow-2xl rounded-3xl"
          style={{ maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)' }}
        />
      </motion.div>
    </section>
  );
}
