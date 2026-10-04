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
      'Deployed across Vercel (frontend), Render (backend), and Neon (Postgres) — live at life-tracker-brown-one.vercel.app.',
    ],
  },
  {
    company: 'Otto-Friedrich-Universität Bamberg',
    role: "Master Thesis Project",
    startDate: '2025-10',
    endDate: '2026-07',
    highlights: [
      'Designed and engineered Gumti, a full realization of the TARA state-machine replication protocol as a distributed Apache Flink job, including its consensus, view-change, and garbage-collection sub-protocols.',
      "Solved gaps in Flink's operator model for consensus workloads — engineered-key routing, ZooKeeper replica discovery, and network feedback loops around its acyclic dataflow.",
      'Benchmarked throughput, latency, and fault tolerance: Gumti sustains ~5,300 req/s at a ~3ms latency floor and recovers from leader failures in ~5s with no requests lost.',
    ],
  },
  {
    company: 'automaited',
    role: 'Working Student - Software Engineer',
    startDate: '2023-04',
    endDate: '2023-07',
    highlights: [
      'Worked part-time as a software engineer in Cologne, Germany, contributing to TypeScript development and software testing.',
    ],
  },
  {
    company: 'Genweb2',
    role: 'Software Engineer',
    startDate: '2019-07',
    endDate: '2022-08',
    highlights: [
      'Worked full-time as a software engineer for over three years, building production web applications with JavaScript and Git-based workflows.',
    ],
  },
  {
    company: 'SynergyForce Solutions',
    role: 'Software Engineer',
    startDate: '2018-05',
    endDate: '2019-02',
    highlights: [
      'Built web applications in Winnipeg, Manitoba, Canada, using HTML5, Bootstrap, and related front-end technologies.',
    ],
  },
  {
    company: 'TECHTONIX',
    role: 'Internship — Front End Developer',
    startDate: '2017-11',
    endDate: '2018-02',
    highlights: [
      'Completed a front-end development internship, working with HTML5, Bootstrap, and related front-end tools.',
    ],
  },
];

export function formatRange(entry: ExperienceEntry): string {
  const [startYear] = entry.startDate.split('-');
  const endLabel = entry.endDate ? entry.endDate.split('-')[0] : 'Present';
  return `${startYear} — ${endLabel}`;
}
