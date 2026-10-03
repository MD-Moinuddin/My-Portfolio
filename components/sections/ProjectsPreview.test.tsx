import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectsPreview } from './ProjectsPreview';
import type { Project } from '@/lib/data/projects';

function makeProject(slug: string): Project {
  return {
    slug,
    name: slug,
    title: slug,
    summary: slug,
    stack: ['React'],
    coverImage: '/images/projects/test.png',
    caseStudy: { problem: 'p', contribution: 'c', outcome: 'o' },
  };
}

const sixProjects = ['a', 'b', 'c', 'd', 'e', 'f'].map(makeProject);

describe('ProjectsPreview', () => {
  it('shows only the first 4 projects by default', () => {
    render(<ProjectsPreview projects={sixProjects} />);
    expect(screen.getAllByRole('article')).toHaveLength(4);
  });

  it('links to the full projects list', () => {
    render(<ProjectsPreview projects={sixProjects} />);
    expect(screen.getByRole('link', { name: 'See all' })).toHaveAttribute('href', '/projects');
  });
});
