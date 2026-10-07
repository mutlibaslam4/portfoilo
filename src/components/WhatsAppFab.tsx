"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/site";

export default function WhatsAppFab() {
  const href = `https://wa.me/${profile.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Hi! I found your portfolio and would like to discuss a project.")}`;
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 3.5, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/30"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
      <svg viewBox="0 0 32 32" className="relative h-7 w-7 fill-white" aria-hidden>
        <path d="M16.04 3C9.4 3 4 8.4 4 15.04c0 2.12.55 4.18 1.6 6L4 29l8.14-1.56a12 12 0 0 0 3.9.65C22.68 28.09 28 22.7 28 16.04 28 9.4 22.68 3 16.04 3Zm0 21.9c-1.2 0-2.37-.32-3.4-.93l-.5-.29-4.83.93.97-4.7-.32-.52a9.8 9.8 0 0 1-1.5-5.2c0-5.4 4.4-9.8 9.82-9.8 5.4 0 9.8 4.4 9.8 9.8 0 5.4-4.4 9.7-9.84 9.7Zm5.4-7.3c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.5.7.3 1.26.48 1.7.62.72.23 1.37.2 1.88.12.57-.08 1.75-.72 2-1.4.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
      </svg>
    </motion.a>
  );
}
