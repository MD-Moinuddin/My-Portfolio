export interface SkillGroup {
  category: 'Frontend' | 'Backend' | 'Tools and Other';
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    items: ['JavaScript', 'TypeScript', 'Angular', 'React', 'HTML5/CSS3', 'Tailwind CSS', 'SASS', 'WordPress', 'Next.js'],
  },
  { category: 'Backend', items: ['Node.js', 'Java', 'Spring Boot', 'PHP'] },
  {
    category: 'Tools and Other',
    items: ['Git', 'Docker', 'CI/CD', 'REST', 'Web Accessibility (WCAG 2.1)', 'Figma'],
  },
];
