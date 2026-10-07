import type { Domain } from "@/data/projects";

export default function DomainTags({ domains }: { domains: Domain[] }) {
  return (
    <span className="flex shrink-0 gap-1">
      {domains.map((domain) => (
        <span
          key={domain}
          className={`border border-current px-1.5 font-mono text-[10px] leading-4 tracking-[0.08em] ${
            domain === "hw" ? "tag-hw" : "tag-sw"
          }`}
        >
          {domain.toUpperCase()}
        </span>
      ))}
    </span>
  );
}
