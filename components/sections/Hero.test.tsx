import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';
import { site } from '@/lib/site';

describe('Hero', () => {
  it('renders the name, role, and description', () => {
    render(<Hero name="Jane Doe" role="Test Engineer" description="A description." />);
    expect(screen.getByRole('heading', { level: 1, name: 'Jane Doe' })).toBeInTheDocument();
    expect(screen.getByText('Test Engineer')).toBeInTheDocument();
    expect(screen.getByText('A description.')).toBeInTheDocument();
  });

  it('links to projects and to LinkedIn and GitHub via icon links', () => {
    render(<Hero name="Jane Doe" role="Test Engineer" description="A description." />);
    expect(screen.getByRole('link', { name: 'View projects' })).toHaveAttribute('href', '#projects');
    expect(screen.queryByRole('link', { name: 'Contact' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', site.social.linkedin);
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', site.social.github);
  });

  it('renders the availability badge when provided', () => {
    render(
      <Hero name="Jane Doe" role="Test Engineer" description="A description." availability="Open to new roles" />,
    );
    expect(screen.getByText('Open to new roles')).toBeInTheDocument();
  });

  it('omits the availability badge when not provided', () => {
    render(<Hero name="Jane Doe" role="Test Engineer" description="A description." />);
    expect(screen.queryByText(/Open to/)).not.toBeInTheDocument();
  });
});
