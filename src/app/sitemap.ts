import type { MetadataRoute } from "next";
import { site } from "@/data/profile";
import { projects } from "@/data/projects";

export const dynamic = "force-static";

// The lens pages are left out on purpose: they are the home page re-sorted and point back to it as canonical
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = site.revised;
  return [
    { url: site.url, lastModified, priority: 1 },
    { url: `${site.url}/datasheet`, lastModified, priority: 0.6 },
    ...projects.map((project) => ({
      url: `${site.url}/projects/${project.slug}`,
      lastModified,
      priority: 0.8,
    })),
  ];
}
