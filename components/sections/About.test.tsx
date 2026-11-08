import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { About } from './About';
import { about } from '@/lib/data/about';

describe('About', () => {
  it('renders the section with its heading', () => {
    const { container } = render(<About />);
    expect(container.querySelector('section#about-me')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'About' })).toBeInTheDocument();
  });

  it('no longer repeats the portrait, which now lives in the hero', () => {
    render(<About />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders every bio paragraph', () => {
    render(<About />);
    about.bio.forEach((paragraph) => expect(screen.getByText(paragraph)).toBeInTheDocument());
  });

  it('lists location, languages, work authorization, and availability', () => {
    render(<About />);
    expect(screen.getByText('Bamberg, Germany')).toBeInTheDocument();
    expect(screen.getByText(/English \(C1\)/)).toBeInTheDocument();
    expect(screen.getByText(/Legally authorized to work in Germany/)).toBeInTheDocument();
    expect(screen.getByText(/Can join immediately/)).toBeInTheDocument();
  });
});
