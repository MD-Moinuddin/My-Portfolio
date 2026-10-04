import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Master Thesis',
  description:
    "Gumti: a full realization of the TARA state-machine replication protocol on Apache Flink, built for my Master's thesis at the University of Bamberg.",
};

export default function ThesisPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-text dark:text-accent">
        Master Thesis · Otto-Friedrich-Universität Bamberg
      </p>
      <h1 className="mt-3 text-3xl font-bold">Gumti</h1>
      <p className="mt-2 text-lg opacity-70">
        A full realization of the TARA state-machine replication protocol as a distributed Apache Flink job.
      </p>

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide opacity-60">Overview</h2>
          <p className="mt-2 leading-relaxed">
            For my Master&apos;s thesis at the University of Bamberg, I studied whether TARA - a state-machine
            replication protocol expressed as a stream-processing dataflow - generalizes beyond the engine it
            was originally designed for. I designed and engineered Gumti, a full realization of that protocol
            on Apache Flink, covering its design, engineering, and evaluation.
          </p>
        </section>
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide opacity-60">Results</h2>
          <p className="mt-2 leading-relaxed">
            Gumti sustains ~5,300 requests/second at a ~3ms latency floor and recovers from leader failures in
            under 5 seconds with zero request loss - showing that a single engine parameter can shape
            performance as much as the protocol itself.
          </p>
        </section>
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide opacity-60">Full write-up</h2>
          <p className="mt-2 leading-relaxed">
            The full thesis details, source code, and benchmarks are being added here - check back soon, or
            reach out directly in the meantime.
          </p>
        </section>
      </div>
    </article>
  );
}
