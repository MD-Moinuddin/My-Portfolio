export interface Project {
  slug: string;
  name: string;
  title: string;
  summary: string;
  stack: string[];
  coverImage: string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudy: {
    problem: string;
    contribution: string;
    outcome: string;
  };
}

export const projects: Project[] = [
  {
    slug: 'emporia',
    name: 'Emporia',
    title: 'Accessible E-learning & Job Portal',
    summary: 'E-learning and job portal built with Angular and Spring Boot, meeting WCAG 2.1.',
    stack: ['Angular 8', 'Spring Boot', 'WCAG 2.1'],
    coverImage: '/images/projects/emporia.png',
    liveUrl: 'https://emporia.bcc.gov.bd/',
    caseStudy: {
      problem:
        'Emporia needed to deliver course content and job listings to a wide range of users, including people relying on assistive technology, without sacrificing a modern UI.',
      contribution:
        'Built the Angular 8 frontend and implemented components to meet WCAG 2.1 accessibility criteria across the course and job-listing flows, working alongside a Spring Boot backend team.',
      outcome:
        'Shipped to production and in active use today. A full breakdown of the accessibility work and metrics is coming in a future update.',
    },
  },
  {
    slug: 'pristine',
    name: 'Pristine Solutions',
    title: 'Company Website',
    summary: 'Marketing website for Pristine Solutions built with Angular 13.',
    stack: ['Angular 13'],
    coverImage: '/images/projects/pristine.png',
    liveUrl: 'https://pristinesolutionsbd.com/',
    caseStudy: {
      problem:
        'Pristine Solutions needed a company website that represented their services clearly and loaded fast on both desktop and mobile.',
      contribution: 'Designed and built the full Angular 13 frontend, from component structure to responsive layout.',
      outcome:
        "Live in production as the company's primary web presence. Further detail on the build is coming in a future update.",
    },
  },
  {
    slug: 'arcade',
    name: 'Arcade',
    title: 'Management Platform',
    summary: 'Internal management platform built with Angular and Spring Boot.',
    stack: ['Angular 13', 'Spring Boot'],
    coverImage: '/images/projects/arcade.svg',
    liveUrl: 'https://arcade.earlydata.com/',
    caseStudy: {
      problem: "Arcade's internal teams needed a management platform to replace manual, spreadsheet-driven workflows.",
      contribution: 'Built the Angular 13 frontend against a Spring Boot API, covering the core management views end to end.',
      outcome: 'In active use by the team it was built for. A deeper case study is coming in a future update.',
    },
  },
  {
    slug: 'bdjobs',
    name: 'BDJobs',
    title: 'Largest Job Portal in Bangladesh',
    summary: "Accessibility improvements on Bangladesh's largest job portal, meeting WCAG 2.1 AA.",
    stack: ['WCAG 2.1 AA'],
    coverImage: '/images/projects/bdjobs.webp',
    liveUrl: 'https://www.bdjobs.com/',
    caseStudy: {
      problem:
        "As Bangladesh's largest job portal, BDJobs needed targeted accessibility fixes to meet WCAG 2.1 AA across high-traffic pages without a full rebuild.",
      contribution: 'Audited key pages against WCAG 2.1 AA and implemented the fixes required to close the gaps found.',
      outcome:
        'Accessibility conformance improved on the audited pages. Full details and before/after metrics are coming in a future update.',
    },
  },
  {
    slug: 'zone',
    name: 'Zone Productions',
    title: 'Company Website',
    summary: 'Marketing site for Zone Production Studios built with HTML5, Sass, and JS.',
    stack: ['HTML5', 'Sass', 'JavaScript'],
    coverImage: '/images/projects/zone.png',
    liveUrl: 'https://www.zoneproductionstudios.com/',
    caseStudy: {
      problem: 'Zone Production Studios needed a lightweight marketing site to showcase their production work without a heavy framework.',
      contribution: 'Built the site from scratch with HTML5, Sass, and vanilla JavaScript, focused on fast load times.',
      outcome: "Live as the studio's public site. A fuller write-up is coming in a future update.",
    },
  },
  {
    slug: 'mogo',
    name: 'Mogo',
    title: 'Website Landing Page',
    summary: 'Landing page design and build using HTML5, Sass, and JS.',
    stack: ['HTML5', 'Sass', 'JavaScript'],
    coverImage: '/images/projects/mogo.png',
    liveUrl: 'https://md-moinuddin.github.io/Mogo/',
    githubUrl: 'https://github.com/MD-Moinuddin/Mogo',
    caseStudy: {
      problem: 'Mogo needed a single, polished landing page to introduce the product and drive sign-ups.',
      contribution: 'Designed and built the landing page with HTML5, Sass, and JavaScript, including the responsive layout and interactions.',
      outcome: 'Published and viewable live, with source open on GitHub. A fuller write-up is coming in a future update.',
    },
  },
  {
    slug: 'e-shopper',
    name: 'E-shopper',
    title: 'Ecommerce Design',
    summary: 'Ecommerce storefront design and build using HTML5, Sass, and JS.',
    stack: ['HTML5', 'Sass', 'JavaScript'],
    coverImage: '/images/projects/eshopper.png',
    liveUrl: 'https://md-moinuddin.github.io/E-shopper/',
    githubUrl: 'https://github.com/MD-Moinuddin/E-shopper',
    caseStudy: {
      problem: 'E-shopper was a self-directed project to practice building an ecommerce storefront UI from scratch.',
      contribution: 'Designed and built the full storefront layout — product grid, product detail, and cart UI — with HTML5, Sass, and JavaScript.',
      outcome: 'Published and viewable live, with source open on GitHub. A fuller write-up is coming in a future update.',
    },
  },
  {
    slug: 'craft',
    name: 'Craft',
    title: 'Website Landing Page',
    summary: 'Landing page design and build using HTML5, Sass, and JS.',
    stack: ['HTML5', 'Sass', 'JavaScript'],
    coverImage: '/images/projects/craft.png',
    liveUrl: 'https://md-moinuddin.github.io/Craft/',
    githubUrl: 'https://github.com/MD-Moinuddin/Craft',
    caseStudy: {
      problem: 'Craft needed a landing page template exploring a different visual style than Mogo, as a design practice project.',
      contribution: 'Designed and built the landing page with HTML5, Sass, and JavaScript.',
      outcome: 'Published and viewable live, with source open on GitHub. A fuller write-up is coming in a future update.',
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
