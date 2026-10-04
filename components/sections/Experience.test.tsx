import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Experience } from './Experience';
import type { ExperienceEntry } from '@/lib/data/experience';

const entries: ExperienceEntry[] = [
  { company: 'Acme Co', role: 'Frontend Engineer', startDate: '2022-01', highlights: ['Shipped the checkout redesign.'] },
  { company: 'Beta Inc', role: 'Junior Developer', startDate: '2020-01', endDate: '2021-12', highlights: ['Built the first component library.'] },
];

describe('Experience', () => {
  it('renders every entry with its role, company, and date range', () => {
    render(<Experience entries={entries} />);
    expect(screen.getByText('Frontend Engineer · Acme Co')).toBeInTheDocument();
    expect(screen.getByText('Jan 2022 - Present')).toBeInTheDocument();
    expect(screen.getByText('Junior Developer · Beta Inc')).toBeInTheDocument();
    expect(screen.getByText('Jan 2020 - Dec 2021')).toBeInTheDocument();
  });

  it('renders every highlight', () => {
    render(<Experience entries={entries} />);
    expect(screen.getByText('Shipped the checkout redesign.')).toBeInTheDocument();
    expect(screen.getByText('Built the first component library.')).toBeInTheDocument();
  });
});
