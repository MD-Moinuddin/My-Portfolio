import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { projects } from '@/lib/data/projects';

vi.mock('next/image', () => ({
  default: ({ alt, src, className }: { alt: string; src: string; className?: string }) => (
    // eslint-disable-next-line @next/next/no-img-element -- test stub for next/image
    <img alt={alt} src={src} className={className} />
  ),
}));

vi.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('NEXT_NOT_FOUND');
  },
}));

import ProjectPage, { generateStaticParams, generateMetadata } from './page';

describe('generateStaticParams', () => {
  it('returns a param entry for every project', () => {
    const params = generateStaticParams();
    expect(params).toHaveLength(projects.length);
    expect(params).toContainEqual({ slug: 'emporia' });
  });
});

describe('generateMetadata', () => {
  it('uses the project name as the title', async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'emporia' }) });
    expect(metadata.title).toBe('Emporia');
  });

  it('returns empty metadata for an unknown slug', async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'does-not-exist' }) });
    expect(metadata).toEqual({});
  });
});

describe('ProjectPage', () => {
  it('renders the problem, contribution, and outcome for a known slug', async () => {
    render(await ProjectPage({ params: Promise.resolve({ slug: 'emporia' }) }));
    const emporia = projects.find((project) => project.slug === 'emporia')!;
    expect(screen.getByText(emporia.caseStudy.problem)).toBeInTheDocument();
    expect(screen.getByText(emporia.caseStudy.contribution)).toBeInTheDocument();
    expect(screen.getByText(emporia.caseStudy.outcome)).toBeInTheDocument();
  });

  it('shows a "View live" link when liveUrl is set', async () => {
    render(await ProjectPage({ params: Promise.resolve({ slug: 'emporia' }) }));
    expect(screen.getByRole('link', { name: 'View live' })).toHaveAttribute('href', 'https://emporia.bcc.gov.bd/');
  });

  it('shows a "View code" link when githubUrl is set', async () => {
    render(await ProjectPage({ params: Promise.resolve({ slug: 'mogo' }) }));
    expect(screen.getByRole('link', { name: 'View code' })).toHaveAttribute(
      'href',
      'https://github.com/MD-Moinuddin/Mogo',
    );
  });

  it('omits the "View code" link when githubUrl is absent', async () => {
    render(await ProjectPage({ params: Promise.resolve({ slug: 'emporia' }) }));
    expect(screen.queryByRole('link', { name: 'View code' })).toBeNull();
  });

  it('calls notFound for an unknown slug', async () => {
    await expect(ProjectPage({ params: Promise.resolve({ slug: 'does-not-exist' }) })).rejects.toThrow(
      'NEXT_NOT_FOUND',
    );
  });
});
