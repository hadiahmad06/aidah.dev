const highlights = ["University Honors Program", "Dean's List", "3.7 Technical GPA"];

const coursework = [
  "Parallel Programming",
  "Microcontrollers",
  "Computer Architecture",
  "Operating Systems",
  "Digital Design",
  "Data Modeling",
  "Machine Learning",
  "Signals Circuits & Electronics",
  "Database Systems",
];

const awards = [
  "Presidential Scholarship",
  "Iron Range Scholarship",
  "Dakota Electric Association Scholarship",
];

const involvement = ["Minnesota Nanofabrication Club"];

function PillRow({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-bold text-start">{label}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-foreground/15 px-3 py-1 text-sm font-semibold text-gray-300"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Education() {
  return (
    <section id="Education" className="text-white py-24 px-12 sm:px-32 flex flex-col gap-6 w-full mx-auto">
      <h1 className="text-5xl font-bold text-center mb-4 sm:mb-0">Education</h1>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-6">
          <h2 className="text-3xl font-bold text-start">University of Minnesota – Twin Cities</h2>
          <span className="text-lg text-gray-400 font-medium shrink-0">Minneapolis, MN</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-6">
          <span className="text-lg text-gray-300">Bachelor of Science in Computer Science and Electrical Engineering</span>
          <span className="text-sm text-gray-500 shrink-0">Expected May 2028</span>
        </div>
        <div className="mt-1 font-semibold text-accent">{highlights.join(" · ")}</div>
      </div>
      <PillRow label="Relevant Coursework" items={coursework} />
      <PillRow label="Awards" items={awards} />
      <PillRow label="Involvement" items={involvement} />
    </section>
  );
}
