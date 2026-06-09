import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import About from "@/components/layout/About";
import Leadership from "@/components/layout/Leadership";
import Avenues from "@/components/layout/Avenues";
import Projects from "@/components/layout/Projects";
import Events from "@/components/layout/Events";
import Achievements from "@/components/layout/Achievements";
import Membership from "@/components/layout/Membership";
import Contact from "@/components/layout/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Leadership />
      <Avenues />
      <Projects />
      <Events />
      <Achievements />
      <Membership />
      <Contact />
      <Footer />
    </main>
  );
}

