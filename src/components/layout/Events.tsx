"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";

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
              ? "bg-[var(--color-rotaract-red)] text-white border-[var(--color-rotaract-red)]"
              : "bg-[var(--color-charcoal)] text-white border-[var(--color-charcoal)]"
          }`}>
            {String(v).padStart(2, "0")}
          </div>
          <p className="font-inter text-[8px] sm:text-[10px] text-[var(--color-warm-gray)] uppercase tracking-wider mt-1 sm:mt-2">{l}</p>
        </div>
      ))}
    </div>
  );
}

export default function Events() {
  const [featured, setFeatured] = useState<Event | null>(null);
  const [upcoming, setUpcoming] = useState<Event[]>([]);

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
      .catch(() => {});
  }, []);

  const fallbackDate = new Date(2026, 7, 15);
  const display = featured ?? {
    _id: "fb",
    title: "Global Leadership Summit 2026",
    description: "A transformative two-day summit featuring international speakers, networking sessions, and leadership workshops for young professionals.",
    date: fallbackDate.toISOString(),
    location: "Taj Vivanta, Coimbatore",
    time: "09:00 AM – 06:00 PM",
    isFeatured: true,
  };
  const eventDate = new Date(display.date);

  return (
    <section id="events" className="py-12 md:py-20 lg:py-28 bg-[var(--color-cream)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--color-rotaract-red)]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">

        {/* Header */}
        <div className="mb-8 sm:mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-2 sm:mb-4">
            <div className="h-px w-8 sm:w-10 bg-[var(--color-rotaract-red)]" />
            <span className="font-inter text-[var(--color-rotaract-red)] text-xs font-semibold tracking-[0.2em] uppercase">What&apos;s Next</span>
          </div>
          <h2 className="font-montserrat font-black text-4xl md:text-5xl text-[var(--color-charcoal)] leading-tight">
            Upcoming <span className="text-[var(--color-rotaract-red)]">Events</span>
          </h2>
        </div>

        {/* Featured event card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-3xl border border-[var(--border)] shadow-lg overflow-hidden mb-8"
        >
          <div className="grid lg:grid-cols-2">
            {/* Event info */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-[var(--color-rotaract-red)]/10 text-[var(--color-rotaract-red)] text-xs font-semibold font-inter px-3 py-1.5 rounded-full mb-6 w-fit">
                ★ Featured Event
              </div>

              <h3 className="font-montserrat font-black text-2xl md:text-3xl text-[var(--color-charcoal)] mb-4 leading-snug">
                {display.title}
              </h3>
              <p className="font-inter text-[var(--color-warm-gray)] text-base leading-relaxed mb-8">
                {display.description}
              </p>

              <div className="space-y-3 mb-8">
                {[
                  { icon: Calendar, label: eventDate.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }), color: "text-[var(--color-rotary-gold)]", bg: "#FFF9EB" },
                  { icon: MapPin,   label: display.location, color: "text-[var(--color-rotaract-red)]", bg: "#FFF0F3" },
                  { icon: Clock,    label: display.time,     color: "text-[var(--color-royal-blue)]",   bg: "#EEF3FF" },
                ].map(({ icon: Icon, label, color, bg }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg }}>
                      <Icon size={16} className={color} />
                    </div>
                    <span className="font-inter text-sm text-[var(--color-charcoal)] font-medium">{label}</span>
                  </div>
                ))}
              </div>

              <button className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--color-charcoal)] hover:bg-[var(--color-rotaract-red)] text-white rounded-full font-poppins font-semibold text-sm transition-all w-fit shadow-md hover:shadow-lg">
                Register Now
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Countdown */}
            <div className="bg-[var(--color-cream)] border-l border-[var(--border)] p-8 md:p-12 flex flex-col justify-center">
              <p className="font-poppins font-bold text-[var(--color-charcoal)] text-sm uppercase tracking-wider mb-6">Countdown to Event</p>
              <Countdown targetDate={eventDate} />

              {/* Date visual */}
              <div className="mt-8 flex items-center gap-4 p-4 bg-white rounded-2xl border border-[var(--border)]">
                <div className="w-14 h-14 bg-[var(--color-rotaract-red)] rounded-xl flex flex-col items-center justify-center shrink-0">
                  <span className="font-montserrat font-black text-white text-xl leading-none">{eventDate.getDate()}</span>
                  <span className="font-inter text-white/80 text-[10px] uppercase tracking-wider">{eventDate.toLocaleString("default", { month: "short" })}</span>
                </div>
                <div>
                  <p className="font-poppins font-semibold text-sm text-[var(--color-charcoal)]">{eventDate.getFullYear()}</p>
                  <p className="font-inter text-xs text-[var(--color-warm-gray)]">{display.location}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other upcoming events */}
        {upcoming.length > 0 && (
          <div className="grid sm:grid-cols-3 gap-5">
            {upcoming.map((ev, i) => (
              <motion.div
                key={ev._id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-[var(--border)] p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex gap-4"
              >
                <div className="w-12 h-12 bg-[var(--color-rotary-gold)]/10 rounded-xl flex flex-col items-center justify-center shrink-0">
                  <span className="font-montserrat font-black text-base text-[var(--color-rotary-gold)]">{new Date(ev.date).getDate()}</span>
                  <span className="text-[9px] text-[var(--color-warm-gray)] uppercase tracking-wider">{new Date(ev.date).toLocaleString("default", { month: "short" })}</span>
                </div>
                <div className="min-w-0">
                  <h4 className="font-poppins font-semibold text-sm text-[var(--color-charcoal)] truncate">{ev.title}</h4>
                  <p className="font-inter text-xs text-[var(--color-warm-gray)] truncate mt-0.5">{ev.location}</p>
                  <p className="font-inter text-xs text-[var(--color-warm-gray)] mt-0.5">{ev.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
