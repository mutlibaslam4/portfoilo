"use client";

import { langStore } from "@/lib/shared";
import { useStore } from "@/lib/store";

export default function LangToggle() {
  const lang = useStore(langStore);
  const next = lang === "en" ? "ur" : "en";

  return (
    <button
      aria-label="Change language"
      onClick={() => {
        langStore.set(next);
        try {
          localStorage.setItem("lang", next);
        } catch {}
      }}
      className="flex h-10 items-center justify-center rounded-full border border-line px-3 text-sm font-semibold transition hover:border-accent hover:text-accent"
    >
      {lang === "en" ? "اردو" : "EN"}
    </button>
  );
}
