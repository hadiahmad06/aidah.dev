import { permanentRedirect } from "next/navigation";

// Short alias for sharing. In production Cloudflare answers from public/_redirects
// before this page is reached; this keeps the alias working in dev and on any other host.
export default function Page() {
  permanentRedirect("/hardware");
}
