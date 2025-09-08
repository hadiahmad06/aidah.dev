"use client";

import { useEffect, useState } from "react";
import HeroDescription from "@/components/Hero/HeroDescription";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Simple linear scale calculation based on scroll position, min scale 0.6
  const scale = Math.max(0.3, 1 - scrollY / 1000);

  return (
    <section className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-background px-8 gap-12 md:gap-20">
      {/* Left Column */}
      <div
        className="flex flex-col items-start gap-4 md:flex-1 font-mono"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "left top",
        }}
      >
        <h2 className="text-4xl sm:text-5xl text-foreground/70">
          Hey, I'm
        </h2>
        <h1 className="text-7xl sm:text-8xl font-bold playful-font">
          <span className="accent">Hadi A</span>
          <span className="text-foreground">hmad</span>
        </h1>
        <p className="text-xl sm:text-2xl text-foreground/70 text-right">Full-Stack Developer</p>
        <HeroDescription />
      </div>

      {/* Right Column: CTA Buttons */}
      <div
        className="flex flex-col gap-4 md:flex-none"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "right top",
        }}
      >
        <button className="px-6 py-3 bg-accent text-background font-semibold rounded-lg hover:opacity-80 transition" onClick={() => { /* Placeholder for View Projects action */ }}>
          View Projects
        </button>
        <button className="px-6 py-3 border-2 border-accent text-accent font-semibold rounded-lg hover:bg-accent hover:text-background transition" onClick={() => { /* Placeholder for Download Resume action */ }}>
          Download Resume
        </button>
        <div className="h-4" />
      </div>
    </section>
  );
}