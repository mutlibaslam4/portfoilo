"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { testimonials } from "@/data/extra";
import { useT } from "@/i18n/useT";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  const { t } = useT();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % n), 6000);
    return () => clearInterval(id);
  }, [paused, n]);

  const item = testimonials[i];

  return (
    <section className="mx-auto max-w-6xl px-5 py-28">
      <SectionHeading eyebrow={t("testi.eyebrow")} title={t("testi.title")} align="center" />

      <div
        className="relative mx-auto mt-14 max-w-3xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <span aria-hidden className="absolute -top-10 left-0 font-display text-8xl leading-none text-accent/30">
          &ldquo;
        </span>
        <div className="min-h-[260px] rounded-3xl border border-line bg-panel p-8 sm:p-12">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              dir="ltr"
            >
              <div className="mb-4 text-accent">★★★★★</div>
              <blockquote className="font-display text-xl leading-relaxed sm:text-2xl">{item.quote}</blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent font-display text-lg font-bold text-[#04120a]">
                  {item.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <span>
                  <span className="block font-semibold">{item.name}</span>
                  <span className="text-sm text-muted">{item.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3" dir="ltr">
          <button
            aria-label="Previous"
            onClick={() => setI((v) => (v - 1 + n) % n)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition hover:border-accent hover:text-accent"
          >
            ←
          </button>
          {testimonials.map((_, k) => (
            <button
              key={k}
              aria-label={`Testimonial ${k + 1}`}
              onClick={() => setI(k)}
              className="flex h-9 w-6 items-center justify-center"
            >
              <span className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-accent" : "w-2 bg-line"}`} />
            </button>
          ))}
          <button
            aria-label="Next"
            onClick={() => setI((v) => (v + 1) % n)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition hover:border-accent hover:text-accent"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
