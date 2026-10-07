"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

type Mode = "default" | "link" | "view";

/** dot + ring cursor; grows on links, shows "View" on [data-cursor="view"] */
export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 500, damping: 38, mass: 0.35 });
  const ry = useSpring(y, { stiffness: 500, damping: 38, mass: 0.35 });
  const [mode, setMode] = useState<Mode>("default");

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      if (el?.closest('[data-cursor="view"]')) setMode("view");
      else if (el?.closest("a, button, [data-cursor]")) setMode("link");
      else setMode("default");
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [x, y]);

  const size = mode === "view" ? 84 : mode === "link" ? 52 : 14;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: rx, y: ry }}
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden md:block"
      >
        <motion.div
          animate={{ width: size, height: size }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full ${
            mode === "default"
              ? "bg-accent"
              : mode === "view"
                ? "bg-accent text-[#04120a]"
                : "border border-accent bg-accent/10"
          }`}
        >
          {mode === "view" && <span className="font-mono text-xs font-bold uppercase">View</span>}
        </motion.div>
      </motion.div>
    </>
  );
}
