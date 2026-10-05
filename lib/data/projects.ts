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
    contribution: string[];
    outcome: string;
  };
}

export const projects: Project[] = [
  {
    slug: 'life-tracker',
    name: 'Life Tracker',
    title: 'Secure, Accessible Personal Dashboard',
    summary: 'A secure, accessible personal dashboard app with JWT authentication, built with React, Node.js, PostgreSQL, and Docker.',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    coverImage: '/images/projects/life-tracker.svg',
    liveUrl: 'https://life-tracker-brown-one.vercel.app/signup',
    githubUrl: 'https://github.com/MD-Moinuddin/life-tracker',
    caseStudy: {
      problem:
        'Needed a secure, accessible foundation for a personal life-tracking app. V1 focuses on full authentication and a protected shell for future modules - work schedule, fitness, nutrition, and finance - planned for later versions.',
      contribution: [
        'Built the frontend with React, TypeScript, and Vite, and the backend with Node.js, Express, and TypeScript using a layered Controller-Service-Repository architecture.',
        'Designed the data layer with PostgreSQL and Prisma ORM.',
        'Implemented JWT access tokens with httpOnly refresh cookies, bcrypt password hashing, zod validation, and rate limiting, following OWASP-aligned auth practices - generic login error messages, in-memory access tokens instead of localStorage, and silent token refresh.',
        'Containerized the app with a hardened, multi-stage, non-root Docker build and Docker Compose, with a full CI/CD pipeline via GitHub Actions.',
        'Covered the app with automated tests (Vitest/Jest) and automated accessibility testing (jest-axe) toward WCAG 2.1 AA compliance.',
      ],
      outcome:
        'Shipped as v1 - a secure, accessible dashboard with full authentication - deployed across Vercel (frontend), Render (backend), and Neon (Postgres), with future life-tracking modules planned.',
    },
  },
  {
    slug: 'emporia',
    name: 'Emporia',
    title: 'Empowerment of Persons with Disabilities through ICT',
    summary: 'Accessible e-learning and job portal for persons with disabilities, built for the Bangladesh Computer Council.',
    stack: ['Angular 8', 'Spring Boot', 'WCAG 2.1'],
    coverImage: '/images/projects/emporia.png',
    liveUrl: 'https://emporia.bcc.gov.bd/',
    caseStudy: {
      problem:
        'The Bangladesh Computer Council (BCC) needed an accessible e-learning platform, with accessible audio/video learning materials, to train persons with disabilities as skilled ICT manpower and promote their employment through an integrated job portal - supporting Digital Bangladesh and the Sustainable Development Goals (SDG).',
      contribution: [
        'Developed and managed a modern user interface, ensuring a smooth user experience throughout the project.',
        'Converted Figma designs into pixel-perfect front-end implementations.',
        'Ensured compliance with W3C WCAG 2.1 AA accessibility standards.',
        'Worked directly with persons with disabilities to understand their requirements and for testing purposes.',
      ],
      outcome:
        'Delivered by Genweb2 under contract to BCC and shipped to production, where it remains in active use today as part of the national Digital Bangladesh initiative.',
    },
  },
  {
    slug: 'pristine',
    name: 'Pristine Solutions BD',
    title: 'Corporate Website',
    summary: 'Full corporate website for Pristine Solutions BD, built with Angular 13, Bootstrap, and Ant Design.',
    stack: ['Angular 13', 'SCSS', 'HTML5', 'Bootstrap', 'Ant Design'],
    coverImage: '/images/projects/pristine.png',
    liveUrl: 'https://pristinesolutionsbd.com/',
    githubUrl: 'https://github.com/pranabumal/pristineworldwide',
    caseStudy: {
      problem:
        'Pristine Solutions BD needed a full corporate website built from the ground up, translating static brand and content requirements into a responsive, production-ready web application.',
      contribution: [
        'Designed and developed the full corporate website from the ground up, translating static brand and content requirements into a responsive, production-ready web application.',
        "Combined Bootstrap's layout system with Ant Design's component library to deliver a polished, consistent UI across all pages while keeping load times fast.",
        'Structured all styling in SCSS (Sass) for a maintainable, component-scoped design system rather than flat CSS.',
        'Ensured full cross-browser and cross-device responsiveness, giving a consistent experience on desktop and mobile.',
      ],
      outcome:
        "Delivered between July and September 2022 and live in production as Pristine Solutions BD's primary web presence.",
    },
  },
  {
    slug: 'arcade',
    name: 'Arcade',
    title: 'AI-Driven Data Clustering Platform',
    summary: 'AI-driven data optimization platform for clustering scraped web data, built with Angular and Spring Boot JPA.',
    stack: ['Angular 13', 'Spring Boot JPA', 'GitLab'],
    coverImage: '/images/projects/arcade.svg',
    liveUrl: 'https://arcade.earlydata.com/',
    caseStudy: {
      problem:
        'Arcade needed to transform large volumes of online scraped data into a form usable for AI and machine-learning workflows, with an interface that let users cluster items quickly through drag-and-drop.',
      contribution: [
        'Built an AI-driven data optimization platform with an Angular frontend and a Spring Boot JPA backend.',
        'Processed scraped web data to improve its compatibility for AI and machine-learning workflows.',
        'Designed advanced UI features including multi-item drag-and-drop clustering, an image magnifier, keyboard-driven left/right image navigation, and undo/restore functionality.',
      ],
      outcome:
        'Delivered between September 2021 and August 2022, giving users an efficient drag-and-drop workflow for clustering and preparing scraped data for AI pipelines.',
    },
  },
  {
    slug: 'bdjobs',
    name: 'BDJobs',
    title: 'Digital Accessibility Consultancy to Largest Job Site in Bangladesh',
    summary: "Accessibility consultancy for Bangladesh's largest job site, under the FCDO-funded I2I program.",
    stack: ['WCAG 2.1 AA', 'Screen Readers'],
    coverImage: '/images/projects/bdjobs.webp',
    liveUrl: 'https://www.bdjobs.com/',
    caseStudy: {
      problem:
        'As part of Project I2I (Innovation to Inclusion), funded by the UK Foreign, Commonwealth and Development Office (FCDO), BDJobs - the largest job site in Bangladesh - needed expert consultancy to make its popular website accessible to persons with disabilities.',
      contribution: [
        'Conducted comprehensive accessibility audits to identify UI and functionality barriers.',
        'Authored technical documentation and collaborated directly with the development team to guide remediation.',
      ],
      outcome:
        'Delivered as part of a Genweb2 consultancy team between July and November 2020, contributing to a more accessible experience for persons with disabilities on Bangladesh\'s most-used job platform.',
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
    githubUrl: 'https://github.com/MD-Moinuddin/zone',
    caseStudy: {
      problem: 'Zone Production Studios needed a lightweight marketing site to showcase their production work without a heavy framework.',
      contribution: ['Built the site from scratch with HTML5, Sass, and vanilla JavaScript, focused on fast load times.'],
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
      contribution: ['Designed and built the landing page with HTML5, Sass, and JavaScript, including the responsive layout and interactions.'],
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
      contribution: ['Designed and built the full storefront layout - product grid, product detail, and cart UI - with HTML5, Sass, and JavaScript.'],
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
      contribution: ['Designed and built the landing page with HTML5, Sass, and JavaScript.'],
      outcome: 'Published and viewable live, with source open on GitHub. A fuller write-up is coming in a future update.',
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
