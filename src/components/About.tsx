"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { experience, languages, profile, stats } from "@/data/site";
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

      <div className="mt-20">
        <Reveal>
          <h3 className="font-display text-2xl font-bold">{t("exp.title", "Experience & education")}</h3>
        </Reveal>
        <ol className="mt-8 space-y-6 border-l border-line pl-6">
          {experience.map((e, i) => (
            <Reveal key={e.company} delay={i * 0.06}>
              <li className="relative">
                <span className="absolute -left-[31px] top-2 h-2.5 w-2.5 rounded-full bg-accent" />
                <p className="font-mono text-xs uppercase tracking-widest text-accent" dir="ltr">
                  {e.period}
                </p>
                <p className="mt-1 text-lg font-semibold">
                  {e.role} <span className="text-muted">· {e.company}</span>
                </p>
                {e.text && <p className="mt-1 max-w-2xl text-muted">{e.text}</p>}
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <h3 className="mt-14 font-display text-2xl font-bold">{t("lang.title", "Languages")}</h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {languages.map((l) => (
              <li key={l.key} className="rounded-2xl border border-line bg-panel px-5 py-3 text-sm">
                <span className="font-semibold">{t(l.key, l.name)}</span>
                <span className="text-muted"> · {t(l.levelKey, l.level)}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
