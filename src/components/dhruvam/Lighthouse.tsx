export default function Lighthouse({ size = 90, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 60 84" className={className} aria-hidden="true">
      {/* beam glow */}
      <ellipse cx="30" cy="14" rx="26" ry="8" fill="var(--color-dhruvam-gold-light)" opacity="0.16" className="dhruvam-lighthouse-beam" />
      {/* light source */}
      <circle cx="30" cy="14" r="3.2" fill="var(--color-dhruvam-gold-light)" className="dhruvam-lighthouse-beam" />
      {/* lantern room */}
      <rect x="25" y="10" width="10" height="8" fill="var(--color-dhruvam-950)" />
      {/* tower */}
      <polygon points="24,84 36,84 32,18 28,18" fill="var(--color-dhruvam-950)" />
      {/* stripes */}
      <rect x="26.5" y="34" width="7" height="6" fill="var(--color-dhruvam-gold)" opacity="0.85" />
      <rect x="25.6" y="52" width="8.8" height="6" fill="var(--color-dhruvam-gold)" opacity="0.85" />
    </svg>
  );
}
