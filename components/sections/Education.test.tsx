import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Education } from './Education';
import type { EducationEntry } from '@/lib/data/education';

const entries: EducationEntry[] = [
  {
    institution: 'Acme University',
    degree: 'B.Sc. Computer Science',
    startDate: '2014',
    endDate: '2017',
  },
  {
    institution: 'Beta University',
    degree: 'M.Sc. Software Engineering',
    startDate: '2022-04',
    endDate: '2026-08',
    highlights: ['Wrote a thesis on distributed systems.'],
  },
];

describe('Education', () => {
  it('renders every entry with its degree, institution, and date range', () => {
    render(<Education entries={entries} />);
    expect(screen.getByText('B.Sc. Computer Science · Acme University')).toBeInTheDocument();
    expect(screen.getByText('2014 - 2017')).toBeInTheDocument();
    expect(screen.getByText('M.Sc. Software Engineering · Beta University')).toBeInTheDocument();
    expect(screen.getByText('Apr 2022 - Aug 2026')).toBeInTheDocument();
  });

  it('renders highlights when present', () => {
    render(<Education entries={entries} />);
    expect(screen.getByText('Wrote a thesis on distributed systems.')).toBeInTheDocument();
  });

  it('renders entries without highlights without a bulleted list', () => {
    const { container } = render(<Education entries={[entries[0]]} />);
    expect(container.querySelector('ul')).not.toBeInTheDocument();
  });
});
