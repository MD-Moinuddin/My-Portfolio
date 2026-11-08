import type { Project } from '@/lib/data/projects';

const NEW_TAB = <span className="sr-only"> (opens in a new tab)</span>;

export function ProjectLinks({ project }: { project: Pick<Project, 'liveUrl' | 'liveLabel' | 'githubUrl'> }) {
  if (!project.liveUrl && !project.githubUrl) return null;

  return (
    <div className="flex flex-wrap gap-4 text-sm">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-ink px-5 py-2 font-semibold text-paper transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/10 dark:bg-snow dark:text-canvas dark:hover:shadow-snow/10"
        >
          {project.liveLabel ?? 'View live'}
          {NEW_TAB}
        </a>
      )}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-ink/30 px-5 py-2 transition-colors hover:bg-ink/5 dark:border-snow/30 dark:hover:bg-snow/5"
        >
          View code
          {NEW_TAB}
        </a>
      )}
    </div>
  );
}
