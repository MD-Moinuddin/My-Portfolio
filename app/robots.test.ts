import { describe, it, expect } from 'vitest';
import robots from './robots';
import { site } from '@/lib/site';

describe('robots', () => {
  it('allows all crawlers', () => {
    const result = robots();
    expect(result.rules).toEqual({ userAgent: '*', allow: '/' });
  });

  it('points to the sitemap', () => {
    const result = robots();
    expect(result.sitemap).toBe(`${site.url}/sitemap.xml`);
  });
});
