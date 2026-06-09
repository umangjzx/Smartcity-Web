"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users, Briefcase, Globe2, Mic2, HeartHandshake, Star } from "lucide-react";

const benefits = [
  { icon: Users,          label: "Leadership Opportunities",  desc: "Lead projects and teams from day one" },
  { icon: Briefcase,      label: "Professional Development",  desc: "Workshops, mentorship, and career growth" },
  { icon: Globe2,         label: "International Exposure",    desc: "Collaborate with Rotaractors worldwide" },
  { icon: Mic2,           label: "Public Speaking",           desc: "Build confidence in front of an audience" },
  { icon: HeartHandshake, label: "Community Service",         desc: "Create real impact in people's lives" },
  { icon: Star,           label: "Networking",                desc: "Connect with professionals and leaders" },
];

export default function Membership() {
  return (
    <section id="join" className="py-28 bg-[var(--color-charcoal)] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[var(--color-rotaract-red)] opacity-[0.12] blur-[100px]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[var(--color-royal-blue)] opacity-[0.12] blur-[80px]" />

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-rotary-gold)]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-[var(--color-rotary-gold)]" />
              <span className="font-inter text-[var(--color-rotary-gold)] text-xs font-semibold tracking-[0.2em] uppercase">Membership</span>
            </div>

            <h2 className="font-montserrat font-black text-4xl md:text-5xl text-white leading-tight mb-6">
              Become a<br />
              <span className="text-[var(--color-rotary-gold)]">Rotaractor</span>
            </h2>

            <p className="font-inter text-white/60 text-lg leading-relaxed mb-10">
              Join a global network of young leaders aged 18–30, dedicated to creating positive change while building professional skills that last a lifetime.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="group inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-rotaract-red)] hover:bg-[#a50d26] text-white rounded-full font-poppins font-semibold text-sm transition-all shadow-[0_8px_30px_rgba(200,16,46,0.3)] hover:shadow-[0_12px_40px_rgba(200,16,46,0.4)] hover:-translate-y-0.5">
                Apply Now
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 hover:border-white/40 text-white/80 hover:text-white rounded-full font-poppins font-semibold text-sm transition-all">
                Learn More
              </button>
            </div>
          </motion.div>

          {/* Right — benefits grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-rotary-gold)]/10 flex items-center justify-center mb-3 group-hover:bg-[var(--color-rotary-gold)]/20 transition-colors">
                    <Icon size={18} className="text-[var(--color-rotary-gold)]" />
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
