"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Users, Star, Award, Globe } from "lucide-react";

const stats = [
  { icon: Users,  value: "100+",  label: "Active Members",      color: "text-[var(--color-rotary-gold)]" },
  { icon: Star,   value: "5+",    label: "Years of Excellence",  color: "text-white/70" },
  { icon: Award,  value: "50+",   label: "Service Projects",     color: "text-[var(--color-rotary-gold)]" },
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
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[var(--color-charcoal)]">
      {/* Layered background — use fixed gradients for GPU performance */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
        {/* Static gradient orbs — no animation for performance */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[var(--color-rotaract-red)] opacity-[0.15] blur-[120px]" />
        <div className="absolute bottom-[-15%] left-[-8%] w-[500px] h-[500px] rounded-full bg-[var(--color-royal-blue)] opacity-[0.12] blur-[100px]" />
        <div className="absolute top-[35%] left-[35%] w-[350px] h-[350px] rounded-full bg-[var(--color-rotary-gold)] opacity-[0.07] blur-[90px]" />
      </div>

      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-rotaract-red)] via-[var(--color-rotary-gold)] to-[var(--color-royal-blue)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          {/* Eyebrow */}
          <motion.div variants={item} className="flex items-center gap-3 mb-8">
            <div className="h-px w-12 bg-[var(--color-rotary-gold)]" />
            <span className="font-inter text-[var(--color-rotary-gold)] text-sm font-semibold tracking-[0.2em] uppercase">
              Rotaract District 3206
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="font-montserrat font-black leading-[1.05] mb-8"
          >
            <span className="block text-5xl md:text-7xl lg:text-[5.5rem] text-white">Ignite.</span>
            <span className="block text-5xl md:text-7xl lg:text-[5.5rem] text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-rotary-gold)] to-[#FFD97D]">
              Influence.
            </span>
            <span className="block text-5xl md:text-7xl lg:text-[5.5rem] text-white/80">Impact.</span>
          </motion.h1>

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
              href="#join"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-rotaract-red)] hover:bg-[#a50d26] text-white rounded-full font-poppins font-semibold text-sm shadow-[0_8px_32px_rgba(200,16,46,0.3)] hover:shadow-[0_12px_44px_rgba(200,16,46,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              Become a Member
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="#about"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 hover:border-white/40 text-white/80 hover:text-white rounded-full font-poppins font-semibold text-sm hover:bg-white/5 transition-all duration-300"
            >
              Our Story
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
      </div>

      {/* Bottom wave — smoother curve */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" className="w-full fill-white block" preserveAspectRatio="none">
          <path d="M0,60 C480,5 960,45 1440,15 L1440,60 Z" />
        </svg>
      </div>
    </section>
  );
}
