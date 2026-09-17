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

## Backlog pass 2 — completed

7. **Per-component heading rename (High #3).** Re-checked the assumption from pass 1 by actually diffing the literal Tailwind strings instead of eyeballing them — it was wrong for two of the four candidates. `Avenues.tsx` and `Contact.tsx`'s H2s matched `.text-h1` exactly and were renamed with zero visual change. `About.tsx` (`lg:text-6xl`) and `Membership.tsx` (`text-4xl sm:5xl lg:6xl`) actually use a **larger** bespoke treatment — applying `.text-h1` there would have *shrunk* them at desktop widths. Left those two as intentional bespoke "panel headline" sizing rather than force a downgrade to match a token that didn't actually describe them.
8. **Asset-path consolidation (High #4).** `Navbar.tsx`/`Footer.tsx`'s separate `../../../public/...` imports for the logo mark and credit photo now go through `dhruvamAssets.ts` (`logos.rotaractGearMark`, `logos.umangPhoto`), same pattern as backgrounds/characters.
9. **404 page (Low #12).** Added `src/app/not-found.tsx` — on-brand (guiding star, `.text-display` numeral, Navbar/Footer/`Button`), replacing Next's generic default.
10. **Mobile touch targets (Medium #6).** Leadership's mobile contact icons were 32×32px with zero padding buffer — bumped to 36×36px. More significant: Projects'/Events' carousel progress dots had *no* touch buffer at all — the clickable area was exactly the 6px visual dot. Restructured (visual dot as an inner `<span>`, `p-2` on the actual `<button>`) so the tap target is now ~40×22px without changing how the dots look. Verified the click behavior still works correctly at each step.

## Reviewed, no change made (reasoning below)

- **Hero information density (Medium #5)** — re-examined against the actual DOM: the CTA row and stats row already have a 96px gap (`mb-24`) and the stats carry a deliberately de-emphasized `text-[10px]`/30%-opacity eyebrow. The hierarchy is already reasonably staged; the original audit note overstated the issue. No change made rather than manufacturing one.
- **Mobile-specific animation simplification (Medium #7)** — confirmed the marquee and orbit animations are `transform`-only and GPU-cheap regardless of device, and `DhruvamTheme`'s orbital layout is already desktop-only (mobile gets a simpler stacked list). Already appropriately lightweight; no separate mobile tier needed.
- **Section-transition variety (Low #13)** — `SectionDivider` already supports 4 SVG variants × flip × per-usage opacity, and `page.tsx` already varies these per transition. The gap the audit flagged (varying *how* backgrounds blend, not just which divider graphic shows) is a genuine but subjective refinement with no clear low-risk implementation; left as a future creative pass rather than added complexity for its own sake.
- **Active-state pattern unification (Low #14)** — Navbar's underline-dot and Projects' filled-pill are different controls for different jobs (a persistent "current section" indicator vs. a stateful filter/selector), and arguably *should* look different so users don't confuse "where am I" with "what am I filtering." Kept as intentionally distinct rather than forcing a single pattern.

## Still out of scope (unchanged from pass 1)

- Full admin re-skin onto DHRUVAM tokens (High #2/#10) — the admin's starfield-bleed *bug* is fixed; a genuine visual re-skin remains a separate, larger project per `DESIGN-DIRECTION.md`.
- Retrofitting `Button` onto Hero/Membership's magnetic CTAs (Medium #8) — those have bespoke cursor-following motion logic; forcing them into the generic component is a real regression-risk for a cosmetic-only gain.
