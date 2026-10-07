"use client";

import { themeStore } from "@/lib/shared";
import { useStore } from "@/lib/store";

export default function ThemeToggle() {
  const theme = useStore(themeStore);
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      aria-label={`Switch to ${next} mode`}
      onClick={() => {
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("theme", next);
        } catch {}
        themeStore.set(next);
      }}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-lg transition hover:border-accent hover:text-accent"
    >
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
