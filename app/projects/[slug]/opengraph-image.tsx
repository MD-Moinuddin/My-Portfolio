import { getProjectBySlug, projects } from '@/lib/data/projects';
import { ogContentType, ogSize, renderOgImage } from '@/lib/og';
import { site } from '@/lib/site';

export const alt = `Project by ${site.name}`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return renderOgImage({
    eyebrow: 'Project',
    title: project?.name ?? site.name,
    summary: project?.summary ?? site.tagline,
    tags: project?.stack ?? [],
  });
}
