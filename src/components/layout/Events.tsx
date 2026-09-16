"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CalendarClock } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import DhruvamCard from "@/components/ui/DhruvamCard";

type Event = {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  time: string;
  isFeatured: boolean;
};

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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
      {units.map(({ v, l }, i) => (
        <div key={l} className="text-center">
          <div className={`rounded-lg sm:rounded-2xl py-2 sm:py-4 px-1 sm:px-2 font-montserrat font-black text-xl sm:text-3xl md:text-4xl border ${
            i === 0 || i === 3
              ? "bg-[var(--color-dhruvam-gold)] text-[var(--color-dhruvam-950)] border-[var(--color-dhruvam-gold)]"
              : "bg-white/5 text-white border-white/10"
          }`}>
            {String(v).padStart(2, "0")}
          </div>
          <p className="font-inter text-[8px] sm:text-[10px] text-white/45 uppercase tracking-wider mt-1 sm:mt-2">{l}</p>
        </div>
      ))}
    </div>
  );
}

export default function Events() {
  const [featured, setFeatured] = useState<Event | null>(null);
  const [upcoming, setUpcoming] = useState<Event[]>([]);
  const [loaded, setLoaded] = useState(false);

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
    <section id="events" className="py-12 md:py-20 lg:py-28 relative overflow-hidden">
      {/* Lighthouse glow backdrop — the light that marks what's next */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none"
        style={{ backgroundImage: "url('/assets/dhruvam/backgrounds/lighthouse-night.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      />

      {/* Decorative telescope penguin — watching for what's next */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="absolute bottom-4 -left-6 lg:left-2 z-0 w-24 lg:w-32 opacity-50 pointer-events-none mix-blend-screen hidden sm:block"
      >
        <img
          src="/assets/dhruvam/characters/penguin-telescope.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-auto drop-shadow-2xl rounded-3xl"
          style={{ maskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)" }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        <SectionHeader 
          title="Upcoming Events"
          subtitle="What's Next on the Path"
          align="center"
        />

        {/* Featured event card */}
        {featured && eventDate ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <DhruvamCard className="!p-0 overflow-hidden" hoverEffect={false}>
            <div className="grid lg:grid-cols-2">
              {/* Event info */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-[#F6B51B]/10 text-[#F6B51B] text-xs font-semibold font-inter px-3 py-1.5 rounded-full mb-6 w-fit">
                  <img src="/assets/dhruvam/effects/guiding-star.svg" alt="" aria-hidden="true" className="w-3.5 h-3.5" /> Featured Event
                </div>

                <h3 className="font-montserrat font-black text-2xl md:text-3xl text-[#FBFAFF] mb-4 leading-snug">
                  {featured.title}
                </h3>
                <p className="font-inter text-[#E3E9F3]/80 text-base leading-relaxed mb-8">
                  {featured.description}
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    { icon: "/assets/dhruvam/icons/filled/events.svg", label: eventDate.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) },
                    { icon: "/assets/dhruvam/icons/outline/location.svg", label: featured.location },
                    { icon: "/assets/dhruvam/icons/outline/time.svg", label: featured.time },
                  ].map(({ icon, label }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-[#FBFAFF]/5 border border-[#FBFAFF]/10">
                        <img src={icon} alt="" aria-hidden="true" className="w-4 h-4" />
                      </div>
                      <span className="font-inter text-sm text-[#FBFAFF]/90 font-medium">{label}</span>
                    </div>
                  ))}
                </div>

                <button className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#F6B51B] hover:bg-[#FFD05A] text-[#020B1C] rounded-full font-poppins font-semibold text-sm transition-all w-fit shadow-md hover:shadow-[0_0_20px_rgba(246,181,27,0.35)]">
                  Register Now
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Countdown */}
              <div className="bg-[#020B1C]/40 border-l border-[#FBFAFF]/10 p-8 md:p-12 flex flex-col justify-center relative">
                
                {/* Badge */}
                <img 
                  src="/assets/dhruvam/ui/badges/upcoming.svg" 
                  alt="Upcoming" 
                  className="absolute -top-6 -right-6 w-20 h-20 md:w-24 md:h-24 z-30 drop-shadow-[0_4px_12px_rgba(47,191,166,0.3)]" 
                />

                <p className="font-poppins font-bold text-[#FBFAFF] text-sm uppercase tracking-wider mb-6">Countdown to Event</p>
                <Countdown targetDate={eventDate} />

                {/* Date visual */}
                <div className="mt-8 flex items-center gap-4 p-4 bg-[#FBFAFF]/5 rounded-2xl border border-[#FBFAFF]/10">
                  <div className="w-14 h-14 bg-[#F6B51B] rounded-xl flex flex-col items-center justify-center shrink-0">
                    <span className="font-montserrat font-black text-[#020B1C] text-xl leading-none">{eventDate.getDate()}</span>
                    <span className="font-inter text-[#020B1C]/70 text-[10px] uppercase tracking-wider">{eventDate.toLocaleString("default", { month: "short" })}</span>
                  </div>
                  <div>
                    <p className="font-poppins font-semibold text-sm text-[#FBFAFF]">{eventDate.getFullYear()}</p>
                    <p className="font-inter text-xs text-[#93A6C6]">{featured.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </DhruvamCard>
        </motion.div>
        ) : loaded ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <CalendarClock size={40} className="text-[#93A6C6]/50 mb-4" />
            <p className="font-poppins font-semibold text-[#FBFAFF] mb-1">No upcoming events yet</p>
            <p className="font-inter text-sm text-[#93A6C6]">Check back soon — new events will appear here as they&apos;re scheduled.</p>
          </div>
        ) : null}

        {/* Other upcoming events — a path of markers */}
        {upcoming.length > 0 && (
          <div className="relative">
            <img src="/assets/dhruvam/ui/dividers/gold.svg" alt="" aria-hidden="true" className="w-full max-w-md mx-auto mb-10 opacity-70" />
            {/* Horizontal constellation line linking events on desktop */}
            <div className="hidden sm:block absolute top-1/2 left-0 w-full h-px border-t border-dashed border-[#F6B51B]/30 -z-10 -translate-y-1/2" />
            
            <div className="grid sm:grid-cols-3 gap-8 sm:gap-5">
              {upcoming.map((ev, i) => (
                <motion.div
                  key={ev._id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative"
                >
                  <DhruvamCard className="flex gap-4 p-5 items-center" hoverEffect={true}>
                    <div className="w-12 h-12 bg-[#FBFAFF]/5 border border-[#FBFAFF]/10 rounded-xl flex flex-col items-center justify-center shrink-0">
                      <span className="font-montserrat font-black text-base text-[#F6B51B]">{new Date(ev.date).getDate()}</span>
                      <span className="text-[9px] text-[#E3E9F3]/60 uppercase tracking-wider">{new Date(ev.date).toLocaleString("default", { month: "short" })}</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-poppins font-semibold text-sm text-[#FBFAFF] truncate">{ev.title}</h4>
                      <p className="font-inter text-xs text-[#93A6C6] truncate mt-0.5">{ev.location}</p>
                      <p className="font-inter text-xs text-[#93A6C6] mt-0.5">{ev.time}</p>
                    </div>
                  </DhruvamCard>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
