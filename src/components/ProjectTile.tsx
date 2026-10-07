import Link from "next/link";
import type { Project } from "@/data/projects";
import DomainTags from "./DomainTags";
import MiniChain from "./MiniChain";

export type TileSize = "lg" | "md" | "sm";

const TITLE_SIZE: Record<TileSize, string> = {
  lg: "text-2xl lg:text-[1.75rem]",
  md: "text-xl",
  sm: "text-lg",
};

export default function ProjectTile({
  project,
  size,
  muted,
}: {
  project: Project;
  size: TileSize;
  muted: boolean;
}) {
  const headline = project.metrics[0];

  return (
    <article
      data-lens={muted ? undefined : project.primary}
      className={`tile h-full p-5 ${size === "lg" ? "lg:p-7" : ""} ${muted ? "tile-muted" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="label">
          {project.ref} · {project.context}
        </span>
        <DomainTags domains={project.domains} />
      </div>

      <h3 className={`mt-3 font-semibold leading-tight tracking-tight ${TITLE_SIZE[size]}`}>
        <Link href={`/projects/${project.slug}`} className="tile-link">
          {project.title}
        </Link>
      </h3>
      <p className="mt-1.5 text-sm text-ink-2">{project.tagline}</p>

      {size === "lg" ? (
        <dl className="mt-6 grid gap-x-5 gap-y-3 sm:grid-cols-3">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="flex items-baseline gap-3 sm:block">
              <dt className="w-28 shrink-0 text-2xl font-semibold tracking-[-0.02em] text-accent tabular-nums sm:w-auto sm:text-[1.7rem]">
                {metric.value}
              </dt>
              <dd className="text-[13px] leading-snug text-ink-2 sm:mt-1">{metric.label}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <div className="mt-5">
          <div
            className={`font-semibold tracking-[-0.02em] text-accent tabular-nums ${
              headline.value.length > 8 ? "text-2xl" : "text-3xl"
            }`}
          >
            {headline.value}
          </div>
          <p className="mt-1 text-[13px] leading-snug text-ink-2">{headline.label}</p>
        </div>
      )}

      {size !== "sm" && <MiniChain items={project.chain} className="mt-6" />}

      <div className={`mt-auto flex justify-between gap-x-4 gap-y-2 pt-6 ${size === "sm" ? "flex-col" : "items-end"}`}>
        <p className="font-mono text-[11px] leading-relaxed text-ink-3">
          {project.stack.map((item, index) => (
            <span key={item}>
              <span className="whitespace-nowrap">
                {item}
                {index < project.stack.length - 1 && " ·"}
              </span>{" "}
            </span>
          ))}
        </p>
        {project.link && (
          <a
            href={project.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="tile-raise link shrink-0 self-start font-mono text-[11px] text-ink-2 sm:self-auto"
          >
            {project.link.label} <span aria-hidden>↗</span>
          </a>
        )}
      </div>
    </article>
  );
}
