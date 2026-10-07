import type { Lens } from "./projects";

export const LENSES: Record<Lens, { label: string; short: string; href: string }> = {
  all: { label: "All", short: "All", href: "/" },
  hw: { label: "Hardware", short: "HW", href: "/hardware" },
  sw: { label: "Software", short: "SW", href: "/software" },
};

export const site = {
  name: "Hadi Ahmad",
  url: "https://aidah.dev",
  resume: "/resume.pdf",
  email: "hadiahmadv@gmail.com",
  // Title block fields
  drawnBy: "H. Ahmad",
  rev: "B",
  revised: "2026-10-07",
};

export const hero: Record<Lens, { kicker: string; positioning: string }> = {
  all: {
    kicker: "University of Minnesota · Class of 2028",
    positioning: "I build from FPGA filter banks up to full-stack apps.",
  },
  hw: {
    kicker: "Hardware view · University of Minnesota · Class of 2028",
    positioning: "FPGA signal processing, power drive stages and analog design.",
  },
  sw: {
    kicker: "Software view · University of Minnesota · Class of 2028",
    positioning: "Cross-platform apps, data pipelines and the backends behind them.",
  },
};

export const tagline = "I like understanding how things work well enough to build my own version of them.";

export type Spec = { value: string; label: string; href: string; source: string };

const gpa: Spec = {
  value: "3.7",
  label: "technical GPA, University Honors Program, Dean's List",
  href: "#education",
  source: "Education",
};

// The numbers under the hero; every one links to where it comes from
export const specs: Record<Lens, Spec[]> = {
  all: [
    { value: "32", label: "FIR filters running in parallel on one FPGA", href: "/projects/neural-frequency", source: "Neural Frequency" },
    { value: "~88%", label: "less BLE power draw from a custom packet protocol", href: "/projects/neural-frequency", source: "Neural Frequency" },
    { value: "574", label: "campus rooms live after a 72-hour build", href: "/projects/roominate", source: "Roominate" },
    { value: "80+", label: "students using PlanUMN before release", href: "/projects/planumn", source: "PlanUMN" },
    gpa,
  ],
  hw: [
    { value: "32", label: "FIR filters running in parallel on one FPGA", href: "/projects/neural-frequency", source: "Neural Frequency" },
    { value: "~88%", label: "less BLE power draw from a custom packet protocol", href: "/projects/neural-frequency", source: "Neural Frequency" },
    { value: "0.5 ms", label: "guardband held over BLE's 7.5 ms floor", href: "/projects/neural-frequency", source: "Neural Frequency" },
    { value: "180 W", label: "of piezo transducers on a custom half-bridge driver", href: "/projects/wafer-cleaner", source: "Wafer Cleaner" },
    gpa,
  ],
  sw: [
    { value: "574", label: "campus rooms live after a 72-hour build", href: "/projects/roominate", source: "Roominate" },
    { value: "140+", label: "automated tests across engine, scraper and schema", href: "/projects/roominate", source: "Roominate" },
    { value: "30 min", label: "refresh cycle publishing ~8,500 reservations", href: "/projects/roominate", source: "Roominate" },
    { value: "80+", label: "students using PlanUMN before release", href: "/projects/planumn", source: "PlanUMN" },
    gpa,
  ],
};

export const education = {
  school: "University of Minnesota – Twin Cities",
  location: "Minneapolis, MN",
  degree: "Bachelor of Science in Computer Science and Electrical Engineering",
  date: "Expected May 2028",
  highlights: ["University Honors Program", "Dean's List", "3.7 Technical GPA"],
  awards: ["Presidential Scholarship", "Iron Range Scholarship", "Dakota Electric Association Scholarship"],
  involvement: ["Minnesota Nanofabrication Club"],
};

const hwCoursework = ["Digital Design", "Computer Architecture", "Microcontrollers", "Signals Circuits & Electronics"];
const swCoursework = ["Operating Systems", "Parallel Programming", "Database Systems", "Machine Learning", "Data Modeling"];

export const coursework: Record<Lens, string[]> = {
  all: [
    "Parallel Programming",
    "Microcontrollers",
    "Computer Architecture",
    "Operating Systems",
    "Digital Design",
    "Data Modeling",
    "Machine Learning",
    "Signals Circuits & Electronics",
    "Database Systems",
  ],
  hw: [...hwCoursework, ...swCoursework],
  sw: [...swCoursework, ...hwCoursework],
};

export type Role = {
  title: string;
  organization: string;
  location: string;
  dates: string;
};

