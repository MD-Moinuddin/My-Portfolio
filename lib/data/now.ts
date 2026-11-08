export type NowIcon = 'building' | 'learning' | 'looking';

export interface NowItem {
  label: string;
  title: string;
  text: string;
  icon: NowIcon;
}

// A snapshot of what's going on right now. Update `updated` (YYYY-MM) whenever the tiles change,
// so visitors can see how fresh it is.
export const now = {
  updated: '2026-11',
  items: [
    {
      label: 'Building',
      title: 'Life Tracker',
      text: 'Keeping the work and earnings tracker polished, with fitness, nutrition, and finance modules planned next.',
      icon: 'building',
    },
    {
      label: 'Learning',
      title: 'German',
      text: 'Working on my German, currently at A2. Preparing myself for B1.',
      icon: 'learning',
    },
    {
      label: 'Looking for',
      title: 'My next role in Germany',
      text: 'Full-time or freelance, in software engineering and web development. Can join immediately.',
      icon: 'looking',
    },
  ] satisfies NowItem[],
};

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/** "2026-11" -> "November 2026" */
export function formatUpdated(value: string): string {
  const [year, month] = value.split('-');
  return `${MONTH_NAMES[Number(month) - 1]} ${year}`;
}
