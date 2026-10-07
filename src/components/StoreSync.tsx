"use client";

import { useEffect } from "react";
import { langStore, themeStore, type Lang, type Theme } from "@/lib/shared";

/** syncs persisted language/theme into the stores after hydration */
export default function StoreSync() {
  useEffect(() => {
    const root = document.documentElement;
    const applyLang = () => {
      const l = langStore.get();
      root.lang = l;
      root.dir = l === "ur" ? "rtl" : "ltr";
    };
    try {
      const l = localStorage.getItem("lang") as Lang | null;
      if (l === "ur" || l === "en") langStore.set(l);
    } catch {}
    themeStore.set((root.dataset.theme as Theme) || "dark");
    applyLang();
    return langStore.subscribe(applyLang);
  }, []);
  return null;
}
