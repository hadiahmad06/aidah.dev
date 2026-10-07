import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = { robots: { index: false } };

// Short alias for sharing. In production Cloudflare answers from public/_redirects
// before this page is reached; this keeps the alias working in dev and on any other host.
export default function Page() {
  permanentRedirect("/hardware");
}
