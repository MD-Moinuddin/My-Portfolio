import type { Metadata } from 'next';
import Link from 'next/link';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { Figure } from '@/components/thesis/Figure';

export const metadata: Metadata = {
  title: 'Master Thesis',
  alternates: { canonical: '/thesis' },
  description:
    "Gumti: a full realization of the TARA state-machine replication protocol on Apache Flink, built for my Master's thesis at Otto-Friedrich-Universität Bamberg.",
};

const CODE_URL = 'https://github.com/MD-Moinuddin/Masters-Thesis';
const NEW_TAB = <span className="sr-only"> (opens in a new tab)</span>;

const tags = ['Apache Flink', 'Java', 'ZooKeeper', 'Distributed systems'];

const stats = [
  { value: '~5,300', label: 'requests per second' },
  { value: '~3 ms', label: 'latency floor' },
  { value: '~5 s', label: 'to recover from a leader failure' },
  { value: '0', label: 'requests lost during recovery' },
];

const steps = [
  'Identify the differences between Flink and Heron with respect to stream-based replication.',
  'Adapt the concept where necessary so it is compatible with Flink.',
  'Implement the Tara protocol on Flink.',
  "Evaluate the resulting prototype in comparison to Tara's Heron-based implementation.",
];

const gaps = [
  {
    name: 'Engineered-key routing',
    problem: "Flink's keyBy hashes a key to one instance, so you can't address a chosen replica or reach all of them.",
    solution:
      'Precompute, per replica, a key whose hash lands on exactly that subtask, and emit one such copy for each replica.',
  },
  {
    name: 'ZooKeeper replica discovery',
    problem: "Flink never tells an operator the network address of another operator's external endpoint.",
    solution: 'Each replica registers its host:port in ZooKeeper at startup and the others look it up there, like a shared address book.',
  },
  {
    name: 'Feedback loops around an acyclic dataflow',
    problem: "The protocol needs loops, but a Flink graph can't contain a cycle.",
    solution: 'Close each loop outside Flink: a sink sends the message over the network to a source, which re-injects it into the dataflow.',
  },
];

const differences = [
  {
    name: 'Routing',
    text: "Heron routes each tuple to a designated receiver. Flink's keyBy only hashes a key to one instance.",
  },
  {
    name: 'Acyclic graphs',
    text: "Heron closes the protocol's feedback loops inside the framework. A Flink dataflow must be acyclic.",
  },
  {
    name: 'Discovery',
    text: "Heron's runtime provides instance discovery. Flink doesn't expose network endpoints outside the dataflow.",
  },
];

const cardClass =
  'rounded-2xl border border-ink/10 bg-white p-6 shadow-sm shadow-ink/[0.03] dark:border-snow/10 dark:bg-white/[0.03] dark:shadow-none';
const h2Class = 'mt-14 text-2xl font-bold';
const labelClass = 'text-xs font-semibold uppercase tracking-wide text-accent-text dark:text-accent';

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-text/10 text-accent-text dark:bg-accent/15 dark:text-accent"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        {children}
      </svg>
    </span>
  );
}

