import type { Metadata } from "next";
import Home from "@/components/Home";
import { seo } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";

// Same content as the home page in a different order, so search engines are pointed at "/"
export const metadata: Metadata = pageMetadata({
  title: "Hardware projects",
  description: seo.hardware,
  path: "/hardware",
  canonical: "/",
});

export default function Page() {
  return <Home lens="hw" />;
}
