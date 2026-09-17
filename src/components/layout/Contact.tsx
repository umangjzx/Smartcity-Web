"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MessageSquare, Phone } from "lucide-react";
import { backgrounds } from "@/lib/dhruvamAssets";

const contacts = [
  {
    name: "Rtr. Nirmal Kumar K",
    role: "President",
    phone: "+91 9500575064",
    image: "/photos/nirmal-kumar-k.jpg",
    accent: "var(--color-dhruvam-gold-light)",
    borderColor: "rgba(255,214,90,0.4)",
    bgColor: "rgba(255,214,90,0.07)",
  },
  {
    name: "Rtr. Akshara K",
    role: "Secretary Administration",
    phone: "+91 6383194464",
    image: "/photos/akshara-k.jpg",
    accent: "var(--color-aurora-teal)",
    borderColor: "rgba(47,191,166,0.4)",
    bgColor: "rgba(47,191,166,0.07)",
  },
  {
    name: "Rtr. Umang Jaiswal N",
    role: "Secretary Communication",
    phone: "+91 8098468572",
    image: "/photos/umang-jaiswal-n.jpg",
    accent: "var(--color-aurora-blue)",
    borderColor: "rgba(74,127,217,0.4)",
    bgColor: "rgba(74,127,217,0.07)",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden">
      {/* Lighthouse atmospheric layer */}
      <div
        className="absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none opacity-[0.12] mix-blend-screen"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 50%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 50%)",
        }}
      >
        <Image src={backgrounds.lighthouseNight} alt="" fill sizes="50vw" className="object-cover object-right" />
      </div>

      {/* Enlarged shooting-star decoration */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="absolute top-10 right-8 w-32 h-16 opacity-50 pointer-events-none hidden md:block"
        style={{ rotate: "-12deg" }}
      >
        <img src="/assets/dhruvam/decorations/shooting-star.svg" alt="" aria-hidden="true" className="w-full h-full" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-[var(--color-dhruvam-gold-light)]/60" />
            <span className="font-inter text-[var(--color-dhruvam-gold-light)] text-xs font-semibold tracking-[0.2em] uppercase">
              Get in Touch
            </span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-h1 text-white"
          >
            Connect{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-dhruvam-gold-light)] to-[var(--color-dhruvam-gold-deep)]">
              With Us
            </span>
          </motion.h2>
        </div>

        {/* Leadership / key contacts */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {contacts.map((c, i) => {
            const telHref = `tel:${c.phone.replace(/\s/g, "")}`;
            const waHref = `https://wa.me/${c.phone.replace(/[\s+]/g, "")}`;
            return (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative flex flex-col items-center text-center gap-2 rounded-2xl px-5 py-6 sm:px-6 sm:py-7 border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300 overflow-hidden hover:-translate-y-1"
                style={{ background: `linear-gradient(180deg, ${c.bgColor}, rgba(255,255,255,0.02) 65%)` }}
              >
                {/* Sliding top accent border */}
                <div
                  className="absolute left-0 right-0 top-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  style={{ background: c.accent }}
                />

                <div
                  className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shrink-0"
                  style={{ boxShadow: `0 0 0 2px ${c.borderColor}, 0 8px 20px rgba(0,0,0,0.35)` }}
                >
                  <Image src={c.image} alt={c.name} fill sizes="(min-width: 640px) 80px, 64px" className="object-cover object-top" />
                </div>

                <div>
                  <p className="font-poppins font-bold text-base sm:text-lg text-white leading-snug">{c.name}</p>
                  <p
                    className="font-inter text-xs sm:text-sm font-semibold uppercase tracking-wide mt-1"
                    style={{ color: c.accent }}
                  >
                    {c.role}
                  </p>
                </div>

                <div className="mt-1.5 grid grid-cols-2 gap-2 w-full">
                  <a
                    href={telHref}
                    title={c.phone}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border px-3 py-2 font-inter text-xs sm:text-sm font-semibold text-white/80 hover:text-[var(--color-dhruvam-950)] hover:bg-[var(--contact-accent)] transition-colors duration-300"
                    style={{ borderColor: c.borderColor, "--contact-accent": c.accent } as React.CSSProperties}
                  >
                    <Phone size={14} />
                    Call
                  </a>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`WhatsApp ${c.name}`}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[var(--color-aurora-emerald)]/40 px-3 py-2 font-inter text-xs sm:text-sm font-semibold text-white/80 hover:text-[var(--color-dhruvam-950)] hover:bg-[var(--color-aurora-emerald)] transition-colors duration-300"
                  >
                    <MessageSquare size={14} />
                    WhatsApp
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick actions + location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <a
            href="mailto:rotaractsmartcity@gmail.com"
            className="group flex items-center justify-center gap-2.5 bg-white/5 border border-white/10 hover:border-[var(--color-dhruvam-gold-light)]/30 rounded-2xl py-4 px-6 transition-all hover:-translate-y-1 mb-3"
          >
            <img src="/assets/dhruvam/icons/outline/contact.svg" alt="" aria-hidden="true" className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="font-inter font-semibold text-sm sm:text-base text-white/85">Email Us</span>
          </a>

          {/* Location chip */}
          <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-4 border border-white/10">
            <img src="/assets/dhruvam/icons/outline/location.svg" alt="" aria-hidden="true" className="w-5 h-5 shrink-0" />
            <span className="font-inter text-sm text-white/50">
              Coimbatore, Tamil Nadu, India — District 3206
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
