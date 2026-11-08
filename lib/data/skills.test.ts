import { describe, it, expect } from 'vitest';
import { hasSkillIcon } from '@/components/SkillIcon';
import { skillGroups } from './skills';

describe('skillGroups', () => {
  it('has exactly 5 categories', () => {
    expect(skillGroups).toHaveLength(5);
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

  it('has an icon for every skill, so no pill looks different from the rest', () => {
    skillGroups.flatMap((group) => group.items).forEach((skill) => {
      expect(hasSkillIcon(skill), `no icon for "${skill}"`).toBe(true);
    });
  });
});
