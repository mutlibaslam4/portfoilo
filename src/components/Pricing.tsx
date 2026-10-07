"use client";

import { plans } from "@/data/extra";
import { useT } from "@/i18n/useT";
import { prefillStore } from "@/lib/shared";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";

export default function Pricing() {
  const { t } = useT();

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-5 py-28">
      <SectionHeading eyebrow={t("pricing.eyebrow")} title={t("pricing.title")} />
      <Reveal delay={0.1}>
        <p className="mt-4 max-w-xl text-muted">{t("pricing.sub")}</p>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {plans.map((p, i) => (
          <Reveal key={p.key} delay={i * 0.1}>
            <TiltCard className="h-full">
              <div
                className={`relative flex h-full flex-col p-8 ${
                  p.popular ? "orbit-border" : "rounded-3xl border border-line bg-panel"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-xs font-bold text-[#04120a]">
                    {t("plan.popular")}
                  </span>
                )}
                <h3 className="font-display text-xl font-bold">{t(`plan.${p.key}`)}</h3>
                <p className="mt-1 text-sm text-muted">{p.blurb}</p>
                <p className="mt-6 text-sm text-muted">{t("plan.from")}</p>
                <p className="font-display text-5xl font-extrabold">
                  ${p.price.toLocaleString("en-US")}
                </p>
                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span className="text-accent">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Magnetic className="block">
                    <a
                      href="#contact"
                      onClick={() =>
                        prefillStore.set(
                          `Hi! I'm interested in the ${p.key[0].toUpperCase() + p.key.slice(1)} package (from $${p.price.toLocaleString("en-US")}). Here's what I need: `,
                        )
                      }
                      className={`block rounded-full py-3 text-center font-semibold transition ${
                        p.popular
                          ? "bg-accent text-[#04120a] hover:brightness-110"
                          : "border border-line hover:border-accent hover:text-accent"
                      }`}
                    >
                      {t("cta.quote")}
                    </a>
                  </Magnetic>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
