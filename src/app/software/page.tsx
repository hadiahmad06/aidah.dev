import type { Metadata } from "next";
import Home from "@/components/Home";

export const metadata: Metadata = {
  title: "Software",
  description: "Hadi Ahmad's software work: cross-platform apps, data pipelines and the backends behind them.",
};

export default function Page() {
  return <Home lens="sw" />;
}
