"use client";

import Link from "next/link";
import { LENSES } from "@/data/profile";
import { useLens } from "./SiteHeader";

// Returns to the project grid in whichever lens the visitor was using
export default function BackToIndex() {
  const { lens } = useLens();
  return (
    <Link href={`${LENSES[lens].href}#projects`} className="label transition-colors hover:text-accent">
      <span aria-hidden>←</span> All projects
    </Link>
  );
}
