"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import GuidingStar from "@/components/dhruvam/GuidingStar";
import { backgrounds, characters } from "@/lib/dhruvamAssets";

// A CTA that drifts toward the cursor within a small radius, snapping back
// on leave — a small tactile flourish rather than a static button.
function MagneticLink({ children, ...props }: React.ComponentProps<typeof Link>) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span style={{ x: springX, y: springY, display: "inline-block" }} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <Link ref={ref} {...props}>
        {children}
      </Link>
    </motion.span>
  );
}

// ── Animated counter hook ──────────────────────────────────────────────────
function useCounter(target: number, duration = 1800, startCounting: boolean = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!startCounting) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, startCounting]);
  return value;
}

type Stat = { raw: number; suffix: string; label: string; primary: boolean };

const CLUB_FOUNDED_YEAR = 2021;
const AVENUES_OF_SERVICE = 5;

// Individual counter component — starts when in view
function StatCounter({ stat, delay }: { stat: Stat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCounter(stat.raw, 1600, started);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col gap-1.5"
    >
      <span className={`dhruvam-counter font-montserrat font-black text-3xl md:text-4xl leading-none ${stat.primary ? "text-[var(--color-dhruvam-gold-light)]" : "text-white"}`}>
        {count}{stat.suffix}
      </span>
      <span className="font-inter text-[11px] text-white/45 uppercase tracking-widest leading-snug">{stat.label}</span>
    </motion.div>
  );
}

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  // Impact numbers are real counts from the DB, not marketing copy — pulled
  // fresh so they never drift out of sync with what's actually on the site.
  const [counts, setCounts] = useState({ members: 0, projects: 0 });
  useEffect(() => {
    Promise.all([
      fetch("/api/members").then((r) => r.json()).catch(() => null),
      fetch("/api/projects").then((r) => r.json()).catch(() => null),
    ]).then(([m, p]) => {
      setCounts({
        members: m?.success ? m.data.length : 0,
        projects: p?.success ? p.data.length : 0,
      });
    });
  }, []);

  const yearsActive = new Date().getFullYear() - CLUB_FOUNDED_YEAR;
  const stats: Stat[] = [
    { raw: counts.members,  suffix: "+", label: "Active Members",     primary: true  },
    { raw: yearsActive,     suffix: "+", label: "Years of Excellence", primary: false },
    { raw: counts.projects, suffix: "+", label: "Service Projects",    primary: true  },
    { raw: AVENUES_OF_SERVICE, suffix: "", label: "Avenues of Service", primary: false },
  ];

  const skyY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 60]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const penguinY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 180]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-visible"
    >
      {/* LAYER A: Hero aurora background */}
      <motion.div style={{ y: skyY }} className="absolute inset-0 z-0 opacity-60 mix-blend-screen">
        <div
          className="absolute inset-0"
          style={{
            maskImage: "linear-gradient(to bottom, black 20%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 20%, transparent 100%)",
          }}
        >
          <Image
            src={backgrounds.heroAurora}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>
      </motion.div>

      {/* LAYER B: Guiding light cone — lighthouse/star direction metaphor */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 80% at 72% 15%, rgba(246,181,27,0.06) 0%, transparent 65%)",
        }}
      />

      {/* Top gold accent bar */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-dhruvam-gold-light)]/60 to-transparent" />

      {/* Main content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 w-full"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Eyebrow */}
          <motion.div variants={item} className="flex items-center gap-3 mb-8">
            <GuidingStar size={18} />
            <span className="font-inter text-[var(--color-dhruvam-gold-light)] text-sm font-semibold tracking-[0.2em] uppercase">
              Rotaract Club of Coimbatore Smartcity · 2026–27
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={item} className="font-montserrat font-black leading-[1.0] mb-3">
            <span
              className="block text-[14vw] sm:text-[10vw] md:text-8xl lg:text-[7rem] xl:text-[8rem] text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-dhruvam-gold-light)] via-[#FBFAFF] to-[var(--color-dhruvam-gold-light)] animate-text-shimmer"
              style={{ filter: "drop-shadow(0 0 40px rgba(246,181,27,0.25))" }}
            >
              DHRUVAM
            </span>
          </motion.h1>

          {/* Sub-headline — styled distinctly from the hero title */}
          <motion.div variants={item} className="relative mb-8 flex items-center gap-4">
            <img
              src="/assets/dhruvam/effects/soft-glow.svg"
              alt=""
              aria-hidden="true"
              className="absolute -left-4 -top-3 w-24 h-12 opacity-50 pointer-events-none select-none"
            />
            <p className="font-montserrat text-xl md:text-2xl text-white/70 font-light italic tracking-wide">
              The Star That Guides
            </p>
          </motion.div>

          {/* Body */}
          <motion.p
            variants={item}
            className="text-white/55 font-inter text-base md:text-lg max-w-xl leading-relaxed mb-12"
          >
            A community of young leaders transforming Coimbatore through service, professional development, and meaningful connections.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-4 mb-24">
            <MagneticLink
              href="#dhruvam"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-dhruvam-gold)] hover:bg-[var(--color-dhruvam-gold-light)] text-[var(--color-dhruvam-950)] rounded-full font-poppins font-bold text-sm shadow-[0_8px_32px_rgba(246,181,27,0.30)] hover:shadow-[0_12px_48px_rgba(246,181,27,0.50)] transition-colors duration-300"
            >
              Explore Our Journey
              <ArrowRight size={16} className="inline group-hover:translate-x-1 transition-transform duration-200" />
            </MagneticLink>
            <Link
              href="#leadership"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 hover:border-[var(--color-dhruvam-gold-light)]/50 text-white/80 hover:text-white rounded-full font-poppins font-semibold text-sm hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
            >
              Meet Our Team
            </Link>
          </motion.div>

          {/* Impact Stats — animated counters on a constellation baseline */}
          <motion.div variants={item}>
            {/* Label */}
            <p className="font-inter text-[10px] text-white/30 uppercase tracking-[0.25em] mb-5">Our Impact in Numbers</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-0">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`relative ${i > 0 ? "pl-6 border-l border-white/10" : ""}`}
                >
                  <StatCounter stat={s} delay={0.6 + i * 0.1} />
                </div>
              ))}
            </div>
            {/* Constellation baseline */}
            <div className="relative mt-8 h-px">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-dhruvam-gold-light)]/30 via-white/10 to-transparent" />
              <img
                src="/assets/dhruvam/decorations/shooting-star.svg"
                alt=""
                aria-hidden="true"
                className="absolute right-4 -top-3 w-12 h-6 opacity-50"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative Penguin — visible on all screen sizes */}
      <motion.div
        style={{ y: penguinY }}
        className="absolute bottom-0 right-0 md:right-12 lg:right-20 z-10 w-36 md:w-56 lg:w-72 pointer-events-none mix-blend-screen"
      >
        <Image
          src={characters.penguinMain}
          alt="Dhruvam Penguin Guide"
          sizes="(min-width: 1024px) 18rem, (min-width: 768px) 14rem, 9rem"
          className="w-full h-auto drop-shadow-2xl rounded-3xl"
          style={{
            maskImage: "radial-gradient(ellipse 80% 90% at center 60%, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 90% at center 60%, black 30%, transparent 75%)",
          }}
        />
      </motion.div>

      {/* Scroll cue — invites the next step of the journey, fades as you scroll */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-inter text-[10px] text-white/35 uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={reduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-8 h-8 rounded-full border border-[var(--color-dhruvam-gold-light)]/30 flex items-center justify-center"
        >
          <ChevronDown size={14} className="text-[var(--color-dhruvam-gold-light)]/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
