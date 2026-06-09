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
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[var(--color-charcoal)]">
      {/* Layered background */}
      <div className="absolute inset-0">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Gradient orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[var(--color-rotaract-red)] opacity-[0.18] blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[var(--color-royal-blue)] opacity-[0.15] blur-[100px]" />
        <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full bg-[var(--color-rotary-gold)] opacity-[0.08] blur-[80px]" />
      </div>

      {/* Top accent line */}
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
            <span className="block text-5xl md:text-7xl lg:text-8xl text-white">Ignite.</span>
            <span className="block text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-rotary-gold)] to-[#FFD97D]">
              Influence.
            </span>
            <span className="block text-5xl md:text-7xl lg:text-8xl text-white/80">Impact.</span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            variants={item}
            className="text-white/60 font-inter text-lg md:text-xl max-w-2xl leading-relaxed mb-12"
          >
            A community of young leaders transforming Coimbatore through service, professional development, and meaningful connections.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-4 mb-20">
            <Link
              href="#join"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-rotaract-red)] hover:bg-[#a50d26] text-white rounded-full font-poppins font-semibold text-sm transition-all shadow-[0_8px_30px_rgba(200,16,46,0.35)] hover:shadow-[0_12px_40px_rgba(200,16,46,0.45)] hover:-translate-y-0.5"
            >
              Become a Member
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#about"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 hover:border-white/40 text-white/80 hover:text-white rounded-full font-poppins font-semibold text-sm transition-all hover:bg-white/5"
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
                  <span className="font-inter text-xs text-white/50 uppercase tracking-wider leading-tight">{s.label}</span>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" className="w-full fill-white" preserveAspectRatio="none">
          <path d="M0,80 C360,20 1080,60 1440,10 L1440,80 Z" />
        </svg>
      </div>
    </section>
  );
}
