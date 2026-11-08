import { describe, it, expect } from 'vitest';
import { experience, formatDuration, formatRange } from './experience';

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

describe('formatDuration', () => {
  it('counts months inclusively', () => {
    expect(formatDuration({ startDate: '2023-04', endDate: '2023-07' })).toBe('4 mos');
    expect(formatDuration({ startDate: '2018-05', endDate: '2019-02' })).toBe('10 mos');
  });

  it('shows years and leftover months', () => {
    expect(formatDuration({ startDate: '2019-07', endDate: '2022-08' })).toBe('3 yrs 2 mos');
  });

  it('uses singular and plural correctly', () => {
    expect(formatDuration({ startDate: '2020-01', endDate: '2020-01' })).toBe('1 mo');
    expect(formatDuration({ startDate: '2020-01', endDate: '2020-12' })).toBe('1 yr');
  });

  it('is empty for a role that is still current', () => {
    expect(formatDuration({ startDate: '2026-09' })).toBe('');
  });
});

describe('experience layout data', () => {
  it('no longer repeats the Master thesis as a job (it lives in Education and the Thesis section)', () => {
    expect(experience.some((entry) => entry.role === 'Master Thesis Project')).toBe(false);
  });

  it('tucks only older roles under "earlier"', () => {
    const earlier = experience.filter((entry) => entry.earlier);
    expect(earlier.map((entry) => entry.company)).toEqual(['SynergyForce Solutions', 'TECHTONIX']);
  });
});
