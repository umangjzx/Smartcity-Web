import type { CSSProperties } from "react";

// Deterministic seeded PRNG so server- and client-rendered star positions
// always match exactly (no hydration mismatch, no per-render reshuffling).
function seededRandom(seed: number) {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = seededRandom(1337);

const SMALL_STARS = Array.from({ length: 46 }, (_, id) => ({
  id,
  x: rand() * 100,
  y: rand() * 100,
  size: 1 + rand() * 1.4,
  delay: rand() * 5,
  duration: 3 + rand() * 3,
}));

const BRIGHT_STARS = Array.from({ length: 6 }, (_, id) => ({
  id,
  x: rand() * 100,
  y: rand() * 55,
  size: 2.4 + rand() * 1.4,
  delay: rand() * 5,
  duration: 4 + rand() * 2,
}));

export default function Starfield({ constellation = true }: { constellation?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {SMALL_STARS.map((s) => (
        <span
          key={`s-${s.id}`}
          className="dhruvam-star absolute rounded-full bg-white"
          style={
            {
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              "--twinkle-duration": `${s.duration}s`,
              "--twinkle-delay": `${s.delay}s`,
              "--twinkle-min": 0.15,
              "--twinkle-max": 0.7,
            } as CSSProperties
          }
        />
      ))}
      {BRIGHT_STARS.map((s) => (
        <span
          key={`b-${s.id}`}
          className="dhruvam-star absolute rounded-full"
          style={
            {
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              background: "var(--color-dhruvam-gold-light)",
              boxShadow: `0 0 ${s.size * 3}px rgba(255, 214, 90, 0.75)`,
              "--twinkle-duration": `${s.duration}s`,
              "--twinkle-delay": `${s.delay}s`,
              "--twinkle-min": 0.45,
              "--twinkle-max": 1,
            } as CSSProperties
          }
        />
      ))}
      {constellation && (
        <svg className="absolute inset-0 w-full h-full opacity-[0.14]" preserveAspectRatio="none" viewBox="0 0 100 100">
          <polyline
            points={BRIGHT_STARS.slice(0, 5).map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="var(--color-dhruvam-gold-light)"
            strokeWidth="0.15"
          />
        </svg>
      )}
    </div>
  );
}
