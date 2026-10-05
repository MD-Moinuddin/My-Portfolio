'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

// Root-relative hrefs so the section anchors also work from /projects and /projects/[slug].
// Kept as two groups: SECONDARY links are page-scroll shortcuts a visitor passes through
// anyway while scrolling the homepage, so they're worth hiding behind "More" on desktop to
// keep the bar from feeling crowded. PRIMARY links are the ones worth keeping one click away.
const SECONDARY_LINKS = [
  { href: '/#experience', label: 'Experience' },
  { href: '/#education', label: 'Education' },
  { href: '/#skills', label: 'Skills' },
];

const PRIMARY_LINKS = [
  { href: '/#projects', label: 'Projects' },
  { href: '/thesis', label: 'Thesis' },
  { href: '/#contact', label: 'Contact' },
];

const ALL_LINKS = [...SECONDARY_LINKS, ...PRIMARY_LINKS];

const LINK_STYLES =
  'relative py-1 opacity-70 transition-opacity after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent-text after:transition-transform after:duration-200 hover:opacity-100 hover:after:scale-x-100 dark:after:bg-accent';

function ResumeLink({ onClick }: { onClick?: () => void }) {
  return (
    <a
      href="/cv.pdf"
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="inline-block rounded-full border border-accent-text px-3 py-1 text-xs transition-colors hover:bg-accent-text/10 dark:border-accent dark:hover:bg-accent/10"
    >
      Resume
    </a>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur dark:border-snow/10 dark:bg-canvas/90">
      <nav aria-label="Primary" className="relative mx-auto flex max-w-2xl items-center justify-between gap-4 px-6 py-4 text-sm">
        <Link
          href="/"
          className="bg-gradient-to-r from-ink to-accent-text bg-clip-text text-lg font-bold tracking-tight text-transparent dark:from-snow dark:to-accent"
        >
          MD.
        </Link>

        {/* Desktop only (`sm` and up): the 3 links worth keeping visible, a "More" dropdown
            for the rest, a divider, then Resume. Entirely hidden below `sm` in favor of the
            single mobile menu to the right. */}
        <div id="desktop-nav" className="hidden items-center gap-8 sm:flex">
          {PRIMARY_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={LINK_STYLES}>
              {link.label}
            </Link>
          ))}

          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((previous) => !previous)}
              aria-expanded={moreOpen}
              aria-controls="more-nav-links"
              className="flex items-center gap-1.5 opacity-70 transition-opacity hover:opacity-100"
            >
              More
              <span aria-hidden="true" className={`transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`}>
                ⌄
              </span>
            </button>
            <ul
              id="more-nav-links"
              className={`${
                moreOpen ? 'flex' : 'hidden'
              } absolute right-0 top-full mt-3 flex-col gap-3 rounded-lg border border-ink/10 bg-paper px-4 py-3 shadow-lg dark:border-snow/10 dark:bg-canvas`}
            >
              {SECONDARY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={() => setMoreOpen(false)} className="block whitespace-nowrap opacity-70 hover:opacity-100">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <span aria-hidden="true" className="h-4 w-px bg-ink/15 dark:bg-snow/15" />
          <ResumeLink />
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileOpen((previous) => !previous)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-links"
            aria-label="Toggle navigation menu"
            className="rounded-full border border-ink/30 px-3 py-1 text-xs sm:hidden dark:border-snow/30"
          >
            Menu
          </button>
        </div>

        {/* Mobile only (below `sm`): every link flat in one list, since there's no reason to
            nest a "More" accordion inside an already-open drawer. Always in the DOM; `sm:hidden`
            keeps it off-screen at the desktop breakpoint regardless of open state. */}
        <ul
          id="mobile-nav-links"
          className={`${
            mobileOpen ? 'flex' : 'hidden'
          } absolute inset-x-0 top-full flex-col gap-4 border-b border-ink/10 bg-paper px-6 py-4 dark:border-snow/10 dark:bg-canvas sm:hidden`}
        >
          {ALL_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={() => setMobileOpen(false)} className={LINK_STYLES}>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <ResumeLink onClick={() => setMobileOpen(false)} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
