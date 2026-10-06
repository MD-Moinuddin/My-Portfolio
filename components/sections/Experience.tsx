import { RevealOnScroll } from '@/components/RevealOnScroll';
import { formatRange, type ExperienceEntry } from '@/lib/data/experience';

interface ExperienceProps {
  entries: ExperienceEntry[];
}

export function Experience({ entries }: ExperienceProps) {
  return (
    <section id="experience" className="mx-auto max-w-3xl px-6 py-8">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] opacity-60">Experience</h2>
      <ol className="mt-8 space-y-10 border-l border-ink/10 pl-6 dark:border-snow/10">
        {entries.map((entry) => (
          <li key={`${entry.company}-${entry.startDate}`}>
            <RevealOnScroll>
              <p className="text-xs opacity-60">{formatRange(entry)}</p>
              <h3 className="mt-1">
                <span className="block text-lg font-semibold">{entry.role}</span>
                <span className="block text-sm font-medium text-accent-text dark:text-accent">
                  {entry.company}
                </span>
              </h3>
              <ul className="mt-2 list-disc list-outside space-y-1.5 pl-4 text-sm opacity-80 marker:text-accent-text dark:marker:text-accent">
                {entry.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </RevealOnScroll>
          </li>
        ))}
      </ol>
    </section>
  );
}
