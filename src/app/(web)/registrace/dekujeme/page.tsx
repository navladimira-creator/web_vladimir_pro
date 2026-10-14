import type { Metadata } from "next";
import Dekujeme from "@/components/Dekujeme";

export const metadata: Metadata = { title: "Registrace proběhla", robots: { index: false, follow: false } };

export default function DekujemePage() {
  return <Dekujeme />;
}
