import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { posts } from "@/data/extra";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on web development, performance and design.",
};

export default function BlogIndex() {
  return (
    <main className="relative z-10 mx-auto max-w-5xl px-5 pb-24 pt-32">
      <Reveal>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">/ Blog</span>
        <h1 className="mt-3 font-display text-5xl font-extrabold tracking-tight sm:text-6xl">Notes from the build log</h1>
      </Reveal>

      <div className="mt-14 space-y-6">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <Link
              href={`/blog/${p.slug}`}
              className="group grid gap-6 overflow-hidden rounded-3xl border border-line bg-panel transition hover:border-accent/50 md:grid-cols-[300px_1fr]"
            >
              <div className="relative aspect-[16/10] md:aspect-auto">
                <Image src={p.image} alt={p.title} fill sizes="300px" className="object-cover transition duration-700 group-hover:scale-110" />
              </div>
              <div className="p-6 md:py-8 md:pe-8 md:ps-0">
                <span className="font-mono text-xs uppercase tracking-widest text-accent">{p.tag}</span>
                <h2 className="mt-2 font-display text-2xl font-bold leading-snug">{p.title}</h2>
                <p className="mt-2 text-muted">{p.excerpt}</p>
                <p className="mt-4 text-sm text-muted">
                  {new Date(p.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })} · {p.minutes} min read
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
