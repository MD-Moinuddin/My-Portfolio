'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useActiveSection } from './useActiveSection';

// Root-relative hrefs so the section anchors also work from /projects and /projects/[slug].
const NAV_LINKS = [
  { href: '/#experience', label: 'Experience' },
  { href: '/#education', label: 'Education' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#thesis', label: 'Thesis' },
  { href: '/#contact', label: 'Contact' },
];

const LINK_BASE =
  'relative py-1 transition-opacity after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-accent-text after:transition-transform after:duration-200 dark:after:bg-accent';
const LINK_IDLE = 'opacity-70 after:scale-x-0 hover:opacity-100 hover:after:scale-x-100';
const LINK_ACTIVE = 'font-medium opacity-100 after:scale-x-100';

// Every homepage section in page order, including ones without a nav link (About, Recommendations).
// While one of those is on screen, nothing in the nav is highlighted.
const SECTION_IDS = [
  'about',
  'about-me',
  'experience',
  'education',
  'skills',
  'projects',
  'thesis',
  'recommendations',
  'contact',
] as const;
const NAV_SECTION_IDS: ReadonlySet<string> = new Set(NAV_LINKS.map((link) => link.href.replace('/#', '')));

// Which nav link to highlight: the section being read on the homepage, or the matching link when
// on a page that belongs to one (/projects, /projects/[slug], /thesis).
function getActiveHref(pathname: string, sectionId: string | null): string | null {
  if (pathname === '/') return sectionId && NAV_SECTION_IDS.has(sectionId) ? `/#${sectionId}` : null;
  if (pathname.startsWith('/projects')) return '/#projects';
  if (pathname === '/thesis') return '/#thesis';
  return null;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? '/';
  const sectionId = useActiveSection(SECTION_IDS);
  const activeHref = getActiveHref(pathname, sectionId);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur dark:border-snow/10 dark:bg-canvas/90">
      <nav aria-label="Primary" className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-4 text-sm">
        <Link
          href="/"
          className="bg-gradient-to-r from-ink to-accent-text bg-clip-text text-lg font-bold tracking-tight text-transparent dark:from-snow dark:to-accent"
        >
          MD.
        </Link>

        <div className="flex items-center gap-3">
          {/* Always rendered: collapsed to an absolutely-positioned disclosure panel below `sm`. */}
          <ul
            id="primary-nav-links"
            className={`${
              open ? 'flex' : 'hidden'
            } absolute inset-x-0 top-full flex-col gap-4 border-b border-ink/10 bg-paper px-6 py-4 dark:border-snow/10 dark:bg-canvas sm:static sm:flex sm:flex-row sm:items-center sm:gap-4 sm:border-0 sm:bg-transparent sm:p-0 sm:dark:bg-transparent`}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={link.href === activeHref ? 'location' : undefined}
                  className={`${LINK_BASE} ${link.href === activeHref ? LINK_ACTIVE : LINK_IDLE}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-block rounded-full border border-accent-text px-3 py-1 text-xs transition-colors hover:bg-accent-text/10 dark:border-accent dark:hover:bg-accent/10"
              >
                Resume
              </a>
            </li>
          </ul>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((previous) => !previous)}
            aria-expanded={open}
            aria-controls="primary-nav-links"
            aria-label="Toggle navigation menu"
            className="rounded-full border border-ink/30 px-3 py-1 text-xs sm:hidden dark:border-snow/30"
          >
            Menu
          </button>
        </div>
      </nav>
    </header>
  );
}
