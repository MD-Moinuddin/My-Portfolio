import { describe, it, expect } from 'vitest';
import { education, formatRange } from './education';

describe('education data', () => {
  it('has at least one entry', () => {
    expect(education.length).toBeGreaterThan(0);
  });

  it('gives every entry an institution, a degree, and a location', () => {
    education.forEach((entry) => {
      expect(entry.institution.length).toBeGreaterThan(0);
      expect(entry.degree.length).toBeGreaterThan(0);
      expect(entry.location.length).toBeGreaterThan(0);
    });
  });

  it('gives the Master\'s entry both a grade and a separate thesis grade', () => {
    const masters = education.find((entry) => entry.degree.includes('Master of Science'));
    expect(masters?.grade).toBeTruthy();
    expect(masters?.thesisGrade).toBeTruthy();
  });
});

describe('formatRange', () => {
  it('shows "Present" when there is no endDate', () => {
    expect(formatRange({ institution: 'X', degree: 'Y', location: 'Z', startDate: '2022-04' })).toBe(
      'Apr 2022 - Present',
    );
  });

  it('shows month and year for both dates when both have months', () => {
    expect(
      formatRange({ institution: 'X', degree: 'Y', location: 'Z', startDate: '2022-04', endDate: '2026-08' }),
    ).toBe('Apr 2022 - Aug 2026');
  });

  it('shows plain years when dates have no month', () => {
    expect(formatRange({ institution: 'X', degree: 'Y', location: 'Z', startDate: '2014', endDate: '2017' })).toBe(
      '2014 - 2017',
    );
  });
});
