"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import { AboutProvider } from "@/components/layout/AboutContext";

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return (
    <AboutProvider>
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
    </AboutProvider>
  );
}
