import type { Lens } from "@/data/projects";
import { coursework, education } from "@/data/profile";
import InlineList from "./InlineList";
import SectionHeading from "./SectionHeading";

export default function Education({ lens }: { lens: Lens }) {
  return (
    <section id="education" className="pt-20 lg:pt-28">
      <SectionHeading zone="B" title="Education" meta={education.date} />
      <div className="flex flex-col gap-x-6 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="text-2xl font-semibold tracking-tight">{education.school}</h3>
        <span className="label shrink-0">{education.location}</span>
      </div>
      <p className="mt-1 text-ink-2">{education.degree}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {education.highlights.map((highlight) => (
          <li key={highlight} className="border border-accent px-2.5 py-1 font-mono text-xs text-accent">
            {highlight}
          </li>
        ))}
      </ul>
      <div className="mt-6 border-b border-rule">
        <div className="spec-row">
          <div className="label">Coursework</div>
          <InlineList items={coursework[lens]} />
        </div>
        <div className="spec-row">
          <div className="label">Awards</div>
          <InlineList items={education.awards} />
        </div>
        <div className="spec-row">
          <div className="label">Involvement</div>
          <InlineList items={education.involvement} />
        </div>
      </div>
    </section>
  );
}
