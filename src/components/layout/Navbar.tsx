"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Button from "@/components/ui/Button";
import rotaractGearMark from "../../../public/assets/dhruvam/logos/rotaract-gear-mark.png";

const navLinks = [
  { name: "Our Journey", href: "#dhruvam" },
  { name: "Leadership", href: "#leadership" },
  { name: "Avenues", href: "#avenues" },
  { name: "Projects", href: "#projects" },
  { name: "Events", href: "#events" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Guiding-path progress bar — a thin gold line that fills as you scroll,
  // echoing the "star that guides" motif at the top of every page.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lightweight scroll-spy: highlight the nav item for the section in view.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
          setActiveHash(`#${topMost.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,padding,box-shadow,border-color] duration-300 ease-out border-b ${
        scrolled
          ? "bg-[var(--color-dhruvam-950)]/85 backdrop-blur-lg shadow-[0_2px_24px_rgba(0,0,0,0.35)] border-white/10 py-3"
          : "bg-[var(--color-dhruvam-950)]/10 backdrop-blur-sm border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-full bg-white shadow-md shrink-0 flex items-center justify-center overflow-hidden">
            <div className="relative w-7 h-7">
              <Image src={rotaractGearMark} alt="Rotaract Club of Coimbatore Smartcity" fill className="object-contain" />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-[var(--color-dhruvam-gold-light)] scale-110 opacity-60 pointer-events-none" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-montserrat font-black text-base tracking-wide text-[var(--color-dhruvam-gold-light)]">
              DHRUVAM
            </span>
            <span className="font-inter text-[9px] text-white/50 uppercase tracking-widest font-medium">
              Rotaract Coimbatore Smartcity
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeHash === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 rounded-full font-inter text-[13px] font-medium transition-colors duration-200 hover:text-[var(--color-dhruvam-gold-light)] ${
                  isActive ? "text-[var(--color-dhruvam-gold-light)]" : "text-white/80"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-1.5 h-1.5 rounded-full bg-[var(--color-dhruvam-gold-light)] shadow-[0_0_8px_rgba(255,214,90,0.9)]" />
                )}
              </Link>
            );
          })}
          <Button href="#join" className="ml-3">
            Join Us
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-full text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Guiding-path scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[var(--color-dhruvam-gold)] via-[var(--color-dhruvam-gold-light)] to-[var(--color-aurora-teal)] shadow-[0_0_8px_rgba(246,181,27,0.6)]"
      />

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden bg-[var(--color-dhruvam-950)]/95 backdrop-blur-lg border-t border-white/10 shadow-xl overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block font-inter font-medium py-3 px-4 rounded-xl transition-colors ${
                      activeHash === link.href
                        ? "text-[var(--color-dhruvam-gold-light)] bg-white/5"
                        : "text-white/85 hover:bg-white/5 hover:text-[var(--color-dhruvam-gold-light)]"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <Button href="#join" size="lg" onClick={() => setMobileOpen(false)} className="mt-3 w-full">
                Join Us
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
