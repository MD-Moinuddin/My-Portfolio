import Link from 'next/link';
import type { Project } from '@/lib/data/projects';

const tileClass =
  'group block rounded-2xl border border-ink/10 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-text hover:shadow-lg hover:shadow-ink/5 dark:border-snow/10 dark:bg-white/[0.03] dark:hover:border-accent dark:hover:shadow-snow/5';

function Tile({ project, direction }: { project: Project; direction: 'previous' | 'next' }) {
  const isNext = direction === 'next';
  return (
    <Link
      href={`/projects/${project.slug}`}
      rel={isNext ? 'next' : 'prev'}
      className={`${tileClass} ${isNext ? 'sm:col-start-2 sm:text-right' : ''}`}
    >
      <span className="text-xs font-semibold uppercase tracking-wide text-accent-text dark:text-accent">
        {isNext ? 'Next project' : 'Previous project'}
      </span>
      <span className="mt-1 block text-lg font-semibold group-hover:underline">
        {!isNext && <span aria-hidden="true">← </span>}
        {project.name}
        {isNext && <span aria-hidden="true"> →</span>}
      </span>
      <span className="mt-0.5 block text-sm opacity-65">{project.title}</span>
    </Link>
  );
}

export function ProjectPager({ previous, next }: { previous?: Project; next?: Project }) {
  if (!previous && !next) return null;

  return (
    <nav aria-label="More projects" className="mt-12 grid gap-4 sm:grid-cols-2">
      {previous && <Tile project={previous} direction="previous" />}
      {next && <Tile project={next} direction="next" />}
    </nav>
  );
}
