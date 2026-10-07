import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Master Thesis',
  description:
    "Gumti: a full realization of the TARA state-machine replication protocol on Apache Flink, built for my Master's thesis at Otto-Friedrich-Universität Bamberg.",
};

export default function ThesisPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-text dark:text-accent">
        Master Thesis · Otto-Friedrich-Universität Bamberg
      </p>
      <h1 className="mt-3 text-3xl font-bold">Adapting Stream-Based State-Machine Replication to Apache Flink (Gumti)</h1>
      <p className="mt-2 text-lg opacity-70">
        A full realization of the TARA state-machine replication protocol as a distributed Apache Flink job.
      </p>

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide opacity-60">Overview</h2>
          <p className="mt-2 leading-relaxed">
            For my Master&apos;s thesis at Otto-Friedrich-Universität Bamberg, I studied whether TARA, a state-machine
            replication protocol expressed as a stream-processing dataflow, generalizes beyond the engine it
            was originally designed for.
          </p>
        </section>
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide opacity-60">My Contribution</h2>
          <p className="mt-2 leading-relaxed">
            I designed and engineered Gumti, a full realization on Apache Flink, contributing on three fronts:
          </p>
          <ul className="mt-2 list-disc list-outside space-y-1.5 pl-4 leading-relaxed marker:text-accent-text dark:marker:text-accent">
            <li>
              Design: mapping the protocol&apos;s nodes onto Flink&apos;s operator model, solving what Flink
              lacks - engineered-key routing, ZooKeeper replica discovery, and network feedback loops around
              its acyclic dataflow.
            </li>
            <li>
              Engineering: a substantial Java implementation of the consensus, view-change, and
              garbage-collection sub-protocols as one distributed Flink job.
            </li>
            <li>Evaluation: a systematic study of throughput, latency, and fault tolerance under load and injected failures.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide opacity-60">Results</h2>
          <p className="mt-2 leading-relaxed">
            Gumti sustains ~5,300 req/s at a ~3 ms latency floor and recovers from leader failures in ~5 s with
            no requests lost, showing a single engine parameter can shape performance as much as the protocol
            itself.
          </p>
        </section>
      </div>

      <div className="mt-10 flex gap-4 text-sm">
        <a
          href="https://github.com/MD-Moinuddin/Masters-Thesis"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-ink/30 px-5 py-2 dark:border-snow/30"
        >
          View code
        </a>
      </div>
    </article>
  );
}
