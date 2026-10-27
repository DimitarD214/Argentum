"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

/** Minimal accessible modal: ESC / backdrop to close, scroll lock, focus moved in and restored. */
export default function Modal({ open, onClose, title, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[400] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-6"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-t-2xl sm:rounded-md shadow-2xl p-6 sm:p-9 outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Zatvori"
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-sm text-astera-700 hover:bg-astera-50 cursor-pointer"
        >
          <X size={20} />
        </button>
        <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider text-astera-900 mb-5 pr-10">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}