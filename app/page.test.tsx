import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import HomePage, { metadata } from './page';

describe('HomePage', () => {
  it('renders every homepage section in order', () => {
    const { container } = render(<HomePage />);
    const sectionIds = Array.from(container.querySelectorAll('section')).map((section) => section.id);
    expect(sectionIds).toEqual(['about', 'about-me', 'now', 'experience', 'education', 'skills', 'projects', 'thesis', 'recommendations', 'contact']);
  });

  it('sets the home page canonical URL', () => {
    expect(metadata.alternates?.canonical).toBe('/');
  });
});
