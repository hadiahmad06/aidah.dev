"use client";

import Hero from "@/components/Hero/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import AboutMe from "@/components/AboutMe";
import Contact from "@/components/Contact";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      document.body.style.setProperty('--cursor-x', `${x}px`);
      document.body.style.setProperty('--cursor-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen font-sans flex flex-col">
      {/* Hero Section */}
      <Hero />
      
      {/* Resume Section */}
      {/* <Resume /> */}

      {/* About Me Section */}
      <AboutMe />

      {/* Projects Section */}
      <Projects />

      {/* Skills Section */}
      {/* <Skills /> */}



      {/* Contact Section */}
      <Contact />
    </div>
  );
}
