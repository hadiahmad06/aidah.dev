// The signal path in a few boxes; wraps like text when the tile is narrow
export default function MiniChain({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ol className={`flex flex-wrap items-center gap-y-1.5 font-mono text-[11px] leading-4 ${className}`}>
      {items.map((item, index) => (
        <li key={item} className="flex items-center">
          <span className="border border-rule-strong bg-paper px-1.5 py-0.5 whitespace-nowrap">{item}</span>
          {index < items.length - 1 && (
            <svg width="18" height="8" viewBox="0 0 18 8" aria-hidden className="shrink-0 text-accent">
              <path d="M0 4h12" stroke="currentColor" strokeWidth="1.25" />
              <path d="M11 1l6 3-6 3z" fill="currentColor" />
            </svg>
          )}
        </li>
      ))}
    </ol>
  );
}
