import React from "react";

export default function TrustBadges() {
  const badges = [
    {
      title: "Ručna izrada",
      subtitle: "Majstorski filigran i autentična posvećenost svakom detalju",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.25}
          className="w-6 h-6 text-astera-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"
          />
        </svg>
      ),
    },
    {
      title: "Besplatna dostava",
      subtitle: "Sigurna i osigurana isporuka u luksuznom Astera pakiranju",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.25}
          className="w-6 h-6 text-astera-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      aria-label="Astera jamstvo kvalitete"
      className="bg-cream border-b border-astera-200/70 py-10 md:py-14"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-astera-200/70">
          {badges.map((badge, idx) => (
            <div
              key={badge.title}
              className={`flex items-center justify-center gap-5 ${
                idx === 1 ? "pt-8 md:pt-0 md:pl-12" : "md:pr-12"
              }`}
            >
              <div className="w-14 h-14 rounded-full bg-warm-beige border border-astera-300/50 flex items-center justify-center shrink-0 shadow-xs">
                {badge.icon}
              </div>
              <div>
                <h3 className="font-serif text-lg md:text-xl uppercase tracking-[0.18em] text-astera-900 mb-1">
                  {badge.title}
                </h3>
                <p className="font-sans text-xs text-charcoal/70 leading-relaxed">
                  {badge.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}