"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HeroDescription from "@/components/Hero/HeroDescription";
import ReactiveButton from "../common/ReactiveButton";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();

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
    <section id="Hero" className="flex flex-col justify-center min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-center h-full px-32 gap-12 mt-20">
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
          <ReactiveButton
            className="bg-accent px-6 py-3 text-lg font-semibold"
            onClick={() => window.open('/resume.pdf', '_blank', 'noopener,noreferrer')}
            dark={true}
          >
            View Resume
          </ReactiveButton>
          <ReactiveButton
            className="px-6 py-3 text-lg font-semibold"
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/resume.pdf';
              link.download = 'HADI_AHMAD_RESUME.pdf';
              link.click();
            }}
          >
            Download Resume
          </ReactiveButton>
          <div className="h-4" />
        </div>
      </div>
      <div className="flex items-center justify-center w-full mt-20">
        <ReactiveButton 
          className="rounded-full px-2 py-2 bob"
          onClick={() => router.push('/#AboutMe')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </ReactiveButton>
      </div>
    </section>
  );
}