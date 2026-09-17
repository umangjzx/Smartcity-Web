import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import GuidingStar from "@/components/dhruvam/GuidingStar";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--color-dhruvam-950)] overflow-x-hidden relative flex flex-col">
      <Navbar />

      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-lg mx-auto text-center">
          <div className="flex justify-center mb-8">
            <GuidingStar size={56} />
          </div>

          <p className="font-inter text-[var(--color-dhruvam-gold-light)] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Off the Charted Sky
          </p>

          <h1 className="text-display text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-dhruvam-gold-light)] via-[#FBFAFF] to-[var(--color-dhruvam-gold-light)] mb-6">
            404
          </h1>

          <p className="font-inter text-white/60 text-base md:text-lg leading-relaxed mb-10">
            Even the star that guides can&apos;t find this page. It may have moved, or never existed at all —
            let&apos;s get you back on course.
          </p>

          <Button href="/" size="lg">
            Back to DHRUVAM
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
