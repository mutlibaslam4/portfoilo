"use client";

import { useState } from "react";
import { calc } from "@/data/extra";
import { useT } from "@/i18n/useT";
import { prefillStore } from "@/lib/shared";
import AnimatedNumber from "./AnimatedNumber";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Calculator() {
  const { t } = useT();
  const [type, setType] = useState("business");
  const [pages, setPages] = useState(5);
  const [feats, setFeats] = useState<string[]>(["seo"]);
  const [rush, setRush] = useState(false);

  const tp = calc.types.find((x) => x.key === type)!;
  const featTotal = calc.features.filter((f) => feats.includes(f.key)).reduce((s, f) => s + f.price, 0);
  const raw = (tp.base + (pages - 1) * tp.perPage + featTotal) * (rush ? 1.25 : 1);
  const round50 = (n: number) => Math.round(n / 50) * 50;
  const min = round50(raw * 0.9);
  const max = round50(raw * 1.2);
  const weeks = Math.max(1, Math.ceil((tp.weeks + pages * 0.15 + feats.length * 0.4) * (rush ? 0.7 : 1)));

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm font-medium transition ${
      active ? "border-accent bg-accent text-[#04120a]" : "border-line text-muted hover:border-accent hover:text-text"
    }`;

  return (
    <section id="estimate" className="mx-auto max-w-6xl px-5 py-28">
      <SectionHeading eyebrow={t("calc.eyebrow")} title={t("calc.title")} />
      <Reveal delay={0.1}>
        <p className="mt-4 max-w-xl text-muted">{t("calc.sub")}</p>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-12 grid gap-8 rounded-3xl border border-line bg-panel p-6 sm:p-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-8">
            <div>
              <p className="mb-3 text-sm font-semibold">{t("calc.type")}</p>
              <div className="flex flex-wrap gap-2">
                {calc.types.map((x) => (
                  <button key={x.key} onClick={() => setType(x.key)} className={chip(type === x.key)}>
                    {t(`type.${x.key}`)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 flex justify-between text-sm font-semibold">
                <span>{t("calc.pages")}</span>
                <span className="text-accent">{pages}</span>
              </p>
              <input
                type="range"
                min={1}
                max={20}
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
                className="w-full accent-[var(--accent)]"
                aria-label={t("calc.pages")}
              />
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold">{t("calc.features")}</p>
              <div className="flex flex-wrap gap-2">
                {calc.features.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFeats((c) => (c.includes(f.key) ? c.filter((k) => k !== f.key) : [...c, f.key]))}
                    className={chip(feats.includes(f.key))}
                  >
                    {t(`feat.${f.key}`)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold">{t("calc.timeline")}</p>
              <div className="flex gap-2">
                <button onClick={() => setRush(false)} className={chip(!rush)}>
                  {t("time.standard")}
                </button>
                <button onClick={() => setRush(true)} className={chip(rush)}>
                  {t("time.rush")}
                </button>
              </div>
            </div>
          </div>

          <div className="orbit-border flex flex-col justify-between p-8" dir="ltr">
            <div>
              <p className="text-sm text-muted">{t("calc.estimate")}</p>
              <p className="mt-2 whitespace-nowrap font-display text-3xl font-extrabold text-accent sm:text-4xl">
                <AnimatedNumber value={min} prefix="$" />
                <span className="text-text"> – </span>
                <AnimatedNumber value={max} prefix="$" />
              </p>
              <p className="mt-6 text-sm text-muted">{t("calc.time")}</p>
              <p className="font-display text-3xl font-bold">
                ~{weeks} {t("calc.weeks")}
              </p>
            </div>
            <div className="mt-8">
              <Magnetic className="block">
                <a
                  href="#contact"
                  onClick={() =>
                    prefillStore.set(
                      `Hi! My project estimate: ${tp.key} · ${pages} pages · ${feats.join(", ") || "no extras"} · ${rush ? "rush" : "standard"} timeline → $${min.toLocaleString("en-US")}–$${max.toLocaleString("en-US")}, ~${weeks} weeks. Let's discuss: `,
                    )
                  }
                  className="block rounded-full bg-accent py-3 text-center font-semibold text-[#04120a] transition hover:brightness-110"
                >
                  {t("calc.send")}
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
