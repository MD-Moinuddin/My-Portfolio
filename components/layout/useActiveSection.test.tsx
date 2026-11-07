import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useActiveSection } from './useActiveSection';

const IDS = ['one', 'two', 'three'] as const;

function addSection(id: string, top: number) {
  const element = document.createElement('section');
  element.id = id;
  element.getBoundingClientRect = () => ({ top }) as DOMRect;
  document.body.appendChild(element);
  return element;
}

function setScroll({ y, viewport, page }: { y: number; viewport: number; page: number }) {
  Object.defineProperty(window, 'scrollY', { configurable: true, value: y });
  Object.defineProperty(window, 'innerHeight', { configurable: true, value: viewport });
  Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: page });
}

function scrollNow() {
  act(() => {
    window.dispatchEvent(new Event('scroll'));
  });
}

beforeEach(() => {
  // Run animation frames immediately so a scroll event is reflected synchronously.
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
    callback(0);
    return 1;
  });
  vi.stubGlobal('cancelAnimationFrame', () => {});
  setScroll({ y: 0, viewport: 800, page: 3000 });
});

afterEach(() => {
  document.body.innerHTML = '';
  vi.unstubAllGlobals();
});

describe('useActiveSection', () => {
  it('returns null when none of the sections are on the page', () => {
    const { result } = renderHook(() => useActiveSection(IDS));
    expect(result.current).toBeNull();
  });

  it('returns null while the first section is still below the top of the viewport', () => {
    addSection('one', 400);
    addSection('two', 1400);
    const { result } = renderHook(() => useActiveSection(IDS));
    expect(result.current).toBeNull();
  });

  it('returns the last section whose top has scrolled past the header', () => {
    addSection('one', -900);
    addSection('two', 60);
    addSection('three', 700);
    const { result } = renderHook(() => useActiveSection(IDS));
    expect(result.current).toBe('two');
  });

  it('follows the scroll position', () => {
    const one = addSection('one', 60);
    const two = addSection('two', 700);
    const { result } = renderHook(() => useActiveSection(IDS));
    expect(result.current).toBe('one');

    one.getBoundingClientRect = () => ({ top: -640 }) as DOMRect;
    two.getBoundingClientRect = () => ({ top: 0 }) as DOMRect;
    scrollNow();
    expect(result.current).toBe('two');
  });

  it('picks the last section when scrolled to the bottom of the page, even if it never reaches the top', () => {
    addSection('one', -2000);
    addSection('two', -900);
    addSection('three', 400);
    setScroll({ y: 2200, viewport: 800, page: 3000 });
    const { result } = renderHook(() => useActiveSection(IDS));
    expect(result.current).toBe('three');
  });

  it('ignores listed ids that are not on the page', () => {
    addSection('two', 50);
    const { result } = renderHook(() => useActiveSection(IDS));
    expect(result.current).toBe('two');
  });
});
