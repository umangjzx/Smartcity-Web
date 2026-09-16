"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GuidingStar from "@/components/dhruvam/GuidingStar";

// A small guiding-star flourish that appears once you've scrolled past the
// Hero, offering a way back to the top of the journey.
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#020B1C]/85 border border-[var(--color-dhruvam-gold-light)]/30 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex items-center justify-center dhruvam-glow-ring"
        >
          <GuidingStar size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
