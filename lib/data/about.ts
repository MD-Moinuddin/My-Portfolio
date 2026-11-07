export interface AboutFact {
  label: string;
  value: string;
}

export const about = {
  photo: '/images/about/moinuddin.jpg',
  photoAlt: 'Portrait of MD Moinuddin',
  bio: [
    "I build web applications end to end, with a focus on clean, accessible interfaces. Over the years I've shipped Angular and React front-ends for clients in Bangladesh and Germany, cut an application's load time by over 33%, and worked closely with people with disabilities to make products usable for everyone.",
    "My Master's thesis took me into distributed systems, where I built Gumti, a stream-processing realization of a replication protocol on Apache Flink. Today I'm building Life Tracker on my own and looking for my next role, or freelance projects, in software engineering and web development.",
  ],
  facts: [
    { label: 'Location', value: 'Bamberg, Germany' },
    { label: 'Languages', value: 'English (C1) · Bengali (native) · German (A2)' },
    { label: 'Work authorization', value: 'Legally authorized to work in Germany · Open to freelance work' },
    { label: 'Availability', value: 'Usually 2 weeks notice · Can join immediately' },
  ] satisfies AboutFact[],
};
