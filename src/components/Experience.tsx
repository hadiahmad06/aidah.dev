import { roles } from "@/data/profile";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="pt-20 lg:pt-28">
      <SectionHeading zone="C" title="Experience" />
      <ul className="border-b border-rule">
        {roles.map((role) => (
          <li key={role.title} className="spec-row">
            <div className="label">{role.dates}</div>
            <div className="flex flex-col gap-x-6 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h3 className="font-semibold">{role.title}</h3>
                <p className="text-sm text-ink-2">{role.organization}</p>
              </div>
              <span className="label shrink-0">{role.location}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
