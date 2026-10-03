import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

// Framer Motion reads the reduced-motion media query once, into module-level state, so
// stubbing window.matchMedia per test is too late. Stub the hook itself instead and leave
// the rest of the library (motion.div) real.
const { reducedMotion } = vi.hoisted(() => ({ reducedMotion: { current: false } }));

vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof import('framer-motion')>();
  return { ...actual, useReducedMotion: () => reducedMotion.current };
});

import { RevealOnScroll } from './RevealOnScroll';

beforeEach(() => {
  reducedMotion.current = false;
});

describe('RevealOnScroll', () => {
  it('renders its children', () => {
    render(
      <RevealOnScroll>
        <p>reveal me</p>
      </RevealOnScroll>,
    );
    expect(screen.getByText('reveal me')).toBeInTheDocument();
  });

  it('starts hidden so the reveal animation has something to animate from', () => {
    const { container } = render(
      <RevealOnScroll>
        <p>reveal me</p>
      </RevealOnScroll>,
    );
    expect((container.firstElementChild as HTMLElement).getAttribute('style')).toContain('opacity: 0');
  });

  it('renders children with no hidden initial state when reduced motion is preferred', () => {
    reducedMotion.current = true;
    const { container } = render(
      <RevealOnScroll>
        <p>reveal me</p>
      </RevealOnScroll>,
    );
    expect(screen.getByText('reveal me')).toBeInTheDocument();
    expect((container.firstElementChild as HTMLElement).getAttribute('style')).toBeNull();
  });
});
