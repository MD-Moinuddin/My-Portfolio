import '@testing-library/jest-dom/vitest';
import { JSDOM } from 'jsdom';

if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

// Use jsdom's real Storage rather than a hand-rolled partial stand-in.
// Node 26 exposes its own experimental `localStorage` global, which shadows jsdom's and
// resolves to `undefined` without --localstorage-file; so when that happens, install a
// genuine jsdom Storage instance (full spec surface: length, key(), clear(), etc.).
if (typeof window !== 'undefined' && !window.localStorage) {
  const { window: storageWindow } = new JSDOM('', { url: window.location.href });
  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    value: storageWindow.localStorage,
  });
}

if (typeof window !== 'undefined') {
  // Mock IntersectionObserver for Framer Motion
  class IntersectionObserverMock {
    observe = () => null;
    disconnect = () => null;
    unobserve = () => null;
    takeRecords = () => [];
  }
  window.IntersectionObserver = IntersectionObserverMock as unknown as typeof window.IntersectionObserver;
}
