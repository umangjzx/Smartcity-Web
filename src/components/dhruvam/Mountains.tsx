export default function Mountains({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 pointer-events-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 320" className="w-full block" preserveAspectRatio="none">
        {/* Furthest layer — lightest, most transparent */}
        <path
          d="M0,320 L0,180 L180,80 L340,160 L520,40 L720,140 L900,60 L1100,170 L1260,90 L1440,180 L1440,320 Z"
          fill="var(--color-dhruvam-700)"
          opacity="0.5"
        />
        {/* Mid layer */}
        <path
          d="M0,320 L0,230 L220,140 L400,210 L620,110 L840,200 L1040,120 L1240,210 L1440,150 L1440,320 Z"
          fill="var(--color-dhruvam-800)"
          opacity="0.8"
        />
        {/* Foreground — darkest, fully opaque */}
        <path
          d="M0,320 L0,270 L260,210 L480,260 L700,190 L960,250 L1200,200 L1440,250 L1440,320 Z"
          fill="var(--color-dhruvam-950)"
        />
      </svg>
    </div>
  );
}
