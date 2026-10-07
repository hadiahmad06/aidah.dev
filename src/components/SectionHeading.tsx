export default function SectionHeading({
  zone,
  title,
  meta,
}: {
  zone: string;
  title: string;
  meta?: string;
}) {
  return (
    <div className="mb-7 flex items-center gap-3 sm:gap-4 print:mb-2.5">
      <span className="grid h-6 w-6 shrink-0 place-items-center border border-accent font-mono text-xs text-accent">
        {zone}
      </span>
      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
      {/* A trace running off to a junction */}
      <span aria-hidden className="flex flex-1 items-center">
        <span className="h-px flex-1 bg-rule-strong" />
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      {meta && <span className="label hidden sm:block">{meta}</span>}
    </div>
  );
}
