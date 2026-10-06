import Link from 'next/link';
import { ProjectCard } from '@/components/ProjectCard';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import type { Project } from '@/lib/data/projects';

interface ProjectsPreviewProps {
  projects: Project[];
  limit?: number;
}

export function ProjectsPreview({ projects, limit = 4 }: ProjectsPreviewProps) {
  const visible = projects.slice(0, limit);
  return (
    <section id="projects" className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] opacity-60">Selected projects</h2>
        <Link href="/projects" className="text-sm underline">
          See all
        </Link>
      </div>
      <div className="mt-6">
        {visible.map((project) => (
          <RevealOnScroll key={project.slug}>
            <ProjectCard project={project} />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
