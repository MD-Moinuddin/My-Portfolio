import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { Skills } from './Skills';
import type { SkillGroup } from '@/lib/data/skills';

const groups: SkillGroup[] = [
  { category: 'Frontend', items: ['TypeScript', 'JavaScript'] },
  { category: 'Backend', items: ['Next.js'] },
];

describe('Skills', () => {
  it('renders each category heading', () => {
    render(<Skills groups={groups} />);
    expect(screen.getByRole('heading', { level: 3, name: 'Frontend' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Backend' })).toBeInTheDocument();
  });

  it('renders each skill', () => {
    render(<Skills groups={groups} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });

  it('shows how many skills each category has, in singular or plural', () => {
    render(<Skills groups={groups} />);
    expect(screen.getByText('2 skills')).toBeInTheDocument();
    expect(screen.getByText('1 skill')).toBeInTheDocument();
  });

  it('gives every skill the same treatment: all of them are list items in their category, with no separate "core" tier', () => {
    render(<Skills groups={groups} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.queryByText(/also work with/i)).toBeNull();
  });

  it('shows a decorative logo next to a skill that has one, and nothing for a skill without one', () => {
    render(<Skills groups={[{ category: 'Frontend', items: ['TypeScript', 'Underwater Basket Weaving'] }]} />);
    const known = screen.getByText('TypeScript').closest('li')!;
    const unknown = screen.getByText('Underwater Basket Weaving').closest('li')!;
    expect(known.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(within(unknown).queryByRole('img')).toBeNull();
    expect(unknown.querySelector('svg')).toBeNull();
  });

  it('uses a line icon for a skill without an official logo', () => {
    render(<Skills groups={[{ category: 'Tools and Other', items: ['CI/CD'] }]} />);
    expect(screen.getByText('CI/CD').closest('li')!.querySelector('svg')).toHaveAttribute('stroke', 'currentColor');
  });

  it('gives longer lists wider cards in the bento layout', () => {
    const { container } = render(<Skills groups={groups} />);
    expect(container.querySelector('.md\\:col-span-7')).toContainElement(screen.getByRole('heading', { name: 'Frontend' }));
    expect(container.querySelector('.md\\:col-span-5')).toContainElement(screen.getByRole('heading', { name: 'Backend' }));
  });
});
