import { describe, it, expect } from 'vitest';
import { formatUpdated, now } from './now';

describe('formatUpdated', () => {
  it('turns a year-month into a readable month and year', () => {
    expect(formatUpdated('2026-11')).toBe('November 2026');
    expect(formatUpdated('2027-01')).toBe('January 2027');
  });
});

describe('now data', () => {
  it('has a valid year-month for the last-updated date', () => {
    expect(now.updated).toMatch(/^\d{4}-(0[1-9]|1[0-2])$/);
  });

  it('gives every tile a label, title, and text', () => {
    now.items.forEach((item) => {
      expect(item.label.length).toBeGreaterThan(0);
      expect(item.title.length).toBeGreaterThan(0);
      expect(item.text.length).toBeGreaterThan(0);
    });
  });
});
