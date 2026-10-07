import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 font-display text-5xl font-extrabold sm:text-7xl">Page not found</h1>
      <p className="mt-4 text-muted">The page you&apos;re looking for doesn&apos;t exist or was moved.</p>
      <Link href="/" className="mt-8 rounded-full bg-accent px-7 py-3.5 font-semibold text-[#04120a]">
        Back home
      </Link>
    </main>
  );
}
