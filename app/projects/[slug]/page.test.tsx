import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { projects } from '@/lib/data/projects';

vi.mock('next/image', () => ({
  default: ({ fill, ...rest }: Record<string, unknown>) => <img {...(rest as Record<string, unknown>)} />,
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
  it('uses the project name as the title', () => {
    const metadata = generateMetadata({ params: { slug: 'emporia' } });
    expect(metadata.title).toBe('Emporia');
  });
});

describe('ProjectPage', () => {
  it('renders the problem, contribution, and outcome for a known slug', () => {
    render(<ProjectPage params={{ slug: 'emporia' }} />);
    const emporia = projects.find((project) => project.slug === 'emporia')!;
    expect(screen.getByText(emporia.caseStudy.problem)).toBeInTheDocument();
    expect(screen.getByText(emporia.caseStudy.contribution)).toBeInTheDocument();
    expect(screen.getByText(emporia.caseStudy.outcome)).toBeInTheDocument();
  });

  it('shows a "View live" link when liveUrl is set', () => {
    render(<ProjectPage params={{ slug: 'emporia' }} />);
    expect(screen.getByRole('link', { name: 'View live' })).toHaveAttribute('href', 'https://emporia.bcc.gov.bd/');
  });

  it('shows a "View code" link only when githubUrl is set', () => {
    render(<ProjectPage params={{ slug: 'mogo' }} />);
    expect(screen.getByRole('link', { name: 'View code' })).toHaveAttribute(
      'href',
      'https://github.com/MD-Moinuddin/Mogo',
    );
  });

  it('calls notFound for an unknown slug', () => {
    expect(() => render(<ProjectPage params={{ slug: 'does-not-exist' }} />)).toThrow('NEXT_NOT_FOUND');
  });
});
