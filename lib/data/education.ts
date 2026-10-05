export interface EducationEntry {
  institution: string;
  degree: string;
  startDate: string;
  endDate?: string;
  highlights?: string[];
}

export const education: EducationEntry[] = [
  {
    institution: 'Otto-Friedrich-Universität Bamberg',
    degree: 'Master of Science (MS), International Software System Science',
    startDate: '2022-04',
    endDate: '2026-08',
    highlights: [
      "For my Master's thesis, I studied whether TARA, a state-machine replication protocol expressed as a stream-processing dataflow, generalizes beyond the engine it was originally designed for.",
      'I designed and engineered Gumti, a full realization on Apache Flink, contributing on three fronts:',
      "Design: mapping the protocol's nodes onto Flink's operator model, solving what Flink lacks - engineered-key routing, ZooKeeper replica discovery, and network feedback loops around its acyclic dataflow.",
      'Engineering: a substantial Java implementation of the consensus, view-change, and garbage-collection sub-protocols as one distributed Flink job.',
      'Evaluation: a systematic study of throughput, latency, and fault tolerance under load and injected failures.',
      'Gumti sustains ~5,300 req/s at a ~3 ms latency floor and recovers from leader failures in ~5 s with no requests lost, showing a single engine parameter can shape performance as much as the protocol itself.',
    ],
  },
  {
    institution: 'American International University-Bangladesh',
    degree: 'Bachelor of Science (BS), Computer Science',
    startDate: '2014',
    endDate: '2017',
  },
];

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatYearOrMonthYear(value: string): string {
  if (value.length === 4) return value;
  const [year, month] = value.split('-');
  return `${MONTH_LABELS[Number(month) - 1]} ${year}`;
}

export function formatRange(entry: EducationEntry): string {
  const start = formatYearOrMonthYear(entry.startDate);
  const end = entry.endDate ? formatYearOrMonthYear(entry.endDate) : 'Present';
  return `${start} - ${end}`;
}
