"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, CalendarClock, ChevronDown } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import SkeletonRow from "@/components/ui/SkeletonRow";
import EmptyState from "@/components/ui/EmptyState";
import { backgrounds, characters } from "@/lib/dhruvamAssets";

type Event = {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  time: string;
  isFeatured: boolean;
};

// ── Premium Countdown ──────────────────────────────────────────────────────
function Countdown({ targetDate }: { targetDate: Date }) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return;
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { v: t.d, l: "Days" },
    { v: t.h, l: "Hours" },
    { v: t.m, l: "Mins" },
    { v: t.s, l: "Secs" },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {units.map(({ v, l }) => (
        <div key={l} className="flex flex-col items-center gap-1.5">
          <div className="w-full rounded-2xl py-3 sm:py-5 flex items-center justify-center bg-[#020B1C] border border-[var(--color-dhruvam-gold-light)]/30 shadow-[0_0_20px_rgba(246,181,27,0.08)] backdrop-blur-sm">
            <span className="dhruvam-counter font-montserrat font-black text-2xl sm:text-4xl text-white leading-none">
              {String(v).padStart(2, "0")}
            </span>
          </div>
          <p className="font-inter text-[9px] sm:text-[10px] text-[var(--color-dhruvam-gold-light)]/60 uppercase tracking-widest">
            {l}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function Events() {
  const [featured, setFeatured] = useState<Event | null>(null);
  const [upcoming, setUpcoming] = useState<Event[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Desktop mouse wheels only send vertical delta by default, so a purely
  // horizontal strip never scrolls under the cursor without this — convert
  // vertical wheel input to horizontal scroll while hovering the strip.
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
  }, [upcoming.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const card = el.querySelector<HTMLElement>("[data-event-card]");
      const amount = (card?.offsetWidth ?? 288) + 20;
      setActiveIndex(Math.round(el.scrollLeft / amount));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [upcoming.length]);

  const scrollToIndex = (idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-event-card]");
    const amount = (card?.offsetWidth ?? 288) + 20;
    el.scrollTo({ left: idx * amount, behavior: "smooth" });
  };

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((d) => {
        if (!d.success) return;
        const evs: Event[] = d.data;
        const feat = evs.find((e) => e.isFeatured) ?? evs[0] ?? null;
        setFeatured(feat);
        setUpcoming(evs.filter((e) => e._id !== feat?._id).slice(0, 3));
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const eventDate = featured ? new Date(featured.date) : null;

  return (
    <section id="events" className="py-20 md:py-28 relative overflow-hidden">
      {/* Lighthouse glow backdrop */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-screen pointer-events-none">
        <Image src={backgrounds.lighthouseNight} alt="" fill sizes="100vw" className="object-cover" />
      </div>

      {/* Telescope penguin */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="absolute bottom-4 -left-6 lg:left-2 z-0 w-24 lg:w-32 opacity-45 pointer-events-none mix-blend-screen hidden sm:block section-float"
      >
        <Image
          src={characters.penguinTelescope}
          alt=""
          aria-hidden="true"
          sizes="(min-width: 1024px) 8rem, 6rem"
          className="w-full h-auto drop-shadow-2xl rounded-3xl"
          style={{
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)",
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeader
          title="Upcoming Events"
          eyebrow="What's Next"
          subtitle="Every event is a new star on our constellation — moments that bring us closer as a community."
          align="center"
        />

        {/* Featured event card */}
        {featured && eventDate ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 relative"
          >
            {/* Outer container — overflow-visible so badge shows */}
            <div className="relative bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden">
              <div className="grid lg:grid-cols-2">
                {/* Left: Event info */}
                <div className="p-8 md:p-12 flex flex-col justify-center relative">
                  {/* Ghost large date behind title */}
                  <span
                    className="absolute top-6 right-6 font-montserrat font-black text-[5rem] md:text-[7rem] leading-none text-white/[0.04] select-none pointer-events-none"
                    aria-hidden="true"
                  >
                    {eventDate.getDate()}
                  </span>

                  <div className="inline-flex items-center gap-2 bg-[#F6B51B]/10 text-[#F6B51B] text-xs font-semibold font-inter px-3 py-1.5 rounded-full mb-6 w-fit border border-[#F6B51B]/20">
                    <img src="/assets/dhruvam/effects/guiding-star.svg" alt="" aria-hidden="true" className="w-3.5 h-3.5 dhruvam-guiding-star" />
                    Featured Event
                  </div>

                  <h3 className="font-montserrat font-black text-2xl md:text-3xl text-white mb-4 leading-snug relative z-10">
                    {featured.title}
                  </h3>
                  <p className="font-inter text-white/70 text-sm md:text-base leading-relaxed mb-8 relative z-10">
                    {featured.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {[
                      { icon: "/assets/dhruvam/icons/filled/events.svg", label: eventDate.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) },
                      { icon: "/assets/dhruvam/icons/outline/location.svg", label: featured.location },
                      { icon: "/assets/dhruvam/icons/outline/time.svg", label: featured.time },
                    ].map(({ icon, label }) => (
                      <div key={label} className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-white/5 border border-white/10">
                          <img src={icon} alt="" aria-hidden="true" className="w-4 h-4" />
                        </div>
                        <span className="font-inter text-sm text-white/80 font-medium">{label}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={`mailto:rotaractsmartcity@gmail.com?subject=${encodeURIComponent(`Registration: ${featured.title}`)}`}
                    className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#F6B51B] hover:bg-[var(--color-dhruvam-gold-light)] text-[#020B1C] rounded-full font-poppins font-bold text-sm transition-all w-fit shadow-[0_4px_20px_rgba(246,181,27,0.3)] hover:shadow-[0_8px_32px_rgba(246,181,27,0.5)] hover:-translate-y-0.5"
                  >
                    Register Now
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

                {/* Right: Countdown */}
                <div className="bg-[#020B1C]/50 border-l border-white/8 p-8 md:p-12 flex flex-col justify-center relative">
                  {/* Badge positioned on the border between panels — NOT inside overflow:hidden */}
                  <div className="absolute -top-7 right-6 z-30">
                    <img
                      src="/assets/dhruvam/ui/badges/upcoming.svg"
                      alt="Upcoming"
                      className="w-20 h-20 drop-shadow-[0_4px_16px_rgba(47,191,166,0.4)]"
                    />
                  </div>

                  <p className="font-inter text-white/40 text-[10px] uppercase tracking-[0.2em] mb-2">
                    Countdown to Event
                  </p>
                  <Countdown targetDate={eventDate} />

                  {/* Date visual */}
                  <div className="mt-8 flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="w-14 h-14 bg-[var(--color-dhruvam-gold)] rounded-xl flex flex-col items-center justify-center shrink-0">
                      <span className="font-montserrat font-black text-[#020B1C] text-xl leading-none">
                        {eventDate.getDate()}
                      </span>
                      <span className="font-inter text-[#020B1C]/70 text-[10px] uppercase tracking-wider">
                        {eventDate.toLocaleString("default", { month: "short" })}
                      </span>
                    </div>
                    <div>
                      <p className="font-poppins font-semibold text-sm text-white">
                        {eventDate.getFullYear()}
                      </p>
                      <p className="font-inter text-xs text-white/40">{featured.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : loaded ? (
          <EmptyState
            icon={CalendarClock}
            title="No upcoming events yet"
            subtitle="Check back soon — new events will appear here as they're scheduled."
          />
        ) : (
          <div className="mb-16">
            <SkeletonRow count={1} className="w-full h-72 rounded-3xl" />
          </div>
        )}

        {/* Other upcoming events */}
        {upcoming.length > 0 && (
          <div>
            <img
              src="/assets/dhruvam/ui/dividers/gold.svg"
              alt=""
              aria-hidden="true"
              className="w-full max-w-sm mx-auto mb-10 opacity-50"
            />

            <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
              {upcoming.map((ev, i) => {
                const date = new Date(ev.date);
                const eventNum = String(i + 2).padStart(2, "0");
                const isOpen = expandedId === ev._id;
                return (
                  <motion.div
                    key={ev._id}
                    data-event-card
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4 }}
                    onClick={() => setExpandedId(isOpen ? null : ev._id)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isOpen}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setExpandedId(isOpen ? null : ev._id);
                      }
                    }}
                    className={`group relative flex-shrink-0 w-[85vw] sm:w-80 snap-start cursor-pointer bg-white/[0.04] border rounded-2xl p-5 transition-all duration-300 overflow-hidden ${
                      isOpen ? "border-[var(--color-dhruvam-gold-light)]/50" : "border-white/10 hover:border-[var(--color-dhruvam-gold-light)]/30"
                    }`}
                  >
                    {/* Gold left border on hover/open */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--color-dhruvam-gold-light)] transition-transform duration-300 origin-top rounded-l-2xl ${
                        isOpen ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
                      }`}
                    />

                    {/* Ghost event number */}
                    <span
                      className="absolute top-3 right-4 font-montserrat font-black text-4xl text-white/[0.06] select-none pointer-events-none"
                      aria-hidden="true"
                    >
                      {eventNum}
                    </span>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[var(--color-dhruvam-gold)]/10 border border-[var(--color-dhruvam-gold-light)]/20 rounded-xl flex flex-col items-center justify-center shrink-0">
                        <span className="font-montserrat font-black text-base text-[var(--color-dhruvam-gold-light)] leading-none">
                          {date.getDate()}
                        </span>
                        <span className="text-[9px] text-white/50 uppercase tracking-wider">
                          {date.toLocaleString("default", { month: "short" })}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-poppins font-semibold text-sm text-white group-hover:text-[var(--color-dhruvam-gold-light)] transition-colors mb-1">
                            {ev.title}
                          </h4>
                          <ChevronDown
                            size={14}
                            className={`shrink-0 mt-0.5 text-white/40 transition-transform duration-300 ${isOpen ? "rotate-180 text-[var(--color-dhruvam-gold-light)]" : ""}`}
                          />
                        </div>
                        <p className="font-inter text-xs text-white/40 truncate">{ev.location}</p>
                        <p className="font-inter text-xs text-white/40 mt-0.5">{ev.time}</p>
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && ev.description && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="font-inter text-xs text-white/60 leading-relaxed pt-4 mt-4 border-t border-white/10">
                            {ev.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Scroll progress dots */}
            {upcoming.length > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-6">
                {upcoming.map((ev, i) => (
                  <button
                    key={ev._id}
                    type="button"
                    onClick={() => scrollToIndex(i)}
                    aria-label={`Go to event ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "w-6 bg-[var(--color-dhruvam-gold-light)]" : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
