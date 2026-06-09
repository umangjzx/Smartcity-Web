"use client";

import { useState, useEffect, useCallback } from "react";
import {
  PlusCircle, FileText, Calendar as CalendarIcon, Trash2, Loader2,
  CheckCircle, Users, LayoutDashboard, Pencil, X, Star,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Project = { _id: string; title: string; category: string; image: string; impact: string; description?: string };
type Event   = { _id: string; title: string; description: string; date: string; location: string; time: string; isFeatured: boolean };
type Member  = { _id: string; name: string; role: string; phone: string; email: string; image: string; linkedin: string; isBoard: boolean; order: number };

type Tab = "overview" | "projects" | "events" | "members";

const PROJECT_CATEGORIES = ["Education", "Environment", "Community", "Professional"];

const emptyProject = { title: "", category: "Education", image: "", impact: "", description: "" };
const emptyEvent   = { title: "", description: "", date: "", location: "", time: "", isFeatured: false };
const emptyMember  = { name: "", role: "", phone: "", email: "", image: "", linkedin: "", isBoard: false, order: 0 };

// ─── Reusable field ────────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-inter font-medium text-foreground">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-rotaract-red)]";

// ─── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color: string }) {
  return (
    <div className={`bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800 shadow-sm flex items-center gap-4`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>{icon}</div>
      <div>
        <p className="text-3xl font-montserrat font-black text-foreground">{value}</p>
        <p className="text-sm font-inter text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [tab, setTab]         = useState<Tab>("overview");
  const [projects, setProjects] = useState<Project[]>([]);
  const [events, setEvents]   = useState<Event[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving]   = useState(false);
  const [toast, setToast]     = useState<{ msg: string; type: "success" | "error" } | null>(null);

  // Forms
  const [projectForm, setProjectForm] = useState({ ...emptyProject });
  const [eventForm,   setEventForm]   = useState({ ...emptyEvent });
  const [memberForm,  setMemberForm]  = useState({ ...emptyMember });

  // Editing
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingEvent,   setEditingEvent]   = useState<Event | null>(null);
  const [editingMember,  setEditingMember]  = useState<Member | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [pRes, eRes, mRes] = await Promise.all([
        fetch("/api/projects"), fetch("/api/events"), fetch("/api/members"),
      ]);
      const [p, e, m] = await Promise.all([pRes.json(), eRes.json(), mRes.json()]);
      if (p.success) setProjects(p.data);
      if (e.success) setEvents(e.data);
      if (m.success) setMembers(m.data);
    } catch { /* ignore */ }
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ── Projects ────────────────────────────────────────────────────────────────
  const saveProject = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSaving(true);
    try {
      if (editingProject) {
        const res = await fetch(`/api/projects/${editingProject._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(projectForm) });
        const d = await res.json();
        if (d.success) { setProjects((p) => p.map((x) => x._id === editingProject._id ? d.data : x)); setEditingProject(null); setProjectForm({ ...emptyProject }); showToast("Project updated!"); }
      } else {
        const res = await fetch("/api/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(projectForm) });
        const d = await res.json();
        if (d.success) { setProjects((p) => [d.data, ...p]); setProjectForm({ ...emptyProject }); showToast("Project added!"); }
      }
    } catch { showToast("Save failed", "error"); }
    setSaving(false);
  };

  const deleteProject = async (id: string) => {
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects((p) => p.filter((x) => x._id !== id));
    showToast("Deleted");
  };

  const startEditProject = (p: Project) => { setEditingProject(p); setProjectForm({ title: p.title, category: p.category, image: p.image, impact: p.impact, description: p.description ?? "" }); };

  // ── Events ──────────────────────────────────────────────────────────────────
  const saveEvent = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSaving(true);
    try {
      if (editingEvent) {
        const res = await fetch(`/api/events/${editingEvent._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(eventForm) });
        const d = await res.json();
        if (d.success) { setEvents((e) => e.map((x) => x._id === editingEvent._id ? d.data : x)); setEditingEvent(null); setEventForm({ ...emptyEvent }); showToast("Event updated!"); }
      } else {
        const res = await fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(eventForm) });
        const d = await res.json();
        if (d.success) { setEvents((e) => [d.data, ...e]); setEventForm({ ...emptyEvent }); showToast("Event added!"); }
      }
    } catch { showToast("Save failed", "error"); }
    setSaving(false);
  };

  const deleteEvent = async (id: string) => {
    await fetch(`/api/events/${id}`, { method: "DELETE" });
    setEvents((e) => e.filter((x) => x._id !== id));
    showToast("Deleted");
  };

  const startEditEvent = (e: Event) => {
    setEditingEvent(e);
    setEventForm({ title: e.title, description: e.description, date: e.date.slice(0, 10), location: e.location, time: e.time, isFeatured: e.isFeatured });
  };

  // ── Members ─────────────────────────────────────────────────────────────────
  const saveMember = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setSaving(true);
    try {
      if (editingMember) {
        const res = await fetch(`/api/members/${editingMember._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(memberForm) });
        const d = await res.json();
        if (d.success) { setMembers((m) => m.map((x) => x._id === editingMember._id ? d.data : x)); setEditingMember(null); setMemberForm({ ...emptyMember }); showToast("Member updated!"); }
      } else {
        const res = await fetch("/api/members", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(memberForm) });
        const d = await res.json();
        if (d.success) { setMembers((m) => [d.data, ...m]); setMemberForm({ ...emptyMember }); showToast("Member added!"); }
      }
    } catch { showToast("Save failed", "error"); }
    setSaving(false);
  };

  const deleteMember = async (id: string) => {
    await fetch(`/api/members/${id}`, { method: "DELETE" });
    setMembers((m) => m.filter((x) => x._id !== id));
    showToast("Deleted");
  };

  const startEditMember = (m: Member) => {
    setEditingMember(m);
    setMemberForm({ name: m.name, role: m.role, phone: m.phone, email: m.email, image: m.image, linkedin: m.linkedin, isBoard: m.isBoard, order: m.order });
  };

  // ── Nav items ────────────────────────────────────────────────────────────────
  const navItems: { id: Tab; label: string; icon: React.ReactNode; accent: string }[] = [
    { id: "overview", label: "Overview",  icon: <LayoutDashboard size={16} />, accent: "bg-[var(--color-rotaract-red)] text-white" },
    { id: "projects", label: "Projects",  icon: <FileText size={16} />,         accent: "bg-[var(--color-rotaract-red)] text-white" },
    { id: "events",   label: "Events",    icon: <CalendarIcon size={16} />,     accent: "bg-[var(--color-rotary-gold)] text-black" },
    { id: "members",  label: "Members",   icon: <Users size={16} />,            accent: "bg-blue-600 text-white" },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-montserrat font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground font-inter text-sm mt-1">Manage website content for Rotaract Club of Coimbatore Smartcity</p>
      </div>

      {/* Tab nav */}
      <div className="flex flex-wrap gap-2">
        {navItems.map((n) => (
          <button
            key={n.id}
            onClick={() => setTab(n.id)}
            className={`px-5 py-2.5 rounded-xl font-poppins font-medium transition-all flex items-center gap-2 text-sm
              ${tab === n.id ? n.accent + " shadow-md" : "bg-white dark:bg-zinc-800 text-foreground border border-gray-200 dark:border-zinc-700 hover:border-gray-400"}`}
          >
            {n.icon} {n.label}
          </button>
        ))}
      </div>

      {/* Toast */}
      {toast && (
        <div className={`flex items-center gap-3 px-5 py-3 rounded-xl font-inter text-sm border
          ${toast.type === "success"
            ? "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
            : "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300"}`}>
          <CheckCircle size={18} /> {toast.msg}
        </div>
      )}

      {/* ── Overview ──────────────────────────────────────────────────────── */}
      {tab === "overview" && (
        <div className="space-y-8">
          <div className="grid sm:grid-cols-3 gap-4">
            <StatCard label="Total Projects" value={projects.length} icon={<FileText size={22} className="text-[var(--color-rotaract-red)]" />} color="bg-[var(--color-rotaract-red)]/10" />
            <StatCard label="Total Events"   value={events.length}   icon={<CalendarIcon size={22} className="text-[var(--color-rotary-gold)]" />} color="bg-[var(--color-rotary-gold)]/10" />
            <StatCard label="Total Members"  value={members.length}  icon={<Users size={22} className="text-blue-600" />} color="bg-blue-600/10" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Recent projects */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800">
              <h3 className="font-poppins font-bold text-base mb-4">Recent Projects</h3>
              {loading ? <Loader2 className="animate-spin" size={20} /> : projects.slice(0, 5).map((p) => (
                <div key={p._id} className="flex items-center gap-3 py-2 border-b border-gray-50 dark:border-zinc-800 last:border-0">
                  {p.image && <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover" />}
                  <div className="flex-1 min-w-0">
                    <p className="font-inter text-sm font-medium truncate">{p.title}</p>
                    <p className="text-xs text-muted-foreground">{p.category}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Upcoming events */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800">
              <h3 className="font-poppins font-bold text-base mb-4">Upcoming Events</h3>
              {loading ? <Loader2 className="animate-spin" size={20} /> : events.slice(0, 5).map((e) => (
                <div key={e._id} className="flex items-center gap-3 py-2 border-b border-gray-50 dark:border-zinc-800 last:border-0">
                  <div className="w-10 h-10 bg-[var(--color-rotary-gold)]/10 rounded-xl flex flex-col items-center justify-center shrink-0">
                    <span className="font-black text-sm text-[var(--color-rotary-gold)]">{new Date(e.date).getDate()}</span>
                    <span className="text-[9px] text-muted-foreground uppercase">{new Date(e.date).toLocaleString("default", { month: "short" })}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-inter text-sm font-medium truncate">{e.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{e.location}</p>
                  </div>
                  {e.isFeatured && <Star size={14} className="text-[var(--color-rotary-gold)] shrink-0" />}
                </div>
              ))}
            </div>
          </div>

          {/* Board members quick view */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800">
            <h3 className="font-poppins font-bold text-base mb-4">Board Members ({members.filter((m) => m.isBoard).length})</h3>
            <div className="flex flex-wrap gap-4">
              {members.filter((m) => m.isBoard).map((m) => (
                <div key={m._id} className="flex items-center gap-3 bg-gray-50 dark:bg-zinc-800 rounded-xl px-4 py-3">
                  <img
                    src={m.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=D81B60&color=fff&size=64`}
                    alt={m.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-poppins font-semibold text-sm">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.role}</p>
                  </div>
                </div>
              ))}
              {members.filter((m) => m.isBoard).length === 0 && (
                <p className="text-sm text-muted-foreground font-inter">No board members yet. Add them in the Members tab.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Projects ──────────────────────────────────────────────────────── */}
      {tab === "projects" && (
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold flex items-center gap-2 font-poppins">
                  <PlusCircle className="text-[var(--color-rotaract-red)]" size={20} />
                  {editingProject ? "Edit Project" : "Add Project"}
                </h2>
                {editingProject && (
                  <button onClick={() => { setEditingProject(null); setProjectForm({ ...emptyProject }); }} className="text-gray-400 hover:text-foreground">
                    <X size={18} />
                  </button>
                )}
              </div>
              <form onSubmit={saveProject} className="space-y-4">
                <Field label="Title"><input required className={inputCls} placeholder="Project title" value={projectForm.title} onChange={(e) => setProjectForm((f) => ({ ...f, title: e.target.value }))} /></Field>
                <Field label="Image URL"><input className={inputCls} placeholder="https://..." value={projectForm.image} onChange={(e) => setProjectForm((f) => ({ ...f, image: e.target.value }))} /></Field>
                <Field label="Impact"><input required className={inputCls} placeholder="500+ Students" value={projectForm.impact} onChange={(e) => setProjectForm((f) => ({ ...f, impact: e.target.value }))} /></Field>
                <Field label="Category">
                  <select className={inputCls} value={projectForm.category} onChange={(e) => setProjectForm((f) => ({ ...f, category: e.target.value }))}>
                    {PROJECT_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Description">
                  <textarea rows={3} className={inputCls + " resize-none"} placeholder="Brief description..." value={projectForm.description} onChange={(e) => setProjectForm((f) => ({ ...f, description: e.target.value }))} />
                </Field>
                <button disabled={saving} type="submit" className="w-full bg-[var(--color-rotaract-red)] hover:bg-[#b0134d] disabled:opacity-60 text-white py-3 rounded-xl font-poppins font-bold flex items-center justify-center gap-2 transition-colors">
                  {saving ? <Loader2 size={18} className="animate-spin" /> : <PlusCircle size={18} />}
                  {saving ? "Saving..." : editingProject ? "Update Project" : "Save Project"}
                </button>
              </form>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 min-h-[400px]">
              <h2 className="text-lg font-bold mb-5 font-poppins">Projects ({projects.length})</h2>
              {loading ? (
                <div className="flex items-center justify-center h-40"><Loader2 className="animate-spin text-[var(--color-rotaract-red)]" size={32} /></div>
              ) : projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-muted-foreground font-inter text-sm"><FileText size={32} className="mb-3 opacity-30" />No projects yet.</div>
              ) : (
                <div className="space-y-3">
                  {projects.map((p) => (
                    <div key={p._id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-black rounded-xl border border-gray-100 dark:border-zinc-800">
                      {p.image && <img src={p.image} alt={p.title} className="w-14 h-14 rounded-lg object-cover shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-poppins font-semibold text-foreground truncate">{p.title}</h4>
                        <div className="flex gap-2 mt-1">
                          <span className="inline-block px-2 py-0.5 bg-[var(--color-rotaract-red)]/10 text-[var(--color-rotaract-red)] text-xs rounded-full font-inter">{p.category}</span>
                          <span className="text-xs text-muted-foreground font-inter">{p.impact}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => startEditProject(p)} className="text-gray-400 hover:text-blue-500 transition-colors"><Pencil size={15} /></button>
                        <button onClick={() => deleteProject(p._id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Events ────────────────────────────────────────────────────────── */}
      {tab === "events" && (
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold flex items-center gap-2 font-poppins">
                  <PlusCircle className="text-[var(--color-rotary-gold)]" size={20} />
                  {editingEvent ? "Edit Event" : "Add Event"}
                </h2>
                {editingEvent && (
                  <button onClick={() => { setEditingEvent(null); setEventForm({ ...emptyEvent }); }} className="text-gray-400 hover:text-foreground">
                    <X size={18} />
                  </button>
                )}
              </div>
              <form onSubmit={saveEvent} className="space-y-4">
                <Field label="Title"><input required className={inputCls} placeholder="Event title" value={eventForm.title} onChange={(e) => setEventForm((f) => ({ ...f, title: e.target.value }))} /></Field>
                <Field label="Date"><input required type="date" className={inputCls} value={eventForm.date} onChange={(e) => setEventForm((f) => ({ ...f, date: e.target.value }))} /></Field>
                <Field label="Time"><input required className={inputCls} placeholder="09:00 AM – 06:00 PM" value={eventForm.time} onChange={(e) => setEventForm((f) => ({ ...f, time: e.target.value }))} /></Field>
                <Field label="Location"><input required className={inputCls} placeholder="Venue name" value={eventForm.location} onChange={(e) => setEventForm((f) => ({ ...f, location: e.target.value }))} /></Field>
                <Field label="Description">
                  <textarea required rows={3} className={inputCls + " resize-none"} placeholder="Brief description..." value={eventForm.description} onChange={(e) => setEventForm((f) => ({ ...f, description: e.target.value }))} />
                </Field>
                <label className="flex items-center gap-2 text-sm font-inter cursor-pointer">
                  <input type="checkbox" checked={eventForm.isFeatured} onChange={(e) => setEventForm((f) => ({ ...f, isFeatured: e.target.checked }))} className="rounded" />
                  Mark as Featured Event
                </label>
                <button disabled={saving} type="submit" className="w-full bg-[var(--color-rotary-gold)] hover:opacity-90 disabled:opacity-60 text-black py-3 rounded-xl font-poppins font-bold flex items-center justify-center gap-2 transition-all">
                  {saving ? <Loader2 size={18} className="animate-spin" /> : <PlusCircle size={18} />}
                  {saving ? "Saving..." : editingEvent ? "Update Event" : "Save Event"}
                </button>
              </form>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 min-h-[400px]">
              <h2 className="text-lg font-bold mb-5 font-poppins">Events ({events.length})</h2>
              {loading ? (
                <div className="flex items-center justify-center h-40"><Loader2 className="animate-spin text-[var(--color-rotary-gold)]" size={32} /></div>
              ) : events.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-muted-foreground font-inter text-sm"><CalendarIcon size={32} className="mb-3 opacity-30" />No events yet.</div>
              ) : (
                <div className="space-y-3">
                  {events.map((ev) => (
                    <div key={ev._id} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-black rounded-xl border border-gray-100 dark:border-zinc-800">
                      <div className="shrink-0 w-14 h-14 bg-[var(--color-rotary-gold)]/10 rounded-xl flex flex-col items-center justify-center">
                        <span className="font-montserrat font-black text-xl text-[var(--color-rotary-gold)]">{new Date(ev.date).getDate()}</span>
                        <span className="text-[10px] text-muted-foreground uppercase">{new Date(ev.date).toLocaleString("default", { month: "short" })}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-poppins font-semibold text-foreground truncate">{ev.title}</h4>
                          {ev.isFeatured && <Star size={13} className="text-[var(--color-rotary-gold)] shrink-0" />}
                        </div>
                        <p className="text-xs text-muted-foreground font-inter mt-0.5 truncate">{ev.location} · {ev.time}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => startEditEvent(ev)} className="text-gray-400 hover:text-blue-500 transition-colors"><Pencil size={15} /></button>
                        <button onClick={() => deleteEvent(ev._id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Members ───────────────────────────────────────────────────────── */}
      {tab === "members" && (
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold flex items-center gap-2 font-poppins">
                  <PlusCircle className="text-blue-600" size={20} />
                  {editingMember ? "Edit Member" : "Add Member"}
                </h2>
                {editingMember && (
                  <button onClick={() => { setEditingMember(null); setMemberForm({ ...emptyMember }); }} className="text-gray-400 hover:text-foreground">
                    <X size={18} />
                  </button>
                )}
              </div>
              <form onSubmit={saveMember} className="space-y-4">
                <Field label="Full Name"><input required className={inputCls} placeholder="Rtr. Full Name" value={memberForm.name} onChange={(e) => setMemberForm((f) => ({ ...f, name: e.target.value }))} /></Field>
                <Field label="Role / Designation"><input required className={inputCls} placeholder="President / Secretary..." value={memberForm.role} onChange={(e) => setMemberForm((f) => ({ ...f, role: e.target.value }))} /></Field>
                <Field label="Phone"><input type="tel" className={inputCls} placeholder="+91 9XXXXXXXXX" value={memberForm.phone} onChange={(e) => setMemberForm((f) => ({ ...f, phone: e.target.value }))} /></Field>
                <Field label="Email"><input type="email" className={inputCls} placeholder="name@email.com" value={memberForm.email} onChange={(e) => setMemberForm((f) => ({ ...f, email: e.target.value }))} /></Field>
                <Field label="Photo URL"><input className={inputCls} placeholder="https://... (leave blank for auto avatar)" value={memberForm.image} onChange={(e) => setMemberForm((f) => ({ ...f, image: e.target.value }))} /></Field>
                <Field label="LinkedIn URL"><input className={inputCls} placeholder="https://linkedin.com/in/..." value={memberForm.linkedin} onChange={(e) => setMemberForm((f) => ({ ...f, linkedin: e.target.value }))} /></Field>
                <Field label="Display Order"><input type="number" min={0} className={inputCls} value={memberForm.order} onChange={(e) => setMemberForm((f) => ({ ...f, order: Number(e.target.value) }))} /></Field>
                <label className="flex items-center gap-2 text-sm font-inter cursor-pointer">
                  <input type="checkbox" checked={memberForm.isBoard} onChange={(e) => setMemberForm((f) => ({ ...f, isBoard: e.target.checked }))} className="rounded" />
                  Board of Directors member
                </label>
                <button disabled={saving} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-xl font-poppins font-bold flex items-center justify-center gap-2 transition-colors">
                  {saving ? <Loader2 size={18} className="animate-spin" /> : <PlusCircle size={18} />}
                  {saving ? "Saving..." : editingMember ? "Update Member" : "Save Member"}
                </button>
              </form>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 min-h-[400px]">
              <h2 className="text-lg font-bold mb-5 font-poppins">Members ({members.length})</h2>
              {loading ? (
                <div className="flex items-center justify-center h-40"><Loader2 className="animate-spin text-blue-600" size={32} /></div>
              ) : members.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-muted-foreground font-inter text-sm"><Users size={32} className="mb-3 opacity-30" />No members yet. Add your first!</div>
              ) : (
                <div className="space-y-3">
                  {members.map((m) => (
                    <div key={m._id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-black rounded-xl border border-gray-100 dark:border-zinc-800">
                      <img
                        src={m.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=D81B60&color=fff&size=64`}
                        alt={m.name}
                        className="w-12 h-12 rounded-full object-cover shrink-0 border-2 border-white dark:border-zinc-700"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-poppins font-semibold text-foreground truncate">{m.name}</h4>
                          {m.isBoard && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[var(--color-rotaract-red)]/10 text-[var(--color-rotaract-red)] text-xs rounded-full font-inter">
                              <Star size={10} /> Board
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground font-inter mt-0.5">{m.role}</p>
                        {m.phone && <p className="text-xs text-muted-foreground font-inter">{m.phone}</p>}
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => startEditMember(m)} className="text-gray-400 hover:text-blue-500 transition-colors"><Pencil size={15} /></button>
                        <button onClick={() => deleteMember(m._id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
