"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MessageSquare, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { backgrounds } from "@/lib/dhruvamAssets";

const contacts = [
  {
    name: "Rtr. Nirmal Kumar K",
    role: "President",
    phone: "+91 9080161324",
    accent: "var(--color-dhruvam-gold-light)",
    borderColor: "rgba(255,214,90,0.4)",
    bgColor: "rgba(255,214,90,0.07)",
  },
  {
    name: "Rtr. Akshara K",
    role: "Secretary Administration",
    phone: "+91 6383194464",
    accent: "var(--color-aurora-teal)",
    borderColor: "rgba(47,191,166,0.4)",
    bgColor: "rgba(47,191,166,0.07)",
  },
  {
    name: "Rtr. Umang Jaiswal N",
    role: "Secretary Communication",
    phone: "+91 8098468572",
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
            className="font-montserrat font-black text-3xl sm:text-4xl md:text-5xl text-white leading-tight"
          >
            Connect{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-dhruvam-gold-light)] to-[var(--color-dhruvam-gold-deep)]">
              With Us
            </span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 md:gap-10">
          {/* Left — contacts + quick actions */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {contacts.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative flex items-center gap-4 rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden cursor-default"
                style={{ background: c.bgColor }}
              >
                {/* Sliding left accent border */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-0.5 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-400 rounded-l-2xl"
                  style={{ background: c.accent }}
                />

                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${c.borderColor}` }}
                >
                  <img src="/assets/dhruvam/icons/outline/phone.svg" alt="" aria-hidden="true" className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-poppins font-semibold text-sm text-white truncate">{c.name}</p>
                  <p className="font-inter text-xs mb-0.5 font-medium" style={{ color: c.accent }}>
                    {c.role}
                  </p>
                  <a
                    href={`tel:${c.phone.replace(/\s/g, "")}`}
                    className="font-inter text-sm text-white/45 hover:text-white transition-colors"
                  >
                    {c.phone}
                  </a>
                </div>
              </motion.div>
            ))}

            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="mailto:rotaractsmartcity@gmail.com"
                className="group flex flex-col items-center gap-3 bg-white/5 border border-white/10 hover:border-[var(--color-dhruvam-gold-light)]/30 rounded-2xl p-5 transition-all hover:-translate-y-1"
              >
                <img src="/assets/dhruvam/icons/outline/contact.svg" alt="" aria-hidden="true" className="w-6 h-6" />
                <span className="font-inter font-medium text-sm text-white/80">Email Us</span>
              </a>
              <a
                href="https://wa.me/919080161324"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 bg-white/5 border border-white/10 hover:border-[var(--color-aurora-emerald)]/40 rounded-2xl p-5 transition-all hover:-translate-y-1"
              >
                <MessageSquare size={24} className="text-[var(--color-aurora-emerald)]" />
                <span className="font-inter font-medium text-sm text-white/80">WhatsApp</span>
              </a>
            </div>

            {/* Location chip */}
            <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-4 border border-white/10">
              <img src="/assets/dhruvam/icons/outline/location.svg" alt="" aria-hidden="true" className="w-5 h-5 shrink-0" />
              <span className="font-inter text-sm text-white/45">
                Coimbatore, Tamil Nadu, India — District 3206
              </span>
            </div>
          </motion.div>

          {/* Right — contact form with premium inner glow */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="relative bg-white/[0.04] backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 overflow-hidden"
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

              <h3 className="font-montserrat font-bold text-2xl text-white mb-1">Send a Message</h3>
              <p className="font-inter text-sm text-white/40 mb-8">We&apos;ll get back to you within 24 hours.</p>

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
      </div>
    </section>
  );
}
