"use client";

import { useState } from "react";
import ReactiveButton from "./common/ReactiveButton";

type Project = {
  title: string;            // Display name
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
};

const projects: Project[] = [
  {
    title: "PlanUMN",
    alias: "Graduation Planner",
    type: "Partner Project",
    emoji: "📅",
    startDate: "May 2025",
    endDate: "Aug 2025",
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
    title: "Mirage",
    alias: "AI Assistant",
    type: "Personal Project",
    emoji: "🪞",
    startDate: "Jan 2023",
    endDate: "Present",
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
    startDate: "Nov 2024",
    endDate: "Present",
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
    title: "aidah.dev",
    alias: "This Website",
    type: "Personal Project",
    emoji: "🌐",
    startDate: "Sep 2025",
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

  return (
    <section id="Projects" className="flex-shrink-0 flex-col items-start gap-12 py-24 w-full">
      <h1 className="text-5xl font-bold text-center mb-8">Projects</h1>
      <header className="flex space-x-4 mb-6 px-32">
        {projects.map((project, index) => (
          <ReactiveButton
            key={project.title}
            onClick={() => setCurrentIndex(index)}
            className={`relative text-2xl font-bold px-4 py-3 transition-colors duration-300 focus:outline-none font-sans ${index === currentIndex ? "text-accent" : "text-foreground"}`}
          >
            {project.title}
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
            transform: `translateX(-${currentIndex / projects.length * 100}%)`,
            width: `${projects.length * 100}%`,
            transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.2, 1.2)"
          }}
        >
          {projects.map((project) => (
            <div
              key={project.title}
              className="px-36"
              style={{
                width: `${1/projects.length * 100}%`
              }}
            >
              <div className="mb-4">
                <h2 className="text-3xl font-bold flex items-center gap-2 mb-1">
                  {project.emoji && <span className="text-3xl">{project.emoji}</span>}
                  <span>{project.title}</span>
                </h2>
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