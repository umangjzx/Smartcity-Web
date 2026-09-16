"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Building2, Calendar, Fingerprint, CheckCircle2 } from "lucide-react";

const timeline = [
  { year: "2021", title: "Charter Year", description: "Established on 17 May 2021 with a founding vision to develop young leaders." },
  { year: "2022", title: "Growth Phase", description: "Expanded membership and laid the foundation for long-term community projects." },
  { year: "2023", title: "Community Expansion", description: "Launched multi-district initiatives impacting thousands of lives across Coimbatore." },
  { year: "2024", title: "Leadership Excellence", description: "Focused on professional growth and skill enhancement for all members." },
  { year: "2025", title: "International Recognition", description: "Achieved global recognition for outstanding sustainable community service." },
  { year: "2026", title: "DHRUVAM — The Star That Guides", description: "Entering the 2026–27 year guided by direction, unity, wisdom, courage and gratitude." },
];

const values = [
  "Fellowship & Brotherhood",
  "Leadership Development",
  "Community Service",
  "Professional Excellence",
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="about" className="py-12 md:py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section header */}
        <div className="mb-10 sm:mb-14 md:mb-20">
          <div className="flex items-center gap-3 mb-2 sm:mb-4">
            <div className="h-px w-8 sm:w-10 bg-[var(--color-dhruvam-gold-light)]/60" />
            <span className="font-inter text-[var(--color-dhruvam-gold-light)] text-xs font-semibold tracking-[0.2em] uppercase">Our Story</span>
          </div>
          <h2 className="font-montserrat font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white max-w-xl leading-tight">
            A Legacy of <span className="text-[var(--color-dhruvam-gold-light)]">Excellence</span> Since 2021
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-start">

          {/* Left — club info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="font-inter text-white/60 text-lg leading-relaxed mb-10">
              We are a vibrant community of young professionals and students dedicated to making a positive impact in Coimbatore and beyond. Through leadership, service, and innovation, we strive to transform our community while building lifelong skills.
            </p>

            {/* Values */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {values.map((v) => (
                <div key={v} className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <CheckCircle2 size={16} className="text-[var(--color-dhruvam-gold-light)] shrink-0" />
                  <span className="font-inter text-sm font-medium text-white/85">{v}</span>
                </div>
              ))}
            </div>

            {/* Club details cards */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-5 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:border-[var(--color-dhruvam-gold-light)]/30 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-[var(--color-dhruvam-gold)]/10 flex items-center justify-center shrink-0">
                  <Calendar size={20} className="text-[var(--color-dhruvam-gold-light)]" />
                </div>
                <div>
                  <p className="font-inter text-xs text-white/45 uppercase tracking-wider mb-0.5">Established</p>
                  <p className="font-poppins font-semibold text-white">17 May 2021</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:border-[var(--color-dhruvam-gold-light)]/30 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-[var(--color-aurora-cyan)]/10 flex items-center justify-center shrink-0">
                  <Fingerprint size={20} className="text-[var(--color-aurora-cyan)]" />
                </div>
                <div>
                  <p className="font-inter text-xs text-white/45 uppercase tracking-wider mb-0.5">Club ID</p>
                  <p className="font-poppins font-semibold text-white">8823645</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:border-[var(--color-dhruvam-gold-light)]/30 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-[var(--color-aurora-emerald)]/10 flex items-center justify-center shrink-0">
                  <Building2 size={20} className="text-[var(--color-aurora-emerald)]" />
                </div>
                <div>
                  <p className="font-inter text-xs text-white/45 uppercase tracking-wider mb-0.5">Sponsored By</p>
                  <p className="font-poppins font-semibold text-white">Rotary Club of Coimbatore Smartcity</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — timeline */}
          <div className="relative">
            {/* Decorative Penguin Lantern Graphic */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="absolute -top-16 -right-4 lg:-right-12 z-0 w-32 lg:w-40 opacity-70 pointer-events-none mix-blend-screen hidden sm:block"
            >
              <img 
                src="/assets/dhruvam/characters/penguin-lantern.jpg" 
                alt="Penguin Guiding the Way" 
                className="w-full h-auto drop-shadow-2xl rounded-3xl"
                style={{ maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)' }}
              />
            </motion.div>

            {/* Background line */}
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-white/10 z-0" />
            
            {/* Animated foreground line */}
            <motion.div 
              style={{ height: lineHeight }}
              className="absolute left-[19px] top-2 w-px bg-gradient-to-b from-[var(--color-dhruvam-gold-light)] via-[var(--color-aurora-teal)] to-transparent z-10 origin-top" 
            />

            <div ref={containerRef} className="flex flex-col gap-6 relative z-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative pl-14 group"
                >
                  {/* Dot / Star Node */}
                  <div className="absolute left-[8px] top-1 w-6 h-6 z-20">
                    <img 
                      src="/assets/dhruvam/decorations/stars-four-point.svg" 
                      alt="" 
                      className="w-full h-full opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 drop-shadow-[0_0_8px_rgba(246,181,27,0.5)]" 
                    />
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 backdrop-blur-sm group-hover:border-[var(--color-dhruvam-gold-light)]/40 transition-all">
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="font-montserrat font-black text-xl text-[var(--color-dhruvam-gold-light)]">{item.year}</span>
                      <span className="font-poppins font-semibold text-sm text-white">{item.title}</span>
                    </div>
                    <p className="font-inter text-sm text-white/55 leading-relaxed">{item.description}</p>
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
