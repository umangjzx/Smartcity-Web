"use client";

import { motion } from "framer-motion";
import { Compass, Users, BookOpen, ShieldCheck, HeartHandshake } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import DhruvamCard from "@/components/ui/DhruvamCard";

const principles = [
  { icon: Compass, title: "Direction", description: "A constant source of direction, purpose, and hope." },
  { icon: Users, title: "Unity", description: "Unity and collective strength through interlinked hands." },
  { icon: BookOpen, title: "Wisdom", description: "Thinking, acting, and leading with integrity and wisdom." },
  { icon: ShieldCheck, title: "Courage", description: "Standing firm and guiding with unwavering courage." },
  { icon: HeartHandshake, title: "Gratitude", description: "Staying grounded and helping others move toward light." },
];

export default function DhruvamTheme() {
  return (
    <section id="dhruvam" className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        <SectionHeader 
          title="The DHRUVAM Philosophy" 
          subtitle="Like Dhruva Tara, the fixed star that has guided travellers for millennia, DHRUVAM is our constant point of direction — five principles that steady every step our club takes this year."
        />

        {/* Central Compass Area */}
        <div className="relative mt-20 mb-32 flex justify-center items-center h-[400px]">
          {/* Subtle slow rotating compass background */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            className="absolute w-[300px] h-[300px] border border-[#F6B51B]/20 rounded-full border-dashed opacity-40 flex items-center justify-center pointer-events-none"
          >
            <div className="w-[200px] h-[200px] border border-[#4DD9E3]/20 rounded-full opacity-60" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative z-10 flex flex-col items-center justify-center bg-[#06152B]/80 rounded-full w-40 h-40 border border-[#F6B51B]/40 shadow-[0_0_40px_rgba(246,181,27,0.3)] backdrop-blur-md"
          >
            <img src="/assets/dhruvam/decorations/guiding-star-large.svg" alt="Guiding Star Compass" className="w-28 h-28" />
          </motion.div>

          {/* Connected Principles */}
          {principles.map((p, i) => {
            const angle = (i * (360 / principles.length) - 90) * (Math.PI / 180);
            const radius = 220; // Distance from center
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const Icon = p.icon;

            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: 0, y: 0 }}
                whileInView={{ opacity: 1, x, y }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1, type: "spring" }}
                className="absolute flex flex-col items-center justify-center w-48 text-center"
              >
                {/* Constellation line connecting to center */}
                <svg className="absolute w-[300px] h-[300px] -z-10 pointer-events-none" style={{ top: -150 + 24, left: -150 + 96 }}>
                  <motion.line 
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: "easeInOut" }}
                    x1="150" y1="150" 
                    x2={150 - x} y2={150 - y} 
                    stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="4 4" 
                  />
                </svg>

                <DhruvamCard className="!p-4 flex flex-col items-center" hoverEffect={true}>
                  <div className="w-10 h-10 rounded-full bg-[var(--color-dhruvam-gold)]/10 flex items-center justify-center mb-2">
                    <Icon size={20} className="text-[var(--color-dhruvam-gold-light)]" />
                  </div>
                  <h3 className="font-poppins font-bold text-sm text-white mb-1 uppercase tracking-wider">{p.title}</h3>
                  <p className="font-inter text-[10px] text-white/60 leading-snug">{p.description}</p>
                </DhruvamCard>
              </motion.div>
            );
          })}
        </div>

        {/* Decorative Penguin Graphic */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="absolute bottom-0 right-4 lg:right-32 z-0 w-32 lg:w-48 opacity-50 pointer-events-none mix-blend-screen hidden md:block"
        >
          <img 
            src="/assets/dhruvam/characters/penguin-back.jpg" 
            alt="Penguin Looking at Star" 
            className="w-full h-auto drop-shadow-2xl rounded-3xl"
            style={{ maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
