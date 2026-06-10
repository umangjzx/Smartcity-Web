"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function AdminNav() {
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
        <UserButton />
      </div>
    </nav>
  );
}
