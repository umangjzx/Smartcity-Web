import { ClerkProvider } from "@clerk/nextjs";
import AdminNav from "./AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <div className="min-h-screen bg-[var(--color-cream)]">
        <AdminNav />
        <main className="max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </ClerkProvider>
  );
}
