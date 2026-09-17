"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  eyebrow,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const alignClass =
    align === "center"
      ? "items-center text-center"
      : align === "right"
      ? "items-end text-right"
      : "items-start text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`flex flex-col ${alignClass} mb-12 ${className}`}
    >
      {/* Eyebrow label */}
      {eyebrow && (
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-[var(--color-dhruvam-gold-light)]/60" />
          <span className="font-inter text-[var(--color-dhruvam-gold-light)] text-xs font-semibold tracking-[0.2em] uppercase">
            {eyebrow}
          </span>
        </div>
      )}

      {/* Guiding Star */}
      <div className="dhruvam-guiding-star mb-4">
        <img
          src="/assets/dhruvam/effects/guiding-star.svg"
          alt=""
          aria-hidden="true"
          className="w-7 h-7"
        />
      </div>

      {/* Title */}
      <h2 className="text-h1 tracking-tight text-white">
        {title}
      </h2>

      {/* Animated gold divider */}
      <div className={`flex items-center my-5 gap-2 ${align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start"}`}>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--color-dhruvam-gold-light)]/70 origin-right"
        />
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="w-2 h-2 rounded-full bg-[var(--color-dhruvam-gold-light)] shadow-[0_0_8px_rgba(255,214,90,0.8)]"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--color-dhruvam-gold-light)]/70 origin-left"
        />
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className="max-w-2xl text-white/60 text-base md:text-lg font-inter leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
