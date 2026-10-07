import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/data/projects';

const outlineButton =
  'rounded-full border border-ink/30 px-5 py-2 transition-colors hover:bg-ink/5 dark:border-snow/30 dark:hover:bg-snow/5';
const filledButton =
  'rounded-full border border-ink bg-ink px-5 py-2 font-semibold text-paper dark:border-snow dark:bg-snow dark:text-canvas';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full gap-4 overflow-hidden rounded-2xl p-4 sm:gap-5 sm:p-5 border border-ink/10 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-text hover:shadow-lg hover:shadow-ink/5 dark:border-snow/10 dark:bg-white/[0.03] dark:hover:border-accent dark:hover:shadow-snow/5">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-ink/5 sm:h-32 sm:w-32 dark:bg-snow/5">
        <Image
          src={project.coverImage}
          alt=""
          fill
          sizes="128px"
          className="object-contain"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-lg font-semibold">
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 group-hover:underline">
            {project.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed opacity-75">{project.summary}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full bg-accent-text/10 px-2.5 py-0.5 text-xs text-accent-text dark:bg-accent/15 dark:text-accent"
            >
              {tech}
            </li>
          ))}
        </ul>
        {(project.githubUrl || project.liveUrl) && (
          <div className="relative mt-auto flex flex-wrap gap-3 pt-4 text-sm">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={outlineButton}>
                View code
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={filledButton}>
                Live link
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
