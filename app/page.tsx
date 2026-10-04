import { Hero } from '@/components/sections/Hero';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { ProjectsPreview } from '@/components/sections/ProjectsPreview';
import { Contact } from '@/components/sections/Contact';
import { experience } from '@/lib/data/experience';
import { skillGroups } from '@/lib/data/skills';
import { projects } from '@/lib/data/projects';
import { bio, expertise, languages } from '@/lib/data/about';
import { site } from '@/lib/site';

export default function HomePage() {
  return (
    <>
      <Hero
        name={site.name}
        role="Frontend Engineer"
        description={site.description}
        bio={bio}
        expertise={expertise}
        languages={languages}
      />
      <Experience entries={experience} />
      <Skills groups={skillGroups} />
      <ProjectsPreview projects={projects} limit={4} />
      <Contact />
    </>
  );
}
