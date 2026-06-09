"use client";

import { motion } from "framer-motion";
import { Users, HeartHandshake, Briefcase, Globe2, Megaphone } from "lucide-react";

const avenues = [
  {
    title: "Club Service",
    description: "Fostering fellowship, leadership, and member development within the club.",
    icon: Users,
    accent: "#C8102E",
    bg: "#FFF0F3",
    number: "01",
  },
  {
    title: "Community Service",
    description: "Creating measurable positive impact across Coimbatore and beyond.",
    icon: HeartHandshake,
    accent: "#F0A500",
    bg: "#FFF9EB",
    number: "02",
  },
  {
    title: "Professional Development",
    description: "Equipping members with career skills, mentorship, and industry exposure.",
    icon: Briefcase,
    accent: "#003DA5",
    bg: "#EEF3FF",
    number: "03",
  },
  {
    title: "International Service",
    description: "Building global understanding through cross-cultural collaboration.",
    icon: Globe2,
    accent: "#7C3AED",
    bg: "#F5F0FF",
    number: "04",
  },
  {
    title: "Public Relations",
    description: "Amplifying our mission through strategic brand building and outreach.",
    icon: Megaphone,
    accent: "#059669",
    bg: "#ECFDF5",
    number: "05",
  },
];

export default function Avenues() {
  return (
    <section id="avenues" className="py-28 bg-[var(--color-cream)] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute bottom-0 right-0 w-1/3 h-full opacity-30">
        <div className="w-full h-full bg-gradient-to-tl from-[var(--color-rotaract-red)]/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-[var(--color-rotaract-red)]" />
              <span className="font-inter text-[var(--color-rotaract-red)] text-xs font-semibold tracking-[0.2em] uppercase">Core Pillars</span>
            </div>
            <h2 className="font-montserrat font-black text-4xl md:text-5xl text-[var(--color-charcoal)] leading-tight">
              Five Avenues<br />of <span className="text-[var(--color-rotaract-red)]">Service</span>
            </h2>
          </div>
          <p className="font-inter text-[var(--color-warm-gray)] text-lg leading-relaxed">
            Our work is guided by five core service avenues that ensure holistic growth for our members and lasting impact for our community.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {avenues.map((av, i) => {
            const Icon = av.icon;
            return (
              <motion.div
                key={av.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`group bg-white rounded-3xl p-8 border border-[var(--border)] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-default relative overflow-hidden ${
                  i === 4 ? "md:col-start-1 lg:col-start-auto" : ""
                }`}
              >
                {/* Large number watermark */}
                <span
                  className="absolute top-4 right-5 font-montserrat font-black text-6xl leading-none select-none transition-all duration-300"
                  style={{ color: av.accent, opacity: 0.55 }}
                >
                  {av.number}
                </span>

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{ background: av.bg }}
                >
                  <Icon size={26} style={{ color: av.accent }} />
                </div>

                {/* Content */}
                <h3 className="font-poppins font-bold text-lg text-[var(--color-charcoal)] mb-2 group-hover:text-[var(--color-rotaract-red)] transition-colors">
                  {av.title}
                </h3>
                <p className="font-inter text-sm text-[var(--color-warm-gray)] leading-relaxed">{av.description}</p>

                {/* Bottom accent line on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-3xl"
                  style={{ background: av.accent }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
