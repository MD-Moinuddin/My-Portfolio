'use client';

import { useEffect, useRef, useState } from 'react';
import { site } from '@/lib/site';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const fieldClass =
  'mt-1.5 w-full rounded-xl border border-ink/15 bg-ink/[0.04] px-3.5 py-2.5 outline-none transition-colors placeholder:opacity-50 focus:border-accent-text focus:ring-2 focus:ring-accent-text/25 dark:border-snow/15 dark:bg-snow/[0.04] dark:focus:border-accent dark:focus:ring-accent/25';
const itemClass =
  'flex items-center gap-3 rounded-xl border border-ink/10 px-3 py-2.5 text-sm transition-all duration-200 hover:-translate-y-px hover:border-accent-text dark:border-snow/10 dark:hover:border-accent';
const iconClass =
  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-text/10 text-accent-text dark:bg-accent/15 dark:text-accent';

function EmailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" />
    </svg>
  );
}

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copiedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    return () => {
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current);
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

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current);
      copiedTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable: the mailto link above still works.
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] opacity-60">Contact</h2>
      <p className="mt-3 bg-gradient-to-r from-ink to-accent-text bg-clip-text text-3xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl dark:from-snow dark:to-accent">
        Let&apos;s work together
      </p>
      <div
        aria-hidden="true"
        className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-accent-text to-accent dark:from-accent dark:to-accent-text"
      />
      <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed opacity-80">
        Have a project or role in mind? Send a message or reach out directly. I&apos;m happy to talk about software
        engineering and web development opportunities.
      </p>
      <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent-text/30 bg-accent-text/5 px-4 py-1.5 text-sm font-medium text-accent-text dark:border-accent/30 dark:bg-accent/5 dark:text-accent">
        <span aria-hidden="true" className="h-2 w-2 animate-pulse rounded-full bg-accent-text dark:bg-accent" />
        {site.availability}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-[5fr_7fr]">
        <div className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-white p-5 dark:border-snow/10 dark:bg-white/[0.03]">
          <div className={`${itemClass} justify-between`}>
            <a href={`mailto:${site.email}`} className="flex min-w-0 flex-1 items-center gap-3">
              <span className={iconClass}>
                <EmailIcon />
              </span>
              <span className="min-w-0">
                <span className="block text-xs opacity-60">Email</span>
                <span className="block break-all font-semibold">{site.email}</span>
              </span>
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="shrink-0 rounded-full border border-ink/20 px-3 py-1 text-xs transition-colors hover:bg-ink/5 dark:border-snow/20 dark:hover:bg-snow/5"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className={itemClass}>
            <span className={iconClass}>
              <LinkedInIcon />
            </span>
            <span>
              <span className="block text-xs opacity-60">LinkedIn</span>
              <span className="block font-semibold">Connect with me</span>
            </span>
          </a>
          <a href={site.social.github} target="_blank" rel="noopener noreferrer" className={itemClass}>
            <span className={iconClass}>
              <GitHubIcon />
            </span>
            <span>
              <span className="block text-xs opacity-60">GitHub</span>
              <span className="block font-semibold">See my code</span>
            </span>
          </a>
          <p className="mt-1 px-1 text-xs opacity-60">Usually replies within 1-2 days.</p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="rounded-2xl border border-ink/10 bg-white p-5 sm:p-6 dark:border-snow/10 dark:bg-white/[0.03]"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Full name
            </label>
            <input id="name" name="name" type="text" required placeholder="Your name" className={fieldClass} />
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email address
            </label>
            <input id="email" name="email" type="email" required placeholder="you@example.com" className={fieldClass} />
          </div>
          <div className="mt-4">
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder="Tell me about your project or role..."
              className={`${fieldClass} min-h-32 resize-y`}
            />
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 font-semibold text-paper transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/10 disabled:opacity-60 dark:bg-snow dark:text-canvas dark:hover:shadow-snow/10"
            >
              {status === 'submitting' ? 'Sending...' : 'Send message'}
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </button>
            <span className="text-xs opacity-60">I&apos;ll get back to you by email.</span>
          </div>
        </form>
      </div>

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
