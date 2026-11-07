import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from './Navbar';

const nav = vi.hoisted(() => ({ pathname: '/', section: null as string | null }));

vi.mock('next/navigation', () => ({ usePathname: () => nav.pathname }));
vi.mock('./useActiveSection', () => ({ useActiveSection: () => nav.section }));

beforeEach(() => {
  nav.pathname = '/';
  nav.section = null;
});

function renderNavbar() {
  return render(
    <ThemeProvider>
      <Navbar />
    </ThemeProvider>,
  );
}

describe('Navbar', () => {
  it('has an accessible primary navigation landmark', () => {
    renderNavbar();
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
  });

  it('links to every homepage section with a root-relative anchor', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '/#experience');
    expect(screen.getByRole('link', { name: 'Education' })).toHaveAttribute('href', '/#education');
    expect(screen.getByRole('link', { name: 'Skills' })).toHaveAttribute('href', '/#skills');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/#projects');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/#contact');
  });

  it('links the resume to the CV PDF in a new tab', () => {
    renderNavbar();
    const resumeLink = screen.getByRole('link', { name: 'Resume' });
    expect(resumeLink).toHaveAttribute('href', '/cv.pdf');
    expect(resumeLink).toHaveAttribute('target', '_blank');
  });

  it('links Thesis to the home page thesis section', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: 'Thesis' })).toHaveAttribute('href', '/#thesis');
  });

  it('keeps the logo and theme toggle outside the collapsible link list', () => {
    renderNavbar();
    const list = document.getElementById('primary-nav-links')!;
    expect(list).not.toContainElement(screen.getByRole('link', { name: 'MD.' }));
    expect(list).not.toContainElement(screen.getByRole('button', { name: /mode$/ }));
  });

  it('renders every nav link in the DOM even while the mobile menu is collapsed', () => {
    renderNavbar();
    const toggle = screen.getByRole('button', { name: 'Toggle navigation menu' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveAttribute('aria-controls', 'primary-nav-links');

    const list = document.getElementById('primary-nav-links')!;
    // Collapsed below `sm`, visible from `sm` up — but always in the DOM.
    expect(list.className).toContain('hidden');
    expect(list.className).toContain('sm:flex');
    expect(list.querySelectorAll('a')).toHaveLength(7);
  });

  it('expands and collapses the mobile menu when the toggle is pressed', () => {
    renderNavbar();
    const toggle = screen.getByRole('button', { name: 'Toggle navigation menu' });
    const list = document.getElementById('primary-nav-links')!;

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(list.className).toContain('flex');
    expect(list.className).not.toContain('hidden');

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(list.className).toContain('hidden');
  });

  describe('active link', () => {
    const currentLinks = () =>
      screen.getAllByRole('link').filter((link) => link.getAttribute('aria-current') === 'location');

    it('highlights nothing before any nav section is reached', () => {
      renderNavbar();
      expect(currentLinks()).toHaveLength(0);
    });

    it('highlights the link for the homepage section being read', () => {
      nav.section = 'skills';
      renderNavbar();
      expect(currentLinks().map((link) => link.textContent)).toEqual(['Skills']);
    });

    it('highlights nothing while reading a section that has no nav link', () => {
      nav.section = 'recommendations';
      renderNavbar();
      expect(currentLinks()).toHaveLength(0);
    });

    it('marks the active link visually as well as for assistive tech', () => {
      nav.section = 'contact';
      renderNavbar();
      expect(screen.getByRole('link', { name: 'Contact' }).className).toContain('after:scale-x-100');
      expect(screen.getByRole('link', { name: 'Skills' }).className).toContain('after:scale-x-0');
    });

    it.each([
      ['/projects', 'Projects'],
      ['/projects/emporia', 'Projects'],
      ['/thesis', 'Thesis'],
    ])('highlights the matching link on %s', (pathname, label) => {
      nav.pathname = pathname;
      renderNavbar();
      expect(currentLinks().map((link) => link.textContent)).toEqual([label]);
    });

    it('ignores the scroll position on pages that are not the homepage', () => {
      nav.pathname = '/projects';
      nav.section = 'skills';
      renderNavbar();
      expect(currentLinks().map((link) => link.textContent)).toEqual(['Projects']);
    });
  });
});
