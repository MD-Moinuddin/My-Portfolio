import { site } from '@/lib/site';

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-2xl px-6 py-16">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] opacity-60">Contact</h2>
      <p className="mt-4 text-lg">
        Have a project or role in mind?{' '}
        <a href={`mailto:${site.email}`} className="underline">
          {site.email}
        </a>
      </p>
      <form action={site.contactFormAction} method="POST" className="mt-8 space-y-4">
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
        <button type="submit" className="rounded-full bg-ink px-6 py-2 font-semibold text-paper dark:bg-snow dark:text-canvas">
          Send message
        </button>
      </form>
    </section>
  );
}
