import { RevealOnScroll } from '@/components/RevealOnScroll';

interface HeroProps {
  name: string;
  role: string;
  description: string;
}

export function Hero({ name, role, description }: HeroProps) {
  return (
    <section id="about" className="mx-auto max-w-2xl px-6 pb-16 pt-20">
      <RevealOnScroll>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-text dark:text-accent">{role}</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{name}</h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed opacity-80">{description}</p>
        <div className="mt-8 flex gap-4 text-sm">
          <a href="#projects" className="rounded-full bg-ink px-5 py-2 font-semibold text-paper dark:bg-snow dark:text-canvas">
            View projects
          </a>
          <a href="#contact" className="rounded-full border border-ink/30 px-5 py-2 dark:border-snow/30">
            Contact
          </a>
        </div>
      </RevealOnScroll>
    </section>
  );
}
