import { describe, it, expect } from 'vitest';
import { experience, formatRange } from './experience';

describe('experience data', () => {
  it('has at least one entry', () => {
    expect(experience.length).toBeGreaterThan(0);
  });

  it('gives every entry a role, company, and at least one highlight', () => {
    experience.forEach((entry) => {
      expect(entry.role.length).toBeGreaterThan(0);
      expect(entry.company.length).toBeGreaterThan(0);
      expect(entry.highlights.length).toBeGreaterThan(0);
    });
  });
});

describe('formatRange', () => {
  it('shows "Present" when there is no endDate', () => {
    expect(formatRange({ company: 'X', role: 'Y', startDate: '2022-01', highlights: [] })).toBe('Jan 2022 - Present');
  });

  it('shows the end month and year when endDate is set', () => {
    expect(
      formatRange({ company: 'X', role: 'Y', startDate: '2020-01', endDate: '2022-06', highlights: [] }),
    ).toBe('Jan 2020 - Jun 2022');
  });
});
