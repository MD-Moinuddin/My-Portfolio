import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { PersonJsonLd } from './PersonJsonLd';
import { site } from '@/lib/site';

describe('PersonJsonLd', () => {
  it('embeds a schema.org Person script with the site identity', () => {
    const { container } = render(<PersonJsonLd />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const data = JSON.parse(script!.innerHTML);
    expect(data['@type']).toBe('Person');
    expect(data.name).toBe(site.name);
    expect(data.sameAs).toContain(site.social.linkedin);
    expect(data.sameAs).toContain(site.social.github);
  });

  it('describes where the person is based, what they speak, and where they studied', () => {
    const { container } = render(<PersonJsonLd />);
    const data = JSON.parse(container.querySelector('script')!.innerHTML);
    expect(data.address).toMatchObject({ addressLocality: 'Bamberg', addressCountry: 'DE' });
    expect(data.knowsLanguage).toEqual(['English', 'Bengali', 'German']);
    expect(data.alumniOf.map((school: { name: string }) => school.name)).toContain('Otto-Friedrich-Universität Bamberg');
  });

  it('lists skills and an absolute portrait URL', () => {
    const { container } = render(<PersonJsonLd />);
    const data = JSON.parse(container.querySelector('script')!.innerHTML);
    expect(data.knowsAbout).toEqual(expect.arrayContaining(['TypeScript', 'Apache Flink', 'PostgreSQL']));
    expect(data.image).toBe(`${site.url}/images/about/moinuddin.jpg`);
  });

  it('never emits a raw "<" inside the script payload', () => {
    const { container } = render(<PersonJsonLd />);
    expect(container.querySelector('script')!.innerHTML).not.toContain('<');
  });
});
