import { RevealOnScroll } from '@/components/RevealOnScroll';

interface HeroProps {
  name: string;
  role: string;
  description: string;
  bio?: string[];
  expertise?: string[];
  languages?: string;
}

export function Hero({ name, role, description, bio, expertise, languages }: HeroProps) {
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

      {bio && bio.length > 0 && (
        <RevealOnScroll>
          <div className="mt-10 space-y-5 text-base leading-relaxed opacity-90">
            {bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {expertise && expertise.length > 0 && (
            <>
              <h2 className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] opacity-60">Key Expertise</h2>
              <ul className="mt-4 list-disc list-outside space-y-1.5 pl-4 text-sm opacity-80 marker:text-accent-text dark:marker:text-accent">
                {expertise.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {languages && <p className="mt-6 text-sm opacity-70">{languages}</p>}
        </RevealOnScroll>
      )}
    </section>
  );
}
