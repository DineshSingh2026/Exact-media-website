import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Services } from "@/components/Services";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { SHOW_THEME_SWITCHER } from "@/lib/themes";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
      {SHOW_THEME_SWITCHER ? <ThemeSwitcher /> : null}
    </>
  );
}
