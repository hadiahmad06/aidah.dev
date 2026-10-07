"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { LENSES, site } from "@/data/profile";
import type { Lens } from "@/data/projects";

const LENS_BY_PATH: Record<string, Lens> = { "/": "all", "/hardware": "hw", "/software": "sw" };
const STORAGE_KEY = "lens";

const sections = [
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const subscribe = () => () => {};

function readStoredLens(): Lens {
  const stored = sessionStorage.getItem(STORAGE_KEY);
  return stored === "hw" || stored === "sw" ? stored : "all";
}

// The lens of the current page, or on a project page the lens the visitor came from
export function useLens(): { lens: Lens; onHome: boolean } {
  const pathname = usePathname().replace(/(.)\/$/, "$1");
  const pageLens: Lens | undefined = LENS_BY_PATH[pathname];
  const storedLens = useSyncExternalStore<Lens>(subscribe, readStoredLens, () => "all");

  useEffect(() => {
    if (pageLens) sessionStorage.setItem(STORAGE_KEY, pageLens);
  }, [pageLens]);

  return { lens: pageLens ?? storedLens, onHome: pageLens !== undefined };
}

export default function SiteHeader() {
  const { lens, onHome } = useLens();
  const home = LENSES[lens].href;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rule-strong bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-13 max-w-[1200px] items-center gap-4 px-5 sm:px-8 lg:gap-8 lg:px-12">
        <Link href={onHome ? "#top" : home} className="font-mono text-[13px] font-semibold tracking-[0.12em]">
          HADI AHMAD
        </Link>

        <nav aria-label="Sections" className="hidden items-center gap-5 md:flex">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={onHome ? `#${section.id}` : `${home}#${section.id}`}
              className="label transition-colors hover:text-ink"
            >
              {section.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          {onHome && (
            <div className="flex items-center gap-2" role="group" aria-label="Sort the page for">
              <span className="label hidden lg:inline">Lens</span>
              <div className="flex border border-rule-strong bg-raised">
                {(Object.keys(LENSES) as Lens[]).map((key) => (
                  <Link
                    key={key}
                    href={LENSES[key].href}
                    scroll={false}
                    data-lens={key}
                    aria-current={key === lens ? "page" : undefined}
                    className={`px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors ${
                      key === lens ? "bg-accent text-paper" : "text-ink-2 hover:text-accent"
                    }`}
                  >
                    <span className="sm:hidden">{LENSES[key].short}</span>
                    <span className="hidden sm:inline">{LENSES[key].label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn !px-2.5 !py-1 !text-[11px] ${onHome ? "hidden sm:inline-flex" : ""}`}
          >
            Résumé
          </a>
        </div>
      </div>
    </header>
  );
}
