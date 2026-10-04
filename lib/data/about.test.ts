import { describe, it, expect } from 'vitest';
import { bio, expertise, languages } from './about';

describe('about data', () => {
  it('has at least one bio paragraph', () => {
    expect(bio.length).toBeGreaterThan(0);
  });

  it('has at least one expertise item', () => {
    expect(expertise.length).toBeGreaterThan(0);
  });

  it('has a non-empty languages line', () => {
    expect(languages.length).toBeGreaterThan(0);
  });
});
