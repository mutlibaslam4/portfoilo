import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { getPost, posts } from "@/data/extra";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    openGraph: { type: "article", publishedTime: p.date, images: [p.image] },
  };
}

export default async function Post(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="relative z-10 mx-auto max-w-3xl px-5 pb-24 pt-32">
      <Link href="/blog" className="text-sm text-muted transition hover:text-accent">
        ← All articles
      </Link>

      <Reveal>
        <span className="mt-8 block font-mono text-xs uppercase tracking-widest text-accent">{post.tag}</span>
        <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{post.title}</h1>
        <p className="mt-4 text-sm text-muted">
          {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} · {post.minutes} min read
        </p>
      </Reveal>

      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-line">
        <Image src={post.image} alt={post.title} fill priority sizes="800px" className="object-cover" />
      </div>

      <article className="prose-lite mt-10">
        {post.content.map((b, i) => {
          if (b.type === "h") return <h2 key={i}>{b.text}</h2>;
          if (b.type === "ul")
            return (
              <ul key={i}>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            );
          if (b.type === "code")
            return (
              <pre key={i}>
                <code>{b.text}</code>
              </pre>
            );
          return <p key={i}>{b.text}</p>;
        })}
      </article>

      <div className="orbit-border mt-16 flex flex-wrap items-center justify-between gap-4 p-8">
        <p className="font-display text-xl font-bold">Need help with your website?</p>
        <Link href="/#contact" className="rounded-full bg-accent px-6 py-3 font-semibold text-[#04120a]">
          Let&apos;s talk
        </Link>
      </div>
    </main>
  );
}
