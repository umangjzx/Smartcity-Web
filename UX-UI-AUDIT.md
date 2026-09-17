# UX/UI Audit — DHRUVAM 2026–27 (Rotaract Club of Coimbatore Smartcity)

Audited: full `src/` tree, `globals.css` token system, all public pages (`/`, `/privacy`, `/terms`), the admin dashboard, and live behavior at desktop/tablet/mobile widths.

**Context for this audit**: this site has already been through several targeted fix passes this session (Leadership desktop-clipping bug, mobile Leadership layout, image optimization to `next/image`, SEO/OG/favicon, contact-form spam protection, a contrast pass on Footer links, a creative-interaction pass on every non-Leadership section). Those are not re-listed as open findings below except where something new surfaced. This audit focuses on what's still actually wrong or inconsistent, not a generic checklist.

Severity: **Critical** (breaks the experience or a real user path) · **High** (clearly weakens quality, affects most visitors) · **Medium** (real but narrow/cosmetic) · **Low** (polish, nice-to-have).

---

## Critical

None currently open. Two were found and fixed during this pass:

- **The admin dashboard's DHRUVAM starfield bleed-through.** This audit originally (wrongly) asserted "the admin dashboard sets its own opaque light container on top, so it is unaffected" based on reading the code rather than rendering it — an assumption this audit's own instructions explicitly warn against. Live verification showed the opposite: `admin/layout.tsx` and `admin-login/page.tsx` both wrap their content in a plain `position: static` div. Per CSS stacking rules, a `position: static` element always paints *underneath* a positioned sibling in the same stacking context regardless of DOM order or z-index — and the sitewide `<CinematicBackground />` (rendered once in the root layout) is `position: fixed`. The result: the admin dashboard's "opaque" cream background was being painted first, then the dark night-sky starfield painted on top of it, making the entire admin UI barely legible. Fixed by adding `relative z-10` to both wrappers, matching the pattern every other page already uses. This shipped for however long the admin dashboard has existed since `CinematicBackground` was added — worth noting as a lesson in why this audit insists on rendering pages rather than reading them.
- Leadership desktop roster silently clipping ~half the board (fixed earlier this session, before this formal audit pass).
- Mobile Leadership having no way to see names/roles/contact (same).

## High

1. ~~**No loading state anywhere data is fetched client-side.**~~ **Fixed.** `Leadership.tsx`, `Projects.tsx`, and `Events.tsx` now show a shared `SkeletonRow` while fetching, instead of rendering nothing. (Hero's stat counters still start at 0 and animate up on scroll-into-view rather than showing a skeleton — left as-is since the numbers always render, there's no blank gap, and the animation is the actual intended experience there.)
2. **Two parallel design-token systems coexist.** `globals.css` explicitly keeps a "legacy" palette (`--color-rotaract-red`, `--color-rotary-gold`, `--color-royal-blue`, `--color-cream`, `--color-charcoal`, `--color-warm-gray`) alongside the real DHRUVAM tokens. In practice this means the **admin dashboard** stays a light-mode UI on the legacy palette. Left as an intentional scope boundary (see `DESIGN-DIRECTION.md` — a full admin re-skin is a separate project), but its most actively harmful symptom — the admin's dark-mode classes silently doing nothing, and (far worse) the sitewide starfield background bleeding through the admin UI entirely — is fixed; see Critical, above.
3. ~~**No formal typography scale.**~~ **Fixed.** `globals.css` now defines `.text-display`/`.text-h1`/`.text-h2`/`.text-h3`/`.text-body`/`.text-body-sm`/`.text-label`, and `SectionHeader.tsx` (used by 8 of 10 public sections) now uses `.text-h1`. Per-component ad hoc headings elsewhere (About, Avenues, Membership, Contact H2s) still use their own literal Tailwind strings rather than `.text-h1` — they already matched the new scale's values, so nothing looks different, but a full rename-in-place across every file was judged lower value than shipping the token set and applying it to the highest-leverage shared component first.
4. **Asset-path duplication.** `next/image` static imports reach into `public/` via `../../../public/...` repeated per-file for the logo/credit-photo (`Navbar.tsx`, `Footer.tsx`) instead of going through `dhruvamAssets.ts` like backgrounds/characters do. Cosmetic hygiene, not a bug — left for a future pass.

## Medium

