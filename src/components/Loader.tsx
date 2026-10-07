"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { loaderState } from "@/lib/shared";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(loaderState.played);

  useEffect(() => {
    if (loaderState.played) return;
    const id = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.ceil(Math.random() * 14));
        if (next === 100) {
          clearInterval(id);
          setTimeout(() => {
            loaderState.played = true;
            setDone(true);
          }, 250);
        }
        return next;
      });
    }, 45);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <p className="font-mono text-sm text-muted" dir="ltr">
            Compiling premium experience<span className="caret text-accent"> ▍</span>
          </p>
          <div className="mt-6 h-[3px] w-64 overflow-hidden rounded-full bg-line">
            <motion.div
              className="h-full bg-accent"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.2 }}
            />
          </div>
          <p className="mt-3 font-display text-5xl font-bold tabular-nums">{progress}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
