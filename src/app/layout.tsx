import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import { seo, site } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const home = pageMetadata({ title: seo.title, description: seo.description, path: "/", absoluteTitle: true });

// Defaults for any page that sets nothing of its own. The canonical URL is deliberately
// not among them: a page that inherited it would tell search engines it is the home page.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: seo.title, template: `%s · ${site.name}` },
  description: home.description,
  openGraph: home.openGraph,
  twitter: home.twitter,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: ["Hadi Ahmad", "electrical engineering", "computer science", "University of Minnesota", ...seo.topics],
};

// Browser chrome takes the paper colour of whichever theme is showing
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f2ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1116" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
