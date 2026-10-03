import { describe, it, expect } from 'vitest';
import { contrastRatio } from './contrast';

describe('contrastRatio', () => {
  it('returns ~21:1 for pure black on pure white', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 0);
  });

  it('is order-independent', () => {
    expect(contrastRatio('#59968F', '#fafafa')).toBeCloseTo(
      contrastRatio('#fafafa', '#59968F'),
      5,
    );
  });

  it('shows the original teal fails AA text contrast on the light background', () => {
    expect(contrastRatio('#59968F', '#fafafa')).toBeLessThan(4.5);
  });

  it('shows the darkened teal passes AA text contrast on the light background', () => {
    expect(contrastRatio('#3E6F69', '#fafafa')).toBeGreaterThanOrEqual(4.5);
  });

  it('shows the original teal passes AA text contrast on the dark background', () => {
    expect(contrastRatio('#59968F', '#0b0b0d')).toBeGreaterThanOrEqual(4.5);
  });
});
