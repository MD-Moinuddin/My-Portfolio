import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Message Sent',
  description: 'Your message has been sent successfully.',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="text-3xl font-bold">Form submitted successfully</h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed opacity-70">
        Thanks for reaching out - your message has been sent. I&apos;ll get back to you soon.
      </p>
      <Link
        href="/#contact"
        className="mt-8 rounded-full bg-ink px-6 py-2 font-semibold text-paper dark:bg-snow dark:text-canvas"
      >
        Back
      </Link>
    </section>
  );
}
