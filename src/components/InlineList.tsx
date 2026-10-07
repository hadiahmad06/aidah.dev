// A run of short items separated by mid-dots, wrapping like text
export default function InlineList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-2 gap-y-1">
      {items.map((item, index) => (
        <li key={item} className="flex gap-x-2">
          <span>{item}</span>
          {index < items.length - 1 && (
            <span aria-hidden className="text-ink-3">
              ·
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
