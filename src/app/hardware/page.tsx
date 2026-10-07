import type { Metadata } from "next";
import Home from "@/components/Home";

export const metadata: Metadata = {
  title: "Hardware",
  description: "Hadi Ahmad's hardware work: FPGA signal processing, power drive stages and analog design.",
};

export default function Page() {
  return <Home lens="hw" />;
}
