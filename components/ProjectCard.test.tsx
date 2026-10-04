import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectCard } from './ProjectCard';
import type { Project } from '@/lib/data/projects';

const project: Project = {
  slug: 'test-project',
  name: 'Test Project',
  title: 'A Test Project',
  summary: 'A project used only in tests.',
  stack: ['React', 'Next.js'],
  coverImage: '/images/projects/test.png',
  caseStudy: { problem: 'p', contribution: 'c', outcome: 'o' },
};

describe('ProjectCard', () => {
  it('links to the project case study page', () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/projects/test-project');
  });

  it('shows the project name and stack', () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('React · Next.js')).toBeInTheDocument();
  });
});
