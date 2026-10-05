import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Contact } from './Contact';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('Contact', () => {
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

  it('submits via fetch to the Formspree endpoint, shows a success toast, and clears the form without navigating', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);

    const { container } = render(<Contact />);
    fireEvent.change(screen.getByLabelText('Full name'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello there' } });

    fireEvent.submit(container.querySelector('form')!);

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent('Message sent successfully!');
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe('https://formspree.io/f/mqkvbqlw');
    expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: 'POST' });
    expect(screen.getByLabelText('Full name')).toHaveValue('');
    expect(screen.getByLabelText('Email address')).toHaveValue('');
    expect(screen.getByLabelText('Message')).toHaveValue('');
  });

  it('shows an error toast when the submission fails, without clearing the form', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false });
    vi.stubGlobal('fetch', fetchMock);

    const { container } = render(<Contact />);
    fireEvent.change(screen.getByLabelText('Full name'), { target: { value: 'Jane Doe' } });

    fireEvent.submit(container.querySelector('form')!);

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/went wrong/i);
    });

    expect(screen.getByLabelText('Full name')).toHaveValue('Jane Doe');
  });
});
