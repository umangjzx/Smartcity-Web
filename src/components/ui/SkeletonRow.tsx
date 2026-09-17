export default function SkeletonRow({
  count = 4,
  className = "w-56 h-72 rounded-2xl",
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className="flex gap-4 overflow-hidden" role="status" aria-label="Loading">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`shrink-0 bg-white/5 border border-white/10 animate-pulse ${className}`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );
}
