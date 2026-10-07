import { Hero } from '@/components/sections/Hero';
import { Experience } from '@/components/sections/Experience';
import { Education } from '@/components/sections/Education';
import { Skills } from '@/components/sections/Skills';
import { ProjectsPreview } from '@/components/sections/ProjectsPreview';
import { Thesis } from '@/components/sections/Thesis';
import { Contact } from '@/components/sections/Contact';
import { experience } from '@/lib/data/experience';
import { education } from '@/lib/data/education';
import { skillGroups } from '@/lib/data/skills';
import { projects } from '@/lib/data/projects';
import { site } from '@/lib/site';

export default function HomePage() {
  return (
    <>
      <Hero name={site.name} role="Software Engineer" description={site.tagline} availability={site.availability} />
      <Experience entries={experience} />
      <Education entries={education} />
      <Skills groups={skillGroups} />
      <ProjectsPreview projects={projects} limit={4} />
      <Thesis />
      <Contact />
    </>
  );
}
