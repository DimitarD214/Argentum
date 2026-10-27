import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const LEGAL_LAST_UPDATED = "27. listopada 2026.";

/** Shared shell for statutory pages (uvjeti, privatnost, kolačići, žigovi, vodič). */
export default function LegalPage({
  title,
  intro,
  children,
  showUpdated = true,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
  showUpdated?: boolean;
}) {
  return (
    <div className="bg-cream">
      <Navbar />
      <main className="min-h-screen pt-36 lg:pt-44 pb-24">
        <article className="max-w-3xl mx-auto px-6 md:px-8">
          <h1 className="font-serif tracking-wider uppercase leading-tight text-astera-900 text-3xl md:text-4xl mb-4">
            {title}
          </h1>
          {intro && <p className="font-sans text-sm text-charcoal/75 leading-relaxed mb-2">{intro}</p>}
          {showUpdated && (
            <p className="font-sans text-xs text-charcoal/50 mb-10">Zadnja izmjena: {LEGAL_LAST_UPDATED}</p>
          )}
          <div className="legal-content font-sans text-sm text-charcoal/85 leading-relaxed space-y-10">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32 space-y-3">
      <h2 className="font-serif text-xl text-astera-900 tracking-wide">{title}</h2>
      {children}
    </section>
  );
}