"use client";
import React from "react";
import { motion } from "framer-motion";

const WHATSAPP_URL =
  "https://wa.me/385955791294?text=Pozdrav,%20imam%20upit%20vezan%20za%20nakit%20Astera";

export default function WhatsAppFab() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Kontaktirajte nas putem WhatsAppa"
      initial={{ opacity: 0, scale: 0.9, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 rounded-full bg-astera-900 text-astera-100 border border-astera-300/50 p-3.5 md:px-5 md:py-3.5 shadow-[0_14px_40px_rgba(49,18,14,0.35)] hover:bg-obsidian hover:border-astera-300 transition-colors"
    >
      {/* Subtle Ambient Gold Ring */}
      <span className="relative flex items-center justify-center w-6 h-6 text-astera-200 group-hover:text-white transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M12.031 2c-5.516 0-9.999 4.486-9.999 10.002 0 1.766.461 3.49 1.337 5.01L2 22l5.123-1.343a9.957 9.957 0 0 0 4.906 1.29h.004c5.515 0 10.001-4.486 10.001-10.001A9.96 9.96 0 0 0 19.106 4.93 9.942 9.942 0 0 0 12.031 2Zm5.826 14.287c-.246.693-1.434 1.326-1.995 1.41-.513.077-1.163.11-1.878-.118-.434-.138-.99-.322-1.701-.63-2.992-1.292-4.946-4.307-5.095-4.506-.15-.199-1.217-1.62-1.217-3.09 0-1.471.77-2.194 1.044-2.493.274-.299.597-.374.796-.374.199 0 .398.002.572.01.183.009.429-.07.671.512.248.598.845 2.067.919 2.217.075.15.125.324.025.523-.099.2-.15.324-.299.498-.149.175-.314.391-.448.524-.149.149-.304.311-.13.61.174.299.773 1.275 1.66 2.066 1.14.999 2.101 1.309 2.4 1.459.298.149.472.125.647-.075.174-.199.746-.872.945-1.171.199-.299.398-.249.671-.15.274.1 1.741.822 2.039.972.299.149.498.224.572.349.075.124.075.722-.171 1.415Z" />
        </svg>
      </span>
      <span className="hidden md:inline-block font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-astera-100 group-hover:text-white">
        WhatsApp Upit
      </span>
    </motion.a>
  );
}