5. **Hero is copy-heavy for a first screen.** Eyebrow → H1 → italic sub-headline → body paragraph → two CTAs → 4-stat row, all stacked before any scroll. Reads fine; "what should the user notice first, second, third" isn't as sharply staged as it could be. Left as-is this pass — it's a genuine opinion-level call about *reducing* existing content/sections, which the brief says to avoid doing unnecessarily; flagging for a deliberate future decision rather than cutting content unilaterally.
6. **Mobile touch targets are inconsistent.** Most primary buttons/links are comfortably ≥44px tall; a few icon-only controls (Leadership mobile contact icons, carousel dots) are 32px — acceptable for dense secondary controls per common mobile guidance, but worth being deliberate about. Not changed this pass (would mean visually enlarging already-shipped, tested mobile card layouts for a debatable gain).
7. **Marquee/orbit rotations run at full complexity on mobile** even when motion isn't reduced. Low-impact (`transform`-only, GPU-cheap) — not changed.
8. ~~**No shared `Button` component.**~~ **Partially fixed.** Added `src/components/ui/Button.tsx` (variant/size-based, matches existing visual output exactly) and retrofitted it onto both Navbar "Join Us" CTAs — the one place the *exact same* button was hand-duplicated in one file. Hero's and Membership's CTAs were deliberately **not** retrofitted: both have bespoke magnetic-cursor motion logic (custom `useMotionValue`/`useSpring` handlers) that a generic Button would need to special-case, and forcing that in was judged higher regression-risk than benefit this pass.
9. ~~**Empty states inconsistent / Leadership has none.**~~ **Fixed.** Added `src/components/ui/EmptyState.tsx`; Projects and Events now use it (previously bespoke, now identical pattern); Leadership now has a real loading/error/empty branch instead of silently returning `null`.
10. **Admin dashboard's dead `dark:` classes.** **Fixed** — stripped all 40 dead `dark:*` Tailwind variants from `admin/page.tsx` (they were live-but-unintentional under OS dark mode, not truly dead; removed regardless since no toggle exists and the admin's own `color-scheme: light`-adjacent design never intended them). The broader admin/public design-system gap remains an intentional scope boundary, not a bug.

## Low

11. **Cursor is a custom SVG circle globally** (`globals.css` body `cursor: url(...)`) including inside admin's light-mode forms — a nice touch on the dark public site, slightly odd/inconsistent-feeling on admin's light UI, and on Windows/high-DPI it can render slightly soft since it's a small inline data-URI SVG rather than a `.cur`.
12. **No dedicated 404 page** — Next's default `/_not-found` is unstyled relative to the DHRUVAM identity; anyone mistyping a URL gets dropped into a generic page with none of the site's visual language.
13. **Section-to-section transitions rely entirely on `SectionDivider`** (constellation/celestial/gold variants) — effective, but there's no variation in *how* a section's own background fades into the divider vs. the next section's background; every transition uses the same fade recipe regardless of the emotional beat of the two sections it's joining (e.g., Hero→Philosophy should feel different from Projects→Events).
14. **Filter-pill active state (`Projects.tsx` category filter) and nav active-state (`Navbar.tsx`) use two different "active" visual languages** — filled pill vs. underline dot — both fine in isolation, no shared "active/selected" pattern token.

---

## What's already solid (not re-litigating)

- Horizontal-scroll carousels (Projects, Events, Leadership desktop) all correctly handle wheel-to-horizontal, touch, snap, and prev/next controls — genuinely resolved, not just "looks fine."
- `prefers-reduced-motion` is respected for the decorative CSS-keyframe layer (aurora drift, star twinkle, glow rings, marquee) — this is a real, working accessibility affordance, not a checkbox exercise.
- `:focus-visible` has a real, visible, on-brand outline defined globally — keyboard nav isn't an afterthought.
- Image pipeline is now genuinely optimized (`next/image` everywhere it matters, verified real byte reductions, e.g. 592KB→6.8KB on a background at typical viewport).
- Contact form has real validation, honeypot + rate-limiting, and matching success/error UI states.
- Mobile has zero horizontal-overflow (verified via `scrollWidth`/`innerWidth` at 375px).

---

## Implemented this pass

In priority order, all verified via `tsc`, `eslint`, a full `next build`, and live browser testing at 320/375/430/768px plus desktop:

1. **Admin starfield-bleed Critical bug** — `relative z-10` added to `admin/layout.tsx` and `admin-login/page.tsx`.
2. **Loading states** — shared `SkeletonRow` wired into Leadership/Projects/Events.
3. **Typography scale** — tokens added to `globals.css`, applied to `SectionHeader`.
4. **Empty/error states** — shared `EmptyState` component; Leadership now has one (previously had none).
5. **Shared `Button` component** — added, retrofitted onto Navbar's two "Join Us" instances.
6. **Dead admin `dark:` classes** — removed (40 occurrences, `admin/page.tsx`).

## Deliberately not done this pass (see reasoning inline above)

- Full admin re-skin onto DHRUVAM tokens (High #2/#10) — out of scope per `DESIGN-DIRECTION.md`.
- Per-component heading rename to `.text-h1`/`.text-h2` beyond `SectionHeader` (High #3) — values already matched, lower leverage than the shared component.
- Retrofitting Button onto Hero/Membership's magnetic CTAs (Medium #8) — regression risk vs. benefit.
- Hero information-density reduction (Medium #5) — an editorial call on cutting content, flagged rather than actioned unilaterally.
- Mobile touch-target enlargement (Medium #6), mobile-specific animation simplification (Medium #7), asset-path consolidation (High #4), 404 page (Low #12), section-transition variety (Low #13), active-state unification (Low #14) — all real but lower-value-per-risk than what shipped; left as a backlog rather than padding this pass with low-impact churn.
