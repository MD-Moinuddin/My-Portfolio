import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ProjectGallery } from '@/components/project/ProjectGallery';
import { ProjectLinks } from '@/components/project/ProjectLinks';
import { ProjectPager } from '@/components/project/ProjectPager';
import { getAdjacentProjects, getProjectBySlug, projects } from '@/lib/data/projects';
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
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} - ${site.name}`,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(project.slug);

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/projects" className="text-sm opacity-70 transition-opacity hover:opacity-100">
        <span aria-hidden="true">← </span>All projects
      </Link>
      <h1 className="mt-6 text-3xl font-bold">{project.name}</h1>
      <p className="mt-2 text-lg opacity-70">{project.title}</p>

      <ul aria-label="Tech stack" className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-full bg-accent-text/10 px-2.5 py-0.5 text-xs text-accent-text dark:bg-accent/15 dark:text-accent"
          >
            {tech}
          </li>
        ))}
      </ul>
      {project.facts && project.facts.length > 0 && (
        <ul aria-label="Project facts" className="mt-3 flex flex-wrap gap-2">
          {project.facts.map((fact) => (
            <li key={fact} className="rounded-full border border-ink/15 px-3 py-0.5 text-xs dark:border-snow/15">
              {fact}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6">
        <ProjectLinks project={project} />
      </div>

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

      {project.stats && project.stats.length > 0 && (
        <dl className="mt-6 grid grid-cols-3 gap-3">
          {project.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse justify-end rounded-xl border border-ink/10 bg-white px-4 py-3 dark:border-snow/10 dark:bg-white/[0.03]"
            >
              <dt className="mt-0.5 text-xs opacity-65">{stat.label}</dt>
              <dd className="text-2xl font-bold text-accent-text dark:text-accent">{stat.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide opacity-60">Problem</h2>
          <p className="mt-2 leading-relaxed">{project.caseStudy.problem}</p>
        </section>
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide opacity-60">My Contribution</h2>
          <ul className="mt-2 list-disc list-outside space-y-2 pl-4 leading-relaxed marker:text-accent-text dark:marker:text-accent">
            {project.caseStudy.contribution.map((item) =>
              typeof item === 'string' ? (
                <li key={item}>{item}</li>
              ) : (
                <li key={item.label}>
                  <strong className="font-semibold">{item.label}:</strong> {item.text}
                </li>
              ),
            )}
          </ul>
        </section>
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide opacity-60">Outcome</h2>
          <p className="mt-2 leading-relaxed">{project.caseStudy.outcome}</p>
        </section>
        <ProjectGallery screenshots={project.screenshots} />
      </div>

      <div className="mt-10">
        <ProjectLinks project={project} />
      </div>

      <ProjectPager previous={previous} next={next} />
    </article>
  );
}
