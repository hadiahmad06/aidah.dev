"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  images?: string[];        // Media section images; only the first is currently used
  videos?: string[];        // Media section videos; only the first is currently used, takes priority over images
  startDate?: string;       // ISO date string or formatted date
  endDate?: string;         // ISO date string or formatted date
  link?: string;            // URL to project or repo
  tags?: string[];          // Optional tags for filtering
  hide?: boolean;           // If true, project is not rendered
  skills?: string[];        // Skill pills shown beside the title; each will eventually link to a portfolio-wide skill index
};

const projects: Project[] = [
{
  title: "Roominate",
  alias: "Campus Study-Room Finder",
  type: "Hackathon Project — 0-1 Startup Hackathon",
  emoji: "🚪",
  skills: ["React Native", "TypeScript", "Python", "PostgreSQL", "Supabase", "GitHub Actions"],
  startDate: "September 2026",
  endDate: "72 hours",
  link: "https://roominate.me",
  body: (
    <div>
      <h3 className="font-semibold text-lg mb-2">Project Overview</h3>
      <p>
        Roominate is a cross-platform iOS, Android, and web app that surfaces free study rooms across the University of Minnesota campus, built in 72 hours for the 0-1 Startup Hackathon.
      </p>
      <h4 className="font-semibold mt-4 mb-1">Features:</h4>
      <ul className="list-disc list-inside ml-4">
        <li>Covers 574 rooms in 73 UMN buildings</li>
        <li>Ranks free rooms by walking time and how long each room stays free</li>
        <li>Flags rooms with unmaintained calendars instead of showing them as free</li>
        <li>UI localized into 11 languages</li>
      </ul>
      <h4 className="font-semibold mt-4 mb-1">Technologies Used:</h4>
      <ul className="list-disc list-inside ml-4">
        <li>React Native with TypeScript for the iOS, Android, and web clients</li>
        <li>Python ETL pipeline that filters 1,100+ 25Live campus spaces down to student-accessible rooms across 4 access categories</li>
        <li>Supabase / PostgreSQL, refreshed with ~8,500 reservations every 30 minutes via GitHub Actions</li>
        <li>Jest, unittest, and SQL for automated testing</li>
      </ul>
      <h4 className="font-semibold mt-4 mb-1">Achievements:</h4>
      <ul className="list-disc list-inside ml-4">
        <li>Moved availability computation on-device from a single shared snapshot, eliminating client calls to a feed that returned 8 MB of XML in ~10 s per 200-room query</li>
        <li>Designed a data-trust heuristic that flags rooms with booking activity under 10% of the campus median</li>
        <li>Validated the availability engine, scraper, and schema with 140+ automated tests</li>
      </ul>
    </div>
  ),
},
{
    title: "Neural Frequency System",
    header: "Neural Frequency",
    alias: "Real-Time EEG Neurofeedback Interface System",
    type: "Personal Project",
    emoji: "🧠",
    skills: ["Verilog", "Vivado", "Python", "KiCad", "SKiDL"],
    startDate: "June 2026",
    endDate: "Present",
    body: (
      <div>
        <h3 className="font-semibold text-lg mb-2">Project Overview</h3>
        <p>
          A real-time EEG neurofeedback interface: an FPGA DSP pipeline that filters 8 signal channels, an authenticated UART/BLE telemetry link, and a custom board for the analog front-end and stimulation output stage (in progress).
        </p>
        <h4 className="font-semibold mt-4 mb-1">Features:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>32 parallel FIR filters across 8 signal channels</li>
          <li>LMS adaptive filter for artifact cancellation</li>
          <li>AES-128-CCM authenticated UART/BLE telemetry link at 230,400 baud with hardware flow control</li>
          <li>9-register command interface for controlling neurofeedback protocols</li>
        </ul>
        <h4 className="font-semibold mt-4 mb-1">Technologies Used:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>Verilog and Vivado for the real-time DSP pipeline on FPGA</li>
          <li>Q1.15 fixed-point math throughout</li>
          <li>AES-128-CCM authenticated encryption over UART and BLE</li>
          <li>KiCad and SKiDL for schematic and PCB design</li>
        </ul>
        <h4 className="font-semibold mt-4 mb-1">Achievements:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>Kept the full filter bank within the FPGA&apos;s logic cell budget by using Q1.15 fixed-point math</li>
          <li>Bundled 135-byte frames every 8 ms, leaving a 0.5 ms scheduling guardband over BLE&apos;s 7.5 ms floor to absorb radio-side lag</li>
          <li>Reduced BLE power draw by ~88.4% with a 30-byte, 50 Hz packet protocol, extending total battery life by an estimated ~12%</li>
          <li>Migrated the 9-register command interface to meet NIST SP 800-38C</li>
          <li>Currently designing the schematic and PCB for the analog front-end and stimulation output stage</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Ultrasonic Wafer Cleaner",
    header: "Wafer Cleaner",
    alias: "80 kHz Ultrasonic Cleaning System for Wafer Processing",
    type: "Minnesota Nanofabrication Club",
    emoji: "🫧",
    skills: ["KiCad", "SPICE", "Half-Bridge Driver", "Piezo Transducers"],
    startDate: "September 2026",
    endDate: "Present",
    body: (
      <div>
        <h3 className="font-semibold text-lg mb-2">Project Overview</h3>
        <p>
          An 80 kHz ultrasonic cleaning system for wafer processing, designed and built from scratch with the Minnesota Nanofabrication Club, where I lead the project.
        </p>
        <h4 className="font-semibold mt-4 mb-1">Features:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>Custom half-bridge driver using high- and low-side N-channel MOSFETs</li>
          <li>Three 60 W bolt-clamped piezo transducers (180 W total), driven at 100–130 V</li>
          <li>Welded 316L stainless steel tank (20 × 30 × 20 cm)</li>
          <li>IPA vapor-drying stage (in design)</li>
        </ul>
        <h4 className="font-semibold mt-4 mb-1">Technologies Used:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>KiCad</li>
          <li>SPICE circuit simulation</li>
          <li>Half-bridge N-channel MOSFET drive stage</li>
          <li>Bolt-clamped piezo transducers</li>
        </ul>
        <h4 className="font-semibold mt-4 mb-1">Achievements:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>Bonded the transducers at 90 mm (19λ/4) spacing to disrupt standing-wave patterns and even out cavitation across the working volume</li>
          <li>Designing an IPA vapor-drying stage that displaces water at the meniscus during wafer cassette withdrawal, eliminating spot and residue formation</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Jiko",
    alias: "AI Reminder System with Behaviour Modeling",
    type: "Personal Project",
    emoji: "🪷",
    skills: ["Swift", "Node.js", "AWS", "SQL", "LangChain", "Twilio API"],
    startDate: "January 2026",
    endDate: "May 2026",
    body: (
      <div>
        <h3 className="font-semibold text-lg mb-2">Project Overview</h3>
        <p>
          {"Jiko is an AI-powered assistant that monitors your activity and messages you when you start doomscrolling. \
          It uses local device analytics and behavior modeling to nudge you back toward focus, like getting a text from a friend asking if you've studied for your midterm yet. \
          The idea is to repurpose historically exploitative engagement metrics into growth-oriented insights."}
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
          <li>Swift + SwiftUI for the iOS app and macOS companion utility, which post key events to the backend</li>
          <li>Node.js backend on AWS EC2 with Express.js REST APIs, scheduled cron jobs, and automated trigger evaluation pipelines</li>
          <li>S3, PostgreSQL, and DynamoDB for scalable persistent storage and TTL data pruning</li>
          <li>Jest unit and integration tests validating API behavior across the trigger pipelines</li>
          <li>Twilio API for real-time SMS notifications</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-1">Achievements:</h4>
        <ul className="list-disc list-inside ml-4">
          <li>Implemented a trigger-to-action engine that delivers personalized reminders based on usage and workload metrics</li>
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
    videos: ["/media/planumn.mp4"],
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
    videos: ["/media/kintsugi.mp4"],
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

// Smallest the header tab labels may shrink to, as a fraction of their base size
const MIN_TAB_SCALE = 0.75;

function VideoMedia({ src }: { src: string }) {
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const handleTimeUpdate = () => {
      if (el.duration) setProgress(el.currentTime / el.duration);
    };
    el.addEventListener("timeupdate", handleTimeUpdate);
    return () => el.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.7) {
          el.pause();
        } else {
          el.play().catch(() => {});
        }
      },
      { threshold: [0, 0.7, 1] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const seekToClientX = (clientX: number) => {
    const bar = barRef.current;
    const el = videoRef.current;
    if (!bar || !el || !isFinite(el.duration)) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    el.currentTime = ratio * el.duration;
    setProgress(ratio);
  };

  return (
    <div className="group relative w-full overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted={muted}
        playsInline
        className="block w-full h-auto"
      />
      <button
        onClick={() => setMuted((m) => !m)}
        className="absolute bottom-8 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white opacity-100 backdrop-blur-sm transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100"
        aria-label={muted ? "Unmute video" : "Mute video"}
      >
        {muted ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>
      <div
        ref={barRef}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          seekToClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            seekToClientX(e.clientX);
          }
        }}
        className="absolute inset-x-3 bottom-2 z-10 flex h-4 cursor-pointer items-center"
      >
        <div className="h-1.5 w-full rounded-full bg-gray-500/60">
          <div
            className="h-full rounded-full bg-white"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function ProjectMedia({ video, image, alt }: { video?: string; image?: string; alt: string }) {
  if (video) {
    return <VideoMedia src={video} />;
  }

  if (image) {
    return (
      <div className="w-full overflow-hidden rounded-2xl bg-black/10 p-1.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={alt}
          className="w-full h-auto rounded-xl shadow-[inset_0_2px_14px_rgba(0,0,0,0.45)]"
        />
      </div>
    );
  }

  return null;
}

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
      const tabs = Array.from(row.children) as HTMLElement[];
      const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
      const naturalWidth = tabs.reduce((sum, el) => sum + el.offsetWidth, 0) + gap * (tabs.length - 1);
      const textWidth = labels.reduce((sum, el) => sum + el.offsetWidth, 0);
      const availableWidth = row.clientWidth;
      if (textWidth === 0 || naturalWidth <= availableWidth) return;

      // Padding and gaps don't shrink with the font, so only the text width scales.
      // Below the minimum scale the row wraps instead of shrinking further.
      const fixedWidth = naturalWidth - textWidth;
      const ratio = Math.max(MIN_TAB_SCALE, (availableWidth - fixedWidth) / textWidth);
      const baseFontSize = parseFloat(getComputedStyle(labels[0]).fontSize);
      // Floor to a tenth of a pixel so rounding never pushes the last tab onto a new row
      const scaledSize = Math.floor(baseFontSize * ratio * 10) / 10;
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
        <div ref={tabRowRef} className="flex flex-wrap justify-center sm:justify-start gap-x-1 sm:gap-x-4 gap-y-1">
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
          {visibleProjects.map((project, index) => (
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
              {(project.videos?.[0] || project.images?.[0]) && (
                <>
                  <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
                  <ProjectMedia
                    video={project.videos?.[0]}
                    image={project.images?.[0]}
                    alt={project.title}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      {/* </div> */}
    </section>
  );
}
