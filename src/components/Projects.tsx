

"use client";

import { useState } from "react";

type Project = {
  title: string;
  description: string;
  emoji: string;
  image?: string;
};

const projects: Project[] = [
  {
    title: "Project One",
    description: "Description for project one. Add emojis and personal touch later.",
    emoji: "🚀",
    image: undefined,
  },
  {
    title: "Project Two",
    description: "Description for project two. Add emojis and personal touch later.",
    emoji: "🎨",
    image: undefined,
  },
  {
    title: "Project Three",
    description: "Description for project three. Add emojis and personal touch later.",
    emoji: "💡",
    image: undefined,
  },
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const project = projects[currentIndex];

  return (
    <section className="flex flex-col items-center gap-8 py-24">
      <h2 className="text-4xl font-bold">Projects</h2>
      <div className="relative w-full max-w-3xl flex flex-col items-center bg-background/20 p-8 rounded-xl">
        {/* Project Content */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="text-6xl">{project.emoji}</div>
          <h3 className="text-2xl font-semibold">{project.title}</h3>
          <p className="text-foreground/70">{project.description}</p>
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="mt-4 rounded-lg"
            />
          )}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevProject}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-accent hover:text-accent/80 transition"
        >
          &#8592;
        </button>
        <button
          onClick={nextProject}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-accent hover:text-accent/80 transition"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
}