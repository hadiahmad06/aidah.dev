"use client";

import Link from "next/link";
import { LENSES } from "@/data/profile";
import { useLens } from "./SiteHeader";

// Returns to the home sheet in whichever lens the visitor was using
export default function BackToIndex({ hash, children }: { hash?: string; children: React.ReactNode }) {
  const { lens } = useLens();
  return (
    <Link
      href={hash ? `${LENSES[lens].href}#${hash}` : LENSES[lens].href}
      className="label transition-colors hover:text-accent"
    >
      <span aria-hidden>←</span> {children}
    </Link>
  );
}
