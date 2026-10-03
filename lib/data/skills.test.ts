import { describe, it, expect } from 'vitest';
import { skillGroups } from './skills';

describe('skillGroups', () => {
  it('has exactly 3 categories', () => {
    expect(skillGroups).toHaveLength(3);
  });

  it('has unique categories', () => {
    const categories = skillGroups.map((group) => group.category);
    expect(new Set(categories).size).toBe(categories.length);
  });

  it('gives every category at least one item', () => {
    skillGroups.forEach((group) => {
      expect(group.items.length).toBeGreaterThan(0);
    });
  });
});
