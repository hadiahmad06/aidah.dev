import type { Metadata } from "next";
import { site } from "@/data/profile";

const shareImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Hadi Ahmad, EE + CS at the University of Minnesota. I build from FPGA filter banks up to full-stack apps.",
};

// A page-level openGraph or twitter object replaces the root one wholesale, share image included,
// so every page builds its complete set here instead of relying on inheritance.
export function pageMetadata({
  title,
  description,
  path,
  canonical = path,
  absoluteTitle = false,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  canonical?: string;       // Where search engines should file this page; defaults to its own path
  absoluteTitle?: boolean;  // Skip the "· Hadi Ahmad" suffix
  type?: "website" | "article";
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} · ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: site.name,
      locale: "en_US",
      type,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: site.xHandle,
      images: [shareImage],
    },
  };
}
