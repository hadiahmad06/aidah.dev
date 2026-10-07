import type { Lens } from "@/data/projects";
import { inLens, projectsFor } from "@/data/projects";
import { LENSES } from "@/data/profile";
import ProjectTile, { type TileSize } from "./ProjectTile";
import SectionHeading from "./SectionHeading";

// Tile size and grid span are set by rank, so re-sorting for a lens changes which projects lead
const SLOTS: { size: TileSize; span: string }[] = [
  { size: "lg", span: "md:col-span-6 lg:col-span-6" },
  { size: "lg", span: "md:col-span-6 lg:col-span-6" },
  { size: "md", span: "md:col-span-2 lg:col-span-4" },
  { size: "md", span: "md:col-span-2 lg:col-span-4" },
  { size: "md", span: "md:col-span-2 lg:col-span-4" },
  { size: "sm", span: "md:col-span-3 lg:col-span-3" },
  { size: "sm", span: "md:col-span-3 lg:col-span-3" },
  { size: "sm", span: "md:col-span-3 lg:col-span-3" },
  { size: "sm", span: "md:col-span-3 lg:col-span-3" },
];

export default function ProjectGrid({ lens }: { lens: Lens }) {
  const ordered = projectsFor(lens);

  return (
    <section id="projects" className="pt-20 lg:pt-28">
      <SectionHeading
        zone="A"
        title="Projects"
        meta={lens === "all" ? `${ordered.length} projects` : `Sorted for ${LENSES[lens].label.toLowerCase()}`}
      />
      <p className="label -mt-2 mb-6 flex flex-wrap items-center gap-x-4 gap-y-1">
        <span>Legend</span>
        <span className="tag-hw">■ HW hardware</span>
        <span className="tag-sw">■ SW software</span>
        {lens !== "all" && <span>┄ dashed outline = outside this lens</span>}
      </p>
      <ul className="sheet-enter grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12">
        {ordered.map((project, index) => (
          <li key={project.slug} className={SLOTS[index].span}>
            <ProjectTile project={project} size={SLOTS[index].size} muted={!inLens(project, lens)} />
          </li>
        ))}
      </ul>
    </section>
  );
}
