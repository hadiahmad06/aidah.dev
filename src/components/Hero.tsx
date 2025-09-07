

import React from "react";

type HeroProps = {
  name: string;
  domain: string;
};

export default function Hero({ name, domain }: HeroProps) {
  // Split name to color the parentheses part
  const nameParts = name.split(/(\(.*\))/); // matches parentheses
  return (
    <section className="flex flex-col items-center justify-center text-center gap-4 py-24 bg-neutral-900">
      <h1 className="text-5xl sm:text-6xl font-bold font-sans playful-font">
        {nameParts.map((part, idx) =>
          /\(.*\)/.test(part) ? (
            <span key={idx} className="accent">
              {part}
            </span>
          ) : (
            <span key={idx}>{part}</span>
          )
        )}
      </h1>
      <p className="text-xl sm:text-2xl text-foreground/70">{domain}</p>
    </section>
  );
}