export interface ExperienceEntry {
  company: string;
  role: string;
  /** Letters shown in the avatar; defaults to the company's initials. */
  initials?: string;
  startDate: string;
  endDate?: string;
  /** Technologies used in this role, shown as tags. */
  tech?: string[];
  /** Older roles are tucked under an "Earlier experience" toggle. */
  earlier?: boolean;
  /** Wrap a number or phrase in **double asterisks** to emphasise it. */
  highlights: string[];
}

export const experience: ExperienceEntry[] = [
  {
    company: 'Independent Consultant',
    role: 'Self-Employed',
    startDate: '2026-09',
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Docker'],
    highlights: [
      'Built and shipped Life Tracker solo: a full-stack work and earnings tracker for part-time and mini-job workers (React, TypeScript, Node.js, Express, PostgreSQL, Prisma, Docker), live at lifetracker-md.vercel.app with a no-signup demo.',
      'Implemented secure authentication (in-memory access tokens, httpOnly refresh cookies, bcrypt, rate limiting, emailed single-use password reset) and fixed a production session failure caused by third-party-cookie blocking by proxying the API through a Vercel rewrite.',
      'Set up CI/CD with GitHub Actions (**8** parallel lint, typecheck, test, and build jobs) and automated unit, integration, and accessibility tests toward WCAG 2.1 AA, with deployments on Vercel, Render, and Neon.',
    ],
  },
  {
    company: 'automaited',
    role: 'Working Student - Software Engineer',
    startDate: '2023-04',
    endDate: '2023-07',
    tech: ['TypeScript', 'Testing'],
    highlights: [
      "Developed selector-generation logic in TypeScript to uniquely identify actionable DOM elements (buttons, inputs) via parent-child DOM traversal, for automaited's browser-based automation product.",
      'Wrote and executed tests to validate element-detection accuracy across varied, real-world web page structures.',
    ],
  },
  {
    company: 'Genweb2',
    role: 'Software Engineer',
    initials: 'G2',
    startDate: '2019-07',
    endDate: '2022-08',
    tech: ['Angular', 'WCAG', 'Agile'],
    highlights: [
      'Designed and developed modern, dynamic user interfaces for web applications using Angular.',
      'Reduced application loading time by over **33%** through architectural refactoring and bundle optimization.',
      'Ensured website accessibility for an inclusive user experience, working closely with people with disabilities to address their requirements.',
      'Delivered high-quality, responsive user interfaces within a cross-functional Agile team environment.',
    ],
  },
  {
    company: 'SynergyForce Solutions',
    role: 'Web Developer',
    initials: 'SF',
    startDate: '2018-05',
    endDate: '2019-02',
    earlier: true,
    highlights: [
      'Designed and implemented the front-end architecture for an employee management application.',
      "Performed debugging and testing to ensure the application's functionality.",
    ],
  },
  {
    company: 'TECHTONIX',
    role: 'Internship - Front End Developer',
    initials: 'TX',
    startDate: '2017-11',
    endDate: '2018-02',
    tech: ['HTML5', 'Bootstrap'],
    earlier: true,
    highlights: [
      'Completed a front-end development internship, working with HTML5, Bootstrap, and related front-end tools.',
    ],
  },
];

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatMonthYear(value: string): string {
  const [year, month] = value.split('-');
  return `${MONTH_LABELS[Number(month) - 1]} ${year}`;
}

export function formatRange(entry: ExperienceEntry): string {
  const start = formatMonthYear(entry.startDate);
  const end = entry.endDate ? formatMonthYear(entry.endDate) : 'Present';
  return `${start} - ${end}`;
}

/** Inclusive length of a finished role, e.g. "4 mos" or "3 yrs 2 mos". Empty while the role is current. */
export function formatDuration(entry: Pick<ExperienceEntry, 'startDate' | 'endDate'>): string {
  if (!entry.endDate) return '';
  const [startYear, startMonth] = entry.startDate.split('-').map(Number);
  const [endYear, endMonth] = entry.endDate.split('-').map(Number);
  const months = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`);
  if (rest > 0) parts.push(`${rest} ${rest === 1 ? 'mo' : 'mos'}`);
  return parts.join(' ');
}
