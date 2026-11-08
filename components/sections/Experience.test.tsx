import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { Experience } from './Experience';
import type { ExperienceEntry } from '@/lib/data/experience';

const entries: ExperienceEntry[] = [
  {
    company: 'Acme Co',
    role: 'Frontend Engineer',
    startDate: '2022-01',
    tech: ['React', 'TypeScript'],
    highlights: ['Shipped the checkout redesign.', 'Cut load time by **40%** across the app.'],
  },
  { company: 'Beta Inc', role: 'Junior Developer', startDate: '2020-01', endDate: '2021-12', highlights: ['Built the first component library.'] },
  { company: 'Old School Ltd', role: 'Intern', startDate: '2017-11', endDate: '2018-02', earlier: true, highlights: ['Learned the basics.'] },
  { company: 'Ancient Co', role: 'Trainee', startDate: '2016-03', endDate: '2016-09', earlier: true, highlights: ['Answered the phones.'] },
];

describe('Experience', () => {
  it('renders every entry with its role, company, and date range', () => {
    render(<Experience entries={entries} />);
    expect(screen.getByText('Frontend Engineer')).toBeInTheDocument();
    expect(screen.getByText('Acme Co')).toBeInTheDocument();
    expect(screen.getByText('Jan 2022 - Present')).toBeInTheDocument();
    expect(screen.getByText('Junior Developer')).toBeInTheDocument();
    expect(screen.getByText('Beta Inc')).toBeInTheDocument();
    expect(screen.getByText('Jan 2020 - Dec 2021')).toBeInTheDocument();
  });

  it('renders every highlight', () => {
    render(<Experience entries={entries} />);
    expect(screen.getByText('Shipped the checkout redesign.')).toBeInTheDocument();
    expect(screen.getByText('Built the first component library.')).toBeInTheDocument();
  });

  it('marks the role without an end date as the current one, and shows the length of finished roles', () => {
    render(<Experience entries={entries} />);
    expect(screen.getAllByText('Current role')).toHaveLength(1);
    expect(screen.getByText('2 yrs')).toBeInTheDocument();
  });

  it('shows avatar initials for each company', () => {
    const { container } = render(<Experience entries={entries} />);
    expect(container.textContent).toContain('AC');
    expect(container.textContent).toContain('BI');
  });

  it('lists the technologies used in a role as tags', () => {
    render(<Experience entries={entries} />);
    const tags = within(screen.getByRole('list', { name: 'Technologies' })).getAllByRole('listitem');
    expect(tags.map((tag) => tag.textContent)).toEqual(['React', 'TypeScript']);
  });

  it('emphasises a **highlighted** number and drops the markers', () => {
    render(<Experience entries={entries} />);
    expect(screen.getByText('40%').tagName).toBe('STRONG');
    expect(screen.queryByText(/\*\*/)).toBeNull();
  });

  it('puts older roles under a collapsible "Earlier experience" with a count and year range', () => {
    const { container } = render(<Experience entries={entries} />);
    const details = container.querySelector('details')!;
    expect(details).not.toHaveAttribute('open');
    expect(within(details).getByText('Earlier experience')).toBeInTheDocument();
    expect(within(details).getByText('2 roles · 2016–2018')).toBeInTheDocument();
    expect(within(details).getByText('Old School Ltd')).toBeInTheDocument();
    expect(within(details).getByText('Ancient Co')).toBeInTheDocument();
  });

  it('omits the earlier-experience toggle when no role is marked earlier', () => {
    const { container } = render(<Experience entries={entries.slice(0, 2)} />);
    expect(container.querySelector('details')).toBeNull();
  });
});
