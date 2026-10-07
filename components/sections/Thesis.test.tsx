import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Thesis } from './Thesis';

describe('Thesis', () => {
  it('renders the thesis section with its title and key results', () => {
    const { container } = render(<Thesis />);
    expect(container.querySelector('section#thesis')).toBeInTheDocument();
    expect(screen.getByRole('heading', {
        level: 3,
        name: 'Adapting Stream-Based State-Machine Replication to Apache Flink (Gumti)',
      })).toBeInTheDocument();
    expect(screen.getByText('~5,300')).toBeInTheDocument();
  });

  it('makes the title link to the full thesis page so the whole card is clickable', () => {
    render(<Thesis />);
    expect(
      screen.getByRole('link', { name: 'Adapting Stream-Based State-Machine Replication to Apache Flink (Gumti)' }),
    ).toHaveAttribute('href', '/thesis');
  });

  it('links to the full thesis page and the GitHub repository', () => {
    render(<Thesis />);
    expect(screen.getByRole('link', { name: 'Read more' })).toHaveAttribute('href', '/thesis');
    expect(screen.getByRole('link', { name: 'View code' })).toHaveAttribute(
      'href',
      'https://github.com/MD-Moinuddin/Masters-Thesis',
    );
  });
});
