"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { categories, projects, type Category, type Project } from "@/data/projects";
import { useT } from "@/i18n/useT";
import SectionHeading from "./SectionHeading";

export default function Work() {
  const { t } = useT();
  const [active, setActive] = useState<Category>("All");
  const [open, setOpen] = useState<Project | null>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const list =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-28">
      <SectionHeading eyebrow={t("work.eyebrow")} title={t("work.title")} />

      <div className={`mt-10 flex-wrap gap-2 ${projects.length > 3 ? "flex" : "hidden"}`}>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className="relative rounded-full px-5 py-2 text-sm font-medium text-muted transition hover:text-text"
          >
            {active === c && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span
              className={`relative ${active === c ? "text-[#04120a]" : ""}`}
            >
              {t(`cat.${c}`)}
            </span>
          </button>
        ))}
      </div>

      {/* puzzle gallery: spans tile the grid, `dense` back-fills any gaps */}
      <motion.div
        layout
        className="mt-10 grid auto-rows-[130px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[160px] sm:gap-4 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.button
              layout
              key={p.id}
              type="button"
              data-cursor="view"
              onClick={() => setOpen(p)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-2xl border border-line text-left sm:rounded-3xl ${p.span}`}
            >
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(min-width: 1024px) 560px, 50vw"
                className="object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 translate-y-2 text-white p-4 transition duration-500 group-hover:translate-y-0 sm:p-5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent sm:text-xs">
                  {p.category}
                </span>
                <h3 className="font-display text-lg font-bold sm:text-xl">
                  {p.title}
                </h3>
              </div>
              <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur transition duration-500 group-hover:rotate-45 group-hover:opacity-100">
                ↗
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-5 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(null)}
              >
                <motion.div
                  className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-line bg-panel"
                  initial={{ scale: 0.92, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.92, y: 20 }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={open.image}
                      alt={open.title}
                      fill
                      sizes="900px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="flex flex-wrap items-end justify-between gap-4 p-6">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-widest text-accent">
                        {open.category}
                      </span>
                      <h3 className="font-display text-3xl font-bold">
                        {open.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {open.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-line p-6">
                    <Link
                      href={`/work/${open.slug}`}
                      onClick={() => setOpen(null)}
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-[#04120a] transition hover:brightness-110"
                    >
                      {t("work.case")} →
                    </Link>
                  </div>
                  <button
                    aria-label="Close"
                    onClick={() => setOpen(null)}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-lg backdrop-blur transition hover:bg-accent hover:text-[#04120a]"
                  >
                    ✕
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
