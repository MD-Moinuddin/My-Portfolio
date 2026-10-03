import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProjectsPage, { metadata } from './page';
import { projects } from '@/lib/data/projects';

describe('ProjectsPage', () => {
  it('renders a card for every project', () => {
    render(<ProjectsPage />);
    expect(screen.getAllByRole('article')).toHaveLength(projects.length);
  });

  it('sets the page title to "Projects"', () => {
    expect(metadata.title).toBe('Projects');
  });
});
