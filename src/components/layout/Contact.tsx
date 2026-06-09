"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MessageSquare, Send, MapPin } from "lucide-react";

const contacts = [
  {
    name: "Rtr. Tamizhselvi",
    role: "President",
    phone: "+91 9080161324",
    accent: "#C8102E",
    bg: "#FFF0F3",
  },
  {
    name: "Rtr. Akshara K",
    role: "Secretary Administration",
    phone: "+91 6383194464",
    accent: "#F0A500",
    bg: "#FFF9EB",
  },
  {
    name: "Rtr. Umang Jaiswal N",
    role: "Secretary Communication",
    phone: "+91 8098468572",
    accent: "#003DA5",
    bg: "#EEF3FF",
  },
];

const inputCls =
  "w-full bg-[var(--color-cream)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm font-inter text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--color-rotaract-red)]/30 focus:border-[var(--color-rotaract-red)] transition-all";

export default function Contact() {
  return (
    <section id="contact" className="py-28 bg-[var(--color-cream)] relative overflow-hidden">
      {/* Background blob */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[var(--color-rotaract-red)]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-[var(--color-rotaract-red)]" />
            <span className="font-inter text-[var(--color-rotaract-red)] text-xs font-semibold tracking-[0.2em] uppercase">Get in Touch</span>
          </div>
          <h2 className="font-montserrat font-black text-4xl md:text-5xl text-[var(--color-charcoal)] leading-tight">
            Connect <span className="text-[var(--color-rotaract-red)]">With Us</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">

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
                className="bg-white rounded-2xl p-5 border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: c.bg }}
                >
                  <Phone size={18} style={{ color: c.accent }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-poppins font-semibold text-sm text-[var(--color-charcoal)] truncate">{c.name}</p>
                  <p className="font-inter text-xs mb-0.5" style={{ color: c.accent }}>{c.role}</p>
                  <a
                    href={`tel:${c.phone.replace(/\s/g, "")}`}
                    className="font-inter text-sm text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)] transition-colors"
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
                className="bg-white rounded-2xl p-5 border border-[var(--border)] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col items-center gap-3"
              >
                <Mail size={24} className="text-[var(--color-rotaract-red)]" />
                <span className="font-inter font-medium text-sm text-[var(--color-charcoal)]">Email Us</span>
              </a>
              <a
                href="#"
                className="bg-white rounded-2xl p-5 border border-[var(--border)] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col items-center gap-3"
              >
                <MessageSquare size={24} className="text-emerald-500" />
                <span className="font-inter font-medium text-sm text-[var(--color-charcoal)]">WhatsApp</span>
              </a>
            </div>

            {/* Location chip */}
            <div className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-[var(--border)]">
              <MapPin size={18} className="text-[var(--color-rotaract-red)] shrink-0" />
              <span className="font-inter text-sm text-[var(--color-warm-gray)]">Coimbatore, Tamil Nadu, India — District 3206</span>
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
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-[var(--border)] shadow-md">
              <h3 className="font-montserrat font-bold text-2xl text-[var(--color-charcoal)] mb-2">Send a Message</h3>
              <p className="font-inter text-sm text-[var(--color-warm-gray)] mb-8">We&apos;ll get back to you within 24 hours.</p>

              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="font-inter text-xs font-semibold text-[var(--color-charcoal)] uppercase tracking-wider">First Name</label>
                    <input type="text" className={inputCls} placeholder="John" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-inter text-xs font-semibold text-[var(--color-charcoal)] uppercase tracking-wider">Last Name</label>
                    <input type="text" className={inputCls} placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-inter text-xs font-semibold text-[var(--color-charcoal)] uppercase tracking-wider">Email Address</label>
                  <input type="email" className={inputCls} placeholder="john@example.com" />
                </div>

                <div className="space-y-1.5">
                  <label className="font-inter text-xs font-semibold text-[var(--color-charcoal)] uppercase tracking-wider">Subject</label>
                  <input type="text" className={inputCls} placeholder="How can we help?" />
                </div>

                <div className="space-y-1.5">
                  <label className="font-inter text-xs font-semibold text-[var(--color-charcoal)] uppercase tracking-wider">Message</label>
                  <textarea rows={4} className={inputCls + " resize-none"} placeholder="Tell us more..." />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[var(--color-rotaract-red)] hover:bg-[#a50d26] text-white py-4 rounded-xl font-poppins font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
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
