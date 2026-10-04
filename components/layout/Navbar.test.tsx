import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from './Navbar';

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

  it('links the highlighted Master Thesis button to /thesis', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: 'Master Thesis' })).toHaveAttribute('href', '/thesis');
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
    expect(list.querySelectorAll('a')).toHaveLength(6);
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
});
