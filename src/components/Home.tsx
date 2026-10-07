import type { Lens } from "@/data/projects";
import About from "./About";
import Contact from "./Contact";
import Education from "./Education";
import Experience from "./Experience";
import Hero from "./Hero";
import ProjectGrid from "./ProjectGrid";
import Sheet from "./Sheet";
import Skills from "./Skills";

export default function Home({ lens }: { lens: Lens }) {
  return (
    <Sheet lens={lens} title="Hadi Ahmad · Portfolio" sheet={1}>
      <Hero lens={lens} />
      <ProjectGrid lens={lens} />
      <Education lens={lens} />
      <Experience />
      <Skills lens={lens} />
      <About />
      <Contact />
    </Sheet>
  );
}
