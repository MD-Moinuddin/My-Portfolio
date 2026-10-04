import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';

describe('Hero', () => {
  it('renders the name, role, and description', () => {
    render(<Hero name="Jane Doe" role="Test Engineer" description="A description." />);
    expect(screen.getByRole('heading', { level: 1, name: 'Jane Doe' })).toBeInTheDocument();
    expect(screen.getByText('Test Engineer')).toBeInTheDocument();
    expect(screen.getByText('A description.')).toBeInTheDocument();
  });

  it('links its CTAs to the projects and contact sections', () => {
    render(<Hero name="Jane Doe" role="Test Engineer" description="A description." />);
    expect(screen.getByRole('link', { name: 'View projects' })).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact');
  });

  it('omits the bio, expertise, and languages blocks when not provided', () => {
    render(<Hero name="Jane Doe" role="Test Engineer" description="A description." />);
    expect(screen.queryByText('Key Expertise')).not.toBeInTheDocument();
  });

  it('renders bio paragraphs, expertise list, and languages when provided', () => {
    render(
      <Hero
        name="Jane Doe"
        role="Test Engineer"
        description="A description."
        bio={['First paragraph.', 'Second paragraph.']}
        expertise={['Frontend Engineering - React, TypeScript']}
        languages="English: C1 · German: A2"
      />,
    );
    expect(screen.getByText('First paragraph.')).toBeInTheDocument();
    expect(screen.getByText('Second paragraph.')).toBeInTheDocument();
    expect(screen.getByText('Key Expertise')).toBeInTheDocument();
    expect(screen.getByText('Frontend Engineering - React, TypeScript')).toBeInTheDocument();
    expect(screen.getByText('English: C1 · German: A2')).toBeInTheDocument();
  });
});
