import Link from "next/link";

const quickLinks = [
  ["About Us", "#about"],
  ["Board of Directors", "#leadership"],
  ["Our Projects", "#projects"],
  ["Upcoming Events", "#events"],
  ["Achievements", "#achievements"],
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
    <footer className="bg-[var(--color-charcoal)] text-white">
      {/* Top accent */}
      <div className="h-1 bg-gradient-to-r from-[var(--color-rotaract-red)] via-[var(--color-rotary-gold)] to-[var(--color-royal-blue)]" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-11 h-11 rounded-full bg-[var(--color-rotaract-red)] flex items-center justify-center shadow-md shrink-0">
                <span className="font-montserrat font-black text-white text-lg">R</span>
                <div className="absolute inset-0 rounded-full border-2 border-[var(--color-rotary-gold)] scale-110 opacity-50" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-poppins font-bold text-sm text-white">Rotaract Club of</span>
                <span className="font-inter text-[10px] text-[var(--color-rotary-gold)] uppercase tracking-widest font-semibold">Coimbatore Smartcity</span>
              </div>
            </div>

            <p className="font-inter text-sm text-white/50 leading-relaxed mb-6">
              Ignite leadership, influence positive change, and create lasting impact. A proud member of Rotary International District 3206.
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5">
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/8 hover:bg-[var(--color-rotaract-red)] border border-white/10 flex items-center justify-center transition-all group">
                <svg className="w-4 h-4 fill-white/60 group-hover:fill-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-white/8 hover:bg-[var(--color-royal-blue)] border border-white/10 flex items-center justify-center transition-all group">
                <svg className="w-4 h-4 fill-white/60 group-hover:fill-white" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/8 hover:bg-[#1877F2] border border-white/10 flex items-center justify-center transition-all group">
                <svg className="w-4 h-4 fill-white/60 group-hover:fill-white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              {/* X/Twitter */}
              <a href="#" aria-label="X" className="w-9 h-9 rounded-full bg-white/8 hover:bg-black border border-white/10 flex items-center justify-center transition-all group">
                <svg className="w-4 h-4 fill-white/60 group-hover:fill-white" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-bold text-sm uppercase tracking-wider text-white/40 mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(([name, href]) => (
                <li key={name}>
                  <Link href={href} className="font-inter text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-[var(--color-rotaract-red)] opacity-0 group-hover:opacity-100 transition-opacity" />
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
                { label: "Club ID",       value: "8823645",              accent: "text-[var(--color-rotary-gold)]" },
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
              className="w-14 h-14 rounded-full object-cover border-2 border-[var(--color-rotary-gold)] shadow-lg"
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
            <Link href="/admin" className="font-inter text-xs text-white/30 hover:text-[var(--color-rotaract-red)] transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
