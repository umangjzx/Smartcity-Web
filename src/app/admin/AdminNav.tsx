"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function AdminNav() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin-login");
    router.refresh();
  };

  return (
    <nav className="bg-white border-b border-[var(--border)] px-6 py-3.5 sticky top-0 z-50 shadow-[0_1px_12px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)] text-sm font-inter font-medium transition-colors"
          >
            ← Back to Site
          </Link>
          <span className="text-gray-200">|</span>
          <span className="font-montserrat font-bold text-[var(--color-rotaract-red)]">
            Admin
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-[var(--color-warm-gray)] hover:text-[var(--color-rotaract-red)] text-sm font-inter font-medium transition-colors"
        >
          <LogOut size={15} /> Logout
        </button>
      </div>
    </nav>
  );
}
