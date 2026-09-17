"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { logos } from "@/lib/dhruvamAssets";

export default function AdminNav() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin-login");
    router.refresh();
  };

  return (
    <nav className="bg-[var(--color-dhruvam-950)]/95 backdrop-blur-lg border-b border-white/10 px-6 py-3.5 sticky top-0 z-50 shadow-[0_1px_12px_rgba(0,0,0,0.3)]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-white/50 hover:text-white text-sm font-inter font-medium transition-colors"
          >
            ← Back to Site
          </Link>
          <span className="text-white/15">|</span>
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-full bg-white shrink-0 flex items-center justify-center overflow-hidden">
              <div className="relative w-6 h-6">
                <Image src={logos.rotaractGearMark} alt="" fill className="object-contain" />
              </div>
            </div>
            <span className="font-montserrat font-bold text-[var(--color-dhruvam-gold-light)]">
              DHRUVAM Admin
            </span>
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-white/50 hover:text-[var(--color-dhruvam-gold-light)] text-sm font-inter font-medium transition-colors"
        >
          <LogOut size={15} /> Logout
        </button>
      </div>
    </nav>
  );
}
