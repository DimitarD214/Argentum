"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

type AccordionItem = {
  title: string;
  content: React.ReactNode;
};

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="border-t border-charcoal/10 divide-y divide-charcoal/10">
      {items.map((item, index) => (
        <div key={index} className="py-4">
          <button
            onClick={() => toggle(index)}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="font-serif text-lg text-charcoal">{item.title}</span>
            <ChevronDown
              size={18}
              className={`transform transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 max-h-0 ${
              openIndex === index ? "max-h-96 opacity-100 mt-4" : "opacity-0"
            }`}
          >
            <div className="text-sm text-charcoal/70 leading-relaxed pr-8">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
