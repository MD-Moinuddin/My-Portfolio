import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ThankYouPage, { metadata } from './page';

describe('ThankYouPage', () => {
  it('shows the success message', () => {
    render(<ThankYouPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Form submitted successfully' })).toBeInTheDocument();
  });

  it('links the Back button to the contact section', () => {
    render(<ThankYouPage />);
    expect(screen.getByRole('link', { name: 'Back' })).toHaveAttribute('href', '/#contact');
  });

  it('sets the page title to "Message Sent"', () => {
    expect(metadata.title).toBe('Message Sent');
  });
});
