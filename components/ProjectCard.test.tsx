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
  caseStudy: { problem: 'p', contribution: ['c'], outcome: 'o' },
};

describe('ProjectCard', () => {
  it('links to the project case study page', () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByRole('link', { name: /Test Project/ })).toHaveAttribute('href', '/projects/test-project');
  });

  it('shows View code and Live link buttons when both URLs exist', () => {
    render(<ProjectCard project={{ ...project, githubUrl: 'https://github.com/x/y', liveUrl: 'https://example.com' }} />);
    expect(screen.getByRole('link', { name: 'View code' })).toHaveAttribute('href', 'https://github.com/x/y');
    expect(screen.getByRole('link', { name: 'Live link' })).toHaveAttribute('href', 'https://example.com');
  });

  it('shows only Live link when there is no GitHub URL', () => {
    render(<ProjectCard project={{ ...project, liveUrl: 'https://example.com' }} />);
    expect(screen.queryByRole('link', { name: 'View code' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Live link' })).toHaveAttribute('href', 'https://example.com');
  });

  it('shows the project name, summary and stack tags', () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A project used only in tests.')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });
});
