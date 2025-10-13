"use client";

import Hero from "@/components/Hero/Hero";
import Projects from "@/components/Projects";
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

  const [stars, setStars] = useState<{ top: string; left: string; delay: string; opacity: string }[]>([]);

  useEffect(() => {
    const totalStars = 250;
    const clusterCount = 60;

    // Generate cluster centers randomly within specified ranges
    const clusters = Array.from({ length: clusterCount }).map(() => ({
      x: Math.random() * 100, // 0-100%
      y: Math.random() * 200, // 0-200%
    }));

    // Distribute stars roughly evenly but with randomness
    const baseStarsPerCluster = Math.floor(totalStars / clusterCount);
    const starsPerCluster = Array(clusterCount).fill(baseStarsPerCluster);
    let remainingStars = totalStars - baseStarsPerCluster * clusterCount;

    // Distribute remaining stars randomly among clusters
    while (remainingStars > 0) {
      const idx = Math.floor(Math.random() * clusterCount);
      starsPerCluster[idx]++;
      remainingStars--;
    }

    const generatedStars: { top: string; left: string; delay: string; opacity: string }[] = [];

    clusters.forEach((cluster, idx) => {
      const count = starsPerCluster[idx];
      for (let i = 0; i < count; i++) {
        // Random offsets around cluster center (±8% horizontally, ±15% vertically)
        const offsetX = (Math.random() * 30) - 15; // -15 to +15
        const offsetY = (Math.random() * 30) - 15; // -15 to +15

        let left = cluster.x + offsetX;
        let top = cluster.y + offsetY;

        // Clamp values to valid ranges
        left = Math.min(Math.max(left, 0), 100);
        top = Math.min(Math.max(top, 0), 200);

        generatedStars.push({
          left: `${left}%`,
          top: `${top}%`,
          delay: `${Math.random() * 5}s`,
          opacity: (Math.random() * 0.7 + 0.3).toFixed(2),
        });
      }
    });

    setStars(generatedStars);

    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      const starTranslate = scrollPercent * 50; // half speed (100% scroll → 50% movement)
      document.querySelector('.stars')?.setAttribute(
        'style',
        `transform: translateY(-${starTranslate}%) translate(calc(var(--cursor-x, 0px) * -0.03), calc(var(--cursor-y, 0px) * -0.03));`
      );
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen font-sans flex flex-col">
      <div className="stars">
        {stars.map((s, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: s.top,
              left: s.left,
              animationDelay: s.delay,
              opacity: s.opacity,
            }}
          />
        ))}
      </div>
      {headerOpacity !== 0 && 
        <header
          className="fixed hidden sm:inline top-0 left-0 w-full z-50 transition-opacity duration-300"
          style={{ backgroundColor: 'transparent' }}
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
