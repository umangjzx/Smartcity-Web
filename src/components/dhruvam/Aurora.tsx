export default function Aurora() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="dhruvam-aurora-layer dhruvam-aurora-a"
        style={{ background: "radial-gradient(45% 35% at 20% 20%, var(--color-aurora-cyan) 0%, transparent 70%)" }}
      />
      <div
        className="dhruvam-aurora-layer dhruvam-aurora-b"
        style={{ background: "radial-gradient(50% 40% at 78% 15%, var(--color-aurora-emerald) 0%, transparent 70%)" }}
      />
      <div
        className="dhruvam-aurora-layer dhruvam-aurora-c"
        style={{ background: "radial-gradient(55% 45% at 50% 65%, var(--color-aurora-teal) 0%, transparent 72%)" }}
      />
      <div
        className="dhruvam-aurora-layer dhruvam-aurora-b"
        style={{ background: "radial-gradient(40% 30% at 85% 70%, var(--color-aurora-violet) 0%, transparent 75%)", opacity: 0.3 }}
      />
    </div>
  );
}
