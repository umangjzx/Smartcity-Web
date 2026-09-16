import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import DhruvamTheme from "@/components/layout/DhruvamTheme";
import About from "@/components/layout/About";
import Leadership from "@/components/layout/Leadership";
import Avenues from "@/components/layout/Avenues";
import Projects from "@/components/layout/Projects";
import Events from "@/components/layout/Events";
import Membership from "@/components/layout/Membership";
import Contact from "@/components/layout/Contact";
import Footer from "@/components/layout/Footer";
import SectionDivider from "@/components/ui/SectionDivider";
import CinematicBackground from "@/components/layout/CinematicBackground";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-dhruvam-950)] overflow-x-hidden relative">
      {/* Global fixed cinematic background layer */}
      <CinematicBackground />

      <Navbar />
      <Hero />

      {/* Hero → DhruvamTheme */}
      <SectionDivider variant="constellation" opacity={0.35} />

      <DhruvamTheme />

      {/* DhruvamTheme → About */}
      <SectionDivider variant="celestial" opacity={0.3} />

      <About />

      {/* About → Leadership */}
      <SectionDivider variant="gold" opacity={0.4} />

      <Leadership />

      {/* Leadership → Avenues */}
      <SectionDivider variant="constellation" flip opacity={0.3} />

      <Avenues />

      {/* Avenues → Projects */}
      <SectionDivider variant="celestial" flip opacity={0.25} />

      <Projects />

      {/* Projects → Events */}
      <SectionDivider variant="gold" opacity={0.35} />

      <Events />

      <Membership />

      {/* Membership → Contact: gradient overlap handled in Membership component */}

      <Contact />

      <Footer />
    </main>
  );
}
