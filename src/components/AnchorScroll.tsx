"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { scrollToId } from "@/lib/scroll";

/**
 * Makes "#section" / "/#section" links scroll smoothly WITHOUT adding a hash to
 * the URL. From other pages it goes home first, then scrolls.
 */
export default function AnchorScroll() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest("a");
      const m = a?.getAttribute("href")?.match(/^\/?#(.+)$/);
      if (!m) return;
      // preventDefault only: Next's <Link> then skips navigation, but our own onClick handlers still run
      e.preventDefault();
      if (window.location.hash) history.replaceState(null, "", window.location.pathname);
      if (pathname === "/") {
        scrollToId(m[1]);
      } else {
        try {
          sessionStorage.setItem("scrollTo", m[1]);
        } catch {}
        router.push("/");
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname, router]);

  // arrived on home from another page with a pending target
  useEffect(() => {
    if (pathname !== "/") return;
    let id: string | null = null;
    try {
      id = sessionStorage.getItem("scrollTo");
      sessionStorage.removeItem("scrollTo");
    } catch {}
    if (!id) return;
    const target = id;
    const timer = setTimeout(() => scrollToId(target), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
