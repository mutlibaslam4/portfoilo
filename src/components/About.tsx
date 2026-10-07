"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile, stats } from "@/data/site";
import { useT } from "@/i18n/useT";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function About() {
  const { t } = useT();
  const fill = (k: string) => t(k).replace("{name}", profile.name).replace("{role}", profile.role.toLowerCase());
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-28">
      <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <SectionHeading eyebrow={t("about.eyebrow")} title={t("about.title")} />
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-muted">{fill("about.p1")}</p>
            <p className="mt-4 text-lg leading-relaxed text-muted">{t("about.p2")}</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="rounded-2xl border border-line bg-panel p-6 transition hover:-translate-y-1 hover:border-accent/50">
                <div className="font-display text-5xl font-bold text-accent" dir="ltr">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-sm text-muted">{t(s.key, s.label)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
