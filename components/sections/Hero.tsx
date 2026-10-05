import { RevealOnScroll } from '@/components/RevealOnScroll';

interface HeroProps {
  name: string;
  role: string;
  description: string;
  availability?: string;
}

export function Hero({ name, role, description, availability }: HeroProps) {
  return (
    <section id="about" className="mx-auto max-w-2xl px-6 pb-16 pt-20">
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
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
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
            href="#contact"
            className="rounded-full border border-ink/30 px-5 py-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/60 hover:bg-ink/5 dark:border-snow/30 dark:hover:border-snow/60 dark:hover:bg-snow/5"
          >
            Contact
          </a>
        </div>
      </RevealOnScroll>
    </section>
  );
}
