import type { ReactNode } from 'react';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { SkillIcon } from '@/components/SkillIcon';
import type { SkillGroup } from '@/lib/data/skills';

interface SkillsProps {
  groups: SkillGroup[];
}

// A bento layout: longer lists get wider cards. Each pair of rows adds up to 12 columns.
const SPAN: Record<string, string> = {
  Frontend: 'md:col-span-7',
  Backend: 'md:col-span-5',
  Databases: 'md:col-span-3',
  Testing: 'md:col-span-3',
  'Tools and Other': 'md:col-span-6',
};
const DEFAULT_SPAN = 'md:col-span-6';
const TINTED = new Set(['Frontend', 'Tools and Other']);

function CategoryIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      {children}
    </svg>
  );
}

const CATEGORY_ICONS: Record<string, ReactNode> = {
  Frontend: (
    <CategoryIcon>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </CategoryIcon>
  ),
  Backend: (
    <CategoryIcon>
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <path d="M7 7h.01M7 17h.01" />
    </CategoryIcon>
  ),
  Databases: (
    <CategoryIcon>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </CategoryIcon>
  ),
  Testing: (
    <CategoryIcon>
      <path d="M9 3h6M10 3v6L4.5 19a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 9V3" />
    </CategoryIcon>
  ),
  'Tools and Other': (
    <CategoryIcon>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.1-.6-.6-2.1z" />
    </CategoryIcon>
  ),
};

export function Skills({ groups }: SkillsProps) {
  return (
    <section id="skills" className="mx-auto max-w-4xl px-6 py-8">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] opacity-60">Skills</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-12">
        {groups.map((group) => (
          <div key={group.category} className={`${SPAN[group.category] ?? DEFAULT_SPAN} min-w-0 [&>div]:h-full`}>
            <RevealOnScroll>
              <div className="relative h-full overflow-hidden rounded-2xl border border-ink/10 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-text hover:shadow-lg hover:shadow-ink/5 dark:border-snow/10 dark:bg-white/[0.03] dark:hover:border-accent dark:hover:shadow-snow/5">
                {TINTED.has(group.category) && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-text/10 to-transparent to-60% dark:from-accent/10"
                  />
                )}
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-text/10 text-accent-text dark:bg-accent/15 dark:text-accent">
                      {CATEGORY_ICONS[group.category]}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold leading-tight">{group.category}</h3>
                      <p className="text-xs opacity-60">
                        {group.items.length} {group.items.length === 1 ? 'skill' : 'skills'}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={`${group.category}-${item}`}
                        className="inline-flex items-center gap-2 rounded-full border border-transparent bg-ink/5 px-3.5 py-1.5 text-sm transition-colors hover:border-accent-text hover:bg-accent-text/10 dark:bg-snow/10 dark:hover:border-accent dark:hover:bg-accent/10"
                      >
                        <SkillIcon name={item} className="h-4 w-4 text-accent-text dark:text-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        ))}
      </div>
    </section>
  );
}
