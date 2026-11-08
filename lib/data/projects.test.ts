import { describe, it, expect } from 'vitest';
import { projects, getProjectBySlug, getAdjacentProjects } from './projects';

describe('projects data', () => {
  it('has a unique slug for every project', () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has all 10 current projects', () => {
    expect(projects).toHaveLength(10);
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

  it('finds the neighbours of a project in list order', () => {
    expect(getAdjacentProjects(projects[0].slug)).toEqual({ previous: undefined, next: projects[1] });
    expect(getAdjacentProjects(projects[1].slug)).toEqual({ previous: projects[0], next: projects[2] });
    const last = projects.length - 1;
    expect(getAdjacentProjects(projects[last].slug)).toEqual({ previous: projects[last - 1], next: undefined });
  });

  it('has no neighbours for an unknown slug', () => {
    expect(getAdjacentProjects('does-not-exist')).toEqual({});
  });
});
