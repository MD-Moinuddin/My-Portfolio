'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

// Root-relative hrefs so the section anchors also work from /projects and /projects/[slug].
const NAV_LINKS = [
  { href: '/#experience', label: 'Experience' },
  { href: '/#education', label: 'Education' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#projects', label: 'Projects' },
  { href: '/thesis', label: 'Thesis' },
  { href: '/#contact', label: 'Contact' },
];

const LINK_STYLES =
  'relative py-1 opacity-70 transition-opacity after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent-text after:transition-transform after:duration-200 hover:opacity-100 hover:after:scale-x-100 dark:after:bg-accent';

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur dark:border-snow/10 dark:bg-canvas/90">
      <nav aria-label="Primary" className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-6 py-4 text-sm">
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
            } absolute inset-x-0 top-full flex-col gap-4 border-b border-ink/10 bg-paper px-6 py-4 dark:border-snow/10 dark:bg-canvas sm:static sm:flex sm:flex-row sm:items-center sm:gap-6 sm:border-0 sm:bg-transparent sm:p-0 sm:dark:bg-transparent`}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setOpen(false)} className={LINK_STYLES}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li aria-hidden="true" className="hidden h-4 w-px bg-ink/15 dark:bg-snow/15 sm:block" />
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
