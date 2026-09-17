"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { logos } from "@/lib/dhruvamAssets";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        router.push(searchParams.get("redirect_url") || "/admin");
        router.refresh();
      } else {
        setError(data.error || "Invalid username or password");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const inputCls =
    "w-full bg-white/5 border border-white/15 text-white rounded-lg px-3 py-2.5 text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-dhruvam-gold-light)]";

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center bg-[var(--color-dhruvam-950)] px-4">
      <div className="w-full max-w-sm bg-white/[0.04] backdrop-blur-md rounded-2xl shadow-xl border border-white/10 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative w-10 h-10 rounded-full shrink-0 overflow-hidden">
            <Image src={logos.dhruvamBadge} alt="" fill className="object-cover" />
          </div>
          <div>
            <h1 className="font-montserrat font-bold text-lg text-white">Admin Login</h1>
            <p className="text-xs text-white/45 font-inter">Rotaract Coimbatore Smartcity</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="username" className="text-sm font-inter font-medium text-white/80">
              Username
            </label>
            <input
              id="username"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={inputCls}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-inter font-medium text-white/80">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputCls}
            />
          </div>

          {error && <p className="text-sm text-red-400 font-inter">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-dhruvam-gold)] hover:bg-[var(--color-dhruvam-gold-light)] disabled:opacity-60 text-[var(--color-dhruvam-950)] py-3 rounded-xl font-poppins font-bold flex items-center justify-center gap-2 transition-colors"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
