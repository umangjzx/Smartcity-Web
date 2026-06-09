"use client";

import { motion } from "framer-motion";
import { Star, Trophy, Globe, Users } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "Best New Club Award",
    year: "2022",
    body: "District 3206",
    gradient: "from-[#F0A500] to-[#FFD97D]",
    bg: "#FFF9EB",
    iconColor: "#F0A500",
  },
  {
    icon: Globe,
    title: "International Recognition",
    year: "2023",
    body: "Rotaract International",
    gradient: "from-[#003DA5] to-[#4A7FD4]",
    bg: "#EEF3FF",
    iconColor: "#003DA5",
  },
  {
    icon: Users,
    title: "Community Service Excellence",
    year: "2024",
    body: "District 3206",
    gradient: "from-[#C8102E] to-[#E74C6F]",
    bg: "#FFF0F3",
    iconColor: "#C8102E",
  },
  {
    icon: Star,
    title: "Youth Leadership Impact",
    year: "2025",
    body: "Regional Council",
    gradient: "from-[#7C3AED] to-[#A78BFA]",
    bg: "#F5F0FF",
    iconColor: "#7C3AED",
  },
];

const testimonials = [
  {
    quote: "Joining Rotaract was the best decision of my life. The leadership skills and friendships I gained are truly priceless.",
    name: "Rtr. Priya S.",
    role: "Past Member, 2023",
    avatar: "https://ui-avatars.com/api/?name=Priya+S&background=C8102E&color=fff&size=128",
  },
  {
    quote: "The club gave me a platform to serve my community and grow as a professional. The network here is absolutely incredible.",
    name: "Rtr. Arjun K.",
    role: "Member, 2025",
    avatar: "https://ui-avatars.com/api/?name=Arjun+K&background=003DA5&color=fff&size=128",
  },
  {
    quote: "Through their professional development sessions, I secured my dream job. I'm grateful for every moment here.",
    name: "Rtr. Divya R.",
    role: "Alumni, 2024",
    avatar: "https://ui-avatars.com/api/?name=Divya+R&background=F0A500&color=fff&size=128",
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-[var(--color-rotaract-red)]" />
            <span className="font-inter text-[var(--color-rotaract-red)] text-xs font-semibold tracking-[0.2em] uppercase">Recognition</span>
          </div>
          <h2 className="font-montserrat font-black text-4xl md:text-5xl text-[var(--color-charcoal)] leading-tight">
            Awards & <span className="text-[var(--color-rotary-gold)]">Achievements</span>
          </h2>
        </div>

        {/* Award cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-24">
          {achievements.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative bg-white border border-[var(--border)] rounded-3xl p-7 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Top gradient strip */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${a.gradient} rounded-t-3xl`} />

                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                  style={{ background: a.bg }}
                >
                  <Icon size={26} style={{ color: a.iconColor }} />
                </div>

                <h3 className="font-poppins font-bold text-base text-[var(--color-charcoal)] mb-2 leading-snug">{a.title}</h3>
                <p className="font-inter text-sm text-[var(--color-warm-gray)]">{a.body}</p>
                <p className="font-montserrat font-black text-3xl mt-3" style={{ color: a.iconColor, opacity: 0.55 }}>{a.year}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="bg-[var(--color-cream)] rounded-3xl p-8 md:p-12">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-[var(--color-rotaract-red)]" />
              <span className="font-inter text-[var(--color-rotaract-red)] text-xs font-semibold tracking-[0.2em] uppercase">Member Stories</span>
            </div>
            <h3 className="font-montserrat font-black text-3xl md:text-4xl text-[var(--color-charcoal)]">
              What Our Members Say
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-7 border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} size={13} className="text-[var(--color-rotary-gold)] fill-[var(--color-rotary-gold)]" />
                  ))}
                </div>

                <p className="font-inter text-[var(--color-charcoal)] text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-5 border-t border-[var(--border)]">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-poppins font-semibold text-sm text-[var(--color-charcoal)]">{t.name}</p>
                    <p className="font-inter text-xs text-[var(--color-warm-gray)]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
