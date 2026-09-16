"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mic2, Star } from "lucide-react";

const benefits = [
  { icon: "/assets/dhruvam/icons/filled/team.svg",      label: "Leadership Opportunities",  desc: "Lead projects and teams from day one" },
  { icon: "/assets/dhruvam/icons/filled/learning.svg",  label: "Professional Development",  desc: "Workshops, mentorship, and career growth" },
  { icon: "/assets/dhruvam/icons/outline/global.svg",   label: "International Exposure",    desc: "Collaborate with Rotaractors worldwide" },
  { icon: null, fallbackIcon: Mic2,                     label: "Public Speaking",           desc: "Build confidence in front of an audience" },
  { icon: "/assets/dhruvam/icons/filled/community.svg", label: "Community Service",         desc: "Create real impact in people's lives" },
  { icon: null, fallbackIcon: Star,                     label: "Networking",                desc: "Connect with professionals and leaders" },
];

export default function Membership() {
  return (
    <section id="join" className="py-24 md:py-32 relative overflow-hidden">
      {/* Starry Sky Background */}
      <div 
        className="absolute inset-0 z-0 opacity-40 mix-blend-screen"
        style={{
          backgroundImage: "url('/assets/dhruvam/backgrounds/starry-sky.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dhruvam-950)] via-[var(--color-dhruvam-950)]/40 to-[var(--color-dhruvam-950)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-white/5 backdrop-blur-md border border-white/10 p-10 md:p-14 rounded-3xl"
          >
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="h-px w-8 sm:w-10 bg-[var(--color-dhruvam-gold-light)]" />
              <span className="font-inter text-[var(--color-dhruvam-gold-light)] text-xs font-semibold tracking-[0.2em] uppercase">Join the Constellation</span>
            </div>

            <h2 className="font-montserrat font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4 sm:mb-6">
              Become a<br />
              <span className="text-[var(--color-dhruvam-gold-light)] drop-shadow-[0_0_20px_rgba(246,181,27,0.3)]">Rotaractor</span>
            </h2>

            <p className="font-inter text-white/70 text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-10 max-w-md">
              Join a global network of young leaders aged 18–30, dedicated to creating positive change while building professional skills that last a lifetime.
            </p>

            <div className="flex flex-wrap gap-4 sm:gap-6">
              <button className="group inline-flex items-center gap-2 px-10 py-5 bg-[var(--color-dhruvam-gold)] hover:bg-[var(--color-dhruvam-gold-light)] text-[var(--color-dhruvam-950)] rounded-full font-poppins font-bold text-sm transition-all shadow-[0_8px_30px_rgba(246,181,27,0.25)] hover:shadow-[0_12px_40px_rgba(246,181,27,0.4)] hover:-translate-y-1">
                Apply Now
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right — benefits grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="grid grid-cols-2 gap-4"
          >
            {benefits.map((b, i) => {
              const FallbackIcon = b.fallbackIcon;
              return (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-dhruvam-gold)]/10 flex items-center justify-center mb-3 group-hover:bg-[var(--color-dhruvam-gold)]/20 transition-colors">
                    {b.icon ? (
                      <img src={b.icon} alt="" aria-hidden="true" className="w-5 h-5" />
                    ) : (
                      FallbackIcon && <FallbackIcon size={18} className="text-[var(--color-dhruvam-gold-light)]" />
                    )}
                  </div>
                  <h4 className="font-poppins font-semibold text-white text-sm mb-1">{b.label}</h4>
                  <p className="font-inter text-white/40 text-xs leading-relaxed">{b.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
