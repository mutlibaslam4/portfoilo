"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type KeyboardEvent } from "react";
import { services } from "@/data/site";
import { useT } from "@/i18n/useT";
import SectionHeading from "./SectionHeading";

const POINTS = [1, 2, 3, 4];

export default function Services() {
  const { t } = useT();
  const [active, setActive] = useState(0);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const next = ["ArrowDown", "ArrowRight"].includes(e.key) ? 1 : ["ArrowUp", "ArrowLeft"].includes(e.key) ? -1 : 0;
    if (!next) return;
    e.preventDefault();
    const i = (active + next + services.length) % services.length;
    setActive(i);
    document.getElementById(`svc-tab-${i}`)?.focus();
  };

  const s = services[active];
  const n = active + 1;

  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-28">
      <SectionHeading eyebrow={t("services.eyebrow")} title={t("services.title")} />

      <div className="mt-14 grid gap-6 md:grid-cols-[18rem_1fr]">
        <div
          role="tablist"
          aria-orientation="vertical"
          onKeyDown={onKey}
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-col md:overflow-visible md:px-0 md:pb-0"
        >
          {services.map((x, i) => (
            <button
              key={x.title}
              id={`svc-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={active === i}
              aria-controls="svc-panel"
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              className={`relative flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition md:w-full ${
                active === i ? "border-accent/60 text-text" : "border-line text-muted hover:text-text"
              }`}
            >
              {active === i && (
                <motion.span
                  layoutId="svc-pill"
                  className="absolute inset-0 rounded-2xl bg-accent/10"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-lg text-accent">
                {x.icon}
              </span>
              <span className="relative whitespace-nowrap md:whitespace-normal">{t(`svc${i + 1}.t`, x.title)}</span>
            </button>
          ))}
        </div>

        <div
          id="svc-panel"
          role="tabpanel"
          aria-labelledby={`svc-tab-${active}`}
          className="relative min-h-[22rem] min-w-0 overflow-hidden rounded-3xl border border-line bg-panel p-7 sm:p-10"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="relative"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-3xl text-accent">
                {s.icon}
              </div>
              <h3 className="mt-6 font-display text-3xl font-bold">{t(`svc${n}.t`, s.title)}</h3>
              <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted">{t(`svc${n}.x`, s.text)}</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {POINTS.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 text-accent">✓</span>
                    <span>{t(`svc${n}.p${p}`)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
