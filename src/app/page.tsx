import type { Metadata } from "next";
import Home from "@/components/Home";
import { seo } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: seo.title,
  description: seo.description,
  path: "/",
  absoluteTitle: true,
});

export default function Page() {
  return <Home lens="all" />;
}
