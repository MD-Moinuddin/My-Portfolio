import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ThesisPage, { metadata } from './page';

describe('ThesisPage', () => {
  it('renders the thesis title and overview', () => {
    render(<ThesisPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Gumti' })).toBeInTheDocument();
    expect(screen.getAllByText(/TARA/).length).toBeGreaterThan(0);
  });

  it('sets the page title to "Master Thesis"', () => {
    expect(metadata.title).toBe('Master Thesis');
  });
});
