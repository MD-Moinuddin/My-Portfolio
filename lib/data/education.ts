export interface EducationEntry {
  institution: string;
  degree: string;
  startDate: string;
  endDate?: string;
  highlights?: string[];
  grade?: string;
  thesisGrade?: string;
}

export const education: EducationEntry[] = [
  {
    institution: 'Otto-Friedrich-Universität Bamberg',
    degree: 'Master of Science (MS), International Software System Science',
    startDate: '2022-04',
    endDate: '2026-08',
    grade: 'Grade: 2.7 (1.0 is highest)',
    thesisGrade: 'Thesis grade: 2.1 (1.0 is highest)',
  },
  {
    institution: 'American International University-Bangladesh',
    degree: 'Bachelor of Science (BS), Computer Science and Software Engineering',
    startDate: '2014',
    endDate: '2017',
    grade: 'GPA: 3.14 (4.0 is highest)',
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
