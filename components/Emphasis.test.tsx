import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Emphasis } from './Emphasis';

describe('Emphasis', () => {
  it('renders plain text as is', () => {
    const { container } = render(<Emphasis text="Nothing special here." />);
    expect(container.textContent).toBe('Nothing special here.');
    expect(container.querySelector('strong')).toBeNull();
  });

  it('emphasises phrases wrapped in double asterisks and drops the markers', () => {
    const { container } = render(<Emphasis text="Cut load time by **33%** and shipped **8** jobs." />);
    expect(screen.getByText('33%').tagName).toBe('STRONG');
    expect(screen.getByText('8').tagName).toBe('STRONG');
    expect(container.textContent).toBe('Cut load time by 33% and shipped 8 jobs.');
  });
});
