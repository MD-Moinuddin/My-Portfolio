import { describe, it, expect } from 'vitest';
import { render, screen, within, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from './Navbar';

function renderNavbar() {
  return render(
    <ThemeProvider>
      <Navbar />
    </ThemeProvider>,
  );
}

function getDesktopNav() {
  return document.getElementById('desktop-nav')!;
}

function getMorePanel() {
  return document.getElementById('more-nav-links')!;
}

function getMobilePanel() {
  return document.getElementById('mobile-nav-links')!;
}

describe('Navbar', () => {
  it('has an accessible primary navigation landmark', () => {
    renderNavbar();
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
  });

  it('keeps Projects, Thesis, and Contact inline in the desktop nav', () => {
    renderNavbar();
    const desktop = within(getDesktopNav());
    expect(desktop.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/#projects');
    expect(desktop.getByRole('link', { name: 'Thesis' })).toHaveAttribute('href', '/thesis');
    expect(desktop.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/#contact');
  });

  it('hides Experience, Education, and Skills behind a "More" dropdown on desktop', () => {
    renderNavbar();
    const moreButton = within(getDesktopNav()).getByRole('button', { name: /More/ });
    expect(moreButton).toHaveAttribute('aria-expanded', 'false');

    const morePanel = getMorePanel();
    expect(morePanel.className).toContain('hidden');

    fireEvent.click(moreButton);
    expect(moreButton).toHaveAttribute('aria-expanded', 'true');
    expect(morePanel.className).toContain('flex');

    const more = within(morePanel);
    expect(more.getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '/#experience');
    expect(more.getByRole('link', { name: 'Education' })).toHaveAttribute('href', '/#education');
    expect(more.getByRole('link', { name: 'Skills' })).toHaveAttribute('href', '/#skills');
  });

  it('closes the "More" dropdown after clicking one of its links', () => {
    renderNavbar();
    const moreButton = within(getDesktopNav()).getByRole('button', { name: /More/ });
    fireEvent.click(moreButton);
    const morePanel = getMorePanel();

    fireEvent.click(within(morePanel).getByRole('link', { name: 'Experience' }));
    expect(moreButton).toHaveAttribute('aria-expanded', 'false');
    expect(morePanel.className).toContain('hidden');
  });

  it('links the resume to the CV PDF in a new tab, both inline and in the mobile menu', () => {
    renderNavbar();
    const resumeLinks = screen.getAllByRole('link', { name: 'Resume' });
    expect(resumeLinks).toHaveLength(2);
    resumeLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', '/cv.pdf');
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  it('keeps the logo and theme toggle outside both collapsible link lists', () => {
    renderNavbar();
    const mobilePanel = getMobilePanel();
    const morePanel = getMorePanel();
    const logo = screen.getByRole('link', { name: 'MD.' });
    const toggle = screen.getByRole('button', { name: /mode$/ });
    expect(mobilePanel).not.toContainElement(logo);
    expect(mobilePanel).not.toContainElement(toggle);
    expect(morePanel).not.toContainElement(logo);
    expect(morePanel).not.toContainElement(toggle);
  });

  it('renders every link (6 sections + Resume) in the mobile menu even while collapsed', () => {
    renderNavbar();
    const toggle = screen.getByRole('button', { name: 'Toggle navigation menu' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveAttribute('aria-controls', 'mobile-nav-links');

    const mobilePanel = getMobilePanel();
    const classes = mobilePanel.className.split(/\s+/);
    // Collapsed below `sm`, hidden entirely at `sm` and up (regardless of toggle state) — but always in the DOM.
    expect(classes).toContain('hidden');
    expect(classes).toContain('sm:hidden');
    expect(mobilePanel.querySelectorAll('a')).toHaveLength(7);
  });

  it('expands and collapses the mobile menu when the toggle is pressed', () => {
    renderNavbar();
    const toggle = screen.getByRole('button', { name: 'Toggle navigation menu' });
    const mobilePanel = getMobilePanel();

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    let classes = mobilePanel.className.split(/\s+/);
    expect(classes).toContain('flex');
    expect(classes).not.toContain('hidden');
    expect(classes).toContain('sm:hidden');

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    classes = mobilePanel.className.split(/\s+/);
    expect(classes).toContain('hidden');
  });
});
