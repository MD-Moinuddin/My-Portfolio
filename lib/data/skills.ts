export interface SkillGroup {
  category: 'Frontend' | 'Backend' | 'Databases' | 'Testing' | 'Tools and Other';
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    items: ['JavaScript', 'TypeScript', 'Angular', 'React', 'Vue.js', 'HTML5/CSS3', 'Tailwind CSS', 'SASS', 'WordPress', 'Next.js'],
  },
  { category: 'Backend', items: ['Node.js', 'Java', 'Spring Boot', 'Apache Flink', 'PHP'] },
  { category: 'Databases', items: ['PostgreSQL', 'Prisma'] },
  { category: 'Testing', items: ['Vitest', 'Jest'] },
  {
    category: 'Tools and Other',
    items: ['Git', 'Docker', 'CI/CD', 'GitHub Actions', 'Vercel', 'REST', 'Web Accessibility (WCAG 2.1)', 'Figma'],
  },
];
