import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-text dark:text-accent">Error 404</p>
      <h1 className="mt-3 bg-gradient-to-r from-ink to-accent-text bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-6xl dark:from-snow dark:to-accent">
        This page doesn&apos;t exist
      </h1>
      <div
        aria-hidden="true"
        className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-accent-text to-accent dark:from-accent dark:to-accent-text"
      />
      <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed opacity-80">
        The link may be broken, or the page may have moved. Here are a few places to go instead.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-semibold text-paper transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/10 dark:bg-snow dark:text-canvas dark:hover:shadow-snow/10"
        >
          Back to home
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
        <Link
          href="/projects"
          className="rounded-full border border-ink/30 px-5 py-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/60 hover:bg-ink/5 dark:border-snow/30 dark:hover:border-snow/60 dark:hover:bg-snow/5"
        >
          View projects
        </Link>
        <Link href="/#contact" className="underline">
          Get in touch
        </Link>
      </div>
    </section>
  );
}
