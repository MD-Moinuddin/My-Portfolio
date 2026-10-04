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
});
