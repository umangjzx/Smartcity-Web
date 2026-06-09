"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Avenues", href: "#avenues" },
  { name: "Projects", href: "#projects" },
  { name: "Events", href: "#events" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_20px_rgba(0,0,0,0.08)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-full bg-[var(--color-rotaract-red)] flex items-center justify-center shadow-md">
            <span className="font-montserrat font-black text-white text-lg">R</span>
            <div className="absolute inset-0 rounded-full border-2 border-[var(--color-rotary-gold)] scale-110 opacity-60" />
          </div>
          <div className="flex flex-col leading-none">
            <span className={`font-poppins font-bold text-sm transition-colors ${isScrolled ? "text-[var(--color-charcoal)]" : "text-white"}`}>
              Rotaract Club of
            </span>
            <span className="font-inter text-[10px] text-[var(--color-rotary-gold)] uppercase tracking-widest font-semibold">
              Coimbatore Smartcity
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-4 py-2 rounded-full font-inter text-sm font-medium transition-all hover:bg-[var(--color-rotaract-red)]/10 hover:text-[var(--color-rotaract-red)] ${
                isScrolled ? "text-[var(--color-charcoal)]" : "text-white/90"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#join"
            className="ml-4 px-6 py-2.5 bg-[var(--color-rotaract-red)] hover:bg-[#a50d26] text-white rounded-full font-poppins font-semibold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            Join Us
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className={`md:hidden p-2 rounded-full transition-colors ${isScrolled ? "text-[var(--color-charcoal)]" : "text-white"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-inter font-medium text-[var(--color-charcoal)] py-3 px-4 rounded-xl hover:bg-gray-50 hover:text-[var(--color-rotaract-red)] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#join"
                onClick={() => setMobileOpen(false)}
                className="mt-3 bg-[var(--color-rotaract-red)] text-white text-center py-3.5 rounded-full font-poppins font-semibold hover:bg-[#a50d26] transition-colors"
              >
                Join Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
