import { describe, it, expect } from 'vitest';
import { contrastRatio } from './contrast';
import { themeColors } from './theme-colors';

describe('theme colors', () => {
  it('defines the editorial palette', () => {
    expect(themeColors.paper).toBe('#fafafa');
    expect(themeColors.canvas).toBe('#0b0b0d');
    expect(themeColors.accent).toBe('#59968F');
    expect(themeColors.accentText).toBe('#3E6F69');
  });

  it('keeps the light-mode text accent at AA contrast against the paper background', () => {
    expect(contrastRatio(themeColors.accentText, themeColors.paper)).toBeGreaterThanOrEqual(4.5);
  });
});
