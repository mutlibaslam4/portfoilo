"use client";

import { useT } from "@/i18n/useT";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export type GithubData = { repos: number; followers: number; stars: number; live: boolean };

// deterministic sample heat-map (GitHub's REST API has no contribution calendar)
const cells = Array.from({ length: 26 * 7 }, (_, i) => {
  const v = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
  return v < 0.3 ? 0 : v < 0.55 ? 1 : v < 0.78 ? 2 : v < 0.92 ? 3 : 4;
});
const level = ["bg-text/[0.07]", "bg-accent/25", "bg-accent/50", "bg-accent/75", "bg-accent"];

export default function GithubView({ data }: { data: GithubData }) {
  const { t } = useT();
  const items = [
    { v: data.repos, l: t("github.repos") },
    { v: data.followers, l: t("github.followers") },
    { v: data.stars, l: t("github.stars") },
  ];

  return (
    <section className="mx-auto max-w-6xl px-5 py-28">
      <SectionHeading eyebrow={t("github.eyebrow")} title={t("github.title")} />
      <Reveal delay={0.1}>
        <div
          className={`mt-12 grid gap-5 rounded-3xl border border-line bg-panel p-6 sm:p-10 ${data.live ? "" : "lg:grid-cols-[auto_1fr]"}`}
        >
          <div className={`grid grid-cols-3 gap-6 ${data.live ? "" : "lg:grid-cols-1"}`} dir="ltr">
            {items.map((s) => (
              <div key={s.l}>
                <p className="font-display text-4xl font-bold text-accent">{s.v.toLocaleString("en-US")}</p>
                <p className="text-sm text-muted">{s.l}</p>
              </div>
            ))}
          </div>
          {!data.live && (
            <div className="overflow-hidden" dir="ltr">
              <p className="mb-3 font-mono text-xs text-muted">{t("github.sample")}</p>
              <div className="grid grid-flow-col grid-rows-7 gap-1">
                {cells.map((c, i) => (
                  <span key={i} className={`aspect-square min-w-[10px] rounded-[3px] ${level[c]}`} />
                ))}
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
