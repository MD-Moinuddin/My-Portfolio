import { describe, it, expect } from 'vitest';
import sitemap from './sitemap';
import { projects } from '@/lib/data/projects';
import { site } from '@/lib/site';

describe('sitemap', () => {
  it('includes the homepage, the projects list page, and the thesis page', () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(site.url);
    expect(urls).toContain(`${site.url}/projects`);
    expect(urls).toContain(`${site.url}/thesis`);
  });

  it('includes every project case-study page', () => {
    const urls = sitemap().map((entry) => entry.url);
    projects.forEach((project) => {
      expect(urls).toContain(`${site.url}/projects/${project.slug}`);
    });
  });
});
