import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectLinks } from './ProjectLinks';

describe('ProjectLinks', () => {
  it('shows a live link and a code link that open in a new tab', () => {
    render(<ProjectLinks project={{ liveUrl: 'https://live.example', githubUrl: 'https://github.com/x/y' }} />);
    const live = screen.getByRole('link', { name: /View live/ });
    const code = screen.getByRole('link', { name: /View code/ });
    expect(live).toHaveAttribute('href', 'https://live.example');
    expect(code).toHaveAttribute('href', 'https://github.com/x/y');
    [live, code].forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAccessibleName(/opens in a new tab/);
    });
  });

  it('uses a custom label for the live link', () => {
    render(<ProjectLinks project={{ liveUrl: 'https://live.example', liveLabel: 'Try the demo' }} />);
    expect(screen.getByRole('link', { name: /Try the demo/ })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /View live/ })).toBeNull();
  });

  it('omits links that have no URL, and renders nothing when there are none', () => {
    const { container, rerender } = render(<ProjectLinks project={{ githubUrl: 'https://github.com/x/y' }} />);
    expect(screen.queryByRole('link', { name: /View live/ })).toBeNull();
    rerender(<ProjectLinks project={{}} />);
    expect(container).toBeEmptyDOMElement();
  });
});
