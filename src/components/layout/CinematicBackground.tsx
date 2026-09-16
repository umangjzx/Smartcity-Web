'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type Star = { id: number; left: string; top: string; size: number; delay: number; duration: number };

export default function CinematicBackground() {
  const [stars, setStars] = useState<Star[] | null>(null);

  useEffect(() => {
    // Random star positions are generated here (in an effect), not during
    // render, so the render stays pure/idempotent — this also naturally
    // avoids any server/client hydration mismatch.
    setStars(
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      }))
    );
  }, []);

  if (!stars) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* LAYER 1: BASE CELESTIAL TEXTURE */}
      <div 
        className="absolute inset-0 z-0 opacity-100"
        style={{
          backgroundImage: "url('/assets/dhruvam/backgrounds/celestial-texture.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020B1C]/60 via-[#06152B]/40 to-[#020B1C]/80 mix-blend-overlay" />

      {/* LAYER 2: AURORA */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen">
        <div
          className="absolute dhruvam-aurora-a blur-3xl bg-gradient-to-tr from-[#2FBFA6] to-transparent w-[80%] h-[60%] rounded-full top-[-10%] left-[-10%]"
        />
        <div
          className="absolute dhruvam-aurora-b blur-3xl bg-gradient-to-br from-[#4DD9E3] to-[#4A7FD9] w-[70%] h-[70%] rounded-full top-[10%] right-[-10%]"
        />
        <div
          className="absolute dhruvam-aurora-c blur-3xl bg-gradient-to-tl from-[#8C7FE0] to-transparent w-[90%] h-[50%] rounded-full bottom-[-20%] left-[10%]"
        />
      </div>

      {/* LAYER 3: STARS */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="dhruvam-star absolute bg-white rounded-full"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              '--twinkle-delay': `${star.delay}s`,
              '--twinkle-duration': `${star.duration}s`,
              '--twinkle-min': '0.1',
              '--twinkle-max': '0.8',
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* LAYER 4: DISTANT MOUNTAINS */}
      <div 
        className="absolute bottom-0 w-full h-[45vh] z-10 opacity-70" 
        style={{
          backgroundImage: "url('/assets/dhruvam/backgrounds/mountains.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          maskImage: 'linear-gradient(to top, black 40%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 40%, transparent 100%)'
        }}
      />

      {/* LAYER 5: READABILITY OVERLAY VIGNETTE */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#020B1C_100%)] opacity-40 z-20" />
    </div>
  );
}
