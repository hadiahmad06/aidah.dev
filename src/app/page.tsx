"use client";

import Hero from "@/components/Hero/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import AboutMe from "@/components/AboutMe";
import Contact from "@/components/Contact";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReactiveButton from "@/components/common/ReactiveButton";

export default function Home() {
  const [headerOpacity, setHeaderOpacity] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const start = window.innerHeight * 0.7;
      const end = window.innerHeight;
      const scrollY = window.scrollY;

      if (scrollY <= start) {
        setHeaderOpacity(0);
      } else if (scrollY >= end) {
        setHeaderOpacity(1);
      } else {
        const progress = (scrollY - start) / (end - start);
        // Apply easing curve (easeInOutCubic)
        const eased = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        setHeaderOpacity(eased);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {headerOpacity !== 0 && 
        <header
          className="fixed hidden sm:inline top-0 left-0 w-full z-50 transition-opacity duration-300"
          style={{ backgroundColor: `rgba(var(--background-rgb), ${headerOpacity})` }}
        >
          <div className="backdrop-blur-md shadow-lg p-4 flex flex-row w-full justify-between px-12" style={{ opacity: headerOpacity }}>
            <ReactiveButton 
              className="text-2xl font-bold py-2 px-4"
              onClick={() => router.push('/#Hero')}
            >
              Hadi Ahmad
            </ReactiveButton>
            <div className="flex flex-row gap-6 self-end">
              <ReactiveButton 
                className="text-xl text-gray-400 py-2 px-4"
                onClick={() => router.push('/#AboutMe')}
              >
                About Me
              </ReactiveButton>
              <ReactiveButton 
                className="text-xl text-gray-400 py-2 px-4"
                onClick={() => router.push('/#Projects')}
              >
                Projects
              </ReactiveButton>
              <ReactiveButton 
                className="text-xl text-gray-400 py-2 px-4"
                onClick={() => router.push('/#Contact')}
              >
                Contact
              </ReactiveButton>
            </div>
          </div>
        </header>
      }
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
