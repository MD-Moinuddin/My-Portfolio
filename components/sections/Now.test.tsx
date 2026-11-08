import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Now } from './Now';
import { now } from '@/lib/data/now';

describe('Now', () => {
  it('renders the section with its heading and a last-updated date', () => {
    const { container } = render(<Now />);
    expect(container.querySelector('section#now')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Now' })).toBeInTheDocument();
    expect(screen.getByText('Updated November 2026')).toBeInTheDocument();
  });

  it('renders a tile for every item with its label, title, and text', () => {
    render(<Now />);
    expect(screen.getAllByRole('listitem')).toHaveLength(now.items.length);
    now.items.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: item.title })).toBeInTheDocument();
      expect(screen.getByText(item.text)).toBeInTheDocument();
    });
  });
});
