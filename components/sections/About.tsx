import type { ReactNode } from 'react';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { about } from '@/lib/data/about';

const tileClass =
  'rounded-3xl border border-ink/10 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-text hover:shadow-lg hover:shadow-ink/5 dark:border-snow/10 dark:bg-white/[0.03] dark:hover:border-accent dark:hover:shadow-snow/5';

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

const FACT_ICONS: Record<string, ReactNode> = {
  Location: (
    <Icon>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </Icon>
  ),
  Languages: (
    <Icon>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
    </Icon>
  ),
  'Work authorization': (
    <Icon>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </Icon>
  ),
  Availability: (
    <Icon>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </Icon>
  ),
};

export function About() {
  const [lead, ...rest] = about.bio;

  return (
    <section id="about-me" className="mx-auto max-w-4xl px-6 py-8">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] opacity-60">About</h2>
      <RevealOnScroll>
        <div className="mt-8 grid gap-4">
          <div className={`${tileClass} p-6 md:p-8`}>
            <div className="max-w-3xl">
              <p className="text-lg font-medium leading-relaxed">{lead}</p>
              {rest.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-relaxed opacity-80">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            {about.facts.map((fact) => (
              <div key={fact.label} className={`${tileClass} flex items-start gap-3 p-4`}>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-text/10 text-accent-text dark:bg-accent/15 dark:text-accent">
                  {FACT_ICONS[fact.label]}
                </span>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-accent-text dark:text-accent">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-sm leading-snug">{fact.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </RevealOnScroll>
    </section>
  );
}
