import { ClerkProvider } from "@clerk/nextjs";
import Link from "next/link";
import AdminNav from "./AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-black">
        <AdminNav />
        <main className="container mx-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </ClerkProvider>
  );
}
