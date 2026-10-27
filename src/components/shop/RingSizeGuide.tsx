"use client";

import { useState } from "react";
import { Ruler } from "lucide-react";
import Modal from "@/components/ui/Modal";

/** EU ring sizes = inner circumference in mm. Diameter = circumference / π. */
export const RING_SIZES = [48, 50, 52, 54, 56, 58, 60, 62, 64, 66].map((eu) => ({
  eu: String(eu),
  circumference: eu,
  diameter: (eu / Math.PI).toFixed(1),
}));

/** Shared content: used inside the PDP modal and on the standalone /vodic-za-velicine page. */
export function RingSizeGuideContent() {
  return (
    <div className="font-sans text-sm text-charcoal/85 space-y-6">
      <div>
        <h3 className="font-bold uppercase tracking-[0.18em] text-xs text-astera-900 mb-2">
          Kako izmjeriti veličinu prstena
        </h3>
        <ol className="list-decimal pl-5 space-y-1.5 leading-relaxed">
          <li>Omotajte tanki konac ili traku papira oko prsta na kojem ćete nositi prsten.</li>
          <li>Označite mjesto gdje se krajevi preklapaju i izmjerite duljinu ravnalom u milimetrima.</li>
          <li>Duljina je opseg prsta – pronađite najbližu vrijednost u tablici.</li>
          <li>Mjerite navečer, kada su prsti najtopliji i najveći. Ako ste između dvije veličine, odaberite veću.</li>
        </ol>
        <p className="mt-3 text-xs text-charcoal/65">
          Savjet: izmjerite i unutarnji promjer prstena koji vam savršeno pristaje i usporedite s
          tablicom.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border border-astera-200">
          <caption className="sr-only">Tablica veličina prstena</caption>
          <thead className="bg-warm-beige text-astera-900">
            <tr>
              <th scope="col" className="px-4 py-2.5 font-bold">Veličina (EU)</th>
              <th scope="col" className="px-4 py-2.5 font-bold">Opseg prsta (mm)</th>
              <th scope="col" className="px-4 py-2.5 font-bold">Unutarnji promjer (mm)</th>
            </tr>
          </thead>
          <tbody>
            {RING_SIZES.map((s) => (
              <tr key={s.eu} className="border-t border-astera-100">
                <th scope="row" className="px-4 py-2 font-bold text-astera-900">{s.eu}</th>
                <td className="px-4 py-2">{s.circumference}</td>
                <td className="px-4 py-2">{s.diameter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** "Vodič za veličine prstena" trigger + modal – rendered directly next to the size selector. */
export default function RingSizeGuideButton({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.15em] text-astera-700 underline underline-offset-4 hover:text-astera-900 cursor-pointer ${className}`}
      >
        <Ruler size={14} aria-hidden="true" />
        Vodič za veličine prstena
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Vodič za veličine prstena">
        <RingSizeGuideContent />
      </Modal>
    </>
  );
}