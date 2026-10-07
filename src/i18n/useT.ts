"use client";

import { dict } from "./dict";
import { langStore } from "@/lib/shared";
import { useStore } from "@/lib/store";

export function useT() {
  const lang = useStore(langStore);
  const t = (key: string, fallback?: string) => {
    const table = dict[lang] as Record<string, string>;
    const en = dict.en as Record<string, string>;
    return table[key] ?? fallback ?? en[key] ?? key;
  };
  return { t, lang };
}
