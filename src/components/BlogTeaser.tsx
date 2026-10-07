"use client";

import Image from "next/image";
import Link from "next/link";
import { posts } from "@/data/extra";
import { useT } from "@/i18n/useT";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function BlogTeaser() {
  const { t } = useT();
  return (
    <section className="mx-auto max-w-6xl px-5 py-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow={t("blog.eyebrow")} title={t("blog.title")} />
        <Link href="/blog" className="text-sm font-semibold text-accent hover:underline">
          {t("blog.all")} →
        </Link>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.1}>
            <Link
              href={`/blog/${p.slug}`}
              className="group block overflow-hidden rounded-3xl border border-line bg-panel transition hover:-translate-y-1 hover:border-accent/50"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={p.image} alt={p.title} fill sizes="400px" className="object-cover transition duration-700 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <span className="font-mono text-xs uppercase tracking-widest text-accent">{p.tag}</span>
                <h3 className="mt-2 font-display text-xl font-bold leading-snug">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">
                  {p.minutes} {t("blog.min")}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
