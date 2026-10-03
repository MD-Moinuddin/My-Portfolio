export interface SkillGroup {
  category: 'Languages' | 'Frameworks' | 'Tools';
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { category: 'Languages', items: ['TypeScript', 'JavaScript', 'HTML5', 'CSS3 / Sass'] },
  { category: 'Frameworks', items: ['Angular', 'React', 'Next.js', 'Vue.js'] },
  { category: 'Tools', items: ['Spring Boot', 'WCAG 2.1', 'Git', 'Figma / Adobe XD'] },
];
