import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-poppins font-semibold transition-all duration-300";

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
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export default function Button({ variant = "primary", size = "md", href, className = "", children, ...props }: ButtonAsLink | ButtonAsButton) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href !== undefined) {
    return (
      <Link href={href} className={cls} {...(props as ComponentPropsWithoutRef<"a">)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...(props as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}
