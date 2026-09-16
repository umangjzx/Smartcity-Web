import type { ReactNode } from "react";

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-[var(--color-dhruvam-gold-light)]/60" />
            <span className="font-inter text-[var(--color-dhruvam-gold-light)] text-xs font-semibold tracking-[0.2em] uppercase">
              Legal
            </span>
          </div>
          <h1 className="font-montserrat font-black text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-3">
            {title}
          </h1>
          <p className="font-inter text-xs text-white/35 uppercase tracking-widest">
            Last updated: {updated}
          </p>
        </div>

        <div
          className="font-inter text-white/65 leading-relaxed space-y-5
            [&>h2]:font-montserrat [&>h2]:font-bold [&>h2]:text-white [&>h2]:text-xl [&>h2]:mt-10 [&>h2]:mb-3
            [&>p]:text-sm [&>p]:md:text-base
            [&_strong]:text-white [&_strong]:font-semibold
            [&_a]:text-[var(--color-dhruvam-gold-light)] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-white"
        >
          {children}
        </div>
      </div>
    </section>
  );
}
