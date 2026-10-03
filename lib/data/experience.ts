export interface ExperienceEntry {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  highlights: string[];
}

// Placeholder entry — replace with real employer, dates, and highlights.
// (The user has confirmed real work history will be supplied after launch.)
export const experience: ExperienceEntry[] = [
  {
    company: 'Add your employer name here',
    role: 'Frontend Engineer',
    startDate: '2022-01',
    highlights: [
      'Add 1-2 sentences about your main responsibility or a notable project here.',
      'Add a measurable outcome or technology highlight here.',
    ],
  },
];

export function formatRange(entry: ExperienceEntry): string {
  const [startYear] = entry.startDate.split('-');
  const endLabel = entry.endDate ? entry.endDate.split('-')[0] : 'Present';
  return `${startYear} — ${endLabel}`;
}
