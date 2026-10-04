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
});
