"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

type Project = {
  _id: string;
  title: string;
  category: string;
  image: string;
  impact: string;
  description?: string;
};

// Matches the club's actual five Avenues of Service (see Avenues.tsx) rather
// than an ad-hoc category set, so a project's tag means the same thing here
// as it does there.
const CATEGORIES = ["All", "Club Service", "Community Service", "Professional Development", "International Service", "Public Relations"];

const CATEGORY_META: Record<string, { color: string; icon: string; bg: string }> = {
  "Club Service":              { color: "var(--color-dhruvam-gold-light)", icon: "/assets/dhruvam/icons/filled/team.svg",      bg: "rgba(255,214,90,0.12)" },
  "Community Service":         { color: "var(--color-aurora-teal)",        icon: "/assets/dhruvam/icons/filled/community.svg", bg: "rgba(47,191,166,0.12)" },
  "Professional Development":  { color: "var(--color-aurora-blue)",        icon: "/assets/dhruvam/icons/filled/learning.svg",  bg: "rgba(74,127,217,0.12)" },
  "International Service":     { color: "var(--color-aurora-violet)",      icon: "/assets/dhruvam/icons/outline/global.svg",   bg: "rgba(140,127,224,0.12)" },
  "Public Relations":          { color: "var(--color-aurora-emerald)",     icon: "/assets/dhruvam/icons/outline/share.svg",    bg: "rgba(62,203,146,0.12)" },
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((d) => { setProjects(d.success ? d.data : []); })
      .catch(() => setProjects([]))
      .finally(() => setLoaded(true));
  }, []);

  const filtered = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <section id="projects" className="py-20 md:py-28 relative overflow-hidden">
      {/* Subtle starry backdrop */}
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: "url('/assets/dhruvam/backgrounds/starry-sky.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Telescope penguin decoration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="absolute top-16 -right-6 lg:right-6 z-0 w-28 lg:w-36 opacity-50 pointer-events-none mix-blend-screen hidden sm:block section-float"
      >
        <img
          src="/assets/dhruvam/characters/penguin-telescope.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-auto drop-shadow-2xl rounded-3xl"
          style={{
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)",
          }}
        />
      </motion.div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeader
          title="Projects & Impact"
          eyebrow="Our Milestones"
          subtitle="Every project is a step on our journey — a mark we leave on the world."
          align="center"
        />

        {/* Filter pills */}
        {projects.length > 0 && (
          <div className="flex flex-nowrap overflow-x-auto pb-2 justify-start md:justify-center gap-2 mb-14 scrollbar-hide">
            {CATEGORIES.map((cat) => {
              const meta = CATEGORY_META[cat];
              const isActive = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full font-inter text-xs font-semibold transition-all duration-300 border ${
                    isActive
                      ? "bg-[#F6B51B] text-[#020B1C] border-[#F6B51B] shadow-[0_4px_16px_rgba(246,181,27,0.35)]"
                      : "bg-white/5 text-white/70 border-white/10 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {meta && (
                    <img src={meta.icon} alt="" aria-hidden="true" className="w-3.5 h-3.5" />
                  )}
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {loaded && projects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FolderOpen size={40} className="text-white/20 mb-4" />
            <p className="font-poppins font-semibold text-white/60 mb-1">Projects coming soon</p>
            <p className="font-inter text-sm text-white/35">
              We&apos;re getting our journey milestones ready.
            </p>
          </div>
        )}

        {/* Journey Timeline */}
        {projects.length > 0 && (
          <div className="relative mt-8">
            {/* Vertical guiding path */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/8 transform md:-translate-x-1/2" />

            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => {
                const meta = CATEGORY_META[project.category];
                const accent = meta?.color ?? "var(--color-dhruvam-gold-light)";
                const accentBg = meta?.bg ?? "rgba(246,181,27,0.1)";
                const isEven = index % 2 === 0;
                const projectNumber = String(index + 1).padStart(2, "0");

                return (
                  <motion.div
                    layout
                    key={project._id}
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className={`relative flex items-start mb-16 md:mb-24 ${isEven ? "md:flex-row-reverse" : "md:flex-row"}`}
                  >
                    {/* Timeline Node — pulsing glow ring + guiding star */}
                    <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-20">
                      {/* Outer glow ring */}
                      <div
                        className="dhruvam-glow-ring absolute inset-[-8px] rounded-full border opacity-50"
                        style={{ borderColor: accent }}
                      />
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                        style={{ background: accentBg, border: `1px solid ${accent}` }}
                      >
                        <img
                          src="/assets/dhruvam/effects/guiding-star.svg"
                          alt=""
                          aria-hidden="true"
                          className="w-5 h-5"
                        />
                      </div>
                    </div>

                    {/* Content Box */}
                    <div className="w-full pl-20 md:pl-0 md:w-1/2 flex">
                      <div className={`w-full ${isEven ? "md:pl-14" : "md:pr-14"}`}>
                        <motion.div
                          whileHover={{ y: -4 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="group relative rounded-3xl overflow-hidden bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-white/20 hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)] transition-all duration-500"
                        >
                          {/* Image */}
                          <div className="relative w-full aspect-video overflow-hidden">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div
                              className="absolute inset-0 bg-gradient-to-t from-[#020B1C]/90 via-[#020B1C]/30 to-transparent"
                            />

                            {/* Ghost project number — large, in top-left of image */}
                            <span
                              className="absolute top-3 left-4 font-montserrat font-black text-5xl leading-none text-white/10 select-none pointer-events-none"
                              aria-hidden="true"
                            >
                              {projectNumber}
                            </span>
                          </div>

                          {/* Content — badge OUTSIDE overflow:hidden, on the border */}
                          <div className="relative p-6">
                            {/* SVG Badge — now outside the image's overflow:hidden */}
                            <div className="absolute -top-6 right-4 z-30">
                              <img
                                src="/assets/dhruvam/ui/badges/completed.svg"
                                alt="Completed"
                                className="w-14 h-14 drop-shadow-[0_4px_12px_rgba(246,181,27,0.3)]"
                              />
                            </div>

                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <span
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold font-inter tracking-wider uppercase"
                                style={{ background: accentBg, color: accent }}
                              >
                                {meta?.icon && (
                                  <img src={meta.icon} alt="" aria-hidden="true" className="w-3 h-3" />
                                )}
                                {project.category}
                              </span>
                              <span className="font-inter text-[10px] font-medium tracking-wider text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase">
                                {project.impact}
                              </span>
                            </div>

                            <h3 className="font-montserrat font-bold text-lg md:text-xl text-white group-hover:text-[var(--color-dhruvam-gold-light)] transition-colors leading-tight mb-2">
                              {project.title}
                            </h3>
                            {project.description && (
                              <p className="font-inter text-sm text-white/50 leading-relaxed line-clamp-2">
                                {project.description}
                              </p>
                            )}

                            {/* Category color accent on bottom */}
                            <div
                              className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                              style={{ background: `linear-gradient(to right, ${accent}, transparent)` }}
                            />
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
