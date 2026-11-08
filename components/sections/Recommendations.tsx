'use client';

import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { Recommendation } from '@/lib/data/recommendations';
import { site } from '@/lib/site';

interface RecommendationsProps {
  items: Recommendation[];
  /** How long each recommendation stays up while autoplaying. */
  autoplayMs?: number;
}

function initials(name: string) {
  return name
    .replace(/^Md\.?\s+/i, '')
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

function Avatar({ name, className }: { name: string; className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-text to-accent font-bold text-white ${className}`}
    >
      {initials(name)}
    </span>
  );
}

export function Recommendations({ items, autoplayMs = 7000 }: RecommendationsProps) {
  const [active, setActive] = useState(0);
  // Autoplay runs until the visitor interacts, then stops for good. For visitors who prefer
  // reduced motion the progress bar is hidden, so its animation never ends and nothing advances.
  const [autoplay, setAutoplay] = useState(items.length > 1);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tablistRef = useRef<HTMLDivElement>(null);

  // Keep the selected person in view in the strip, however the selection changed (arrows,
  // keys, autoplay). Scrolls only the strip itself, never the page.
  useEffect(() => {
    const list = tablistRef.current;
    const tab = tabRefs.current[active];
    if (!list || !tab || typeof list.scrollTo !== 'function') return;
    const reduceMotion = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    list.scrollTo({
      left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  }, [active]);

  // Don't burn through recommendations while the section is off screen.
  useEffect(() => {
    const element = sectionRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function select(index: number, focus = false) {
    const next = (index + items.length) % items.length;
    setAutoplay(false);
    setActive(next);
    if (focus) tabRefs.current[next]?.focus();
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const moves: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: items.length - 1,
    };
    if (event.key in moves) {
      event.preventDefault();
      select(moves[event.key], true);
    }
  }

  const paused = hovered || !inView;

  return (
    <section ref={sectionRef} id="recommendations" className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] opacity-60">Recommendations</h2>

      <div
        className="mt-8"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-gradient-to-br from-accent-text/10 to-white to-70% p-6 sm:p-8 dark:border-snow/10 dark:from-accent/15 dark:to-white/[0.03]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-2 right-6 font-serif text-[10rem] leading-none text-accent-text/10 dark:text-accent/15"
          >
            “
          </span>
          {/* Every quote sits in the same grid cell, so the card is always as tall as the longest one. */}
          <div className="grid" aria-live={autoplay ? 'off' : 'polite'}>
            {items.map((item, index) => {
              const isActive = index === active;
              return (
                <figure
                  key={item.name}
                  id={`recommendation-panel-${index}`}
                  role="tabpanel"
                  aria-labelledby={`recommendation-tab-${index}`}
                  aria-hidden={!isActive}
                  inert={!isActive}
                  className={`relative col-start-1 row-start-1 flex flex-col transition-opacity duration-300 motion-reduce:transition-none ${
                    isActive ? 'opacity-100' : 'invisible opacity-0'
                  }`}
                >
                  <span className="self-start rounded-full bg-accent-text/10 px-3 py-1 text-xs font-semibold text-accent-text dark:bg-accent/15 dark:text-accent">
                    {item.relationship} · {item.date}
                  </span>
                  <blockquote className="mt-4 max-w-3xl space-y-3 text-base leading-relaxed sm:text-lg">
                    {item.quote.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-3.5 pt-6">
                    <Avatar name={item.name} className="h-12 w-12 text-base" />
                    <span>
                      <span className="block font-semibold">{item.name}</span>
                      <span className="block text-xs leading-snug opacity-65">{item.role}</span>
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
          {autoplay && (
            <div aria-hidden="true" className="mt-5 h-[3px] overflow-hidden rounded-full bg-ink/10 motion-reduce:hidden dark:bg-snow/10">
              <span
                key={active}
                data-testid="autoplay-progress"
                onAnimationEnd={() => setActive((previous) => (previous + 1) % items.length)}
                style={{
                  animation: `rec-progress ${autoplayMs}ms linear forwards`,
                  animationPlayState: paused ? 'paused' : 'running',
                }}
                className="block h-full w-0 bg-gradient-to-r from-accent-text to-accent"
              />
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => select(active - 1)}
            aria-label="Previous recommendation"
            className="h-10 w-10 shrink-0 rounded-full border border-ink/15 transition-colors hover:border-accent-text dark:border-snow/15 dark:hover:border-accent"
          >
            <span aria-hidden="true">←</span>
          </button>
          <div
            ref={tablistRef}
            role="tablist"
            aria-label="Recommendations"
            className="relative flex flex-1 gap-2.5 overflow-x-auto px-1 py-1 [scrollbar-width:none]"
          >
            {items.map((item, index) => {
              const isActive = index === active;
              return (
                <button
                  key={item.name}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  id={`recommendation-tab-${index}`}
                  aria-selected={isActive}
                  aria-controls={`recommendation-panel-${index}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => select(index)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                  className={`flex shrink-0 items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-4 text-left transition-all duration-200 hover:-translate-y-px ${
                    isActive
                      ? 'border-accent-text bg-accent-text/10 ring-2 ring-accent-text/20 dark:border-accent dark:bg-accent/15 dark:ring-accent/20'
                      : 'border-ink/15 bg-white hover:border-accent-text dark:border-snow/15 dark:bg-white/[0.03] dark:hover:border-accent'
                  }`}
                >
                  <Avatar name={item.name} className="h-8 w-8 text-[11px]" />
                  <span className="whitespace-nowrap text-sm font-semibold leading-tight">
                    {item.name.replace(/^Md\.?\s+/i, '')}
                    <span className="block text-[11px] font-normal opacity-60">{item.relationship}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => select(active + 1)}
            aria-label="Next recommendation"
            className="h-10 w-10 shrink-0 rounded-full border border-ink/15 transition-colors hover:border-accent-text dark:border-snow/15 dark:hover:border-accent"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
        <p className="mt-2.5 text-xs opacity-55">
          {active + 1} of {items.length}
        </p>
      </div>

      <a
        href={`${site.social.linkedin}details/recommendations/`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block text-sm underline"
      >
        See the recommendations on LinkedIn
      </a>
    </section>
  );
}
