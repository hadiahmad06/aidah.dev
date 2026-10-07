import Link from "next/link";
import type { Lens } from "@/data/projects";
import { hero, site, specs, tagline } from "@/data/profile";

export default function Hero({ lens }: { lens: Lens }) {
  const { kicker, positioning } = hero[lens];

  return (
    <section className="pt-12 sm:pt-16 lg:pt-20">
      <p className="label">
        <span className="tag-hw font-semibold">EE</span>
        {" + "}
        <span className="tag-sw font-semibold">CS</span>
        {" · "}
        {kicker}
      </p>
      <h1 className="mt-5 text-5xl font-semibold tracking-[-0.035em] sm:text-6xl lg:text-7xl">{site.name}</h1>
      <p className="mt-5 max-w-3xl text-2xl leading-snug tracking-tight text-ink sm:text-3xl">{positioning}</p>
      <p className="mt-4 max-w-2xl text-base text-ink-2 sm:text-lg">{tagline}</p>

      <div className="mt-8 flex flex-wrap gap-2.5">
        <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
          Résumé <span aria-hidden>↓</span>
        </a>
        <a href="https://github.com/hadiahmad06" target="_blank" rel="noopener noreferrer" className="btn">
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/hadiahmad06" target="_blank" rel="noopener noreferrer" className="btn">
          LinkedIn
        </a>
        <a href={`mailto:${site.email}`} className="btn">
          Email
        </a>
      </div>

      {/* Spec strip: each number is a test point wired to the project it was measured on */}
      <ul className="sheet-enter mt-14 grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:mt-20 lg:grid-cols-5">
        {specs[lens].map((spec, index) => (
          <li key={spec.label} className="tp last:col-span-2 sm:last:col-span-1">
            <Link href={spec.href} className="group block pb-1 pr-5 pt-4">
              <span className="label">TP{index + 1}</span>
              <span className="mt-1 block text-4xl font-semibold tracking-[-0.03em] text-accent tabular-nums sm:text-5xl">
                {spec.value}
              </span>
              <span className="mt-2 block text-sm leading-snug text-ink-2">{spec.label}</span>
              <span className="label mt-3 block transition-colors group-hover:text-accent">
                {spec.source} <span aria-hidden>→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
