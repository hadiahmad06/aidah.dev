const skillGroups: { label: string; skills: string[] }[] = [
  {
    label: "Languages",
    skills: ["Python", "Java", "JavaScript/TypeScript", "C/C++", "Verilog", "Swift", "SQL", "HTML/CSS", "MATLAB", "R"],
  },
  {
    label: "Technologies",
    skills: ["Git/GitHub", "React/React Native", "Expo", "Node.js", "AWS", "Docker", "LangChain", "Playwright", "Vitest", "CUDA"],
  },
  {
    label: "Design",
    skills: ["Vivado", "Simulink", "KiCAD", "Altium", "LTSpice", "MPLAB"],
  },
  {
    label: "Instrumentation",
    skills: ["Spectrum Analyzer", "Oscilloscope", "DMM"],
  },
  {
    label: "Spoken Languages",
    skills: ["English (native)", "Urdu (conversational)", "Hindi (conversational)"],
  },
];

export default function Skills() {
  return (
    <section id="Skills" className="text-white py-24 px-12 sm:px-32 flex flex-col gap-6 w-full mx-auto">
      <h1 className="text-5xl font-bold text-center mb-4 sm:mb-0">Skills</h1>
      {skillGroups.map((group) => (
        <div key={group.label} className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-start">{group.label}</h2>
          <div className="flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-foreground/15 px-3 py-1 text-sm font-semibold text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
