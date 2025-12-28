import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Clients from "@/components/sections/Clients";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import { setRequestLocale } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

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
