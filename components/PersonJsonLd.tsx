import { about } from '@/lib/data/about';
import { education } from '@/lib/data/education';
import { skillGroups } from '@/lib/data/skills';
import { site } from '@/lib/site';

export function PersonJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    url: site.url,
    image: `${site.url}${about.photo}`,
    jobTitle: 'Software Engineer',
    description: site.description,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location.locality,
      addressCountry: site.location.country,
    },
    knowsLanguage: site.languages,
    alumniOf: education.map((entry) => ({ '@type': 'EducationalOrganization', name: entry.institution })),
    knowsAbout: skillGroups.flatMap((group) => group.items),
    sameAs: [site.social.linkedin, site.social.github],
  };

  // Escaping `<` keeps a stray "</script>" in the data from breaking out of the tag (see the Next.js JSON-LD guide).
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
