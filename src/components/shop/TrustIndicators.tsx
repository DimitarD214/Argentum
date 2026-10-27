import { Truck, Gift, ShieldCheck } from "lucide-react";

const ITEMS = [
  {
    icon: Truck,
    title: "Dostava unutar 2-4 radna dana",
    text: "Besplatna dostava u Hrvatskoj",
  },
  {
    icon: Gift,
    title: "Dolazi u poklon kutijici",
    text: "Svaki komad je spreman za darivanje",
  },
  {
    icon: ShieldCheck,
    title: "Hipoalergenski",
    text: "Pogodno za osjetljivu kožu",
  },
];

/** PDP trust badges: delivery estimate, gift packaging guarantee, hypoallergenic. */
export default function TrustIndicators({ className = "" }: { className?: string }) {
  return (
    <ul className={`grid grid-cols-1 sm:grid-cols-3 gap-3 ${className}`} aria-label="Zašto kupiti kod nas">
      {ITEMS.map(({ icon: Icon, title, text }) => (
        <li
          key={title}
          className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2 rounded-sm border border-astera-200/80 bg-warm-beige/60 p-3.5"
        >
          <Icon size={20} strokeWidth={1.5} className="text-astera-700 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-astera-900 leading-snug">
              {title}
            </p>
            <p className="font-sans text-[11px] text-charcoal/65 mt-0.5">{text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}