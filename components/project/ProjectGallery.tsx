import Image from 'next/image';
import type { ProjectScreenshot } from '@/lib/data/projects';

export function ProjectGallery({ screenshots }: { screenshots?: ProjectScreenshot[] }) {
  if (!screenshots || screenshots.length === 0) return null;

  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-wide opacity-60">Screenshots</h2>
      <ul className="mt-3 grid gap-4 sm:grid-cols-2">
        {screenshots.map((shot) => (
          <li key={shot.src}>
            <a
              href={shot.src}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-video overflow-hidden rounded-xl border border-ink/10 bg-ink/5 transition-all duration-200 hover:border-accent-text dark:border-snow/10 dark:bg-snow/5 dark:hover:border-accent"
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(max-width: 640px) 100vw, 336px"
                className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <span className="sr-only"> (opens the full-size image in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
