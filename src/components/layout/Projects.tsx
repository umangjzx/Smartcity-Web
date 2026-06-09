"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Folder } from "lucide-react";

type Project = {
  _id: string;
  title: string;
  category: string;
  image: string;
  impact: string;
  description?: string;
};

const CATEGORIES = ["All", "Education", "Environment", "Community", "Professional"];

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Education:    { bg: "#FFF9EB", text: "#F0A500" },
  Environment:  { bg: "#ECFDF5", text: "#059669" },
  Community:    { bg: "#FFF0F3", text: "#C8102E" },
  Professional: { bg: "#EEF3FF", text: "#003DA5" },
};

const FALLBACK: Project[] = [
  { _id: "1", title: "Project Vidya", category: "Education",    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop", impact: "500+ Students" },
  { _id: "2", title: "Green Earth",   category: "Environment",  image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop", impact: "10,000+ Trees Planted" },
  { _id: "3", title: "Health Camp",   category: "Community",    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop", impact: "2000+ Beneficiaries" },
  { _id: "4", title: "Youth Leadership Summit", category: "Professional", image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop", impact: "300+ Delegates" },
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((d) => { setProjects(d.success && d.data.length > 0 ? d.data : FALLBACK); })
      .catch(() => setProjects(FALLBACK));
  }, []);

  const filtered = projects.filter((p) => filter === "All" || p.category === filter);

  return (
    <section id="projects" className="py-28 bg-white relative">
      {/* Top bleed */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-rotary-gold)]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-[var(--color-rotaract-red)]" />
              <span className="font-inter text-[var(--color-rotaract-red)] text-xs font-semibold tracking-[0.2em] uppercase">Our Work</span>
            </div>
            <h2 className="font-montserrat font-black text-4xl md:text-5xl text-[var(--color-charcoal)] leading-tight">
              Projects &amp; <span className="text-[var(--color-rotaract-red)]">Impact</span>
            </h2>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full font-poppins text-xs font-semibold transition-all border ${
                  filter === cat
                    ? "bg-[var(--color-rotaract-red)] text-white border-[var(--color-rotaract-red)] shadow-md"
                    : "bg-white text-[var(--color-warm-gray)] border-[var(--border)] hover:border-[var(--color-rotaract-red)] hover:text-[var(--color-rotaract-red)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => {
              const colors = CATEGORY_COLORS[project.category] ?? { bg: "#F5F5F7", text: "#6B7280" };
              return (
                <motion.article
                  layout
                  key={project._id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="group relative rounded-3xl overflow-hidden bg-[var(--color-cream)] border border-[var(--border)] hover:shadow-2xl transition-all duration-500 cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Arrow */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[var(--color-charcoal)] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-inter"
                        style={{ background: colors.bg, color: colors.text }}
                      >
                        <Folder size={11} />
                        {project.category}
                      </span>
                      <span className="font-inter text-xs text-[var(--color-warm-gray)] bg-white border border-[var(--border)] px-3 py-1 rounded-full">
                        {project.impact}
                      </span>
                    </div>
                    <h3 className="font-montserrat font-bold text-xl text-[var(--color-charcoal)] group-hover:text-[var(--color-rotaract-red)] transition-colors">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="font-inter text-sm text-[var(--color-warm-gray)] mt-2 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
