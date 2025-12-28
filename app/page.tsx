import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Clients from "@/components/sections/Clients";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between">
        <Hero />
        <About />
        <Clients />
        <Projects />
        <Services />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
