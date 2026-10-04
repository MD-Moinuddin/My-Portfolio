import { describe, it, expect } from 'vitest';
import { site } from './site';

describe('site constants', () => {
  it('has a valid https url', () => {
    expect(site.url.startsWith('https://')).toBe(true);
  });

  it('has the correct Formspree endpoint', () => {
    expect(site.contactFormAction).toBe('https://formspree.io/f/mqkvbqlw');
  });

  it('has the real contact email', () => {
    expect(site.email).toBe('moinuddinmd067@gmail.com');
  });

  it('has LinkedIn and GitHub social links', () => {
    expect(site.social.linkedin).toContain('linkedin.com');
    expect(site.social.github).toBe('https://github.com/MD-Moinuddin');
  });
});
