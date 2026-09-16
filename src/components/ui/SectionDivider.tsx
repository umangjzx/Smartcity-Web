interface SectionDividerProps {
  variant?: "constellation" | "gold" | "celestial" | "mountain-star";
  flip?: boolean;
  className?: string;
  opacity?: number;
}

export default function SectionDivider({
  variant = "constellation",
  flip = false,
  className = "",
  opacity = 0.45,
}: SectionDividerProps) {
  const src = `/assets/dhruvam/ui/dividers/${variant}.svg`;

  return (
    <div
      className={`w-full overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="w-full h-auto"
        style={{
          opacity,
          transform: flip ? "scaleX(-1)" : undefined,
        }}
      />
    </div>
  );
}
