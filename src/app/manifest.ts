import type { MetadataRoute } from "next";
import { seo, site } from "@/data/profile";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: seo.title,
    short_name: site.name,
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f2ea",
    theme_color: "#15171c",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
