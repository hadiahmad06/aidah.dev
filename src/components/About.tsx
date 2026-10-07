import { about, elsewhere, offClock, principle } from "@/data/profile";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="pt-20 lg:pt-28">
      <SectionHeading zone="E" title="About" />
      <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[1fr_26rem]">
        <div className="max-w-2xl">
          <p className="text-lg leading-relaxed">{about.join(" ")}</p>
          <p className="mt-5 border-l-2 border-accent pl-4 text-ink-2">{principle}</p>
        </div>
        <div>
          <div className="label mb-2">Off the clock</div>
          <dl className="border-b border-rule text-sm">
            {offClock.map((item) => (
              <div key={item.label} className="grid grid-cols-[5.5rem_1fr] gap-x-4 border-t border-rule py-2.5">
                <dt className="label">{item.label}</dt>
                <dd className="text-ink-2">
                  {item.text}
                  {item.link && (
                    <>
                      {" "}
                      <a href={item.link.href} target="_blank" rel="noopener noreferrer" className="link text-ink">
                        {item.link.label}
                      </a>
                    </>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 flex gap-4 font-mono text-xs">
            {elsewhere.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="link text-ink-2">
                {item.label} <span aria-hidden>↗</span>
              </a>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
