import type { Lens } from "@/data/projects";
import { skillGroups } from "@/data/profile";
import InlineList from "./InlineList";
import SectionHeading from "./SectionHeading";

export default function Skills({ lens }: { lens: Lens }) {
  return (
    <section id="skills" className="pt-20 lg:pt-28">
      <SectionHeading zone="D" title="Skills" />
      <div className="border-b border-rule">
        {skillGroups[lens].map((group) => (
          <div key={group.label} className="spec-row">
            <div className="label">{group.label}</div>
            <InlineList items={group.skills} />
          </div>
        ))}
      </div>
    </section>
  );
}
