"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function AdminNav() {
  return (
    <nav className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 px-4 py-3 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-gray-400 hover:text-foreground text-sm font-inter transition-colors">
            ← Back to Site
          </Link>
          <span className="text-gray-200 dark:text-gray-700">|</span>
          <span className="font-montserrat font-bold text-lg text-[var(--color-rotaract-red)]">
            Admin Dashboard
          </span>
        </div>
        <UserButton />
      </div>
    </nav>
  );
}
