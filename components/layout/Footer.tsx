import { site } from '@/lib/site';

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: site.social.linkedin },
  { label: 'GitHub', href: site.social.github },
];

export function Footer() {
  return (
    <footer className="border-t border-ink/10 py-10 text-center text-sm dark:border-snow/10">
      <a href={`mailto:${site.email}`} className="underline">
        {site.email}
      </a>
      <ul className="mt-4 flex justify-center gap-4">
        {SOCIAL_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} aria-label={link.label} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-6 opacity-60">© {new Date().getFullYear()} {site.name}</p>
    </footer>
  );
}
