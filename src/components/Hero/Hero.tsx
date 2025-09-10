"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HeroDescription from "@/components/Hero/HeroDescription";
import ReactiveButton from "../common/ReactiveButton";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Simple linear scale calculation based on scroll position, min scale 0.6
  const scale = Math.max(0.3, 1 - scrollY / 1000);

  return (
    <section 
      id="Hero" 
      className="flex flex-col justify-center min-h-screen"
      style={{
        transform: isMobile ? `scale(${scale})` : undefined,
      }}
    >
      <div
        className="flex flex-col md:flex-row items-center justify-center h-full px-12 sm:px-32 gap-12 mt-24"
      >
        {/* Left Column */}
        <div
          className="flex flex-col items-start gap-4 md:flex-1 font-mono origin-top sm:origin-top-left"
          style={{
            transform: !isMobile ? `scale(${scale})` : undefined,
          }}
        >
          <h2 className="text-4xl sm:text-5xl text-foreground/70">
            {"Hey, I'm"}
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
          className="flex flex-row sm:flex-col gap-4 md:flex-none origin-top sm:origin-top-right"
          style={{
            transform: !isMobile ? `scale(${scale})` : undefined,
          }}
        >
          <ReactiveButton
            className="bg-accent px-4 py-2 sm:px-6 sm:py-3 text-md sm:text-lg font-semibold"
            onClick={() => window.open('/resume.pdf', '_blank', 'noopener,noreferrer')}
            dark={true}
          >
            View Resume
          </ReactiveButton>
          <ReactiveButton
            className="px-4 py-2 sm:px-6 sm:py-3 text-md sm:text-lg font-semibold"
            onClick={() => {router.push("/#Projects")}}
          >
            My Projects
          </ReactiveButton>
          <div className="h-4" />
        </div>
      </div>
      <div className="flex items-center justify-center w-full mt-16 sm:mt-24">
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