import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Contact } from './Contact';

describe('Contact', () => {
  it('posts to the Formspree endpoint', () => {
    const { container } = render(<Contact />);
    const form = container.querySelector('form');
    expect(form).toHaveAttribute('action', 'https://formspree.io/f/mqkvbqlw');
    expect(form).toHaveAttribute('method', 'POST');
  });

  it('has labeled, required name/email/message fields', () => {
    render(<Contact />);
    expect(screen.getByLabelText('Full name')).toBeRequired();
    expect(screen.getByLabelText('Email address')).toBeRequired();
    expect(screen.getByLabelText('Message')).toBeRequired();
  });

  it('shows a mailto link with the real contact email', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: 'moinuddinmd067@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:moinuddinmd067@gmail.com',
    );
  });
});
