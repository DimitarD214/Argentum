import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { RingSizeGuideContent } from "@/components/shop/RingSizeGuide";

export const metadata: Metadata = {
  title: "Vodič za veličine prstena",
  description:
    "Kako izmjeriti veličinu prstena kod kuće i tablica EU veličina (opseg i promjer u mm) za srebrne i zlatne prstenove.",
  alternates: { canonical: "/vodic-za-velicine" },
};

export default function RingSizePage() {
  return (
    <LegalPage title="Vodič za veličine prstena" showUpdated={false}>
      <RingSizeGuideContent />
    </LegalPage>
  );
}