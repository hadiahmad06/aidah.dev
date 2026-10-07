import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BackToIndex from "@/components/BackToIndex";
import BlockDiagram from "@/components/BlockDiagram";
import DomainTags from "@/components/DomainTags";
import SectionHeading from "@/components/SectionHeading";
import Sheet from "@/components/Sheet";
import VideoMedia from "@/components/VideoMedia";
import { getProject, projects, type Project } from "@/data/projects";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: `${project.tagline}. ${project.metrics.map((metric) => `${metric.value} ${metric.label}`).join("; ")}.`,
  };
}

function Step({ index, label, items }: { index: number; label: string; items: string[] }) {
  return (
    <div className="spec-row !py-6">
      <div className="label">
        <span className="text-accent">0{index}</span> {label}
      </div>
      {items.length === 1 ? (
        <p className="max-w-3xl text-lg leading-relaxed">{items[0]}</p>
      ) : (
        <ul className="max-w-3xl space-y-2.5 text-lg leading-relaxed">
          {items.map((item) => (
            <li key={item} className="grid grid-cols-[1.25rem_1fr]">
              <span aria-hidden className="text-accent">
                –
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Neighbour({ project, direction }: { project?: Project; direction: "prev" | "next" }) {
  if (!project) return <span />;
  return (
    <Link
      href={`/projects/${project.slug}`}
      data-lens={project.primary}
      className={`tile p-4 ${direction === "next" ? "items-end text-right" : ""}`}
    >
      <span className="label">
        {direction === "prev" ? "← Previous" : "Next →"} · {project.ref}
      </span>
      <span className="mt-1 font-semibold tracking-tight">{project.title}</span>
    </Link>
  );
}

export default async function ProjectPage({ params }: Params) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const index = projects.indexOf(project);

  return (
    <Sheet lens={project.primary} title={project.title} sheet={index + 2}>
      <article className="sheet-enter pt-8 lg:pt-10">
        <BackToIndex hash="projects">All projects</BackToIndex>

        <header className="mt-8 grid items-end gap-x-12 gap-y-8 lg:grid-cols-[1fr_24rem]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="label">
                {project.ref} · {project.context}
              </span>
              <DomainTags domains={project.domains} />
              {project.inProgress && (
                <span className="border border-dashed border-ink-3 px-1.5 font-mono text-[10px] uppercase leading-4 tracking-[0.08em] text-ink-2">
                  In progress
                </span>
              )}
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <p className="mt-3 text-xl text-ink-2 sm:text-2xl">{project.tagline}</p>
          </div>

          <dl className="border border-rule-strong bg-raised font-mono text-xs">
            <div className="grid grid-cols-[5rem_1fr] gap-3 px-3 py-2">
              <dt className="label">Period</dt>
              <dd>{project.period}</dd>
            </div>
            <div className="grid grid-cols-[5rem_1fr] gap-3 border-t border-rule px-3 py-2">
              <dt className="label">Stack</dt>
              <dd className="leading-relaxed">{project.stack.join(" · ")}</dd>
            </div>
            {project.link && (
              <div className="grid grid-cols-[5rem_1fr] gap-3 border-t border-rule px-3 py-2">
                <dt className="label">Live</dt>
                <dd>
                  <a href={project.link.href} target="_blank" rel="noopener noreferrer" className="link">
                    {project.link.label} <span aria-hidden>↗</span>
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </header>

        <dl className="mt-12 grid gap-y-8 sm:grid-cols-3">
          {project.metrics.map((metric, i) => (
            <div key={metric.label} className="tp pr-6 pt-4">
              <dt className="label">TP{i + 1}</dt>
              <dd>
                <span className="mt-1 block text-4xl font-semibold tracking-[-0.03em] text-accent tabular-nums lg:text-5xl">
                  {metric.value}
                </span>
                <span className="mt-2 block text-sm leading-snug text-ink-2">{metric.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        <section className="pt-16 lg:pt-20">
          <SectionHeading zone="A" title="Architecture" />
          <BlockDiagram diagram={project.diagram} figure={1} />
        </section>

        <section className="pt-16 lg:pt-20">
          <SectionHeading zone="B" title="Case study" />
          <div className="border-b border-rule">
            <Step index={1} label="Problem" items={project.problem} />
            <Step index={2} label="Constraint" items={project.constraint} />
            <Step index={3} label="Decision" items={project.decision} />
            <Step index={4} label="Result" items={project.result} />
          </div>
        </section>

        {project.video && (
          <section className="pt-16 lg:pt-20">
            <SectionHeading zone="C" title="Demo" />
            <figure>
              <VideoMedia src={project.video.src} poster={project.video.poster} />
              <figcaption className="label mt-4">Fig. 2 · Screen recording</figcaption>
            </figure>
          </section>
        )}

        <nav aria-label="More projects" className="grid grid-cols-2 gap-4 pt-16 lg:pt-20">
          <Neighbour project={projects[index - 1]} direction="prev" />
          <Neighbour project={projects[index + 1]} direction="next" />
        </nav>
      </article>
    </Sheet>
  );
}
