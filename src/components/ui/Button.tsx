"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

// Framer Motion's motion() wrapper lets Link keep its real behavior (client-
// side routing/prefetch for actual page navigations, not just hash anchors)
// while still supporting whileHover/whileTap and motion style props.
const MotionLink = motion(Link);

type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "lg" | "xl";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-poppins font-semibold transition-all duration-300";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-dhruvam-gold)] hover:bg-[var(--color-dhruvam-gold-light)] text-[var(--color-dhruvam-950)] shadow-md hover:shadow-[0_0_20px_rgba(246,181,27,0.4)] hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "border border-white/20 hover:border-[var(--color-dhruvam-gold-light)]/50 text-white/80 hover:text-white hover:bg-white/5 backdrop-blur-sm",
  ghost: "text-white/70 hover:text-[var(--color-dhruvam-gold-light)]",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-2.5 text-[13px]",
  lg: "px-8 py-4 text-sm",
  xl: "px-10 py-5 text-sm",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  /** A CTA that drifts toward the cursor within a small radius, snapping
   * back on leave — reserved for a page's single most prominent CTA, not
   * every button (Hero's primary CTA, Membership's "Apply Now"). */
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
};

// Framer Motion's own drag-gesture handlers (onDrag/onDragStart/onDragEnd)
// have an incompatible signature from the native HTML drag-and-drop events
// of the same name — excluded here since Button doesn't expose native drag
// behavior anyway, only the motion.* components' gesture props.
type DragHandlerKeys = "onDrag" | "onDragStart" | "onDragEnd";

type ButtonAsLink = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children" | DragHandlerKeys>;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children" | DragHandlerKeys>;

export default function Button({
  variant = "primary",
  size = "md",
  magnetic = false,
  href,
  className = "",
  children,
  ...props
}: ButtonAsLink | ButtonAsButton) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  // Hooks run unconditionally (Rules of Hooks) — their output is simply
  // unused when magnetic is false, which costs nothing measurable.
  const spanRef = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  function handleMove(e: React.MouseEvent) {
    const rect = spanRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const content =
    href !== undefined ? (
      <MotionLink
        href={href}
        className={cls}
        whileHover={magnetic ? { scale: 1.03 } : undefined}
        whileTap={magnetic ? { scale: 0.97 } : undefined}
        {...(props as Record<string, unknown>)}
      >
        {children}
      </MotionLink>
    ) : (
      <motion.button
        className={cls}
        whileHover={magnetic ? { scale: 1.03 } : undefined}
        whileTap={magnetic ? { scale: 0.97 } : undefined}
        {...(props as Record<string, unknown>)}
      >
        {children}
      </motion.button>
    );

  if (!magnetic) return content;

  return (
    <motion.span
      ref={spanRef}
      style={{ x: springX, y: springY, display: "inline-block" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {content}
    </motion.span>
  );
}
