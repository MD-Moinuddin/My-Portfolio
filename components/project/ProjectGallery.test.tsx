import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element -- test stub for next/image
    <img alt={alt} src={src} />
  ),
}));

import { ProjectGallery } from './ProjectGallery';

describe('ProjectGallery', () => {
  it('shows each screenshot with its alt text, linking to the full-size image in a new tab', () => {
    render(
      <ProjectGallery
        screenshots={[
          { src: '/images/projects/a.png', alt: 'Dashboard' },
          { src: '/images/projects/b.png', alt: 'Week view' },
        ]}
      />,
    );
    expect(screen.getByRole('heading', { name: 'Screenshots' })).toBeInTheDocument();
    const dashboard = screen.getByRole('link', { name: /Dashboard/ });
    expect(dashboard).toHaveAttribute('href', '/images/projects/a.png');
    expect(dashboard).toHaveAttribute('target', '_blank');
    expect(screen.getByRole('img', { name: 'Week view' })).toBeInTheDocument();
  });

  it('renders nothing when there are no screenshots', () => {
    const { container, rerender } = render(<ProjectGallery screenshots={[]} />);
    expect(container).toBeEmptyDOMElement();
    rerender(<ProjectGallery />);
    expect(container).toBeEmptyDOMElement();
  });
});
