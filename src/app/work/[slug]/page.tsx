import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title} — Case study`,
    description: p.summary,
    openGraph: { images: [p.image] },
  };
}

export default async function CaseStudy(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = projects.findIndex((x) => x.slug === slug);
  const next = projects[(i + 1) % projects.length];
  const meta = [
    ["Client", p.client],
    ["Role", p.role],
    ["Year", p.year],
    ["Category", p.category],
  ];

  return (
    <main className="relative z-10 mx-auto max-w-5xl px-5 pb-24 pt-32">
      <Link href="/#work" className="text-sm text-muted transition hover:text-accent">
        ← Back to work
      </Link>

      <Reveal>
        <span className="mt-8 block font-mono text-xs uppercase tracking-[0.25em] text-accent">Case study</span>
        <h1 className="mt-3 font-display text-5xl font-extrabold tracking-tight sm:text-7xl">{p.title}</h1>
        <p className="mt-5 max-w-2xl text-xl text-muted">{p.summary}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-line">
          <Image src={p.image} alt={p.title} fill priority sizes="1000px" className="object-cover" />
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <dl className="mt-8 grid grid-cols-2 gap-6 border-y border-line py-6 sm:grid-cols-4">
          {meta.map(([k, v]) => (
            <div key={k}>
              <dt className="font-mono text-xs uppercase tracking-widest text-muted">{k}</dt>
              <dd className="mt-1 font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <div className="mt-16 grid gap-12 md:grid-cols-2">
        <Reveal>
          <h2 className="font-display text-3xl font-bold">The problem</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{p.problem}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-3xl font-bold">The solution</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{p.solution}</p>
        </Reveal>
      </div>

      <h2 className="mt-20 font-display text-3xl font-bold">Results</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {p.results.map((r, k) => (
          <Reveal key={r.label} delay={k * 0.1}>
            <TiltCard>
              <div className="rounded-3xl border border-line bg-panel p-8">
                <p className="font-display text-5xl font-extrabold text-accent">{r.value}</p>
                <p className="mt-2 text-sm text-muted">{r.label}</p>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <h2 className="mt-20 font-display text-3xl font-bold">Tech stack</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span key={s} className="rounded-full border border-line px-4 py-2 text-sm text-muted">
              {s}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <div className="orbit-border mt-20 flex flex-wrap items-center justify-between gap-6 p-8 sm:p-10">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Want a result like this?</h2>
            <p className="mt-1 text-muted">Let&apos;s talk about your project.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line px-6 py-3 font-semibold transition hover:border-accent hover:text-accent"
            >
              Visit live site ↗
            </a>
            <Link href="/#contact" className="rounded-full bg-accent px-6 py-3 font-semibold text-[#04120a]">
              Start a project
            </Link>
          </div>
        </div>
      </Reveal>

      <Link
        href={`/work/${next.slug}`}
        className="group mt-16 flex items-center justify-between gap-6 rounded-3xl border border-line p-8 transition hover:border-accent/60"
      >
        <span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted">Next project</span>
          <span className="mt-1 block font-display text-3xl font-bold transition group-hover:text-accent">{next.title}</span>
        </span>
        <span className="text-3xl transition group-hover:translate-x-2">→</span>
      </Link>
    </main>
  );
}
