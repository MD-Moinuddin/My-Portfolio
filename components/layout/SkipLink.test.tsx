import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SkipLink } from './SkipLink';

describe('SkipLink', () => {
  it('links to the #main landmark', () => {
    render(<SkipLink />);
    expect(screen.getByText('Skip to main content')).toHaveAttribute('href', '#main');
  });
});
