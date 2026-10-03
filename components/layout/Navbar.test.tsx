import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  it('has an accessible primary navigation landmark', () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>,
    );
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
  });

  it('links to every homepage section', () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>,
    );
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '#about');
    expect(screen.getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '#experience');
    expect(screen.getByRole('link', { name: 'Skills' })).toHaveAttribute('href', '#skills');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact');
  });

  it('links the resume to the CV PDF in a new tab', () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>,
    );
    const resumeLink = screen.getByRole('link', { name: 'Resume' });
    expect(resumeLink).toHaveAttribute('href', '/cv.pdf');
    expect(resumeLink).toHaveAttribute('target', '_blank');
  });
});
