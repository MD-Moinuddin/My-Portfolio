import Link from 'next/link';
import { RevealOnScroll } from '@/components/RevealOnScroll';

const HIGHLIGHTS = [
  { value: '~5,300', label: 'requests / second' },
  { value: '~3 ms', label: 'latency floor' },
  { value: '~5 s', label: 'leader failure recovery' },
];

export function Thesis() {
  return (
    <section id="thesis" className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] opacity-60">Master thesis</h2>
      <RevealOnScroll>
        <div className="group relative mt-6 rounded-2xl border border-ink/10 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-text hover:shadow-lg hover:shadow-ink/5 sm:p-6 dark:border-snow/10 dark:bg-white/[0.03] dark:hover:border-accent dark:hover:shadow-snow/5">
          <p className="text-xs opacity-60">Otto-Friedrich-Universität Bamberg</p>
          <h3 className="mt-1 text-lg font-semibold">
            <Link href="/thesis" className="after:absolute after:inset-0 group-hover:underline">
              Adapting Stream-Based State-Machine Replication to Apache Flink (Gumti)
            </Link>
          </h3>
          <p className="mt-2 text-sm leading-relaxed opacity-75">
            A full realization of the TARA state-machine replication protocol as a distributed Apache Flink job,
            built to test whether a protocol expressed as a dataflow generalizes beyond its original engine.
          </p>
          <dl className="mt-5 grid grid-cols-3 gap-3">
            {HIGHLIGHTS.map((item) => (
              <div key={item.label} className="flex flex-col-reverse justify-end">
                <dt className="mt-0.5 text-xs opacity-60">{item.label}</dt>
                <dd className="text-lg font-bold text-accent-text sm:text-2xl dark:text-accent">{item.value}</dd>
              </div>
            ))}
          </dl>
          <div className="relative mt-6 flex flex-wrap gap-3 text-sm">
            <Link
              href="/thesis"
              className="rounded-full border border-ink bg-ink px-5 py-2 font-semibold text-paper dark:border-snow dark:bg-snow dark:text-canvas"
            >
              Read more
            </Link>
            <a
              href="https://github.com/MD-Moinuddin/Masters-Thesis"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-ink/30 px-5 py-2 transition-colors hover:bg-ink/5 dark:border-snow/30 dark:hover:bg-snow/5"
            >
              View code
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
