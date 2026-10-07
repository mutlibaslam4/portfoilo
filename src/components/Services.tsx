"use client";

import { motion } from "framer-motion";
import { services } from "@/data/site";
import { useT } from "@/i18n/useT";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";

export default function Services() {
  const { t } = useT();
  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-28">
      <SectionHeading eyebrow={t("services.eyebrow")} title={t("services.title")} />

      <div className="mt-14 grid gap-4 md:grid-cols-4">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
            className={s.span}
          >
            <TiltCard className="h-full">
              <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-panel p-7">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/0 blur-3xl transition duration-500 group-hover:bg-accent/30" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-2xl text-accent">
                  {s.icon}
                </div>
                <h3 className="relative mt-6 font-display text-xl font-bold">{t(`svc${i + 1}.t`, s.title)}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted">{t(`svc${i + 1}.x`, s.text)}</p>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