export const roles: Role[] = [
  {
    title: "Ultrasonic Cleaner Lead",
    organization: "Minnesota Nanofabrication Club · University of Minnesota",
    location: "Minneapolis, MN",
    dates: "Sep 2026 – Present",
  },
  {
    title: "Undergraduate Teaching Assistant",
    organization: "University of Minnesota · Department of Electrical & Computer Engineering",
    location: "Minneapolis, MN",
    dates: "Aug 2026 – Present",
  },
  {
    title: "Retail / Food Service Experience",
    organization: "McDonalds · Blaze Pizza · Planet Fitness · Target · Walmart",
    location: "Lakeville, MN",
    dates: "Sep 2022 – May 2026",
  },
];

type SkillGroup = { label: string; skills: string[] };

const languages: SkillGroup = {
  label: "Languages",
  skills: ["Python", "Java", "JavaScript/TypeScript", "C/C++", "Verilog", "Swift", "SQL", "HTML/CSS", "MATLAB", "R"],
};
const hwLanguages: SkillGroup = {
  label: "Languages",
  skills: ["Verilog", "C/C++", "Python", "MATLAB", "Java", "JavaScript/TypeScript", "Swift", "SQL", "HTML/CSS", "R"],
};
const technologies: SkillGroup = {
  label: "Technologies",
  skills: ["Git/GitHub", "React/React Native", "Expo", "Node.js", "AWS", "Docker", "LangChain", "Playwright", "Vitest", "CUDA"],
};
const design: SkillGroup = {
  label: "Design",
  skills: ["Vivado", "Simulink", "KiCAD", "Altium", "LTSpice", "MPLAB"],
};
const instrumentation: SkillGroup = {
  label: "Instrumentation",
  skills: ["Spectrum Analyzer", "Oscilloscope", "DMM"],
};
const spoken: SkillGroup = {
  label: "Spoken languages",
  skills: ["English (native)", "Urdu (conversational)", "Hindi (conversational)"],
};

export const skillGroups: Record<Lens, SkillGroup[]> = {
  all: [languages, technologies, design, instrumentation, spoken],
  hw: [design, instrumentation, hwLanguages, technologies, spoken],
  sw: [languages, technologies, design, instrumentation, spoken],
};

export const about = [
  "I started coding in middle school on Khan Academy, making parkour games with basic physics engines.",
  "I've been chasing that same feeling since: build something, see if it works, figure out why it doesn't.",
  "Most of what I make now comes from problems I've actually run into, whether that's a deadline that changed without me noticing, or losing track of what classes I still need to graduate.",
];

export const principle =
  "Lifting taught me to trust consistent effort over motivation, since motivation doesn't show up on schedule. I try to apply that everywhere else too.";

export type OffClock = { label: string; text: string; link?: { href: string; label: string } };

export const offClock: OffClock[] = [
  { label: "Film", text: "Favorite movie:", link: { href: "https://letterboxd.com/film/aftersun/", label: "Aftersun (2022)" } },
  { label: "Music", text: "Mostly indie rock. On repeat:", link: { href: "https://www.youtube.com/watch?v=jIwX3YozFQ4", label: "Frances Limon, Los Enanitos Verdes" } },
  { label: "Reading", text: "Back in the habit. Favorite right now:", link: { href: "https://www.goodreads.com/book/show/17165596-the-kite-runner", label: "The Kite Runner" } },
  { label: "Lifting", text: "Three years in. Started with Olympic weightlifting in high school." },
  { label: "Skating", text: "A cruiser, between classes and bus transfers." },
];

export const elsewhere = [
  { label: "Spotify", href: "https://open.spotify.com/playlist/4YPemzOXopsd1NHbut6MjP?si=fbf754120da74ba9" },
  { label: "Letterboxd", href: "https://boxd.it/iNm8n" },
];

export const contacts = [
  { signal: "Email", value: "hadiahmadv@gmail.com", href: "mailto:hadiahmadv@gmail.com" },
  { signal: "UMN", value: "ahmad287@umn.edu", href: "mailto:ahmad287@umn.edu" },
  { signal: "LinkedIn", value: "linkedin.com/in/hadiahmad06", href: "https://www.linkedin.com/in/hadiahmad06" },
  { signal: "GitHub", value: "github.com/hadiahmad06", href: "https://github.com/hadiahmad06" },
  { signal: "X", value: "x.com/aidahdev", href: "https://x.com/aidahdev" },
  { signal: "Instagram", value: "instagram.com/aidahdev", href: "https://instagram.com/aidahdev" },
  { signal: "Résumé", value: "resume.pdf", href: "/resume.pdf" },
];
