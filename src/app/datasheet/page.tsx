import type { Metadata } from "next";
import Link from "next/link";
import BackToIndex from "@/components/BackToIndex";
import DomainTags from "@/components/DomainTags";
import PrintButton from "@/components/PrintButton";
import SectionHeading from "@/components/SectionHeading";
import Sheet, { SHEET_COUNT } from "@/components/Sheet";
import { characteristics, orderingSignals, part } from "@/data/datasheet";
import { contacts, coursework, education, hero, roles, site, skillGroups, specs, tagline } from "@/data/profile";
import { getProject, projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Datasheet",
  description:
    "Hadi Ahmad on one page, laid out as a component datasheet: features, characteristics, projects, education, skills and contact.",
};

const SECTION = "pt-14 lg:pt-16 print:pt-4";
const ROW = "border-t border-rule py-2.5 print:py-0.5";

export default function DatasheetPage() {
  const ordering = [
    ...contacts.filter((contact) => orderingSignals.includes(contact.signal)),
    { signal: "Web", value: "aidah.dev", href: site.url },
  ];

  return (
    <Sheet lens="all" title={`${part.number} · Datasheet`} sheet={SHEET_COUNT}>
      <article className="sheet-enter pt-8 lg:pt-10 print:pt-0">
        <div className="print:hidden">
          <BackToIndex>Home</BackToIndex>
        </div>

        <header className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between print:mt-0 print:flex-row print:items-end print:justify-between">
          <div>
            <p className="label">
              <span className="font-semibold text-ink">{part.number}</span> · Datasheet · Rev {site.rev} · {site.revised}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl print:mt-1">{site.name}</h1>
            <p className="mt-2 text-lg text-ink-2 sm:text-xl print:mt-1">{part.summary}</p>
          </div>
          <div className="flex flex-wrap gap-2.5 print:hidden">
            <PrintButton />
            <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn">
              Résumé (PDF)
            </a>
          </div>
          {/* On paper the contact details sit beside the name instead of in their own section */}
          <ul className="hidden text-right font-mono text-xs leading-relaxed print:block">
            {ordering.map((contact) => (
              <li key={contact.signal}>{contact.value}</li>
            ))}
          </ul>
        </header>

        <div className={`grid gap-x-12 lg:grid-cols-2 print:grid-cols-2 print:gap-x-8 ${SECTION}`}>
          <section>
            <SectionHeading zone="A" title="Features" />
            <ul className="border-b border-rule">
              {specs.all.map((spec) => (
                <li key={spec.label} className={`grid grid-cols-[5.5rem_1fr] items-baseline gap-x-4 ${ROW}`}>
                  <span className="text-xl font-semibold tracking-tight tabular-nums">{spec.value}</span>
                  <span className="text-sm text-ink-2">{spec.label}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="pt-14 lg:pt-0 print:pt-0">
            <SectionHeading zone="B" title="Description" />
            <p className="text-lg leading-relaxed print:text-base">
              {hero.all.positioning} {tagline}
            </p>
            <dl className="mt-5 border-b border-rule text-sm print:mt-3">
              <div className={`grid grid-cols-[5.5rem_1fr] items-baseline gap-x-4 ${ROW}`}>
                <dt className="label tag-hw">Hardware</dt>
                <dd>{hero.hw.positioning}</dd>
              </div>
              <div className={`grid grid-cols-[5.5rem_1fr] items-baseline gap-x-4 ${ROW}`}>
                <dt className="label tag-sw">Software</dt>
                <dd>{hero.sw.positioning}</dd>
              </div>
            </dl>
          </section>
        </div>

        <section className={SECTION}>
          <SectionHeading zone="C" title="Characteristics" meta="Measured on the projects below" />
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-y border-rule-strong">
                <th className="label py-2 pr-4 font-normal print:py-0.5">Parameter</th>
                <th className="label hidden py-2 pr-4 font-normal sm:table-cell print:table-cell print:py-0.5">
                  Conditions
                </th>
                <th className="label py-2 pr-2 text-right font-normal print:py-0.5">Value</th>
                <th className="label py-2 pr-4 font-normal print:py-0.5">Unit</th>
                <th className="label hidden py-2 font-normal md:table-cell print:table-cell print:py-0.5">Source</th>
              </tr>
            </thead>
            <tbody>
              {characteristics.map((group) => {
                const project = getProject(group.source)!;
                return group.rows.map((row, index) => (
                  <tr
                    key={`${group.source}-${row.parameter}`}
                    className={`break-inside-avoid border-b border-rule ${index === 0 ? "border-t border-t-rule-strong" : ""}`}
                  >
                    <td className="py-2 pr-4 print:py-0.5">
                      {row.parameter}
                      <span className="block text-xs text-ink-3 sm:hidden print:hidden">{row.conditions}</span>
                    </td>
                    <td className="hidden py-2 pr-4 text-ink-2 sm:table-cell print:table-cell print:py-0.5">
                      {row.conditions}
                    </td>
                    <td className="py-2 pr-2 text-right font-mono font-semibold whitespace-nowrap tabular-nums print:py-0.5">
                      {row.value}
                    </td>
                    <td className="py-2 pr-4 font-mono text-xs text-ink-2 print:py-0.5">{row.unit ?? "—"}</td>
                    <td className="hidden py-2 font-mono text-xs md:table-cell print:table-cell print:py-0.5">
                      {index === 0 && (
                        <Link href={`/projects/${project.slug}`} className="link">
                          {project.ref} {project.title}
                        </Link>
                      )}
                    </td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </section>

        <section className={SECTION}>
          <SectionHeading zone="D" title="Typical applications" meta={`${projects.length} projects`} />
          <ul className="border-b border-rule text-sm">
            {projects.map((project) => (
              <li
                key={project.slug}
                className={`grid break-inside-avoid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-1 md:grid-cols-[2.5rem_minmax(0,5fr)_minmax(0,4fr)_4.5rem] md:items-baseline print:grid-cols-[2.5rem_minmax(0,5fr)_minmax(0,4fr)_4.5rem] print:items-baseline ${ROW}`}
              >
                <span className="label">{project.ref}</span>
                <span>
                  <Link href={`/projects/${project.slug}`} className="link font-semibold">
                    {project.title}
                  </Link>
                  <span className="text-ink-2"> · {project.tagline}</span>
                </span>
                <span className="col-start-2 font-mono text-xs text-ink-3 md:col-start-auto print:col-start-auto">
                  {project.stack.join(" · ")}
                </span>
                <span className="col-start-2 md:col-start-auto md:justify-self-end print:col-start-auto print:justify-self-end">
                  <DomainTags domains={project.domains} />
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div className={`grid gap-x-12 lg:grid-cols-3 print:grid-cols-3 print:gap-x-8 ${SECTION}`}>
          <section className="break-inside-avoid">
            <SectionHeading zone="E" title="Education" />
            <div className="text-sm">
              <p className="font-semibold">{education.school}</p>
              <p className="text-ink-2">{education.degree}</p>
              <p className="label mt-1">{education.date}</p>
              <p className="mt-3 print:mt-2">{education.highlights.join(" · ")}</p>
              <p className="label mt-3 print:mt-2">Coursework</p>
              <p className="text-ink-2">{coursework.all.join(", ")}</p>
              <p className="label mt-3 print:mt-2">Awards</p>
              <p className="text-ink-2">{education.awards.join(", ")}</p>
            </div>
          </section>

          <section className="break-inside-avoid pt-14 lg:pt-0 print:pt-0">
            <SectionHeading zone="F" title="Skills" />
            <dl className="space-y-3 text-sm print:space-y-2">
              {skillGroups.all.map((group) => (
                <div key={group.label}>
                  <dt className="label">{group.label}</dt>
                  <dd className="text-ink-2">{group.skills.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="break-inside-avoid pt-14 lg:pt-0 print:pt-0">
            <SectionHeading zone="G" title="Experience" />
            <ul className="space-y-3 text-sm print:space-y-2">
              {roles.map((role) => (
                <li key={role.title}>
                  <p className="font-semibold">{role.title}</p>
                  <p className="text-ink-2">{role.organization}</p>
                  <p className="label mt-0.5">{role.dates}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className={`print:hidden ${SECTION}`}>
          <SectionHeading zone="H" title="Ordering information" meta="Contact" />
          <ul className="flex flex-wrap gap-x-10 gap-y-3 text-sm print:gap-x-8">
            {ordering.map((contact) => (
              <li key={contact.signal}>
                <span className="label block">{contact.signal}</span>
                <a href={contact.href} className="link font-mono text-xs">
                  {contact.value}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </Sheet>
  );
}
