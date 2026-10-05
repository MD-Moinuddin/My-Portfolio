import { RevealOnScroll } from '@/components/RevealOnScroll';
import { formatRange, type EducationEntry } from '@/lib/data/education';

interface EducationProps {
  entries: EducationEntry[];
}

export function Education({ entries }: EducationProps) {
  return (
    <section id="education" className="mx-auto max-w-2xl px-6 py-16">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] opacity-60">Education</h2>
      <ol className="mt-8 space-y-10 border-l border-ink/10 pl-6 dark:border-snow/10">
        {entries.map((entry) => (
          <li key={`${entry.institution}-${entry.startDate}`}>
            <RevealOnScroll>
              <p className="text-xs opacity-60">{formatRange(entry)}</p>
              <h3 className="mt-1 text-lg font-semibold">
                {entry.degree} · {entry.institution}
              </h3>
              {entry.highlights && entry.highlights.length > 0 && (
                <ul className="mt-2 list-disc list-outside space-y-1.5 pl-4 text-sm opacity-80 marker:text-accent-text dark:marker:text-accent">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              )}
            </RevealOnScroll>
          </li>
        ))}
      </ol>
    </section>
  );
}
