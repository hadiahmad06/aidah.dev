import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hadi Ahmad",
  description: "Hi! I'm Hadi, I love making stuff that solves real problems. I've contributed to a few projects that I'm proud of.",
  keywords: [
    "Hadi Ahmad",
    "Full-Stack Developer",
    "Portfolio",
    "React",
    "Next.js",
    "Node.js",
    "AWS",
    "API",
    "JavaScript",
    "TypeScript",
    "Web Development",
    "Backend Development",
    "macOS",
    "iOS",
    "Swift",
    "Projects",
    "UI/UX"
  ],
  viewport: "width=device-width, initial-scale=1.0",
  authors: [{name: "Hadi Ahmad"}]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