export default function ThesisPage() {
  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <Link href="/" className="text-sm opacity-70 transition-opacity hover:opacity-100">
        <span aria-hidden="true">← </span>Back to home
      </Link>

      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent-text dark:text-accent">
        Master Thesis · Otto-Friedrich-Universität Bamberg
      </p>
      <h1 className="mt-3 bg-gradient-to-r from-ink to-accent-text bg-clip-text text-3xl font-bold leading-tight text-transparent sm:text-4xl dark:from-snow dark:to-accent">
        Adapting Stream-Based State-Machine Replication to Apache Flink (Gumti)
      </h1>
      <p className="mt-3 max-w-3xl text-lg opacity-75">
        A full realization of the TARA state-machine replication protocol as a distributed Apache Flink job.
      </p>

      <ul aria-label="Thesis details" className="mt-5 flex flex-wrap gap-2 text-sm">
        <li className="rounded-full border border-ink/15 px-3 py-1 dark:border-snow/15">Master&apos;s thesis</li>
        <li className="rounded-full border border-ink/15 px-3 py-1 dark:border-snow/15">Oct 2025 – Jul 2026</li>
        <li className="rounded-full border border-ink/15 px-3 py-1 dark:border-snow/15">
          Supervisor: Prof. Dr.-Ing. habil. Tobias Distler, Distributed Systems Group
        </li>
      </ul>
      <ul aria-label="Tech stack" className="mt-3 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-accent-text/10 px-2.5 py-0.5 text-xs text-accent-text dark:bg-accent/15 dark:text-accent"
          >
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <a
          href="/thesis.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-ink px-5 py-2 font-semibold text-paper transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/10 dark:bg-snow dark:text-canvas dark:hover:shadow-snow/10"
        >
          Read the thesis (PDF)
          {NEW_TAB}
        </a>
        <a
          href={CODE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-ink/30 px-5 py-2 transition-colors hover:bg-ink/5 dark:border-snow/30 dark:hover:bg-snow/5"
        >
          View code
          {NEW_TAB}
        </a>
      </div>

      <RevealOnScroll>
        <dl className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col rounded-2xl border border-ink/10 bg-gradient-to-br from-accent-text/[0.07] to-transparent p-5 dark:border-snow/10 dark:from-accent/10"
            >
              <dt className="order-2 mt-1 text-sm opacity-75">{stat.label}</dt>
              <dd className="order-1 text-3xl font-bold text-accent-text dark:text-accent">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </RevealOnScroll>

      <section aria-labelledby="overview">
        <h2 id="overview" className={h2Class}>
          Overview
        </h2>
        <div className="mt-3 max-w-3xl space-y-4 leading-relaxed">
          <p>
            Stream-based state machine replication greatly facilitates the implementation and deployment of
            replication protocols by modeling them as applications on top of an existing stream-processing
            platform. The original prototype was based on Twitter&apos;s Heron, and the general approach should be
            applicable to other frameworks as well.
          </p>
          <p>
            The goal of this thesis is to examine whether this is indeed the case, using Apache Flink as the
            platform of choice.
          </p>
        </div>
        <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide opacity-60">What the thesis covers</h3>
        <ol className="mt-3 grid gap-3">
          {steps.map((step, index) => (
            <li
              key={step}
              className="flex items-start gap-4 rounded-xl border border-ink/10 bg-white px-4 py-3 dark:border-snow/10 dark:bg-white/[0.03]"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-full border border-accent-text/35 bg-accent-text/10 text-sm font-bold text-accent-text dark:border-accent/35 dark:bg-accent/15 dark:text-accent"
              >
                {index + 1}
              </span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="architecture">
        <h2 id="architecture" className={h2Class}>
          Architecture
        </h2>
        <p className="mt-3 max-w-3xl leading-relaxed">
          Gumti runs the protocol as one Flink job. Orange nodes carry the main consensus path, blue nodes handle view
          change and record recovery, and pink nodes handle garbage collection. Each box holds several replicas.
        </p>
        <div className="mt-6 space-y-8">
          <Figure
            src="/images/thesis/architecture.png"
            width={2400}
            height={2041}
            alt="Gumti architecture: clients send requests through front ends to a Flink job whose request source, proposer, committer, executor and reply sink form the main path, with view-change, record-recovery and garbage-collection nodes alongside."
            caption="Gumti architecture: the protocol's nodes mapped onto a Flink job."
          />
          <Figure
            src="/images/thesis/flink-mapping.png"
            width={2326}
            height={926}
            alt="How Tara's nodes map onto Flink: sources use RichParallelSourceFunction, processors use KeyedProcessFunction, and sinks use RichSinkFunction."
            caption="Flink mapping: sources, processors, and sinks, and the Tara nodes built with each."
          />
        </div>
      </section>

      <section aria-labelledby="contribution">
        <h2 id="contribution" className={h2Class}>
          My contribution
        </h2>
        <p className="mt-3 max-w-3xl leading-relaxed">
          I designed and engineered Gumti, a full realization of the protocol on Apache Flink, contributing on three
          fronts.
        </p>

        <div className="mt-6 grid gap-6">
          <div className={cardClass}>
            <Icon>
              <path d="M12 3l9 5-9 5-9-5 9-5z" />
              <path d="M3 13l9 5 9-5" />
            </Icon>
            <h3 className="text-xl font-semibold">Design</h3>
            <p className="mt-2 leading-relaxed">
              Mapping the protocol&apos;s nodes onto Flink&apos;s operator model, and solving what Flink lacks.
            </p>
            <h4 className={`mt-5 ${labelClass}`}>Hardest decision</h4>
            <p className="mt-1 leading-relaxed">
              Whether to lean on Flink&apos;s built-in fault tolerance or keep recovery inside the protocol. A
              checkpoint restores an old snapshot that doesn&apos;t reflect what the other replicas committed since,
              which would break consensus. So I kept protocol state in plain Java fields and let the protocol recover
              itself: leader detection, view change, and state rebuilt from the committers&apos; records. It meant
              choosing against the framework&apos;s headline feature.
            </p>
            <h4 className={`mt-5 ${labelClass}`}>What differs between Flink and Heron</h4>
            <ul className="mt-2 grid gap-3 md:grid-cols-3">
              {differences.map((item) => (
                <li key={item.name} className="rounded-xl bg-ink/[0.03] p-3 text-sm dark:bg-snow/[0.05]">
                  <p className="font-semibold">{item.name}</p>
                  <p className="mt-1 opacity-80">{item.text}</p>
                </li>
              ))}
            </ul>
            <h4 className={`mt-5 ${labelClass}`}>How I adapted it</h4>
            <p className="mt-1 leading-relaxed">
              I mapped each protocol node to the matching Flink operator type (parallel sources, keyed process
              functions, sinks), used operator parallelism to create the replicas (F+1 or 2F+1 per stage), engineered
              keys to reproduce targeted routing, and added two external pieces, ZooKeeper and network loops, for
              what Flink doesn&apos;t provide. The protocol logic itself stays unchanged.
            </p>
          </div>

          <div className={cardClass}>
            <Icon>
              <path d="M8 8l-4 4 4 4" />
              <path d="M16 8l4 4-4 4" />
              <path d="M14 5l-4 14" />
            </Icon>
            <h3 className="text-xl font-semibold">Engineering</h3>
            <p className="mt-2 leading-relaxed">
              A substantial Java implementation of the consensus, view-change, and garbage-collection sub-protocols
              as one distributed Flink job. Three gaps in Flink needed their own solutions:
            </p>
            <ul className="mt-4 grid gap-3 md:grid-cols-3">
              {gaps.map((gap) => (
                <li key={gap.name} className="rounded-xl bg-ink/[0.03] p-4 text-sm dark:bg-snow/[0.05]">
                  <p className="font-semibold text-accent-text dark:text-accent">{gap.name}</p>
                  <p className="mt-2">
                    <span className="font-semibold">Problem: </span>
                    <span className="opacity-80">{gap.problem}</span>
                  </p>
                  <p className="mt-2">
                    <span className="font-semibold">Solution: </span>
                    <span className="opacity-80">{gap.solution}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className={cardClass}>
            <Icon>
              <path d="M4 19V5" />
              <path d="M4 19h16" />
              <path d="M8 15l4-5 3 3 5-7" />
            </Icon>
            <h3 className="text-xl font-semibold">Evaluation</h3>
            <p className="mt-2 leading-relaxed">
              A systematic study of throughput, latency, and fault tolerance under load and injected failures.
            </p>
            <h4 className={`mt-5 ${labelClass}`}>Test setup</h4>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed marker:text-accent-text dark:marker:text-accent">
              <li>Single machine, Apache Flink 2.1, one TaskManager with each replica in its own task slot.</li>
              <li>Fault-tolerance level F=1: 2 proposers, 3 committers, and 3 executors.</li>
              <li>
                Closed-loop clients scaled from 1 up to 128+. Each point ran for 120 s and was repeated 3× and
                averaged; the first 30 s (warm-up) and last 10 s (cool-down) were discarded, so about 80 s of steady
                state was measured.
              </li>
              <li>Payloads were empty and 5 KB, in all four send/receive combinations.</li>
            </ul>
            <h4 className={`mt-5 ${labelClass}`}>What I measured</h4>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 leading-relaxed marker:text-accent-text dark:marker:text-accent">
              <li>Throughput versus latency, batched and non-batched, at two buffer-timeout settings.</li>
              <li>Fault tolerance: killing the active leader under load and measuring recovery time and request loss.</li>
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="results">
        <h2 id="results" className={h2Class}>
          Results
        </h2>
        <p className="mt-3 max-w-3xl leading-relaxed">
          Gumti sustains ~5,300 req/s at a ~3 ms latency floor and recovers from leader failures in ~5 s with no
          requests lost.
        </p>
        <blockquote className="mt-5 max-w-3xl border-l-4 border-accent-text pl-5 text-xl font-medium dark:border-accent">
          A single engine parameter can shape performance as much as the protocol itself.
        </blockquote>

        <p className="mt-8 max-w-3xl leading-relaxed">
          That parameter is Flink&apos;s buffer timeout, which controls how long records wait in a network buffer
          before being flushed to the next operator. Compare the charts: with a 0 ms timeout latency stays near 3 ms,
          while a 2 ms timeout raises it to roughly 15 ms.
        </p>
        <Figure
          className="mt-6"
          src="/images/thesis/network-buffer.png"
          width={1560}
          height={363}
          alt="Records flow from an upstream operator into a network buffer, which is flushed to the downstream operator."
          caption="Records wait in a network buffer until it is flushed to the next operator."
          sizes="(min-width: 896px) 832px, 100vw"
        />

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Figure
            src="/images/thesis/batched-bt0.png"
            width={775}
            height={494}
            alt="Batched consensus with a 0 ms buffer timeout: latency stays around 3 to 6 ms until throughput reaches about 5,300 requests per second."
            caption="Batched consensus (batch 5), buffer timeout 0 ms."
            sizes="(min-width: 768px) 416px, 100vw"
            uniform
          />
          <Figure
            src="/images/thesis/batched-bt2.png"
            width={802}
            height={494}
            alt="Batched consensus with a 2 ms buffer timeout: latency stays around 15 ms until throughput reaches about 4,700 requests per second."
            caption="Batched consensus (batch 5), buffer timeout 2 ms."
            sizes="(min-width: 768px) 416px, 100vw"
            uniform
          />
          <Figure
            src="/images/thesis/non-batched-bt0.png"
            width={775}
            height={494}
            alt="Non-batched consensus with a 0 ms buffer timeout: latency stays near 3 ms until throughput reaches about 5,000 requests per second."
            caption="Non-batched consensus, buffer timeout 0 ms."
            sizes="(min-width: 768px) 416px, 100vw"
            uniform
          />
          <Figure
            src="/images/thesis/non-batched-bt2.png"
            width={815}
            height={494}
            alt="Non-batched consensus with a 2 ms buffer timeout: latency stays around 15 ms until throughput reaches about 2,800 requests per second."
            caption="Non-batched consensus, buffer timeout 2 ms."
            sizes="(min-width: 768px) 416px, 100vw"
            uniform
          />
        </div>
        <p className="mt-4 text-sm opacity-75">
          Each chart plots latency against throughput for empty and 5 KB payloads, in all four send and receive
          combinations. Click a chart to open it full size.
        </p>
      </section>

      <section
        aria-labelledby="talk"
        className="mt-16 rounded-2xl border border-ink/10 bg-gradient-to-br from-accent-text/[0.07] to-transparent p-8 text-center dark:border-snow/10 dark:from-accent/10"
      >
        <h2 id="talk" className="text-2xl font-bold">
          Want to talk about this work?
        </h2>
        <div className="mt-5 flex flex-wrap justify-center gap-4 text-sm">
          <Link
            href="/#contact"
            className="rounded-full bg-ink px-5 py-2 font-semibold text-paper transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ink/10 dark:bg-snow dark:text-canvas dark:hover:shadow-snow/10"
          >
            Get in touch
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-ink/30 px-5 py-2 transition-colors hover:bg-ink/5 dark:border-snow/30 dark:hover:bg-snow/5"
          >
            See my projects
          </Link>
        </div>
      </section>
    </article>
  );
}
