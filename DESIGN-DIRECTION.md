# Design Direction — DHRUVAM 2026–27

This formalizes the design language the site already has (night-sky navy, aurora accents, guiding gold, constellation motifs) into explicit, reusable tokens — not a new brand. Nothing in this document should visually surprise anyone who's seen the current site; it's the "why" and the shared vocabulary behind decisions already made ad hoc.

## Visual direction

Premium-but-warm civic/youth-leadership identity: a dark night sky (not corporate-dark, not gamer-dark) with a single warm gold as the "guiding" accent, aurora colors used sparingly as secondary accents (category tags, avenue colors), and a recurring penguin/mountain/star illustration system for personality. The brand rule that already governs this and should keep governing it: **gold is for guidance/action** (CTAs, active states, the guiding star motif), **aurora colors are for categorization** (avenues of service, project tags), never the reverse.

## Color tokens (already defined in `globals.css`, now documented)

| Token | Hex | Use |
|---|---|---|
| `--color-dhruvam-950` | `#020B1C` | Page background (the one true background) |
| `--color-dhruvam-900` / `-800` / `-700` / `-600` | `#06152B` → `#0B4265` | Layered surfaces, card backgrounds, panel depth |
| `--color-dhruvam-gold` | `#F6B51B` | Primary action color (buttons, active nav dot) |
| `--color-dhruvam-gold-light` | `#FFD65A` | Hover state of gold, headline accents, guiding-star glow |
| `--color-dhruvam-gold-deep` | `#E89B00` | Gradient endpoint, pressed/darker gold |
| `--color-aurora-teal/emerald/blue/violet/cyan` | see file | Avenue-of-service tags and category accents only — never a primary CTA |
| `--color-dhruvam-text` / `-soft` / `-muted` | `#F7F9FC` / `#E3E9F3` / `#93A6C6` | Body text hierarchy on dark backgrounds |
| `--color-rotaract-red` | `#C8102E` | **Legacy** — the Rotaract wheel-mark red. Kept intentionally (it's the actual Rotaract brand red, not a DHRUVAM color) but should be the *only* legacy token still in active use going forward — `--color-rotary-gold`, `--color-royal-blue`, `--color-cream`, `--color-charcoal`, `--color-warm-gray` are admin-only holdovers, see Admin section below. |

**Text-opacity rule** (formalizing what the contrast audit already forced into practice): on `--color-dhruvam-950`, white text below `/40` opacity fails WCAG AA for anything a visitor needs to *read* (links, labels, form content, real information). `/20`–`/35` is reserved for genuinely decorative ghost-text and micro-labels that carry no unique information (eyebrows that repeat the heading below them, watermark numerals). This is not a new rule invented for this document — it's what the contrast fixes already applied to Footer/Contact; extending it forward means future low-opacity text gets checked against this line before it ships.

## Typography scale

Formalized as shared classes in `globals.css` (`.text-display`, `.text-h1`...`.text-h3`, `.text-body`, `.text-body-sm`, `.text-label`) rather than each component re-deriving its own Tailwind string. Existing sizes were already close to a coherent scale — this mostly gives the existing sizes names and stops future drift, it doesn't resize things wholesale:

| Class | Size (responsive) | Weight | Use |
|---|---|---|---|
| `.text-display` | `text-[14vw] sm:text-[10vw] md:text-8xl lg:text-[7rem] xl:text-[8rem]` | 900 (Montserrat) | Hero wordmark only |
| `.text-h1` | `text-3xl sm:text-4xl md:text-5xl` | 900 (Montserrat) | Section H2s (About, Avenues, Contact, Membership) |
| `.text-h2` | `text-2xl md:text-3xl` | 700–900 (Montserrat) | Card/panel headlines (featured event, project card title) |
| `.text-h3` | `text-lg md:text-xl` | 700 (Poppins) | Sub-card headings (benefit cards, principle cards) |
| `.text-body` | `text-sm md:text-base` | 400 (Inter) | Paragraph copy |
| `.text-body-sm` | `text-xs sm:text-sm` | 400 (Inter) | Secondary/meta copy |
| `.text-label` | `text-[10px]` tracking-widest uppercase | 600–700 (Inter) | Eyebrows, field labels, badges |

`SectionHeader.tsx`'s existing `text-3xl md:text-4xl lg:text-5xl` becomes `.text-h1`; this is the only visual delta anywhere in this scale (adds one `md` step it was missing versus its closest siblings), everything else is a rename, not a resize.

## Spacing

Tailwind's default spacing scale **already is** the requested progression (`1`=4px, `2`=8px, `3`=12px, `4`=16px, `6`=24px, `8`=32px, `12`=48px, `16`=64px, `20`=80px, `24`=96px) — no new scale needed, just a discipline note: prefer these named steps (`gap-6`, `py-24`) over arbitrary bracket values (`py-[52px]`) except where a design genuinely needs a one-off (e.g., the `py-20 md:py-28` section rhythm already used everywhere is fine — it's two scale steps, not arbitrary).

## Components

- **Button**: introduce `src/components/ui/Button.tsx` with `variant: "primary" | "outline" | "ghost"` and `size: "md" | "lg"`, matching the exact classNames already in use (gold pill / outline pill / text-only), so existing CTAs swap in with zero visual change. New CTAs get consistency for free.
- **SectionSkeleton**: a small shared loading-skeleton component (pulsing card outlines matching each section's real layout — a roster-shaped skeleton for Leadership, a card-row skeleton for Projects/Events) so "loading" has a visual instead of a blank gap.
- **EmptyState**: extract the icon+heading+subtext pattern already duplicated in Projects/Events into one component; give Leadership one too (currently has none).

## Animation philosophy

Already mostly right; formalizing the rule rather than changing behavior:
- **Entrance**: fade+rise (`opacity 0→1`, `y 24→0`), `viewport once:true` — never re-trigger on scroll-back. Already the house style everywhere; keep it that way rather than introducing a second entrance pattern.
- **Continuous decorative motion** (aurora drift, star twinkle, marquee, orbit rotation): `transform`/`opacity` only (GPU-safe), frozen entirely under `prefers-reduced-motion` — already true, keep enforcing it for any new decorative animation.
- **Interactive feedback** (hover lift, magnetic buttons, click-to-expand): reserved for elements the user can actually act on — never decorative-only elements pretending to be interactive.
- **Mobile**: the existing rule ("no hover-dependent information") is now enforced structurally in Leadership; apply the same test to any *future* hover-only affordance — if it conveys unique information, it needs a non-hover mobile path.

## Responsive strategy

Fluid Tailwind breakpoints (`sm`/`md`/`lg`), no custom pixel-hunting breakpoints. The one real structural rule already in place and worth keeping explicit: **hover-dependent UI must have a `md:` (or wider) gate**, because `md` is the practical touch/no-touch line for this audience (nobody meaningfully hovers a touchscreen). Horizontal-scroll patterns (Projects/Events/Leadership) are the answer whenever content genuinely exceeds available width, rather than shrinking content until it's illegible.

## Admin dashboard

Explicitly **out of scope for a DHRUVAM re-skin** in this pass — it's an internal tool, not brand-facing, and re-theming it is a larger, lower-priority project (tracked in the audit as High #2/Medium #10). The near-term fix is narrower: remove the dead `dark:` classes that never activate (no toggle exists) rather than reskinning the whole dashboard now.
