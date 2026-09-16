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
    number: "01",
  },
  {
    title: "Community Service",
    description: "Creating measurable positive impact across Coimbatore and beyond.",
    icon: "/assets/dhruvam/icons/filled/community.svg",
    accent: "var(--color-aurora-teal)",
    number: "02",
  },
  {
    title: "Professional Development",
    description: "Equipping members with career skills, mentorship, and industry exposure.",
    icon: "/assets/dhruvam/icons/filled/learning.svg",
    accent: "var(--color-aurora-blue)",
    number: "03",
  },
  {
    title: "International Service",
    description: "Building global understanding through cross-cultural collaboration.",
    icon: null,
    fallbackIcon: Globe2,
    accent: "var(--color-aurora-violet)",
    number: "04",
  },
  {
    title: "Public Relations",
    description: "Amplifying our mission through strategic brand building and outreach.",
    icon: null,
    fallbackIcon: Megaphone,
    accent: "var(--color-aurora-emerald)",
    number: "05",
  },
];

const bentoStyles = [
  "md:col-span-2 lg:col-span-2",
  "md:col-span-1 lg:col-span-1",
  "md:col-span-1 lg:col-span-1",
  "md:col-span-2 lg:col-span-2",
  "md:col-span-3 lg:col-span-3",
];

export default function Avenues() {
  return (
    <section id="avenues" className="py-12 md:py-20 lg:py-28 relative overflow-hidden">
      {/* Mountain-star divider at the top, echoing the journey path */}
      <img
        src="/assets/dhruvam/ui/dividers/mountain-star.svg"
        alt=""
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-auto opacity-60 pointer-events-none"
      />

      {/* Decorative hiking penguin — the traveller crossing the five avenues */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="absolute bottom-8 -right-4 lg:right-8 z-0 w-28 lg:w-40 opacity-60 pointer-events-none mix-blend-screen hidden sm:block"
      >
        <img
          src="/assets/dhruvam/characters/penguin-hiking.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-auto drop-shadow-2xl rounded-3xl"
          style={{ maskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)" }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-end mb-10 sm:mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-2 sm:mb-4">
              <div className="h-px w-8 sm:w-10 bg-[var(--color-dhruvam-gold-light)]/60" />
              <span className="font-inter text-[var(--color-dhruvam-gold-light)] text-xs font-semibold tracking-[0.2em] uppercase">Core Pillars</span>
            </div>
            <h2 className="font-montserrat font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              Five Avenues<br />of <span className="text-[var(--color-dhruvam-gold-light)]">Service</span>
            </h2>
          </div>
          <p className="font-inter text-white/55 text-sm sm:text-base md:text-lg leading-relaxed">
            Our work is guided by five core service avenues that ensure holistic growth for our members and lasting impact for our community.
          </p>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {avenues.map((av, i) => {
            const FallbackIcon = av.fallbackIcon;
            return (
              <BentoCard
                key={av.title}
                className={bentoStyles[i] || ""}
                delay={i * 0.1}
              >
                <div className="p-8 h-full flex flex-col justify-between">
                  <div>
                    {/* Large number watermark */}
                    <span
                      className="absolute top-4 right-5 font-montserrat font-black text-6xl leading-none select-none transition-all duration-300"
                      style={{ color: av.accent, opacity: 0.15 }}
                    >
                      {av.number}
                    </span>

                    {/* Icon */}
                    {av.icon ? (
                      <img src={av.icon} alt="" aria-hidden="true" className="w-14 h-14 mb-6 transition-all duration-300 group-hover:scale-110" />
                    ) : (
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                        style={{ background: "rgba(255,255,255,0.06)" }}
                      >
                        {FallbackIcon && <FallbackIcon size={26} style={{ color: av.accent }} />}
                      </div>
                    )}

                    {/* Content */}
                    <h3 className="font-poppins font-bold text-xl text-white mb-2 transition-colors">
                      {av.title}
                    </h3>
                    <p className="font-inter text-sm text-white/50 leading-relaxed max-w-sm">{av.description}</p>
                  </div>
                  
                  {/* Bottom accent line on hover */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ background: av.accent }}
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

function BentoCard({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    setMousePosition({ x: clientX - left, y: clientY - top });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 rounded-3xl ${className}`}
    >
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(246,181,27,0.08), transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
