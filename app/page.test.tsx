import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import HomePage from './page';

describe('HomePage', () => {
  it('renders every homepage section in order', () => {
    const { container } = render(<HomePage />);
    const sectionIds = Array.from(container.querySelectorAll('section')).map((section) => section.id);
    expect(sectionIds).toEqual(['about', 'experience', 'skills', 'projects', 'contact']);
  });
});
