"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MessageSquare, Send, Loader2, CheckCircle2, AlertCircle, Phone } from "lucide-react";
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

const inputCls =
  "w-full bg-transparent border-0 border-b border-white/20 px-1 py-3 text-sm font-inter text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--color-aurora-cyan)] transition-colors";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      subject: data.get("subject"),
      message: data.get("message"),
      website: data.get("website"),
    };

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Something went wrong");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden">
      {/* Lighthouse atmospheric layer — right-side bleed behind the form */}
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

        {/* Stage 1 — leadership / key contacts */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {contacts.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative flex flex-col items-center text-center gap-3 rounded-3xl px-6 py-10 sm:px-8 sm:py-12 border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300 overflow-hidden hover:-translate-y-1"
              style={{ background: `linear-gradient(180deg, ${c.bgColor}, rgba(255,255,255,0.02) 65%)` }}
            >
              {/* Sliding top accent border */}
              <div
                className="absolute left-0 right-0 top-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ background: c.accent }}
              />

              <div
                className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shrink-0"
                style={{ boxShadow: `0 0 0 3px ${c.borderColor}, 0 10px 30px rgba(0,0,0,0.35)` }}
              >
                <Image src={c.image} alt={c.name} fill sizes="(min-width: 640px) 128px, 112px" className="object-cover object-top" />
              </div>

              <div>
                <p className="font-poppins font-bold text-xl sm:text-2xl text-white leading-snug">{c.name}</p>
                <p
                  className="font-inter text-sm sm:text-base font-semibold uppercase tracking-wide mt-1.5"
                  style={{ color: c.accent }}
                >
                  {c.role}
                </p>
              </div>

              <a
                href={`tel:${c.phone.replace(/\s/g, "")}`}
                className="mt-2 inline-flex items-center gap-2.5 rounded-full border px-6 py-3 font-inter text-sm sm:text-base font-semibold text-white/80 hover:text-[var(--color-dhruvam-950)] hover:bg-[var(--contact-accent)] transition-colors duration-300"
                style={{ borderColor: c.borderColor, "--contact-accent": c.accent } as React.CSSProperties}
              >
                <Phone size={16} />
                {c.phone}
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Stage 1b — quick actions + location */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="grid sm:grid-cols-2 gap-4 lg:gap-5 mb-4 lg:mb-5">
            <a
              href="mailto:rotaractsmartcity@gmail.com"
              className="group flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:border-[var(--color-dhruvam-gold-light)]/30 rounded-2xl py-6 sm:py-7 px-6 transition-all hover:-translate-y-1"
            >
              <img src="/assets/dhruvam/icons/outline/contact.svg" alt="" aria-hidden="true" className="w-7 h-7 sm:w-8 sm:h-8" />
              <span className="font-inter font-semibold text-base sm:text-lg text-white/85">Email Us</span>
            </a>
            <a
              href="https://wa.me/919500575064"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:border-[var(--color-aurora-emerald)]/40 rounded-2xl py-6 sm:py-7 px-6 transition-all hover:-translate-y-1"
            >
              <MessageSquare size={28} className="text-[var(--color-aurora-emerald)]" />
              <span className="font-inter font-semibold text-base sm:text-lg text-white/85">WhatsApp</span>
            </a>
          </div>

          {/* Location chip */}
          <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-5 sm:p-6 border border-white/10">
            <img src="/assets/dhruvam/icons/outline/location.svg" alt="" aria-hidden="true" className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" />
            <span className="font-inter text-sm sm:text-base text-white/50">
              Coimbatore, Tamil Nadu, India — District 3206
            </span>
          </div>
        </motion.div>

        {/* Stage 2 — message form, full width */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="relative max-w-4xl mx-auto bg-white/[0.04] backdrop-blur-xl rounded-3xl p-8 sm:p-10 md:p-12 border border-white/10 overflow-hidden"
            style={{ boxShadow: "inset 0 0 60px rgba(246,181,27,0.02), 0 0 40px rgba(0,0,0,0.2)" }}
          >
            {/* Shooting star flourish on a successful send */}
            <AnimatePresence>
              {status === "success" && (
                <motion.img
                  key="send-success-star"
                  src="/assets/dhruvam/decorations/shooting-star.svg"
                  alt=""
                  aria-hidden="true"
                  initial={{ x: "-15%", y: "120%", opacity: 0, rotate: -15 }}
                  animate={{ x: "115%", y: "-30%", opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.3, ease: "easeOut" }}
                  className="absolute w-28 h-14 pointer-events-none z-30"
                />
              )}
            </AnimatePresence>

            <h3 className="font-montserrat font-bold text-2xl sm:text-3xl text-white mb-1.5">Send a Message</h3>
            <p className="font-inter text-sm sm:text-base text-white/40 mb-8 sm:mb-10">We&apos;ll get back to you within 24 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Honeypot — invisible to real visitors, tempting to bots.
                  Left un-hidden from the accessibility tree via aria-hidden
                  and skipped in tab order, so screen reader/keyboard users
                  never even know it's there. */}
              <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid sm:grid-cols-2 gap-7">
                <div className="space-y-1">
                  <label htmlFor="contact-first-name" className="font-inter text-[10px] font-semibold text-white/40 uppercase tracking-widest">
                    First Name
                  </label>
                  <input id="contact-first-name" name="firstName" required type="text" className={inputCls} placeholder="John" />
                </div>
                <div className="space-y-1">
                  <label htmlFor="contact-last-name" className="font-inter text-[10px] font-semibold text-white/40 uppercase tracking-widest">
                    Last Name
                  </label>
                  <input id="contact-last-name" name="lastName" required type="text" className={inputCls} placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="contact-email" className="font-inter text-[10px] font-semibold text-white/40 uppercase tracking-widest">
                  Email Address
                </label>
                <input id="contact-email" name="email" required type="email" className={inputCls} placeholder="john@example.com" />
              </div>

              <div className="space-y-1">
                <label htmlFor="contact-subject" className="font-inter text-[10px] font-semibold text-white/40 uppercase tracking-widest">
                  Subject
                </label>
                <input id="contact-subject" name="subject" required type="text" className={inputCls} placeholder="How can we help?" />
              </div>

              <div className="space-y-1">
                <label htmlFor="contact-message" className="font-inter text-[10px] font-semibold text-white/40 uppercase tracking-widest">
                  Message
                </label>
                <textarea id="contact-message" name="message" required rows={4} className={inputCls + " resize-none"} placeholder="Tell us more..." />
              </div>

              {status === "success" && (
                <div className="flex items-center gap-2 text-sm font-inter text-[var(--color-aurora-emerald)] bg-[var(--color-aurora-emerald)]/10 border border-[var(--color-aurora-emerald)]/25 rounded-xl px-4 py-3">
                  <CheckCircle2 size={16} className="shrink-0" />
                  Thanks — your message has been sent. We&apos;ll get back to you within 24 hours.
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 text-sm font-inter text-red-400 bg-red-400/10 border border-red-400/25 rounded-xl px-4 py-3">
                  <AlertCircle size={16} className="shrink-0" />
                  {errorMsg}
                </div>
              )}

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[var(--color-dhruvam-gold)] hover:bg-[var(--color-dhruvam-gold-light)] disabled:opacity-60 disabled:pointer-events-none text-[var(--color-dhruvam-950)] py-4 rounded-2xl font-poppins font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-[0_4px_20px_rgba(246,181,27,0.25)] hover:shadow-[0_8px_32px_rgba(246,181,27,0.4)]"
              >
                {status === "sending" ? (
                  <>Sending... <Loader2 size={15} className="animate-spin" /></>
                ) : (
                  <>Send Message <Send size={15} /></>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
