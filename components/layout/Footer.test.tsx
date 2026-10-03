import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('shows a mailto link with the real contact email', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'moinuddinmd067@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:moinuddinmd067@gmail.com',
    );
  });

  it('links to LinkedIn and GitHub', () => {
    render(<Footer />);
    expect(screen.getByLabelText('LinkedIn')).toHaveAttribute('href', 'https://www.linkedin.com/in/md-moinuddin-192057148/');
    expect(screen.getByLabelText('GitHub')).toHaveAttribute('href', 'https://github.com/MD-Moinuddin');
  });

  it('does not include the broken Xing link from the old site', () => {
    render(<Footer />);
    expect(screen.queryByLabelText('Xing')).not.toBeInTheDocument();
  });
});
