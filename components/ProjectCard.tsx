import Link from 'next/link';
import type { Project } from '@/lib/data/projects';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="border-t border-ink/10 py-6 first:border-t-0 dark:border-snow/10">
      <Link href={`/projects/${project.slug}`} className="group flex items-baseline justify-between gap-4">
        <span>
          <span className="block text-lg font-semibold group-hover:underline">{project.name}</span>
          <span className="mt-1 block text-sm opacity-60">{project.stack.join(' · ')}</span>
        </span>
        <span aria-hidden="true" className="opacity-40">→</span>
      </Link>
    </article>
  );
}
