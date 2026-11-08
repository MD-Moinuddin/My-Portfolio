import type { ReactNode } from 'react';
import { BRAND_ICONS } from '@/lib/skill-icons';

// Skills with no official logo get a simple line icon in the same size and colour.
const LINE_ICONS: Record<string, ReactNode> = {
  'CI/CD': (
    <>
      <path d="M21 12a9 9 0 1 1-3-6.7" />
      <path d="M21 3v6h-6" />
    </>
  ),
  REST: (
    <>
      <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
      <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
    </>
  ),
  'Web Accessibility (WCAG 2.1)': (
    <>
      <circle cx="12" cy="4.5" r="2" />
      <path d="M4 8.5h16M12 8.5v5l-3 7M12 13.5l3 7" />
    </>
  ),
};

export function hasSkillIcon(name: string): boolean {
  return name in BRAND_ICONS || name in LINE_ICONS;
}

/** A small decorative logo for a skill; renders nothing for a skill without one. */
export function SkillIcon({ name, className = 'h-4 w-4' }: { name: string; className?: string }) {
  const brand = BRAND_ICONS[name];
  if (brand) {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={`shrink-0 ${className}`}>
        <path d={brand} />
      </svg>
    );
  }
  const line = LINE_ICONS[name];
  if (line) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`shrink-0 ${className}`}
      >
        {line}
      </svg>
    );
  }
  return null;
}
