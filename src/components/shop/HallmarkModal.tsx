"use client";

import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import Modal from "@/components/ui/Modal";
import HallmarkInfo from "@/components/shop/HallmarkInfo";

/** Trigger + modal showing the official Croatian state hallmarks explainer (DZM). */
export default function HallmarkModalButton({
  className = "",
  label = "Državni žigovi",
}: {
  className?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-[0.15em] text-astera-700 underline underline-offset-4 hover:text-astera-900 cursor-pointer ${className}`}
      >
        <BadgeCheck size={14} aria-hidden="true" />
        {label}
      </button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Državni žigovi za predmete od plemenitih kovina"
      >
        <HallmarkInfo showLink />
      </Modal>
    </>
  );
}