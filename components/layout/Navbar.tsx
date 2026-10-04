'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

// Root-relative hrefs so the section anchors also work from /projects and /projects/[slug].
const NAV_LINKS = [
  { href: '/#experience', label: 'Experience' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#contact', label: 'Contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur dark:border-snow/10 dark:bg-canvas/90">
      <nav aria-label="Primary" className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-6 py-4 text-sm">
        <Link href="/" className="font-semibold tracking-widest">
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
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/thesis"
                onClick={() => setOpen(false)}
                className="inline-block rounded-full bg-accent-text px-3 py-1 text-xs font-semibold text-paper dark:bg-accent dark:text-canvas"
              >
                Master Thesis
              </Link>
            </li>
            <li>
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-block rounded-full border border-accent-text px-3 py-1 text-xs dark:border-accent"
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
