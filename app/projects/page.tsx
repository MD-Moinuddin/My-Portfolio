import type { Metadata } from 'next';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/lib/data/projects';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Projects',
  alternates: { canonical: '/projects' },
  description: `Case studies from ${site.name}'s recent work.`,
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold">Projects</h1>
      <div className="mt-8 grid gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
