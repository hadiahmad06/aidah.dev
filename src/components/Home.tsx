import type { Lens } from "@/data/projects";
import About from "./About";
import Contact from "./Contact";
import Education from "./Education";
import Experience from "./Experience";
import Hero from "./Hero";
import ProfileJsonLd from "./ProfileJsonLd";
import ProjectGrid from "./ProjectGrid";
import Sheet from "./Sheet";
import Skills from "./Skills";

export default function Home({ lens }: { lens: Lens }) {
  return (
    <Sheet lens={lens} title="Hadi Ahmad · Portfolio" sheet={1}>
      <ProfileJsonLd />
      <Hero lens={lens} />
      <ProjectGrid lens={lens} />
      <Experience />
      <Education lens={lens} />
      <Skills lens={lens} />
      <About />
      <Contact />
    </Sheet>
  );
}
