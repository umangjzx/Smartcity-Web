"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe2, Megaphone } from "lucide-react";

const avenues = [
  {
    title: "Club Service",
    description: "Fostering fellowship, leadership, and member development within the club.",
    icon: "/assets/dhruvam/icons/filled/team.svg",
    accent: "var(--color-dhruvam-gold-light)",
    accentRaw: "rgba(255,214,90,0.12)",
    number: "01",
    span: "md:col-span-2",
  },
  {
    title: "Community Service",
    description: "Creating measurable positive impact across Coimbatore and beyond.",
    icon: "/assets/dhruvam/icons/filled/community.svg",
    accent: "var(--color-aurora-teal)",
    accentRaw: "rgba(47,191,166,0.12)",
    number: "02",
    span: "md:col-span-1",
  },
  {
    title: "Professional Development",
    description: "Equipping members with career skills, mentorship, and industry exposure.",
    icon: "/assets/dhruvam/icons/filled/learning.svg",
    accent: "var(--color-aurora-blue)",
    accentRaw: "rgba(74,127,217,0.12)",
    number: "03",
    span: "md:col-span-1",
  },
  {
    title: "International Service",
    description: "Building global understanding through cross-cultural collaboration.",
    icon: null,
    fallbackIcon: Globe2,
    accent: "var(--color-aurora-violet)",
    accentRaw: "rgba(140,127,224,0.12)",
    number: "04",
    span: "md:col-span-2",
  },
  {
    title: "Public Relations",
    description: "Amplifying our mission through strategic brand building and outreach. We tell our story with clarity, pride, and purpose — reaching every corner of our community.",
    icon: null,
    fallbackIcon: Megaphone,
    accent: "var(--color-aurora-emerald)",
    accentRaw: "rgba(62,203,146,0.12)",
    number: "05",
    span: "md:col-span-3",
    wide: true,
  },
];

export default function Avenues() {
  return (
    <section id="avenues" className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Top celestial divider */}
      <img
        src="/assets/dhruvam/ui/dividers/celestial.svg"
        alt=""
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-auto opacity-50 pointer-events-none"
      />

      {/* Faint starry sky bleed at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          backgroundImage: "url('/assets/dhruvam/backgrounds/starry-sky.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          maskImage: "linear-gradient(to top, rgba(0,0,0,0.08) 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.08) 0%, transparent 100%)",
        }}
      />

      {/* Decorative hiking penguin */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="absolute bottom-8 -right-4 lg:right-8 z-0 w-28 lg:w-40 opacity-55 pointer-events-none mix-blend-screen hidden sm:block section-float"
      >
        <img
          src="/assets/dhruvam/characters/penguin-hiking.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-auto drop-shadow-2xl rounded-3xl"
          style={{
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)",
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-[var(--color-dhruvam-gold-light)]/60" />
              <span className="font-inter text-[var(--color-dhruvam-gold-light)] text-xs font-semibold tracking-[0.2em] uppercase">
                Core Pillars
              </span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-montserrat font-black text-3xl sm:text-4xl md:text-5xl text-white leading-tight"
            >
              Five Avenues
              <br />
              of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-dhruvam-gold-light)] to-[var(--color-dhruvam-gold-deep)]">
                Service
              </span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-inter text-white/50 text-base leading-relaxed"
          >
            Our work is guided by five core service avenues that ensure holistic growth for our members and lasting impact for our community.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {avenues.map((av, i) => {
            const FallbackIcon = av.fallbackIcon;
            return (
              <BentoCard
                key={av.title}
                className={av.span || ""}
                delay={i * 0.1}
                accent={av.accentRaw}
                wide={av.wide}
              >
                <div className={`p-7 lg:p-8 h-full ${av.wide ? "flex flex-col md:flex-row md:items-center md:gap-10" : "flex flex-col justify-between"}`}>
                  <div className={av.wide ? "flex-1" : ""}>
                    {/* Large number watermark */}
                    <span
                      className="block font-montserrat font-black text-7xl lg:text-8xl leading-none select-none mb-2 transition-all duration-300 group-hover:opacity-40"
                      style={{ color: av.accent, opacity: 0.2 }}
                    >
                      {av.number}
                    </span>

                    {/* Icon */}
                    {av.icon ? (
                      <img
                        src={av.icon}
                        alt=""
                        aria-hidden="true"
                        className="w-12 h-12 mb-5 transition-all duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                        style={{ background: av.accentRaw }}
                      >
                        {FallbackIcon && <FallbackIcon size={24} style={{ color: av.accent }} />}
                      </div>
                    )}

                    <h3 className="font-poppins font-bold text-xl text-white mb-2">{av.title}</h3>
                  </div>

                  <p className={`font-inter text-sm text-white/50 leading-relaxed ${av.wide ? "md:max-w-sm" : "mt-2"}`}>
                    {av.description}
                  </p>

                  {/* Accent bottom line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-3xl"
                    style={{ background: `linear-gradient(to right, ${av.accent}, transparent)` }}
                  />
                </div>
              </BentoCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  children,
  className = "",
  delay = 0,
  accent = "rgba(246,181,27,0.08)",
  wide = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  accent?: string;
  wide?: boolean;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    setMousePosition({ x: clientX - left, y: clientY - top });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 rounded-3xl min-h-[220px] ${className}`}
    >
      {/* Mouse-tracking radial gradient — uses per-card accent color */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, ${accent}, transparent 45%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
