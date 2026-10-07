import type Lenis from "lenis";

export const lenisRef: { current: Lenis | null } = { current: null };

/** scroll to a section by id without touching the URL */
export function scrollToId(id: string) {
  const el = id === "home" ? null : document.getElementById(id);
  if (id !== "home" && !el) return;
  const lenis = lenisRef.current;
  if (lenis) {
    lenis.scrollTo(el ?? 0);
  } else if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
