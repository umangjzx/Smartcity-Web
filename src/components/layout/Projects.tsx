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

const CATEGORIES = ["All", "Education", "Environment", "Community", "Professional"];

const CATEGORY_COLORS: Record<string, string> = {
  Education: "var(--color-dhruvam-gold-light)",
  Environment: "var(--color-aurora-emerald)",
  Community: "var(--color-aurora-teal)",
  Professional: "var(--color-aurora-blue)",
};

const CATEGORY_ICONS: Record<string, string> = {
  Education: "/assets/dhruvam/icons/filled/learning.svg",
  Environment: "/assets/dhruvam/icons/outline/environment.svg",
  Community: "/assets/dhruvam/icons/filled/community.svg",
  Professional: "/assets/dhruvam/icons/filled/team.svg",
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
    <section id="projects" className="py-28 relative overflow-hidden">
      {/* Subtle starry backdrop, distinct from the global aurora */}
      <div
        className="absolute inset-0 opacity-15 mix-blend-screen pointer-events-none"
        style={{ backgroundImage: "url('/assets/dhruvam/backgrounds/starry-sky.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      />

      {/* Decorative telescope penguin — scouting the milestones ahead */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="absolute top-16 -right-6 lg:right-6 z-0 w-28 lg:w-36 opacity-55 pointer-events-none mix-blend-screen hidden sm:block"
      >
        <img
          src="/assets/dhruvam/characters/penguin-telescope.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-auto drop-shadow-2xl rounded-3xl"
          style={{ maskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 70%)" }}
        />
      </motion.div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">

        <SectionHeader 
          title="Projects & Impact"
          subtitle="Milestones Along the Way"
          align="center"
        />

        {/* Filter pills */}
        {projects.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 sm:px-6 py-2 rounded-full font-poppins text-xs sm:text-sm font-semibold transition-all border ${
                  filter === cat
                    ? "bg-[#F6B51B] text-[#020B1C] border-[#F6B51B] shadow-[0_4px_12px_rgba(246,181,27,0.3)]"
                    : "bg-[#FBFAFF]/5 text-[#E3E9F3] border-[#FBFAFF]/10 hover:border-[#F6B51B]/50 hover:text-[#F6B51B]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Empty state */}
        {loaded && projects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FolderOpen size={40} className="text-[#93A6C6]/50 mb-4" />
            <p className="font-poppins font-semibold text-[#E3E9F3] mb-1">Projects coming soon</p>
            <p className="font-inter text-sm text-[#93A6C6]">We&apos;re getting our journey milestones ready. Check back shortly.</p>
          </div>
        )}

        {/* Journey Timeline */}
        {projects.length > 0 && (
          <div className="relative mt-8">
            {/* The Guiding Path (Vertical Line) */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#F6B51B]/30 to-transparent transform md:-translate-x-1/2" />
            
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => {
                const accent = CATEGORY_COLORS[project.category] ?? "var(--color-dhruvam-gold-light)";
                const isEven = index % 2 === 0;
                
                return (
                  <motion.div
                    layout
                    key={project._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className={`relative flex items-center mb-16 md:mb-24 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                  >
                    {/* Timeline Node (Star) */}
                    <div className="absolute left-8 md:left-1/2 w-8 h-8 rounded-full bg-[#020B1C] border border-[#F6B51B] flex items-center justify-center transform -translate-x-1/2 z-20 shadow-[0_0_12px_rgba(246,181,27,0.4)]">
                      <img src="/assets/dhruvam/effects/guiding-star.svg" alt="" aria-hidden="true" className="w-4 h-4" />
                    </div>

                    {/* Content Box */}
                    <div className="w-full pl-20 md:pl-0 md:w-1/2 flex">
                      <div className={`w-full ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                        <div className="relative group rounded-3xl overflow-hidden bg-[#082747]/60 backdrop-blur-md border border-[#FBFAFF]/10 hover:border-[#F6B51B]/40 hover:shadow-[0_16px_40px_rgba(246,181,27,0.15)] transition-all duration-500 flex flex-col md:flex-row">
                          
                          {/* Image Thumbnail */}
                          <div className="relative w-full md:w-2/5 aspect-video md:aspect-auto overflow-hidden">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#06152B]/90 via-[#06152B]/30 to-transparent" />
                            
                            {/* SVG Badge */}
                            <img 
                              src="/assets/dhruvam/ui/badges/completed.svg" 
                              alt="Completed" 
                              className="absolute -right-2 -bottom-2 md:-right-4 md:top-1/2 md:-translate-y-1/2 w-16 h-16 md:w-20 md:h-20 z-30 drop-shadow-[0_4px_12px_rgba(246,181,27,0.25)]" 
                            />
                          </div>

                          {/* Content */}
                          <div className="p-6 md:w-3/5 flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-3">
                              <span
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold font-inter tracking-wider uppercase"
                                style={{ background: "rgba(255,255,255,0.1)", color: accent }}
                              >
                                {CATEGORY_ICONS[project.category] && (
                                  <img src={CATEGORY_ICONS[project.category]} alt="" aria-hidden="true" className="w-3.5 h-3.5" />
                                )}
                                {project.category}
                              </span>
                              <span className="font-inter text-[10px] font-semibold tracking-wider text-[#93A6C6] bg-[#FBFAFF]/5 border border-[#FBFAFF]/10 px-3 py-1 rounded-full uppercase">
                                {project.impact}
                              </span>
                            </div>
                            <h3 className="font-montserrat font-bold text-lg md:text-xl text-[#FBFAFF] group-hover:text-[#F6B51B] transition-colors leading-tight">
                              {project.title}
                            </h3>
                            {project.description && (
                              <p className="font-inter text-xs md:text-sm text-[#E3E9F3]/70 mt-3 leading-relaxed line-clamp-2 md:line-clamp-3">
                                {project.description}
                              </p>
                            )}
                          </div>

                        </div>
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
