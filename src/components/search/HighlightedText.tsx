"use client";
import React from "react";
import { normalizeText } from "@/lib/searchEngine";

interface HighlightedTextProps {
  text: string;
  highlightTerms: string[];
  className?: string;
  highlightClassName?: string;
}

/**
 * Highlights words or prefix segments inside `text` that match any term in `highlightTerms`
 * (including diacritic-insensitive matches, fuzzy surface terms, and synonym surface terms).
 */
export default function HighlightedText({
  text,
  highlightTerms,
  className = "",
  highlightClassName = "bg-amber-200/90 text-astera-900 px-1 py-0.2 rounded-xs font-semibold shadow-[0_0_0_1px_rgba(200,138,75,0.25)]",
}: HighlightedTextProps) {
  if (!text) return null;
  if (!highlightTerms || highlightTerms.length === 0) {
    return <span className={className}>{text}</span>;
  }

  const normalizedTerms = Array.from(
    new Set(
      highlightTerms
        .map((t) => normalizeText(t))
        .filter((t) => t.length >= 2)
    )
  ).sort((a, b) => b.length - a.length);

  if (normalizedTerms.length === 0) {
    return <span className={className}>{text}</span>;
  }

  // Split text preserving whitespace and punctuation tokens
  const tokens = text.split(/(\s+|[,•/()-]+)/);

  return (
    <span className={className}>
      {tokens.map((segment, index) => {
        const normSeg = normalizeText(segment);
        if (!normSeg || normSeg.length < 2) {
          return <React.Fragment key={index}>{segment}</React.Fragment>;
        }

        // Check full word or prefix match
        const matchedTerm = normalizedTerms.find(
          (term) =>
            normSeg === term ||
            normSeg.startsWith(term) ||
            (term.length >= 4 && normSeg.includes(term))
        );

        if (!matchedTerm) {
          return <React.Fragment key={index}>{segment}</React.Fragment>;
        }

        // If full word matched (or fuzzy/synonym word matched), highlight the whole word
        if (normSeg === matchedTerm || matchedTerm.length >= normSeg.length - 1) {
          return (
            <mark key={index} className={highlightClassName}>
              {segment}
            </mark>
          );
        }

        // If prefix matched, highlight the matched prefix portion and leave remainder normal (or highlight whole word if clean)
        if (normSeg.startsWith(matchedTerm)) {
          const splitPos = Math.min(segment.length, matchedTerm.length);
          return (
            <React.Fragment key={index}>
              <mark className={highlightClassName}>
                {segment.slice(0, splitPos)}
              </mark>
              {segment.slice(splitPos)}
            </React.Fragment>
          );
        }

        return (
          <mark key={index} className={highlightClassName}>
            {segment}
          </mark>
        );
      })}
    </span>
  );
}
