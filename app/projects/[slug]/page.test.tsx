import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
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

  it('sets the canonical URL to the project page', async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: 'emporia' }) });
    expect(metadata.alternates?.canonical).toBe('/projects/emporia');
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
    emporia.caseStudy.contribution.forEach((item) => {
      expect(screen.getByText(typeof item === 'string' ? item : item.text)).toBeInTheDocument();
    });
    expect(screen.getByText(emporia.caseStudy.outcome)).toBeInTheDocument();
  });

  it('shows "View live" links at the top and the bottom when liveUrl is set', async () => {
    render(await ProjectPage({ params: Promise.resolve({ slug: 'emporia' }) }));
    const links = screen.getAllByRole('link', { name: /View live/ });
    expect(links).toHaveLength(2);
    links.forEach((link) => expect(link).toHaveAttribute('href', 'https://emporia.bcc.gov.bd/'));
  });

  it('shows a "View code" link when githubUrl is set', async () => {
    render(await ProjectPage({ params: Promise.resolve({ slug: 'mogo' }) }));
    const links = screen.getAllByRole('link', { name: /View code/ });
    expect(links).toHaveLength(2);
    links.forEach((link) => expect(link).toHaveAttribute('href', 'https://github.com/MD-Moinuddin/Mogo'));
  });

  it('omits the "View code" link when githubUrl is absent', async () => {
    render(await ProjectPage({ params: Promise.resolve({ slug: 'emporia' }) }));
    expect(screen.queryByRole('link', { name: /View code/ })).toBeNull();
  });

  it('links back to all projects', async () => {
    render(await ProjectPage({ params: Promise.resolve({ slug: 'emporia' }) }));
    expect(screen.getByRole('link', { name: /All projects/ })).toHaveAttribute('href', '/projects');
  });

  it('lists the tech stack as tags', async () => {
    render(await ProjectPage({ params: Promise.resolve({ slug: 'emporia' }) }));
    const emporia = projects.find((project) => project.slug === 'emporia')!;
    const tags = within(screen.getByRole('list', { name: 'Tech stack' })).getAllByRole('listitem');
    expect(tags.map((tag) => tag.textContent)).toEqual(emporia.stack);
  });

  it('uses a custom live-site label, facts, stats, and bold contribution labels when a project has them', async () => {
    render(await ProjectPage({ params: Promise.resolve({ slug: 'life-tracker' }) }));
    expect(screen.getAllByRole('link', { name: /Try the demo/ })).toHaveLength(2);
    expect(screen.queryByRole('link', { name: /View live/ })).toBeNull();
    expect(within(screen.getByRole('list', { name: 'Project facts' })).getByText('Solo project')).toBeInTheDocument();
    expect(screen.getByText('parallel CI jobs')).toBeInTheDocument();
    expect(screen.getByText('Production fix:').tagName).toBe('STRONG');
  });

  it('omits the facts, stats, and screenshots sections when a project has none', async () => {
    render(await ProjectPage({ params: Promise.resolve({ slug: 'emporia' }) }));
    expect(screen.queryByRole('list', { name: 'Project facts' })).toBeNull();
    expect(screen.queryByText('parallel CI jobs')).toBeNull();
    expect(screen.queryByRole('heading', { name: 'Screenshots' })).toBeNull();
  });

  it('offers only a next project on the first project', async () => {
    render(await ProjectPage({ params: Promise.resolve({ slug: projects[0].slug }) }));
    const pager = screen.getByRole('navigation', { name: 'More projects' });
    expect(within(pager).queryByText('Previous project')).toBeNull();
    expect(within(pager).getByRole('link', { name: /Next project/ })).toHaveAttribute(
      'href',
      `/projects/${projects[1].slug}`,
    );
  });

  it('offers both neighbours on a project in the middle of the list', async () => {
    render(await ProjectPage({ params: Promise.resolve({ slug: projects[1].slug }) }));
    const pager = screen.getByRole('navigation', { name: 'More projects' });
    expect(within(pager).getByRole('link', { name: /Previous project/ })).toHaveAttribute(
      'href',
      `/projects/${projects[0].slug}`,
    );
    expect(within(pager).getByRole('link', { name: /Next project/ })).toHaveAttribute(
      'href',
      `/projects/${projects[2].slug}`,
    );
  });

  it('offers only a previous project on the last project', async () => {
    const last = projects[projects.length - 1];
    render(await ProjectPage({ params: Promise.resolve({ slug: last.slug }) }));
    const pager = screen.getByRole('navigation', { name: 'More projects' });
    expect(within(pager).queryByText('Next project')).toBeNull();
    expect(within(pager).getByRole('link', { name: /Previous project/ })).toBeInTheDocument();
  });

  it('calls notFound for an unknown slug', async () => {
    await expect(ProjectPage({ params: Promise.resolve({ slug: 'does-not-exist' }) })).rejects.toThrow(
      'NEXT_NOT_FOUND',
    );
  });
});
