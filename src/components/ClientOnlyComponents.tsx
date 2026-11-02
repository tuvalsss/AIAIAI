"use client";

import dynamic from "next/dynamic";

const WhatsAppFloat = dynamic(() => import("@/components/layout/WhatsAppFloat"), { ssr: false });
const ScrollToTop = dynamic(() => import("@/components/ui/ScrollToTop"), { ssr: false });

export default function ClientOnlyComponents() {
  return (
    <>
      <WhatsAppFloat />
      <ScrollToTop />
    </>
  );
}
