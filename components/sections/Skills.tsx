import { RevealOnScroll } from '@/components/RevealOnScroll';
import type { SkillGroup } from '@/lib/data/skills';

interface SkillsProps {
  groups: SkillGroup[];
}

export function Skills({ groups }: SkillsProps) {
  return (
    <section id="skills" className="mx-auto max-w-2xl px-6 py-16">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] opacity-60">Skills</h2>
      <div className="mt-8 space-y-6">
        {groups.map((group) => (
          <RevealOnScroll key={group.category}>
            <h3 className="text-xs font-semibold uppercase tracking-wide opacity-50">{group.category}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={`${group.category}-${item}`} className="rounded-md bg-ink/5 px-3 py-1 text-sm dark:bg-snow/10">
                  {item}
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
