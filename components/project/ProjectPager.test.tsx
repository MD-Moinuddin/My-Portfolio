import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectPager } from './ProjectPager';
import type { Project } from '@/lib/data/projects';

const make = (slug: string, name: string): Project => ({
  slug,
  name,
  title: `${name} title`,
  summary: 's',
  stack: [],
  coverImage: '/images/projects/x.png',
  caseStudy: { problem: 'p', contribution: ['c'], outcome: 'o' },
});

describe('ProjectPager', () => {
  it('links to the previous and next projects with their names and titles', () => {
    render(<ProjectPager previous={make('a', 'Alpha')} next={make('c', 'Gamma')} />);
    expect(screen.getByRole('link', { name: /Previous project.*Alpha/ })).toHaveAttribute('href', '/projects/a');
    expect(screen.getByRole('link', { name: /Next project.*Gamma/ })).toHaveAttribute('href', '/projects/c');
    expect(screen.getByText('Alpha title')).toBeInTheDocument();
  });

  it('works with only one neighbour', () => {
    render(<ProjectPager next={make('c', 'Gamma')} />);
    expect(screen.getAllByRole('link')).toHaveLength(1);
  });

  it('renders nothing when there are no neighbours', () => {
    const { container } = render(<ProjectPager />);
    expect(container).toBeEmptyDOMElement();
  });
});
