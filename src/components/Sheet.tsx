import type { Lens } from "@/data/projects";
import { projects } from "@/data/projects";
import { site } from "@/data/profile";

const ZONES = Array.from({ length: 10 }, (_, i) => i + 1);

// Home, one sheet per project, then the datasheet
export const SHEET_COUNT = projects.length + 2;

// Numbered zones along the sheet edge, one per 120px grid column
function ZoneRuler({ edge }: { edge: "top" | "bottom" }) {
  return (
    <div
      aria-hidden
      className={`hidden grid-cols-10 border-rule-strong lg:grid print:hidden ${edge === "top" ? "border-b" : "border-t"}`}
    >
      {ZONES.map((zone) => (
        <span key={zone} className="label border-l border-rule py-0.5 text-center first:border-l-0">
          {zone}
        </span>
      ))}
    </div>
  );
}

function Field({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className={`bg-raised px-3 py-2 ${className}`}>
      <div className="label !text-[10px]">{label}</div>
      <div className="mt-0.5 font-mono text-xs text-ink">{value}</div>
    </div>
  );
}

function GroundSymbol() {
  return (
    <svg width="28" height="30" viewBox="0 0 28 30" aria-hidden className="text-ink-3">
      <path d="M14 0v14M2 14h24M7 20h14M11 26h6" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// The title block every drawing carries in its bottom-right corner
function TitleBlock({ title, sheet }: { title: string; sheet: number }) {
  return (
    <div className="grid w-full grid-cols-6 gap-px border border-rule-strong bg-rule-strong sm:max-w-[30rem]">
      <Field label="Title" value={title} className="col-span-6 sm:col-span-4" />
      <Field label="Drawn by" value={site.drawnBy} className="col-span-3 sm:col-span-2" />
      <Field label="Date" value={site.revised} className="col-span-3 sm:col-span-2" />
      <Field label="Rev" value={site.rev} className="col-span-3 sm:col-span-2" />
      <Field label="Sheet" value={`${sheet} of ${SHEET_COUNT}`} className="col-span-3 sm:col-span-2" />
    </div>
  );
}

export default function Sheet({
  lens,
  title,
  sheet,
  children,
}: {
  lens: Lens;
  title: string;
  sheet: number;
  children: React.ReactNode;
}) {
  return (
    <div
      id="top"
      data-lens={lens}
      className="mx-auto flex min-h-screen max-w-[1200px] flex-col border-rule-strong pt-13 xl:border-x print:block print:min-h-0 print:max-w-none print:border-0 print:pt-0"
    >
      <ZoneRuler edge="top" />
      <main className="flex-1 px-5 pb-24 sm:px-8 lg:px-12 print:p-0">{children}</main>
      <footer className="flex flex-col items-start justify-between gap-6 px-5 pb-6 sm:flex-row sm:items-end sm:px-8 lg:px-12 print:hidden">
        <div className="flex items-end gap-3">
          <GroundSymbol />
          <span className="label">End of sheet</span>
        </div>
        <TitleBlock title={title} sheet={sheet} />
      </footer>
      <ZoneRuler edge="bottom" />
    </div>
  );
}
