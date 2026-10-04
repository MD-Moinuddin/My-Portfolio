import { describe, it, expect } from 'vitest';
import { projects, getProjectBySlug } from './projects';

describe('projects data', () => {
  it('has a unique slug for every project', () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has all 9 current projects', () => {
    expect(projects).toHaveLength(9);
  });

  it('gives every project a non-empty case study', () => {
    projects.forEach((project) => {
      expect(project.caseStudy.problem.length).toBeGreaterThan(0);
      expect(project.caseStudy.contribution.length).toBeGreaterThan(0);
      expect(project.caseStudy.outcome.length).toBeGreaterThan(0);
    });
  });

  it('points every coverImage at the migrated public/images/projects path', () => {
    projects.forEach((project) => {
      expect(project.coverImage.startsWith('/images/projects/')).toBe(true);
    });
  });

  it('finds a project by slug', () => {
    expect(getProjectBySlug('emporia')?.name).toBe('Emporia');
  });

  it('returns undefined for an unknown slug', () => {
    expect(getProjectBySlug('does-not-exist')).toBeUndefined();
  });
});
