import { RevealOnScroll } from '@/components/RevealOnScroll';
import { site } from '@/lib/site';

const iconLinkClass =
  'inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/30 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/60 hover:bg-ink/5 dark:border-snow/30 dark:hover:border-snow/60 dark:hover:bg-snow/5';

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" />
    </svg>
  );
}

interface HeroProps {
  name: string;
  role: string;
  description: string;
  availability?: string;
}

export function Hero({ name, role, description, availability }: HeroProps) {
  return (
    <section id="about" className="mx-auto max-w-3xl px-6 pb-16 pt-20">
      <RevealOnScroll>
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-text dark:text-accent">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-text dark:bg-accent" />
          {role}
        </p>
        <h1 className="mt-3 bg-gradient-to-r from-ink to-accent-text bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-6xl dark:from-snow dark:to-accent">
          {name}
        </h1>
        <div
          aria-hidden="true"
          className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-accent-text to-accent dark:from-accent dark:to-accent-text"
        />
        <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed opacity-80">{description}</p>
        {availability && (
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent-text/30 bg-accent-text/5 px-4 py-1.5 text-sm font-medium text-accent-text dark:border-accent/30 dark:bg-accent/5 dark:text-accent">
            <span aria-hidden="true" className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-text/60 dark:bg-accent/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-text dark:bg-accent" />
            </span>
            {availability}
          </div>
        )}
        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-semibold text-paper transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/10 dark:bg-snow dark:text-canvas dark:hover:shadow-snow/10"
          >
            View projects
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={iconLinkClass}
          >
            <LinkedInIcon />
          </a>
          <a
            href={site.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={iconLinkClass}
          >
            <GitHubIcon />
          </a>
        </div>
      </RevealOnScroll>
    </section>
  );
}
