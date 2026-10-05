'use client';

import { useEffect, useRef, useState } from 'react';
import { site } from '@/lib/site';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    return () => {
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('submitting');

    try {
      const response = await fetch(site.contactFormAction, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        form.reset();
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }

    idleTimeoutRef.current = setTimeout(() => setStatus('idle'), 4000);
  }

  return (
    <section id="contact" className="mx-auto max-w-2xl px-6 py-16">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] opacity-60">Contact</h2>
      <p className="mt-4 text-lg">
        Have a project or role in mind?{' '}
        <a href={`mailto:${site.email}`} className="underline">
          {site.email}
        </a>
      </p>
      <form ref={formRef} onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 w-full rounded-md border border-ink/20 bg-transparent px-3 py-2 dark:border-snow/20"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-md border border-ink/20 bg-transparent px-3 py-2 dark:border-snow/20"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="mt-1 w-full rounded-md border border-ink/20 bg-transparent px-3 py-2 dark:border-snow/20"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="rounded-full bg-ink px-6 py-2 font-semibold text-paper disabled:opacity-60 dark:bg-snow dark:text-canvas"
        >
          {status === 'submitting' ? 'Sending...' : 'Send message'}
        </button>
      </form>

      <div
        role="status"
        aria-live="polite"
        className={`fixed inset-x-0 bottom-6 z-50 mx-auto w-fit rounded-full px-5 py-2.5 text-sm font-medium shadow-lg transition-all duration-300 ${
          status === 'success' || status === 'error'
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-4 opacity-0'
        } ${status === 'error' ? 'bg-red-600 text-white' : 'bg-ink text-paper dark:bg-snow dark:text-canvas'}`}
      >
        {status === 'error' ? "Something went wrong - please try again or email me directly." : 'Message sent successfully!'}
      </div>
    </section>
  );
}
