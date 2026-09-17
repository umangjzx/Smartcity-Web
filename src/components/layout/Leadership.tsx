"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Mail, Phone, ExternalLink, ChevronLeft, ChevronRight, Users } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import SkeletonRow from "@/components/ui/SkeletonRow";
import EmptyState from "@/components/ui/EmptyState";

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
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/members")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) { setMembers(d.data); setStatus("loaded"); }
        else setStatus("error");
      })
      .catch(() => setStatus("error"));
  }, []);

  const boardMembers = members.filter((m) => m.isBoard);

  // The roster reliably overflows its container once there are more than a
  // handful of board members (each card overlaps the next, but they still
  // need real horizontal space) — without a scrollable container, anyone
  // past the visible width is literally clipped and unreachable.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && el.scrollWidth > el.clientWidth) {
        el.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [boardMembers.length]);

  const scrollRoster = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 400, behavior: "smooth" });
  };

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

      {status === "loading" && (
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 w-full">
          <SkeletonRow count={6} className="w-40 h-56 md:w-56 md:h-72 rounded-2xl" />
        </div>
      )}

      {status === "error" && (
        <EmptyState
          icon={Users}
          title="Couldn't load the board right now"
          subtitle="Please refresh the page — if this keeps happening, let us know."
        />
      )}

      {status === "loaded" && boardMembers.length === 0 && (
        <EmptyState
          icon={Users}
          title="Board of Directors coming soon"
          subtitle="We're finalizing this year's board — check back shortly."
        />
      )}

      {status === "loaded" && boardMembers.length > 0 && (
        <>
      {/* Cinematic Roster — desktop/tablet only; relies on hover, which touch
          devices don't have, so mobile gets its own always-visible layout below */}
      <div className="relative hidden md:block w-full max-w-[1400px] mx-auto">
        {/* Prev/Next controls, shown once the roster actually overflows */}
        <button
          type="button"
          onClick={() => scrollRoster(-1)}
          aria-label="Scroll roster left"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full flex items-center justify-center bg-[#020B1C]/80 border border-white/15 text-white/70 hover:text-[#020B1C] hover:bg-[var(--color-dhruvam-gold-light)] hover:border-[var(--color-dhruvam-gold-light)] backdrop-blur-md transition-all duration-300 shadow-lg"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => scrollRoster(1)}
          aria-label="Scroll roster right"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full flex items-center justify-center bg-[#020B1C]/80 border border-white/15 text-white/70 hover:text-[#020B1C] hover:bg-[var(--color-dhruvam-gold-light)] hover:border-[var(--color-dhruvam-gold-light)] backdrop-blur-md transition-all duration-300 shadow-lg"
        >
          <ChevronRight size={18} />
        </button>

        {/* Edge fade hints */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-12 w-16 z-30 bg-gradient-to-r from-[var(--color-dhruvam-950)] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-12 w-16 z-30 bg-gradient-to-l from-[var(--color-dhruvam-950)] to-transparent" />

        <div
          ref={scrollRef}
          className="relative z-20 flex items-end overflow-x-auto scrollbar-hide px-16 md:px-24 mt-8 pb-12"
        >
        {boardMembers.map((m, i) => {
          const isHovered = hoveredMember === m._id;
          const isDimmed = hoveredMember !== null && hoveredMember !== m._id;
          const isFirst = i === 0;
          const isLast = i === boardMembers.length - 1;
          const fallbackImg = `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=transparent&color=fff&size=512`;

          return (
            <motion.div
              key={m._id}
              className="relative flex justify-center items-end group shrink-0 -ml-12 lg:-ml-16 first:ml-0 cursor-pointer"
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
                <div
                  className="relative z-10 w-64 h-96 drop-shadow-2xl transition-all"
                  style={{ maskImage: "linear-gradient(to top, transparent 0%, black 15%)", WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 15%)" }}
                >
                  <Image
                    src={m.image || fallbackImg}
                    alt={m.name}
                    fill
                    sizes="16rem"
                    className="object-cover object-bottom"
                  />
                </div>
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
      </div>

      {/* Mobile roster — a compact grid with name/role/contact always visible,
          since there's no hover on touch to reveal them like the desktop version */}
      <div className="relative z-20 md:hidden w-full max-w-lg mx-auto px-4 grid grid-cols-2 gap-4 mt-8 pb-4">
        {boardMembers.map((m, i) => {
          const fallbackImg = `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=transparent&color=fff&size=512`;
          return (
            <motion.div
              key={m._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: Math.min(i, 6) * 0.06 }}
              className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10"
            >
              <div className="relative w-full aspect-[3/4]">
                <Image
                  src={m.image || fallbackImg}
                  alt={m.name}
                  fill
                  sizes="50vw"
                  className="object-cover object-bottom"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(2,11,28,0.95) 0%, rgba(2,11,28,0.35) 45%, transparent 70%)" }}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="font-poppins font-bold text-[13px] text-white leading-tight truncate">{m.name}</h3>
                <p className="font-inter text-[10px] text-[var(--color-dhruvam-gold-light)] uppercase tracking-wide truncate mb-2 font-semibold">{m.role}</p>
                <div className="flex items-center gap-1.5">
                  {m.phone && (
                    <a href={`tel:${m.phone}`} aria-label={`Call ${m.name}`} className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center active:bg-[var(--color-dhruvam-gold)] active:text-black transition-colors text-white/80">
                      <Phone size={13} />
                    </a>
                  )}
                  {m.email && (
                    <a href={`mailto:${m.email}`} aria-label={`Email ${m.name}`} className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center active:bg-[var(--color-dhruvam-gold)] active:text-black transition-colors text-white/80">
                      <Mail size={13} />
                    </a>
                  )}
                  {m.linkedin && (
                    <a href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on LinkedIn`} className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center active:bg-[#00E5FF] active:text-black transition-colors text-white/80">
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
        </>
      )}

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
