import { Hero } from '@/components/sections/Hero';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { ProjectsPreview } from '@/components/sections/ProjectsPreview';
import { Contact } from '@/components/sections/Contact';
import { experience } from '@/lib/data/experience';
import { skillGroups } from '@/lib/data/skills';
import { projects } from '@/lib/data/projects';
import { site } from '@/lib/site';

export default function HomePage() {
  return (
    <>
      <Hero name={site.name} role="Software Engineer" description={site.description} />
      <Experience entries={experience} />
      <Skills groups={skillGroups} />
      <ProjectsPreview projects={projects} limit={4} />
      <Contact />
    </>
  );
}
