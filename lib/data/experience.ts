export interface ExperienceEntry {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  highlights: string[];
}

// Honest placeholder entry, written as complete sentences rather than a TODO stub.
// Real employer names, titles, and dates will replace this once supplied.
export const experience: ExperienceEntry[] = [
  {
    // Experience renders this as "{role} · {company}", so the two read as one phrase.
    company: 'full details coming soon',
    role: 'Frontend engineering roles',
    startDate: '2022-01',
    highlights: [
      'A detailed breakdown of each employer, title, and the work shipped there is being added to this section in a future update.',
      'The case studies below cover the production projects from this period, and a current resume is available on request.',
    ],
  },
];

export function formatRange(entry: ExperienceEntry): string {
  const [startYear] = entry.startDate.split('-');
  const endLabel = entry.endDate ? entry.endDate.split('-')[0] : 'Present';
  return `${startYear} — ${endLabel}`;
}
