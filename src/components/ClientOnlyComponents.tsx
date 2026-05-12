"use client";

import dynamic from "next/dynamic";

const WhatsAppFloat = dynamic(() => import("@/components/layout/WhatsAppFloat"), { ssr: false });
const LoadingScreen = dynamic(() => import("@/components/LoadingScreen"), { ssr: false });

export default function ClientOnlyComponents() {
  return (
    <>
      <LoadingScreen />
      <WhatsAppFloat />
    </>
  );
}
