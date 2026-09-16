import Link from "next/link";

const socialLinks = [
  { name: "Instagram", href: "#", icon: "/assets/dhruvam/social/instagram.svg" },
  { name: "LinkedIn", href: "#", icon: "/assets/dhruvam/social/linkedin.svg" },
  { name: "Facebook", href: "#", icon: "/assets/dhruvam/social/facebook.svg" },
  { name: "X", href: "#", icon: "/assets/dhruvam/social/x.svg" },
];

const quickLinks = [
  ["About Us", "#about"],
  ["Board of Directors", "#leadership"],
  ["Our Projects", "#projects"],
  ["Upcoming Events", "#events"],
  ["Become a Member", "#join"],
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
    <footer className="relative overflow-hidden bg-[var(--color-dhruvam-950)]/50 backdrop-blur-sm text-white border-t border-[var(--color-dhruvam-gold-light)]/20 mt-12">
      {/* The journey's end — lighthouse glow, distinct from the global aurora */}
      <div
        className="absolute inset-0 opacity-25 mix-blend-screen pointer-events-none"
        style={{ backgroundImage: "url('/assets/dhruvam/backgrounds/lighthouse-night.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <img
        src="/assets/dhruvam/ui/dividers/mountain-star.svg"
        alt=""
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-auto opacity-70 pointer-events-none"
      />

      {/* Top accent */}
      <div className="relative z-10 h-px bg-gradient-to-r from-transparent via-[var(--color-dhruvam-gold-light)]/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-14 sm:pt-16 md:pt-20 pb-6 sm:pb-8 md:pb-10">

        {/* DHRUVAM journey's-end mark */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-16">
          <img src="/assets/dhruvam/decorations/guiding-star-large.svg" alt="Guiding star" className="w-16 h-16 mb-4" />
          <h3 className="font-montserrat font-black text-2xl sm:text-3xl text-[var(--color-dhruvam-gold-light)] tracking-wide">
            DHRUVAM
          </h3>
          <p className="font-inter text-sm text-white/60 mt-1">The Star That Guides</p>
          <p className="font-inter text-xs text-white/35 mt-3 uppercase tracking-[0.2em]">
            Rotaract Club of Coimbatore Smartcity · 2026–2027
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-10 md:mb-14">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-11 h-11 rounded-full bg-[var(--color-rotaract-red)] flex items-center justify-center shadow-md shrink-0">
                <span className="font-montserrat font-black text-white text-lg">R</span>
                <div className="absolute inset-0 rounded-full border-2 border-[var(--color-dhruvam-gold-light)] scale-110 opacity-50" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-poppins font-bold text-sm text-white">Rotaract Club of</span>
                <span className="font-inter text-[10px] text-[var(--color-dhruvam-gold-light)] uppercase tracking-widest font-semibold">Coimbatore Smartcity</span>
              </div>
            </div>

            <p className="font-inter text-sm text-white/50 leading-relaxed mb-6">
              Ignite leadership, influence positive change, and create lasting impact. A proud member of Rotary International District 3206.
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="w-10 h-10 flex items-center justify-center transition-transform hover:scale-110"
                >
                  <img src={s.icon} alt="" aria-hidden="true" className="w-full h-full" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-bold text-sm uppercase tracking-wider text-white/40 mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(([name, href]) => (
                <li key={name}>
                  <Link href={href} className="font-inter text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-[var(--color-dhruvam-gold-light)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Avenues */}
          <div>
            <h4 className="font-poppins font-bold text-sm uppercase tracking-wider text-white/40 mb-5">Avenues of Service</h4>
            <ul className="space-y-2.5">
              {avenues.map((a) => (
                <li key={a} className="font-inter text-sm text-white/60">{a}</li>
              ))}
            </ul>
          </div>

          {/* Club Details */}
          <div>
            <h4 className="font-poppins font-bold text-sm uppercase tracking-wider text-white/40 mb-5">Club Details</h4>
            <div className="space-y-3">
              {[
                { label: "Club ID",       value: "8823645",              accent: "text-[var(--color-dhruvam-gold-light)]" },
                { label: "Charter Date",  value: "17 May 2021",          accent: "text-white" },
                { label: "District",      value: "Rotary District 3206", accent: "text-white" },
                { label: "Headquarters", value: "Coimbatore, TN",        accent: "text-white" },
              ].map(({ label, value, accent }) => (
                <div key={label} className="border-b border-white/8 pb-3 last:border-0">
                  <p className="font-inter text-[10px] text-white/30 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className={`font-poppins font-semibold text-sm ${accent}`}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Designed & Developed by — standalone card */}
        <div className="border-t border-white/10 pt-10 pb-8 flex flex-col items-center gap-3">
          <p className="font-inter text-xs text-white/30 uppercase tracking-[0.2em]">Designed &amp; Developed by</p>
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 hover:bg-white/8 transition-colors">
            <img
              src="/umang.jpeg"
              alt="Rtr. Umang Jaiswal"
              className="w-14 h-14 rounded-full object-cover border-2 border-[var(--color-dhruvam-gold-light)] shadow-lg"
            />
            <div>
              <p className="font-poppins font-bold text-white text-base leading-tight">Rtr. Umang Jaiswal</p>
              <p className="font-inter text-xs text-white/40 mt-0.5">Secretary Communication · Rotaract Coimbatore Smartcity</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-inter text-xs text-white/30">
            &copy; {new Date().getFullYear()} Rotaract Club of Coimbatore Smartcity. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="font-inter text-xs text-white/30 hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="#" className="font-inter text-xs text-white/30 hover:text-white/60 transition-colors">Terms of Service</Link>
            <Link href="/admin" className="font-inter text-xs text-white/30 hover:text-[var(--color-dhruvam-gold-light)] transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
