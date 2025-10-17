"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HeroDescription from "@/components/Hero/HeroDescription";
import ReactiveButton from "../common/ReactiveButton";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
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

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setMouseX(event.clientX - centerX);
      setMouseY(event.clientY - centerY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
            // transform: !isMobile ? `scale(${scale}) translate(${mouseX * 0.02}px, ${mouseY * 0.02}px)` : undefined,
          }}
        >
          <h2 className="text-4xl sm:text-5xl text-foreground/70">
            {"Hey, I'm"}
          </h2>
          <h1
            className="text-7xl sm:text-8xl font-bold playful-font bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(90deg, var(--accent), var(--secondary))' }}
          >
            <span>Hadi A</span>
            <span className="text-foreground">hmad</span>
          </h1>
          <p className="text-xl sm:text-2xl text-foreground/70 text-right">Full-Stack Developer</p>
          <HeroDescription />
        </div>

        {/* Right Column: CTA Buttons */}
        <div
          className="flex flex-col sm:flex-col gap-4 md:flex-none origin-top sm:origin-top-right"
          style={{
            // transform: !isMobile ? `scale(${scale}) translate(${mouseX * -0.02}px, ${mouseY * 0.02}px)` : undefined,
          }}
        >

          <div className="flex flex-row gap-4">
            <ReactiveButton
              className="px-3 py-3"
              onClick={() => window.open("https://github.com/hadiahmad06", "_blank", "noopener,noreferrer")}
              dark={false}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.997.108-.775.418-1.305.76-1.605-2.665-.3-5.467-1.335-5.467-5.93 0-1.31.467-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 013.005-.404c1.02.005 2.045.137 3.005.404 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.375.81 1.11.81 2.24 0 1.62-.015 2.925-.015 3.32 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </ReactiveButton>
            <ReactiveButton
              className="px-3 py-3"
              onClick={() => window.open("https://www.linkedin.com/in/hadiahmad06", "_blank", "noopener,noreferrer")}
              dark={false}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.025-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.353V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.37-1.852 3.604 0 4.27 2.372 4.27 5.456v6.287zM5.337 7.433a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM6.814 20.452H3.861V9h2.953v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.728v20.543C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.728C24 .774 23.2 0 22.225 0z"/>
              </svg>
            </ReactiveButton>
            <ReactiveButton
              className="px-3 py-3"
              onClick={() => window.open("https://twitter.com/aidahdev", "_blank", "noopener,noreferrer")}
              dark={false}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.564-2.005.974-3.127 1.195-.897-.959-2.178-1.559-3.594-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.083-.205-7.702-2.159-10.126-5.134-.423.722-.666 1.561-.666 2.457 0 1.694.863 3.188 2.175 4.064-.802-.025-1.555-.246-2.212-.616v.061c0 2.367 1.683 4.342 3.918 4.787-.41.111-.84.171-1.285.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.414-1.68 1.318-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.179 1.397 4.768 2.212 7.557 2.212 9.054 0 14-7.496 14-13.985 0-.21 0-.423-.015-.633.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </ReactiveButton>
            <ReactiveButton
              className="px-3 py-3"
              onClick={() => window.open("https://www.instagram.com/aidahdev/", "_blank", "noopener,noreferrer")}
              dark={false}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
              </svg>
            </ReactiveButton>
          </div>
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

           {/* <div className="h-4" /> */}
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