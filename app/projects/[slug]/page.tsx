import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProjectBySlug, projects } from '@/lib/data/projects';
import { site } from '@/lib/site';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    openGraph: {
      title: `${project.name} - ${site.name}`,
      description: project.summary,
      images: [project.coverImage],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-text dark:text-accent">
        {project.stack.join(' · ')}
      </p>
      <h1 className="mt-3 text-3xl font-bold">{project.name}</h1>
      <p className="mt-2 text-lg opacity-70">{project.title}</p>

      <div className="relative mt-8 aspect-video overflow-hidden rounded-lg">
        <Image
          src={project.coverImage}
          alt={`${project.name} screenshot`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 672px"
          className="object-cover"
        />
      </div>

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide opacity-60">Problem</h2>
          <p className="mt-2 leading-relaxed">{project.caseStudy.problem}</p>
        </section>
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide opacity-60">My Contribution</h2>
          <ul className="mt-2 list-disc list-outside space-y-1.5 pl-4 leading-relaxed marker:text-accent-text dark:marker:text-accent">
            {project.caseStudy.contribution.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide opacity-60">Outcome</h2>
          <p className="mt-2 leading-relaxed">{project.caseStudy.outcome}</p>
        </section>
      </div>

      <div className="mt-10 flex gap-4 text-sm">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-ink px-5 py-2 font-semibold text-paper dark:bg-snow dark:text-canvas"
          >
            View live
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-ink/30 px-5 py-2 dark:border-snow/30">
            View code
          </a>
        )}
      </div>
    </article>
  );
}
