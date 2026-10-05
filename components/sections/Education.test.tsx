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
    grade: 'Grade: 2.7 (1.0 is highest)',
    thesisGrade: 'Thesis grade: 2.1 (1.0 is highest)',
  },
];

describe('Education', () => {
  it('renders every entry with its institution, degree, and date range as separate elements', () => {
    render(<Education entries={entries} />);
    expect(screen.getByRole('heading', { level: 3, name: 'Acme University' })).toBeInTheDocument();
    expect(screen.getByText('B.Sc. Computer Science')).toBeInTheDocument();
    expect(screen.getByText('2014 - 2017')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Beta University' })).toBeInTheDocument();
    expect(screen.getByText('M.Sc. Software Engineering')).toBeInTheDocument();
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

  it('renders the grade and a separate thesis grade when both are present', () => {
    render(<Education entries={entries} />);
    expect(screen.getByText('Grade: 2.7 (1.0 is highest)')).toBeInTheDocument();
    expect(screen.getByText('Thesis grade: 2.1 (1.0 is highest)')).toBeInTheDocument();
  });

  it('omits the grade line entirely when no grade or thesis grade is given', () => {
    const { container } = render(<Education entries={[entries[0]]} />);
    expect(screen.queryByText(/is highest/)).not.toBeInTheDocument();
    expect(container.textContent).not.toContain('Grade');
  });
});
