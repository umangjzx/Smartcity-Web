import Aurora from "./Aurora";
import Starfield from "./Starfield";
import Mountains from "./Mountains";
import Lighthouse from "./Lighthouse";

type NightSkyProps = {
  /** Layered mountain silhouettes along the bottom edge. Use selectively. */
  mountains?: boolean;
  /** A small lighthouse in the distance. Use sparingly — not every section. */
  lighthouse?: boolean;
  /** Faint constellation line connecting a few bright stars. */
  constellation?: boolean;
  className?: string;
};

/**
 * Reusable DHRUVAM night-sky backdrop: gradient sky + aurora + starfield,
 * with optional mountains/lighthouse. Absolutely positioned to fill its
 * nearest `relative` ancestor — drop it in as the first child of a section.
 */
export default function NightSky({ mountains = false, lighthouse = false, constellation = true, className = "" }: NightSkyProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-dhruvam-950)] via-[var(--color-dhruvam-900)] to-[var(--color-dhruvam-800)]" />
      <Aurora />
      <Starfield constellation={constellation} />
      {mountains && <Mountains />}
      {lighthouse && (
        <div className="absolute bottom-[10%] right-[8%] opacity-90">
          <Lighthouse size={90} />
        </div>
      )}
    </div>
  );
}
