import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur dark:border-snow/10 dark:bg-canvas/90">
      <nav aria-label="Primary" className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4 text-sm">
        <Link href="/" className="font-semibold tracking-widest">
          MD.
        </Link>
        <ul className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
          <li>
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="rounded-full border border-accent-text px-3 py-1 text-xs dark:border-accent">
              Resume
            </a>
          </li>
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
}
