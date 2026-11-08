import type { ReactNode } from 'react';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { formatUpdated, now, type NowIcon } from '@/lib/data/now';

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      {children}
    </svg>
  );
}

const ICONS: Record<NowIcon, ReactNode> = {
  building: (
    <Icon>
      <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
    </Icon>
  ),
  learning: (
    <Icon>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z" />
    </Icon>
  ),
  looking: (
    <Icon>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </Icon>
  ),
};

export function Now() {
  return (
    <section id="now" className="mx-auto max-w-4xl px-6 py-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] opacity-60">Now</h2>
        <p className="text-xs opacity-60">Updated {formatUpdated(now.updated)}</p>
      </div>
      <p className="mt-3 bg-gradient-to-r from-ink to-accent-text bg-clip-text text-2xl font-bold leading-tight tracking-tight text-transparent sm:text-4xl dark:from-snow dark:to-accent">
        What I&apos;m up to right now
      </p>
      <div
        aria-hidden="true"
        className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-accent-text to-accent dark:from-accent dark:to-accent-text"
      />
      <RevealOnScroll>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {now.items.map((item) => (
            <li
              key={item.label}
              className="rounded-2xl border border-ink/10 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-text hover:shadow-lg hover:shadow-ink/5 dark:border-snow/10 dark:bg-white/[0.03] dark:hover:border-accent dark:hover:shadow-snow/5"
            >
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-text/10 text-accent-text dark:bg-accent/15 dark:text-accent">
                {ICONS[item.icon]}
              </span>
              <p className="text-xs font-bold uppercase tracking-wider text-accent-text dark:text-accent">{item.label}</p>
              <h3 className="mt-0.5 text-lg font-semibold leading-snug">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed opacity-75">{item.text}</p>
            </li>
          ))}
        </ul>
      </RevealOnScroll>
    </section>
  );
}
