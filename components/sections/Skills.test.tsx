import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skills } from './Skills';
import type { SkillGroup } from '@/lib/data/skills';

const groups: SkillGroup[] = [
  { category: 'Languages', items: ['TypeScript', 'JavaScript'] },
  { category: 'Frameworks', items: ['Next.js'] },
];

describe('Skills', () => {
  it('renders each category heading', () => {
    render(<Skills groups={groups} />);
    expect(screen.getByText('Languages')).toBeInTheDocument();
    expect(screen.getByText('Frameworks')).toBeInTheDocument();
  });

  it('renders each skill tag', () => {
    render(<Skills groups={groups} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });
});
