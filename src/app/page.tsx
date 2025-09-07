import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import AboutMe from "@/components/AboutMe";
import Contact from "@/components/Contact";
import Resume from "@/components/Resume";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen font-sans px-8 py-12 sm:px-20 sm:py-24 flex flex-col gap-32">
      {/* Hero Section */}
      <Hero name="Hadi (A)hmad" domain="aidah.dev" />

      {/* Projects Section */}
      <Projects />

      {/* Skills Section */}
      <Skills />

      {/* About Me Section */}
      <AboutMe />

      {/* Contact Section */}
      <Contact />

      {/* Resume Section */}
      <Resume />
    </div>
  );
}
