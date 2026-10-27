import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import HallmarkInfo from "@/components/shop/HallmarkInfo";

export const metadata: Metadata = {
  title: "Državni žigovi za predmete od plemenitih kovina",
  description:
    "Što znače državni žigovi, znak odgovornosti i oznake finoće 925 i 585 na srebrnom i zlatnom nakitu. Informacije Državnog zavoda za mjeriteljstvo (DZM).",
  alternates: { canonical: "/drzavni-zigovi" },
};

export default function HallmarksPage() {
  return (
    <LegalPage
      title="Državni žigovi za predmete od plemenitih kovina"
      showUpdated={false}
    >
      <HallmarkInfo />
    </LegalPage>
  );
}