"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, ExternalLink } from "lucide-react";

type Member = {
  _id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  image: string;
  linkedin: string;
  isBoard: boolean;
};

export default function Leadership() {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    fetch("/api/members")
      .then((r) => r.json())
      .then((d) => { if (d.success) setMembers(d.data); })
      .catch(() => {});
  }, []);

  const boardMembers = members.filter((m) => m.isBoard);
  const president = boardMembers.find((m) => m.role.toLowerCase().includes("president"));
  const others = boardMembers.filter((m) => m._id !== president?._id);

  if (members.length === 0) return null;

  return (
    <section id="leadership" className="py-28 bg-[var(--color-cream)] relative overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--color-royal-blue)]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-[var(--color-rotaract-red)]" />
            <span className="font-inter text-[var(--color-rotaract-red)] text-xs font-semibold tracking-[0.2em] uppercase">Leadership</span>
          </div>
          <h2 className="font-montserrat font-black text-4xl md:text-5xl text-[var(--color-charcoal)] leading-tight">
            Board of <span className="text-[var(--color-rotaract-red)]">Directors</span>
          </h2>
        </div>

        {/* President spotlight */}
        {president && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-3xl border border-[var(--border)] shadow-md overflow-hidden mb-10"
          >
            <div className="grid md:grid-cols-3">
              {/* Photo side */}
              <div className="relative bg-gradient-to-br from-[var(--color-charcoal)] to-[#2d1a24] flex items-center justify-center p-10">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-[var(--color-rotaract-red)]/20 blur-xl scale-150" />
                  <img
                    src={president.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(president.name)}&background=C8102E&color=fff&size=256`}
                    alt={president.name}
                    className="relative w-36 h-36 rounded-full object-cover border-4 border-[var(--color-rotary-gold)] shadow-xl"
                  />
                </div>
              </div>

              {/* Content side */}
              <div className="md:col-span-2 p-8 md:p-10 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-[var(--color-rotaract-red)]/10 text-[var(--color-rotaract-red)] text-xs font-semibold font-inter px-3 py-1.5 rounded-full mb-4 w-fit">
                  President, 2026–27
                </div>
                <h3 className="font-montserrat font-black text-2xl md:text-3xl text-[var(--color-charcoal)] mb-2">{president.name}</h3>
                <p className="font-inter text-[var(--color-warm-gray)] text-sm mb-6">{president.role}</p>
                <blockquote className="font-inter text-[var(--color-charcoal)] text-lg leading-relaxed italic border-l-4 border-[var(--color-rotary-gold)] pl-5 mb-6">
                  &ldquo;Together, we aim to ignite leadership, influence positive change, and create lasting impact in our community.&rdquo;
                </blockquote>
                <div className="flex gap-3">
                  {president.phone && (
                    <a href={`tel:${president.phone}`} className="w-9 h-9 rounded-full bg-[var(--color-cream)] border border-[var(--border)] flex items-center justify-center text-[var(--color-warm-gray)] hover:text-[var(--color-rotaract-red)] hover:border-[var(--color-rotaract-red)] transition-all">
                      <Phone size={14} />
                    </a>
                  )}
                  {president.email && (
                    <a href={`mailto:${president.email}`} className="w-9 h-9 rounded-full bg-[var(--color-cream)] border border-[var(--border)] flex items-center justify-center text-[var(--color-warm-gray)] hover:text-[var(--color-rotary-gold)] hover:border-[var(--color-rotary-gold)] transition-all">
                      <Mail size={14} />
                    </a>
                  )}
                  {president.linkedin && (
                    <a href={president.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[var(--color-cream)] border border-[var(--border)] flex items-center justify-center text-[var(--color-warm-gray)] hover:text-[var(--color-royal-blue)] hover:border-[var(--color-royal-blue)] transition-all">
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other board members */}
        {others.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {others.map((m, i) => (
              <motion.div
                key={m._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-white rounded-2xl border border-[var(--border)] p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group"
              >
                <div className="relative mx-auto w-20 h-20 mb-4">
                  <img
                    src={m.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=C8102E&color=fff&size=128`}
                    alt={m.name}
                    className="w-20 h-20 rounded-full object-cover border-3 border-[var(--border)] group-hover:border-[var(--color-rotaract-red)] transition-colors"
                  />
                  <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[var(--color-rotary-gold)] border-2 border-white" />
                </div>

                <h4 className="font-poppins font-bold text-sm text-[var(--color-charcoal)] mb-1 leading-snug">{m.name}</h4>
                <p className="font-inter text-xs text-[var(--color-rotaract-red)] font-medium mb-4">{m.role}</p>

                <div className="flex items-center justify-center gap-2">
                  {m.phone && (
                    <a href={`tel:${m.phone}`} className="w-8 h-8 rounded-full bg-[var(--color-cream)] flex items-center justify-center text-[var(--color-warm-gray)] hover:text-[var(--color-rotaract-red)] transition-colors">
                      <Phone size={13} />
                    </a>
                  )}
                  {m.email && (
                    <a href={`mailto:${m.email}`} className="w-8 h-8 rounded-full bg-[var(--color-cream)] flex items-center justify-center text-[var(--color-warm-gray)] hover:text-[var(--color-rotary-gold)] transition-colors">
                      <Mail size={13} />
                    </a>
                  )}
                  {m.linkedin && (
                    <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[var(--color-cream)] flex items-center justify-center text-[var(--color-warm-gray)] hover:text-[var(--color-royal-blue)] transition-colors">
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
