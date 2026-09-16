import Link from "next/link";

// Only social links the Club has actually provided are wired up — a "#"
// placeholder would look real to a visitor but go nowhere, so unset ones are
// left out entirely rather than shown as dead links.
const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/rac_cbe.smartcity", icon: "/assets/dhruvam/social/instagram.svg" },
];

const quickLinks = [
  ["About Us",           "#about"],
  ["Board of Directors", "#leadership"],
  ["Our Projects",       "#projects"],
  ["Upcoming Events",    "#events"],
  ["Become a Member",    "#join"],
];

const avenues = [
  "Club Service",
  "Community Service",
  "Professional Development",
  "International Service",
  "Public Relations",
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[var(--color-dhruvam-950)] text-white border-t border-[var(--color-dhruvam-gold-light)]/15">
      {/* Lighthouse glow layer */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: "url('/assets/dhruvam/backgrounds/lighthouse-night.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Mountain-star divider at very top */}
      <img
        src="/assets/dhruvam/ui/dividers/mountain-star.svg"
        alt=""
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-auto opacity-60 pointer-events-none"
      />

      {/* Top gold line */}
      <div className="relative z-10 h-px bg-gradient-to-r from-transparent via-[var(--color-dhruvam-gold-light)]/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-0">

        {/* DHRUVAM mark — central */}
        <div className="flex flex-col items-center text-center mb-16">
          {/* Animated guiding star */}
          <img
            src="/assets/dhruvam/decorations/guiding-star-large.svg"
            alt="Guiding star"
            className="w-14 h-14 mb-4 dhruvam-guiding-star"
          />
          <h3 className="font-montserrat font-black text-2xl sm:text-3xl text-[var(--color-dhruvam-gold-light)] tracking-widest">
            DHRUVAM
          </h3>
          <p className="font-inter text-sm text-white/50 mt-1">The Star That Guides</p>
          <p className="font-inter text-xs text-white/25 mt-3 uppercase tracking-[0.25em]">
            Rotaract Club of Coimbatore Smartcity · 2026–2027
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-11 h-11 rounded-full bg-[var(--color-rotaract-red)] flex items-center justify-center shadow-md shrink-0">
                <span className="font-montserrat font-black text-white text-lg">R</span>
                <div className="absolute inset-0 rounded-full border-2 border-[var(--color-dhruvam-gold-light)] scale-110 opacity-50" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-poppins font-bold text-sm text-white">Rotaract Club of</span>
                <span className="font-inter text-[10px] text-[var(--color-dhruvam-gold-light)] uppercase tracking-widest font-semibold">
                  Coimbatore Smartcity
                </span>
              </div>
            </div>

            <p className="font-inter text-sm text-white/45 leading-relaxed mb-6">
              Ignite leadership, influence positive change, and create lasting impact. A proud member of Rotary International District 3206.
            </p>

            {/* Social icons — hover: lift + subtle bg glow */}
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-white/25 hover:bg-white/10 hover:-translate-y-1 transition-all duration-200 group"
                >
                  <img src={s.icon} alt="" aria-hidden="true" className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-bold text-xs uppercase tracking-widest text-white/30 mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(([name, href]) => (
                <li key={name}>
                  <Link
                    href={href}
                    className="font-inter text-sm text-white/55 hover:text-[var(--color-dhruvam-gold-light)] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[var(--color-dhruvam-gold-light)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Avenues */}
          <div>
            <h4 className="font-poppins font-bold text-xs uppercase tracking-widest text-white/30 mb-5">Avenues of Service</h4>
            <ul className="space-y-2.5">
              {avenues.map((a) => (
                <li key={a} className="font-inter text-sm text-white/45 flex items-center gap-2">
                  <img src="/assets/dhruvam/decorations/stars-four-point.svg" alt="" aria-hidden="true" className="w-2.5 h-2.5 opacity-30" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {/* Club Details */}
          <div>
            <h4 className="font-poppins font-bold text-xs uppercase tracking-widest text-white/30 mb-5">Club Details</h4>
            <div className="space-y-3">
              {[
                { label: "Club ID",       value: "8823645",               accent: "text-[var(--color-dhruvam-gold-light)]" },
                { label: "Charter Date",  value: "17 May 2021",           accent: "text-white" },
                { label: "District",      value: "Rotary District 3206",  accent: "text-white" },
                { label: "Headquarters",  value: "Coimbatore, TN",        accent: "text-white" },
              ].map(({ label, value, accent }) => (
                <div key={label} className="border-b border-white/[0.06] pb-3 last:border-0">
                  <p className="font-inter text-[10px] text-white/25 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className={`font-poppins font-semibold text-sm ${accent}`}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-inter text-xs text-white/25">
            © {new Date().getFullYear()} Rotaract Club of Coimbatore Smartcity. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-1">
            <Link href="/privacy" className="font-inter text-xs text-white/25 hover:text-white/50 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="font-inter text-xs text-white/25 hover:text-white/50 transition-colors">
              Terms of Service
            </Link>
            {/* Designer credit — inline, not a separate card */}
            <span className="font-inter text-xs text-white/25">
              Designed &amp; Developed by{" "}
              <span className="text-[var(--color-dhruvam-gold-light)]/60 hover:text-[var(--color-dhruvam-gold-light)] transition-colors cursor-default">
                Rtr. Umang Jaiswal
              </span>
            </span>
            <Link href="/admin" className="font-inter text-xs text-white/20 hover:text-[var(--color-dhruvam-gold-light)] transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
