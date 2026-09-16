export default function GuidingStar({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`dhruvam-guiding-star ${className}`}
      aria-hidden="true"
    >
      <path
        d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"
        fill="var(--color-dhruvam-gold-light)"
      />
    </svg>
  );
}
