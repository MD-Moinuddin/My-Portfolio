export interface ExperienceEntry {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  highlights: string[];
}

export const experience: ExperienceEntry[] = [
  {
    company: 'Independent Consultant',
    role: 'Self-Employed',
    startDate: '2026-09',
    highlights: [
      'Building Life Tracker, a secure, accessible personal dashboard app with React, Node.js, PostgreSQL, and Docker, including JWT authentication and a full CI/CD pipeline via GitHub Actions.',
      "Followed OWASP-aligned auth practices (in-memory access tokens, httpOnly refresh cookies, bcrypt hashing, rate limiting) and automated accessibility testing with jest-axe toward WCAG 2.1 AA compliance.",
      'Deployed across Vercel (frontend), Render (backend), and Neon (Postgres) - live at lifetracker-md.vercel.app.',
    ],
  },
  {
    company: 'Otto-Friedrich-Universität Bamberg',
    role: "Master Thesis Project",
    startDate: '2025-10',
    endDate: '2026-07',
    highlights: [
      'Designed and engineered Gumti, a full realization of the TARA state-machine replication protocol as a distributed Apache Flink job, including its consensus, view-change, and garbage-collection sub-protocols.',
      "Solved gaps in Flink's operator model for consensus workloads - engineered-key routing, ZooKeeper replica discovery, and network feedback loops around its acyclic dataflow.",
      'Benchmarked throughput, latency, and fault tolerance: Gumti sustains ~5,300 req/s at a ~3ms latency floor and recovers from leader failures in ~5s with no requests lost.',
    ],
  },
  {
    company: 'automaited',
    role: 'Working Student - Software Engineer',
    startDate: '2023-04',
    endDate: '2023-07',
    highlights: [
      "Developed selector-generation logic in TypeScript to uniquely identify actionable DOM elements (buttons, inputs) via parent-child DOM traversal, for automaited's browser-based automation product.",
      'Wrote and executed tests to validate element-detection accuracy across varied, real-world web page structures.',
    ],
  },
  {
    company: 'Genweb2',
    role: 'Software Engineer',
    startDate: '2019-07',
    endDate: '2022-08',
    highlights: [
      'Designed and developed modern, dynamic user interfaces for web applications using Angular.',
      'Reduced application loading time by over 33% through architectural refactoring and bundle optimization.',
      'Ensured website accessibility for an inclusive user experience, working closely with people with disabilities to address their requirements.',
      'Delivered high-quality, responsive user interfaces within a cross-functional Agile team environment.',
    ],
  },
  {
    company: 'SynergyForce Solutions',
    role: 'Web Developer',
    startDate: '2018-05',
    endDate: '2019-02',
    highlights: [
      'Designed and implemented the front-end architecture for an employee management application.',
      "Performed debugging and testing to ensure the application's functionality.",
    ],
  },
  {
    company: 'TECHTONIX',
    role: 'Internship - Front End Developer',
    startDate: '2017-11',
    endDate: '2018-02',
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
