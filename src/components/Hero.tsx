"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { codeLines, techStack, profile } from "@/data/site";
import { useT } from "@/i18n/useT";
import { loaderState } from "@/lib/shared";
import { useMediaQuery } from "@/lib/useMediaQuery";
import Magnetic from "./Magnetic";

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  const { t } = useT();
  // the 3D orb is desktop-only: it is a faint backdrop on phones and costs ~700ms of main-thread time
  const desktop = useMediaQuery("(min-width: 1024px)");
  // wait for the intro loader only on the first load
  const base = loaderState.played ? 0.15 : 1.0;
  const words = t("hero.headline").split(" ");

  return (
    <section id="home" className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-28">
      <div className="grid-bg absolute inset-0" />
      <div className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-accent/15 blur-[130px]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[58%] opacity-60">
        {desktop && <Hero3D />}
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: base } } }}
        className="relative mx-auto flex max-w-5xl flex-col items-center px-5 text-center"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-text/[0.03] px-4 py-1.5 font-mono text-xs text-muted"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          {t("hero.badge")}
        </motion.span>

        <h1 className="mt-8 font-display text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-7xl lg:text-8xl">
          {words.map((w, i) => (
            <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-2 align-bottom">
              <motion.span
                className={`inline-block ${i >= words.length - 2 ? "text-accent" : ""}`}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: base + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}&nbsp;
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p variants={item} className="mt-6 max-w-2xl text-lg text-muted">
          {t("hero.sub")}
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <a
              href="#work"
              className="block rounded-full bg-accent px-7 py-3.5 font-semibold text-[#04120a] transition hover:brightness-110"
            >
              {t("hero.view")}
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="block rounded-full border border-line px-7 py-3.5 font-semibold transition hover:border-accent hover:text-accent"
            >
              {t("hero.talk")}
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={profile.cv}
              download
              className="block rounded-full px-5 py-3.5 font-semibold text-muted transition hover:text-accent"
            >
              ↓ {t("cta.cv")}
            </a>
          </Magnetic>
        </motion.div>

        {/* code card */}
        <motion.div variants={item} className="orbit-border mt-14 w-full max-w-xl p-5 text-left" dir="ltr">
          <div className="mb-4 flex gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
            <span className="h-3 w-3 rounded-full bg-accent/80" />
          </div>
          <pre className="font-mono text-sm leading-7 sm:text-[15px]">
            {codeLines.map((l, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: base + 1.1 + i * 0.25 }}
              >
                <span className="text-accent">{l.k}</span>
                <span className="text-text/90">{l.rest}</span>
                <span className="text-code">{l.s}</span>
                <span className="text-text/90">{l.tail}</span>
                {i === codeLines.length - 1 && <span className="caret text-accent"> ▍</span>}
              </motion.div>
            ))}
          </pre>
        </motion.div>
      </motion.div>

      {/* tech marquee */}
      <div
        dir="ltr"
        className="relative mt-20 overflow-hidden border-y border-line py-5 [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]"
      >
        <div className="marquee-track flex w-max gap-12">
          {[...techStack, ...techStack].map((tech, i) => (
            <span key={i} className="flex items-center gap-12 font-display text-xl font-semibold text-muted">
              {tech}
              <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
