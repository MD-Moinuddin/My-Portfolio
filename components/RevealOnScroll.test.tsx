import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RevealOnScroll } from './RevealOnScroll';

describe('RevealOnScroll', () => {
  it('renders its children', () => {
    render(
      <RevealOnScroll>
        <p>reveal me</p>
      </RevealOnScroll>,
    );
    expect(screen.getByText('reveal me')).toBeInTheDocument();
  });
});
