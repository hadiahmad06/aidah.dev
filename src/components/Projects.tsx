"use client";

import { useLayoutEffect, useRef, useState } from "react";
import ReactiveButton from "./common/ReactiveButton";

type Project = {
  title: string;            // Display name, shown when the project's tab is selected
  header?: string;          // Label shown in the header tab; falls back to title
  alias?: string;           // Alternate name, e.g., "Workout Tracker"
  type?: string;            // Personal / Partner / Class Project
  description?: string;     // Short text description
  body?: React.ReactNode;   // Full HTML or JSX content for the body
  emoji?: string;           // Emoji/icon
  image?: string;           // Optional image URL
  startDate?: string;       // ISO date string or formatted date
  endDate?: string;         // ISO date string or formatted date
  link?: string;            // URL to project or repo
  tags?: string[];          // Optional tags for filtering
  hide?: boolean;           // If true, project is not rendered
  skills?: string[];        // Skill pills shown beside the title; each will eventually link to a portfolio-wide skill index
};

const projects: Project[] = [
  {
    title: "Jiko",
    alias: "AI Assistant",
    type: "Personal Project",
    emoji: "🪷",
    hide: true,
    skills: ["Swift", "SwiftUI", "Node.js", "Twilio API"],
    startDate: "October 2025",
    endDate: "Present",
    body: (
      <div>
        <h3 className="font-semibold text-lg mb-2">Project Overview</h3>
        <p>
          {"Jiko is an AI-powered assistant that monitors your activity and messages you when you start doomscrolling. \
          It uses local device analytics and behavior modeling to nudge you back toward focus, like getting a text from a friend asking if you've studied for your midterm yet.\
          (Work in progress!)"}
        </p>

        <h4 className="font-semibold mt-4 mb-1">Features:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>Detects when social media or entertainment apps are opened for extended periods</li>
          <li>Considers upcoming homework, exams, papers due on Canvas</li>
          <li>Sends personalized reminders via SMS using Twilio integration</li>
          <li>Analyzes screen time and app usage trends to generate weekly reports</li>
          <li>Includes an adjustable sensitivity system that learns when to intervene without getting blocked</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">Technologies Used:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>Swift + SwiftUI for macOS and iOS agents that track app usage</li>
          <li>Node.js backend with scheduled cron jobs and automated trigger evaluation pipelines.</li>
          <li>Twilio API for real-time SMS notifications</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">Achievements:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>Built a functional macOS menu bar tracker and iOS app that detect active apps in real time</li>
          <li>Implemented automatic message dispatch through Twilio when distraction thresholds are crossed</li>
          <li>Integrated a personalized chatbot trained on my own text history</li>
          <li>Created early UI mockups (on a piece of paper) for iOS companion dashboard showing focus metrics and screen time breakdown</li>
        </ul>
      </div>
    ),
    link: "https://jiko.life"
  },
  {
    title: "Mirage",
    alias: "MacOS LLM Desktop Overlay",
    type: "Personal Project",
    emoji: "🪞",
    hide: true,
    skills: ["SwiftUI", "React", "TypeScript", "Node.js", "AWS EC2", "RAG", "OpenRouter API"],
    startDate: "August 2025",
    endDate: "October 2025",
    body: (
      <div>
        <h3 className="font-semibold text-lg mb-2">Project Overview</h3>
        <p>
          Mirage is an AI assistant application featuring a MacOS UI overlay that lets users prompt any LLM available through the OpenRouter API. {/* Its Node.js backend uses RAG and vector search to provide relevant responses. */}
        </p>
        <h4 className="font-semibold mt-4 mb-1">Features:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>MacOS UI overlay for a native desktop experience</li>
          <li>Supports any LLM available via OpenRouter API</li>
          <li>Node.js backend with RAG (Retrieval-Augmented Generation) and vector search</li>
          <li>Fast, context-aware AI responses for complex queries</li>
          <li>Multi-sectioned architecture for modularity and scalability</li>
          <li>Cloud storage enables cross-platform usage</li>
        </ul>
        <h4 className="font-semibold mt-4 mb-1">Technologies Used:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>SwiftUI for MacOS UI overlay</li>
          <li>React with TypeScript for the static landing page</li>
          <li>Hosted Dockerized AWS EC2 for backend and vector embedding</li>
          <li>Node.js backend implementing RAG and vector search</li>
          <li>OpenRouter API for LLM access and AI responses</li>
          <li>AWS EBS for vector data and AWS RDS for chat logs</li>
        </ul>
        <h4 className="font-semibold mt-4 mb-1">Achievements:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>Enabled flexible AI assistant experience supporting multiple LLMs</li>
          <li>Created a lightweight MacOS overlay, aimed to increase usability and productivity.</li>
          {/* <li>Delivered fast and context-aware responses using RAG + vector search</li> */}
        </ul>
      </div>
    ),
    link: "https://mirag.app"
  },
  {
    title: "Vectra",
    alias: "Workout Tracker",
    type: "Personal Project",
    emoji: "💪",
    hide: true,
    skills: ["React Native", "TypeScript", "Playwright", "SQLite"],
    startDate: "November 2024",
    endDate: "Paused",
    body: (
      <div>
        
        <h3 className="font-semibold text-lg mb-2">Project Overview</h3>
        <p>
          A cross-platform workout tracker and planner designed to help users log and track long-term strength training progress efficiently.
        </p>
        <h4 className="font-semibold mt-4 mb-1">Features:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>Log workouts and track strength progression over time</li>
          <li>Scraped exercise and muscle group data using Playwright</li>
          <li>Cross-platform support for mobile devices via React Native</li>
          <li>User research-informed UI/UX for intuitive day-to-day use</li>
        </ul>
        <h4 className="font-semibold mt-4 mb-1">Technologies Used:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>React Native for cross-platform mobile development</li>
          <li>TypeScript for type safety and maintainable code</li>
          <li>Playwright for web scraping and data collection</li>
          <li>Local storage / SQLite for offline use</li>
        </ul>
        <h4 className="font-semibold mt-4 mb-1">Achievements:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>Created a dataset of exercises and targeted muscle groups for recommendation engine</li>
          <li>Validated app features through informal student user research</li>
        </ul>
      </div>
    ),
    link: "https://github.com/hadiahmad06/vectra", // Optional: Add if there is a demo or repo
  },
  {
    title: "PlanUMN",
    alias: "Graduation Planner",
    type: "Partner Project",
    emoji: "📅",
    skills: ["React", "TypeScript", "Next.js", "Supabase", "REST APIs"],
    startDate: "May 2025",
    endDate: "August 2025",
    body: (
      <div>
        <h3 className="font-semibold text-lg mb-2">Project Overview</h3>
        <p>
          PlanUMN is a comprehensive graduation planning tool designed to simplify course scheduling and degree tracking for University of Minnesota students.
        </p>
        <h4 className="font-semibold mt-4 mb-1">Features:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>Drag-and-drop interactive schedule builder</li>
          <li>Autocomplete course search with real-time suggestions</li>
          {/* <li>Rule-based scheduling to avoid conflicts and prerequisites</li>
          <li>Degree audit integration to track graduation requirements</li> */}
          <li>Import transcripts to fill classes from previous semesters</li>
          <li>Cloud storage for plans, enabling plan sharing</li>
        </ul>
        <h4 className="font-semibold mt-4 mb-1">Technologies Used:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>React with TypeScript for frontend development</li>
          <li>Next.js (serverless) for backend API and SSR/SSG</li>
          <li>Utilized Supabase for relational data storage and user authentication.</li>
          <li>Ensured plans are kept secure with RLS, user authentication, and server-side permission checks.</li>
          <li>RESTful APIs for fuzzy search, quick course info, and manipulating plans.</li>
        </ul>
        <h4 className="font-semibold mt-4 mb-1">Achievements:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>Used by over 80 students pre-release</li>
          {/* <li>Featured in the University’s student innovation showcase</li> */}
        </ul>
      </div>
    ),
    link: "https://planu.mn"
  },
  {
    title: "Analog Audio System",
    header: "Analog Audio",
    alias: "Variable Gain, Bass & Treble Audio Amplifier",
    type: "Course Project",
    emoji: "🎚️",
    skills: ["LM741 Op-Amps", "Active Filter Design", "FFT Analysis", "Breadboard Prototyping"],
    startDate: "March 2026",
    endDate: "May 2026",
    body: (
      <div>
        <h3 className="font-semibold text-lg mb-2">Project Overview</h3>
        <p>
          A three-stage LM741-based audio amplifier with continuously variable gain and adjustable bass and treble tone shaping, compatible with any 3.5mm audio source.
        </p>
        <h4 className="font-semibold mt-4 mb-1">Features:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>Three-stage LM741-based audio amplifier</li>
          <li>Continuously variable gain stage</li>
          <li>Adjustable bass and treble tone shaping</li>
          <li>Works with any 3.5mm audio source</li>
        </ul>
        <h4 className="font-semibold mt-4 mb-1">Technologies Used:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>LM741 op-amps</li>
          <li>Active filter design</li>
          <li>FFT / frequency response analysis</li>
          <li>Breadboard prototyping</li>
        </ul>
        <h4 className="font-semibold mt-4 mb-1">Achievements:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>Swept a potentiometer-controlled feedback network to map the amp&apos;s full gain range</li>
          <li>Identified where the LM741&apos;s 1 MHz gain-bandwidth product started limiting performance, using frequency response analysis</li>
          <li>Modeled a capacitor-tuned bass shelving filter from feedback theory, then validated it by swapping timing capacitors and observing the shift in corner frequency</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Kintsugi",
    alias: "Global Conflict Awareness Heatmap",
    type: "Hackathon Project — MinneHack '26 (team placomi)",
    emoji: "🌎",
    skills: ["Python", "SentenceTransformers", "Pandas", "Google Maps API", "Next.js"],
    startDate: "February 2026",
    endDate: "22 hours",
    link: "https://mnhack26.vercel.app",
    body: (
      <div>
        <h3 className="font-semibold text-lg mb-2">Project Overview</h3>
        <p>
          An interactive heat map of global conflict built for MinneHack 2026, combining scraped Twitter data with user-submitted reports to surface underreported crises.
        </p>
        <h4 className="font-semibold mt-4 mb-1">Features:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>Interactive heat map of global conflict</li>
          <li>Combines scraped Twitter data with user-submitted reports</li>
          <li>Event severity classification via LLM prompting</li>
          <li>Geolocation extraction from unstructured text</li>
        </ul>
        <h4 className="font-semibold mt-4 mb-1">Technologies Used:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>Python for the NLP pipeline</li>
          <li>SentenceTransformer and Pandas for processing tweet data</li>
          <li>Google Maps API for the heat map</li>
          <li>Next.js for the frontend</li>
        </ul>
        <h4 className="font-semibold mt-4 mb-1">Achievements:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>Built a full NLP pipeline in 22 hours, from scraping to classification to geolocation</li>
          <li>Pitched at MinneHack 2026 as a way to counter centralized media control, surfacing underreported crises without relying on algorithmic or commercial gatekeeping</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Gene Expression Analysis",
    header: "Gene Expression",
    alias: "Colon Cancer Gene Expression Project",
    type: "Course Project",
    emoji: "🧬",
    skills: ["MATLAB", "GraphTucker", "PPI Networks", "BIOGRID"],
    startDate: "April 2025",
    endDate: "May 2025",
    body: (
      <div>
        <h3 className="font-semibold text-lg mb-2">Project Overview</h3>
        <p>
          A tensor decomposition pipeline for spatial transcriptomics data, using unsupervised clustering of 3D gene-spot tensors to biologically interpret colon cancer gene expression.
        </p>
        <h4 className="font-semibold mt-4 mb-1">Features:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>Tensor decomposition pipeline for spatial transcriptomics data</li>
          <li>Unsupervised clustering of 3D gene-spot tensors</li>
          <li>Biological interpretation of resulting clusters</li>
        </ul>
        <h4 className="font-semibold mt-4 mb-1">Technologies Used:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>MATLAB, including its Deep Learning plugin</li>
          <li>GraphTucker for spatial feature extraction</li>
          <li>PPI networks and BIOGRID datasets</li>
        </ul>
        <h4 className="font-semibold mt-4 mb-1">Achievements:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>Applied GraphTucker to pull low-rank spatial features out of 3D gene-spot tensors</li>
          <li>Found clusters tied to immune response, chemoresistance, and tumor growth</li>
          <li>Presented biological interpretations of the results using PPI network and BIOGRID data</li>
        </ul>
      </div>
    ),
  },
  {
    title: "aidah.dev",
    alias: "This Website",
    type: "Personal Project",
    emoji: "🌐",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    startDate: "September 2025",
    endDate: "Present",
    body: (
      <div>
        <h3 className="font-semibold text-lg mb-2">Project Overview</h3>
        <p>
          This website serves as my personal portfolio, designed to showcase my projects, experience, and interests in a clean and interactive way.
        </p>
        <h4 className="font-semibold mt-4 mb-1">Features:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>Fully responsive design for desktop and mobile</li>
          <li>Interactive project section with smooth animations</li>
          <li>Custom cursor-reactive gradient effects</li>
          <li>Minimalist design centered on readability and accessibility</li>
        </ul>
        <h4 className="font-semibold mt-4 mb-1">Technologies Used:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>Next.js with React and TypeScript</li>
          <li>Tailwind CSS for styling</li>
          <li>Deployed on Vercel for fast global hosting</li>
        </ul>
      </div>
    ),
    link: "https://aidah.dev",
  }
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleProjects = projects.filter((project) => !project.hide);
  const tabRowRef = useRef<HTMLDivElement>(null);
  const tabLabelRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    const row = tabRowRef.current;
    const labels = tabLabelRefs.current.filter(
      (el): el is HTMLSpanElement => el !== null
    );
    if (!row || labels.length === 0) return;

    const recompute = () => {
      labels.forEach((el) => { el.style.fontSize = ""; });
      const baseFontSize = parseFloat(getComputedStyle(labels[0]).fontSize);
      const availableWidth = row.clientWidth;
      const naturalWidth = row.scrollWidth;
      const ratio = naturalWidth > availableWidth ? availableWidth / naturalWidth : 1;
      const scaledSize = baseFontSize * ratio;
      labels.forEach((el) => { el.style.fontSize = `${scaledSize}px`; });
    };

    recompute();
    const observer = new ResizeObserver(recompute);
    observer.observe(row);
    return () => observer.disconnect();
  }, [visibleProjects.length]);

  return (
    <section id="Projects" className="overflow-hidden flex-shrink-0 flex-col items-start gap-12 py-24 w-full">
      <h1 className="text-5xl font-bold text-center mb-8">Projects</h1>
      <header className="mb-6 px-8 sm:px-32">
        <div ref={tabRowRef} className="flex justify-center sm:justify-start space-x-4">
          {visibleProjects.map((project, index) => (
            <ReactiveButton
              key={project.title}
              onClick={() => setCurrentIndex(index)}
              className={`relative shrink-0 font-bold px-4 py-3 transition-colors duration-300 focus:outline-none font-sans ${index === currentIndex ? "text-accent" : "text-foreground"}`}
            >
              <span
                ref={(el) => { tabLabelRefs.current[index] = el; }}
                className="hidden sm:inline whitespace-nowrap text-2xl"
              >
                {project.header ?? project.title}
              </span>
              <span className="sm:hidden text-2xl">{project.emoji}</span>
              {index === currentIndex && (
                <span
                  className="block mt-1 w-full h-0.5 rounded"
                  style={{
                    background: `linear-gradient(90deg, var(--accent), var(--secondary))`,
                    animation: "underlineSlide 0.5s ease forwards",
                  }}
                />
              )}
            </ReactiveButton>
          ))}
        </div>
      </header>
      <style>
        {`
          @keyframes underlineSlide {
            0% {
              transform: scaleX(0);
              transform-origin: left;
            }
            100% {
              transform: scaleX(1);
              transform-origin: left;
            }
          }
        `}
      </style>
      {/* <div className="w-full"> */}
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex / visibleProjects.length * 100}%)`,
            width: `${visibleProjects.length * 100}%`,
            transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.2, 1.2)"
          }}
        >
          {visibleProjects.map((project) => (
            <div
              key={project.title}
              className="px-12 sm:px-36"
              style={{
                width: `${1/visibleProjects.length * 100}%`
              }}
            >
              <div className="mb-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-1">
                  <h2 className="text-3xl font-bold flex items-center gap-2">
                    {project.emoji && <span className="text-3xl">{project.emoji}</span>}
                    <span>{project.title}</span>
                  </h2>
                  {project.skills && project.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill) => (
                        <ReactiveButton
                          key={skill}
                          onClick={() => {}}
                          className="!rounded-full px-3 py-1 text-xs font-semibold"
                        >
                          {skill}
                        </ReactiveButton>
                      ))}
                    </div>
                  )}
                </div>
                {project.alias && (
                    <div className="text-lg text-gray-400 font-medium mt-1">{project.alias}</div>
                )}
                {(project.startDate || project.endDate) && (
                  <div className="text-sm text-gray-600 mb-2">
                    {project.startDate}
                    {project.endDate ? ` - ${project.endDate}` : ""}
                  </div>
                )}
                {project.description && (
                  <p className="text-lg text-gray-700 mb-2">{project.description}</p>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    className="inline-block text-accent underline mb-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.link}
                  </a>
                )}
              </div>
              {project.body && (
                <div className="max-w-none">{project.body}</div>
              )}
            </div>
          ))}
        </div>
      {/* </div> */}
    </section>
  );
}