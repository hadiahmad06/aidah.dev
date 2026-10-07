import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import { site } from "@/data/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Electrical engineering and computer science student at the University of Minnesota. FPGA signal processing, power electronics and full-stack apps, with the numbers for each project.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Hadi Ahmad · EE + CS",
    template: "%s · Hadi Ahmad",
  },
  description,
  keywords: [
    "Hadi Ahmad",
    "Electrical Engineering",
    "Computer Science",
    "FPGA",
    "Verilog",
    "DSP",
    "PCB Design",
    "KiCad",
    "Full-Stack Developer",
    "React Native",
    "TypeScript",
    "Next.js",
    "Python",
    "University of Minnesota",
    "Portfolio",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: "Hadi Ahmad · EE + CS",
    description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
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
