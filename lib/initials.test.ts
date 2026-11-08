import { describe, it, expect } from 'vitest';
import { initialsFor } from './initials';

describe('initialsFor', () => {
  it('uses the first letters of the first two words', () => {
    expect(initialsFor('Independent Consultant')).toBe('IC');
    expect(initialsFor('Otto-Friedrich-Universität Bamberg')).toBe('OF');
  });

  it('uses the first two letters of a single word, in capitals', () => {
    expect(initialsFor('automaited')).toBe('AU');
  });

  it('prefers an explicit override', () => {
    expect(initialsFor('Genweb2', 'G2')).toBe('G2');
  });
});
