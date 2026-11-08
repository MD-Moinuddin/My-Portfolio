import { RevealOnScroll } from '@/components/RevealOnScroll';
import Link from 'next/link';
import { formatRange, type EducationEntry } from '@/lib/data/education';
import { initialsFor } from '@/lib/initials';

interface EducationProps {
  entries: EducationEntry[];
}

export function Education({ entries }: EducationProps) {
  return (
    <section id="education" className="mx-auto max-w-4xl px-6 py-8">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] opacity-60">Education</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {entries.map((entry) => (
          <RevealOnScroll key={`${entry.institution}-${entry.startDate}`}>
            <article className="flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-text hover:shadow-lg hover:shadow-ink/5 dark:border-snow/10 dark:bg-white/[0.03] dark:hover:border-accent dark:hover:shadow-snow/5">
              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-text to-accent text-sm font-bold text-white"
                >
                  {initialsFor(entry.institution, entry.initials)}
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold leading-snug">{entry.institution}</h3>
                  <p className="mt-0.5 text-sm font-medium text-accent-text dark:text-accent">{entry.degree}</p>
                  <p className="mt-1 text-xs opacity-60">
                    {formatRange(entry)} · {entry.location}
                  </p>
                </div>
              </div>

              {(entry.grade || entry.thesisGrade) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.grade && (
                    <span className="rounded-full bg-accent-text/10 px-3 py-0.5 text-xs font-semibold text-accent-text dark:bg-accent/15 dark:text-accent">
                      {entry.grade}
                    </span>
                  )}
                  {entry.thesisGrade && (
                    <span className="rounded-full bg-accent-text/10 px-3 py-0.5 text-xs font-semibold text-accent-text dark:bg-accent/15 dark:text-accent">
                      {entry.thesisGrade}
                    </span>
                  )}
                </div>
              )}

              {entry.subjects && entry.subjects.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide opacity-60">Subjects</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {entry.subjects.map((subject) => (
                      <li key={subject} className="rounded-md bg-ink/5 px-2.5 py-1 text-xs dark:bg-snow/10">
                        {subject}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {entry.highlights && entry.highlights.length > 0 && (
                <ul className="mt-4 list-disc list-outside space-y-1.5 pl-4 text-sm opacity-80 marker:text-accent-text dark:marker:text-accent">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              )}

              {entry.link && (
                <Link
                  href={entry.link.href}
                  className="mt-auto inline-block pt-4 text-sm font-semibold text-accent-text hover:underline dark:text-accent"
                >
                  {entry.link.label} <span aria-hidden="true">→</span>
                </Link>
              )}
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
