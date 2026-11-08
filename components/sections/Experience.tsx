import { Emphasis } from '@/components/Emphasis';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { formatDuration, formatRange, type ExperienceEntry } from '@/lib/data/experience';
import { initialsFor } from '@/lib/initials';

interface ExperienceProps {
  entries: ExperienceEntry[];
}

const cardClass =
  'rounded-2xl border border-ink/10 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-text hover:shadow-lg hover:shadow-ink/5 dark:border-snow/10 dark:bg-white/[0.03] dark:hover:border-accent dark:hover:shadow-snow/5';

function RoleCard({ entry }: { entry: ExperienceEntry }) {
  const isCurrent = !entry.endDate;
  const duration = formatDuration(entry);

  return (
    <article className={cardClass}>
      <div className="flex flex-wrap items-start gap-x-4 gap-y-2">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-text to-accent text-sm font-bold text-white"
        >
          {initialsFor(entry.company, entry.initials)}
        </span>
        <h3 className="min-w-0 flex-1">
          <span className="block text-lg font-semibold leading-snug">{entry.role}</span>
          <span className="block text-sm font-semibold text-accent-text dark:text-accent">{entry.company}</span>
        </h3>
        <div className="w-full text-xs max-sm:pl-[3.75rem] sm:w-auto sm:text-right">
          <p className="font-semibold">{formatRange(entry)}</p>
          {isCurrent ? (
            <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-accent-text/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent-text dark:bg-accent/15 dark:text-accent">
              <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-text dark:bg-accent" />
              Current role
            </span>
          ) : (
            <p className="mt-0.5 opacity-70">{duration}</p>
          )}
        </div>
      </div>

      <div className="sm:pl-[3.75rem]">
        {entry.tech && entry.tech.length > 0 && (
          <ul aria-label="Technologies" className="mt-3 flex flex-wrap gap-1.5">
            {entry.tech.map((tech) => (
              <li key={tech} className="rounded-full border border-ink/15 px-2.5 py-0.5 text-[11px] dark:border-snow/15">
                {tech}
              </li>
            ))}
          </ul>
        )}
        <ul className="mt-3 max-w-3xl list-disc list-outside space-y-1.5 pl-4 text-sm opacity-85 marker:text-accent-text dark:marker:text-accent">
          {entry.highlights.map((highlight) => (
            <li key={highlight}>
              <Emphasis text={highlight} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function yearRange(entries: ExperienceEntry[]): string {
  const years = entries.flatMap((entry) => [entry.startDate, entry.endDate ?? entry.startDate]).map((d) => Number(d.slice(0, 4)));
  const first = Math.min(...years);
  const last = Math.max(...years);
  return first === last ? `${first}` : `${first}–${last}`;
}

export function Experience({ entries }: ExperienceProps) {
  const recent = entries.filter((entry) => !entry.earlier);
  const earlier = entries.filter((entry) => entry.earlier);
  const nodeClass =
    'absolute -left-[1.95rem] top-6 h-3 w-3 rounded-full border-2 border-accent-text bg-paper dark:border-accent dark:bg-canvas';

  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-8">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] opacity-60">Experience</h2>
      <ol className="relative mt-8 space-y-5 pl-8 before:absolute before:bottom-2 before:left-[0.4rem] before:top-2 before:w-0.5 before:rounded-full before:bg-ink/10 dark:before:bg-snow/10">
        {recent.map((entry) => (
          <li key={`${entry.company}-${entry.startDate}`} className="relative">
            <span
              aria-hidden="true"
              className={`${nodeClass} ${entry.endDate ? '' : '!bg-accent-text ring-4 ring-accent-text/25 dark:!bg-accent dark:ring-accent/25'}`}
            />
            <RevealOnScroll>
              <RoleCard entry={entry} />
            </RevealOnScroll>
          </li>
        ))}
        {earlier.length > 0 && (
          <li className="relative">
            <span aria-hidden="true" className={nodeClass} />
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center gap-3 rounded-2xl border border-dashed border-ink/25 px-5 py-4 text-sm font-semibold text-accent-text transition-colors hover:bg-ink/5 dark:border-snow/25 dark:text-accent dark:hover:bg-snow/5 [&::-webkit-details-marker]:hidden">
                Earlier experience
                <span className="rounded-full bg-accent-text/10 px-2.5 py-0.5 text-[11px] dark:bg-accent/15">
                  {earlier.length} {earlier.length === 1 ? 'role' : 'roles'} · {yearRange(earlier)}
                </span>
                <span aria-hidden="true" className="ml-auto text-lg leading-none group-open:hidden">
                  +
                </span>
                <span aria-hidden="true" className="ml-auto hidden text-lg leading-none group-open:inline">
                  –
                </span>
              </summary>
              <div className="mt-4 space-y-4">
                {earlier.map((entry) => (
                  <RoleCard key={`${entry.company}-${entry.startDate}`} entry={entry} />
                ))}
              </div>
            </details>
          </li>
        )}
      </ol>
    </section>
  );
}
