"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, ExternalLink } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

type Member = {
  _id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  image: string;
  linkedin: string;
  isBoard: boolean;
};

export default function Leadership() {
  const [members, setMembers] = useState<Member[]>([]);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/members")
      .then((r) => r.json())
      .then((d) => { if (d.success) setMembers(d.data); })
      .catch(() => {});
  }, []);

  const boardMembers = members.filter((m) => m.isBoard);

  if (members.length === 0) return null;

  return (
    <section id="leadership" className="py-20 md:py-32 relative overflow-hidden bg-[var(--color-dhruvam-950)] flex flex-col justify-center">
      {/* Massive Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-5 z-0">
        <h2 className="text-[22vw] font-montserrat font-black leading-none whitespace-nowrap text-white select-none">
          OUR GUIDES
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full mb-16">
        <SectionHeader
          title="Board of Directors"
          align="center"
        />
      </div>

      {/* Cinematic Roster Container */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-4 md:px-12 flex flex-col md:flex-row md:items-end md:justify-center gap-12 md:gap-0 mt-8 pb-12">
        {boardMembers.map((m, i) => {
          const isHovered = hoveredMember === m._id;
          const isDimmed = hoveredMember !== null && hoveredMember !== m._id;
          const isFirst = i === 0;
          const isLast = i === boardMembers.length - 1;
          
          return (
            <motion.div
              key={m._id}
              className="relative flex justify-center items-end group md:-ml-12 lg:-ml-16 first:ml-0 cursor-pointer"
              onMouseEnter={() => setHoveredMember(m._id)}
              onMouseLeave={() => setHoveredMember(null)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, type: "spring" }}
              style={{ zIndex: isHovered ? 50 : 10 + i }}
            >
              <motion.div
                animate={{
                  opacity: isDimmed ? 0.3 : 1,
                  scale: isHovered ? 1.05 : 1,
                  filter: isDimmed ? 'blur(4px)' : 'blur(0px)'
                }}
                transition={{ duration: 0.4 }}
                className="relative flex flex-col items-center"
              >
                {/* Portrait */}
                <img
                  src={m.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=transparent&color=fff&size=512`}
                  alt={m.name}
                  className="relative z-10 w-56 h-72 md:w-64 md:h-96 object-cover object-bottom drop-shadow-2xl transition-all"
                  style={{ maskImage: "linear-gradient(to top, transparent 0%, black 15%)", WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 15%)" }}
                />
              </motion.div>

              {/* Glassmorphism Info Panel */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: -40 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute bottom-0 z-50 w-72 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl ${
                      isLast ? "right-0" : isFirst ? "left-0" : "left-1/2 -translate-x-1/2"
                    }`}
                  >
                    <h3 className="font-poppins font-bold text-xl text-white mb-1 leading-tight">{m.name}</h3>
                    <p className="font-inter text-xs text-[var(--color-dhruvam-gold-light)] uppercase tracking-wider mb-4 font-semibold">{m.role}</p>
                    
                    <div className="flex items-center gap-3">
                      {m.phone && (
                        <a href={`tel:${m.phone}`} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[var(--color-dhruvam-gold)] hover:text-black transition-colors text-white/70">
                          <Phone size={16} />
                        </a>
                      )}
                      {m.email && (
                        <a href={`mailto:${m.email}`} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[var(--color-dhruvam-gold)] hover:text-black transition-colors text-white/70">
                          <Mail size={16} />
                        </a>
                      )}
                      {m.linkedin && (
                        <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00E5FF] hover:text-black transition-colors text-white/70">
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
      
      {/* Decorative divider at the bottom */}
      <img
        src="/assets/dhruvam/ui/dividers/constellation.svg"
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full h-auto opacity-40 pointer-events-none"
      />
    </section>
  );
}
