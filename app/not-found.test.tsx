import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound, { metadata } from './not-found';

describe('NotFound', () => {
  it('explains the page is missing', () => {
    render(<NotFound />);
    expect(screen.getByRole('heading', { level: 1, name: "This page doesn't exist" })).toBeInTheDocument();
  });

  it('offers ways back to the home page, projects, and contact', () => {
    render(<NotFound />);
    expect(screen.getByRole('link', { name: /Back to home/ })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'View projects' })).toHaveAttribute('href', '/projects');
    expect(screen.getByRole('link', { name: 'Get in touch' })).toHaveAttribute('href', '/#contact');
  });

  it('sets a descriptive page title', () => {
    expect(metadata.title).toBe('Page not found');
  });
});
