"use client";

import { motion } from "framer-motion";
import { MessageSquare, Send } from "lucide-react";

const contacts = [
  {
    name: "Rtr. Tamizhselvi",
    role: "President",
    phone: "+91 9080161324",
    accent: "var(--color-dhruvam-gold-light)",
  },
  {
    name: "Rtr. Akshara K",
    role: "Secretary Administration",
    phone: "+91 6383194464",
    accent: "var(--color-aurora-teal)",
  },
  {
    name: "Rtr. Umang Jaiswal N",
    role: "Secretary Communication",
    phone: "+91 8098468572",
    accent: "var(--color-aurora-blue)",
  },
];

const inputCls =
  "w-full bg-transparent border-0 border-b border-white/20 rounded-none px-1 py-3 text-sm font-inter text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--color-aurora-cyan)] focus:ring-0 transition-colors shadow-none focus:shadow-[0_1px_0_var(--color-aurora-cyan)]";

export default function Contact() {
  return (
    <section id="contact" className="py-12 md:py-20 lg:py-28 relative overflow-hidden">
      <img
        src="/assets/dhruvam/decorations/shooting-star.svg"
        alt=""
        aria-hidden="true"
        className="absolute top-10 right-10 w-16 h-16 opacity-40 pointer-events-none hidden md:block"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <div className="mb-8 sm:mb-10 md:mb-16">
          <div className="flex items-center gap-3 mb-2 sm:mb-4">
            <div className="h-px w-8 sm:w-10 bg-[var(--color-dhruvam-gold-light)]/60" />
            <span className="font-inter text-[var(--color-dhruvam-gold-light)] text-xs font-semibold tracking-[0.2em] uppercase">Get in Touch</span>
          </div>
          <h2 className="font-montserrat font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
            Connect <span className="text-[var(--color-dhruvam-gold-light)]">With Us</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10">

          {/* Left — contacts + quick links */}
          <motion.div
            className="lg:col-span-2 space-y-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {contacts.map((c) => (
              <div
                key={c.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-[var(--color-dhruvam-gold-light)]/30 transition-colors flex items-center gap-4"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `color-mix(in srgb, ${c.accent} 15%, transparent)` }}
                >
                  <img src="/assets/dhruvam/icons/outline/phone.svg" alt="" aria-hidden="true" className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-poppins font-semibold text-sm text-white truncate">{c.name}</p>
                  <p className="font-inter text-xs mb-0.5" style={{ color: c.accent }}>{c.role}</p>
                  <a
                    href={`tel:${c.phone.replace(/\s/g, "")}`}
                    className="font-inter text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {c.phone}
                  </a>
                </div>
              </div>
            ))}

            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href="mailto:rotaractsmartcity@gmail.com"
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-[var(--color-dhruvam-gold-light)]/30 hover:-translate-y-0.5 transition-all flex flex-col items-center gap-3"
              >
                <img src="/assets/dhruvam/icons/outline/contact.svg" alt="" aria-hidden="true" className="w-6 h-6" />
                <span className="font-inter font-medium text-sm text-white">Email Us</span>
              </a>
              <a
                href="#"
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-[var(--color-aurora-emerald)]/40 hover:-translate-y-0.5 transition-all flex flex-col items-center gap-3"
              >
                <MessageSquare size={24} className="text-[var(--color-aurora-emerald)]" />
                <span className="font-inter font-medium text-sm text-white">WhatsApp</span>
              </a>
            </div>

            {/* Location chip */}
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <img src="/assets/dhruvam/icons/outline/location.svg" alt="" aria-hidden="true" className="w-5 h-5 shrink-0" />
              <span className="font-inter text-sm text-white/50">Coimbatore, Tamil Nadu, India — District 3206</span>
            </div>
          </motion.div>

          {/* Right — contact form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/10">
              <h3 className="font-montserrat font-bold text-2xl text-white mb-2">Send a Message</h3>
              <p className="font-inter text-sm text-white/50 mb-8">We&apos;ll get back to you within 24 hours.</p>

              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-first-name" className="font-inter text-xs font-semibold text-white/70 uppercase tracking-wider">First Name</label>
                    <input id="contact-first-name" type="text" className={inputCls} placeholder="John" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="contact-last-name" className="font-inter text-xs font-semibold text-white/70 uppercase tracking-wider">Last Name</label>
                    <input id="contact-last-name" type="text" className={inputCls} placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="font-inter text-xs font-semibold text-white/70 uppercase tracking-wider">Email Address</label>
                  <input id="contact-email" type="email" className={inputCls} placeholder="john@example.com" />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="font-inter text-xs font-semibold text-white/70 uppercase tracking-wider">Subject</label>
                  <input id="contact-subject" type="text" className={inputCls} placeholder="How can we help?" />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="font-inter text-xs font-semibold text-white/70 uppercase tracking-wider">Message</label>
                  <textarea id="contact-message" rows={4} className={inputCls + " resize-none"} placeholder="Tell us more..." />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[var(--color-dhruvam-gold)] hover:bg-[var(--color-dhruvam-gold-light)] text-[var(--color-dhruvam-950)] py-4 rounded-xl font-poppins font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-[0_0_24px_rgba(246,181,27,0.35)] hover:-translate-y-0.5"
                >
                  Send Message <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
