# Portfolio Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static HTML/jQuery portfolio with a Next.js/TypeScript/Tailwind site in the Minimal Editorial direction, fixing the audit findings and shipping with honest placeholder content where real content (work history, updated project list, CV) is still pending from the user.

**Architecture:** A single Next.js App Router project at the repo root. Presentational components receive data via props; a small set of typed data modules under `lib/data/` hold project/experience/skill content; pages in `app/` import that data and compose the components. Theme (light/dark) is managed by a React context backed by `localStorage` and `prefers-color-scheme`.

**Tech Stack:** Next.js 14+ (App Router, TypeScript), Tailwind CSS (class-based dark mode), Framer Motion, Vitest + React Testing Library, Formspree (existing endpoint), Vercel.

**Spec:** `docs/superpowers/specs/2026-10-03-portfolio-rebuild-design.md`

## Global Constraints

- Framework: Next.js 14+, App Router, TypeScript — no Pages Router.
- Styling: Tailwind CSS, `darkMode: 'class'`, preference persisted in `localStorage`, respecting `prefers-color-scheme` on first visit.
- Animation: Framer Motion only, for scroll-reveal and the theme toggle transition — no cursor effects, no 3D/WebGL, no parallax.
- Images: every image rendered via `next/image`.
- Fonts: `next/font` self-hosted — no Google Fonts `<link>` tags.
- Contact form: posts to the existing Formspree endpoint `https://formspree.io/f/mqkvbqlw` — no new backend code.
- Deployment: Vercel, connected to the existing `MD-Moinuddin/My-Portfolio` GitHub repo, default `*.vercel.app` URL for now.
- Repo: work happens on branch `rebuild-nextjs` in the existing repo; no new repo.
- Out of scope for this build: CMS, MDX, blog, testimonials, i18n, custom domain.
- Accent color: `#59968F` for decorative/large elements and for text on dark backgrounds; `#3E6F69` for text on light backgrounds (verified via the contrast utility built in Task 3 — `#59968F` on `#fafafa` is ~3.25:1, below the 4.5:1 AA text threshold, while `#3E6F69` on `#fafafa` is ~5.48:1).
- Target: Lighthouse 90+ on Performance, Accessibility, Best Practices, and SEO.

---

## Task 0: Create the working branch

**Files:** none (git operation only)

- [ ] **Step 1: Create and switch to the feature branch**

Run:
```bash
cd /Users/mdmoinuddin/Documents/Portfolio/My-Portfolio
git checkout -b rebuild-nextjs
```
Expected: `Switched to a new branch 'rebuild-nextjs'`

---

## Task 1: Scaffold the Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `.eslintrc.json`, `app/layout.tsx` (scaffold default), `app/page.tsx` (scaffold default), `app/globals.css`, `next-env.d.ts`, `public/` (scaffold default)

**Interfaces:**
- Produces: a working `npm run dev` / `npm run build` / `npm run lint` toolchain that every later task builds on.

- [ ] **Step 1: Scaffold into a temp directory (the repo isn't empty, so scaffold outside it first)**

Run:
```bash
npx create-next-app@latest /tmp/portfolio-scaffold --ts --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm
```
If the CLI prompts interactively despite the flags (versions vary), accept the shown defaults except: TypeScript = yes, Tailwind = yes, App Router = yes, `src/` directory = no, import alias = `@/*`.

- [ ] **Step 2: Copy the scaffold into the repo root, excluding its own git metadata**

Run:
```bash
cd /Users/mdmoinuddin/Documents/Portfolio/My-Portfolio
rsync -a --exclude='.git' /tmp/portfolio-scaffold/ ./
rm -rf /tmp/portfolio-scaffold
```

- [ ] **Step 3: Install dependencies and verify the scaffold builds**

Run:
```bash
npm install
npm run build
```
Expected: build completes with `✓ Compiled successfully`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js app (TypeScript, Tailwind, App Router)"
```

---

## Task 2: Repo cleanup and asset migration

**Files:**
- Create: `.gitignore` (extend scaffold's with `.superpowers/`), `public/images/projects/*`, `public/cv.pdf`
- Delete: `index.html`, `css/`, `js/`, `img/`, `.idea/`

**Interfaces:**
- Produces: `public/images/projects/{emporia.png,pristine.png,arcade.svg,bdjobs.webp,zone.png,mogo.png,eshopper.png,craft.png}` and `public/cv.pdf`, which Task 4's data layer references by these exact paths.

- [ ] **Step 1: Move the 8 project images used by the new site into `public/images/projects/`, renaming the two inconsistently-cased files**

Run:
```bash
mkdir -p public/images/projects
git mv img/emporia.png public/images/projects/emporia.png
git mv img/pristine.png public/images/projects/pristine.png
git mv img/arcade.svg public/images/projects/arcade.svg
git mv img/bdjobs.webp public/images/projects/bdjobs.webp
git mv img/zone.png public/images/projects/zone.png
git mv img/mogo.PNG public/images/projects/mogo.png
git mv img/eshopper.png public/images/projects/eshopper.png
git mv img/craft.PNG public/images/projects/craft.png
git mv cv.pdf public/cv.pdf
```

- [ ] **Step 2: Delete the old static site and everything now unused (dead images, IDE metadata)**

Run:
```bash
git rm -r index.html css js img .idea
```
This removes the remaining `img/` contents in one pass: `agency.jpg`, `sparkbit.png`, `lightspeed.png`, `MoGo.jpg`, `craft.jpg`, `profile-1.jpg`, `profile-2.jpg`, `profile-3.jpg`, the duplicate `E-shopper.png`, `logo.png`, `slide1-4.jpg`, and `img/icons/` — none of these are referenced by the new design (the approved editorial mockup has no hero slider, no profile photo, and no custom nav icons).

- [ ] **Step 3: Add `.superpowers/` to `.gitignore`**

Append to `.gitignore` (the Next.js scaffold already ignores `node_modules`, `.next`, `.vercel`, `.env*.local`):
```
# Superpowers brainstorming companion artifacts
.superpowers/
```

- [ ] **Step 4: Verify nothing references the deleted paths and the app still builds**

Run:
```bash
npm run build
git status --short
```
Expected: build succeeds; `git status` shows only the staged deletions/moves/additions from this task (nothing untracked besides `.superpowers/`, which is now ignored).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: migrate used assets, remove dead images and old static site"
```

---

## Task 3: Design tokens — contrast utility and Tailwind theme

**Files:**
- Create: `lib/contrast.ts`, `lib/contrast.test.ts`
- Modify: `tailwind.config.ts`, `app/globals.css`
- Create: `tailwind.config.test.ts`
- Test setup: `vitest.config.ts`, `vitest.setup.ts`
- Modify: `package.json` (add `test`/`test:watch` scripts and test dependencies)

**Interfaces:**
- Produces: `contrastRatio(hexA: string, hexB: string): number` — used by `tailwind.config.test.ts` in this task and available to any later contrast checks.
- Produces: Tailwind color tokens `paper`, `ink`, `canvas`, `snow`, `accent.DEFAULT`, `accent.text`, consumed by every component task from Task 6 onward.

- [ ] **Step 1: Install test dependencies**

Run:
```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 2: Add test config**

Create `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
```

Create `vitest.setup.ts`:
```ts
import '@testing-library/jest-dom/vitest';

if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}
```

Add to `package.json` `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Write the failing test for the contrast utility**

Create `lib/contrast.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { contrastRatio } from './contrast';

describe('contrastRatio', () => {
  it('returns ~21:1 for pure black on pure white', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 0);
  });

  it('is order-independent', () => {
    expect(contrastRatio('#59968F', '#fafafa')).toBeCloseTo(
      contrastRatio('#fafafa', '#59968F'),
      5,
    );
  });

  it('shows the original teal fails AA text contrast on the light background', () => {
    expect(contrastRatio('#59968F', '#fafafa')).toBeLessThan(4.5);
  });

  it('shows the darkened teal passes AA text contrast on the light background', () => {
    expect(contrastRatio('#3E6F69', '#fafafa')).toBeGreaterThanOrEqual(4.5);
  });

  it('shows the original teal passes AA text contrast on the dark background', () => {
    expect(contrastRatio('#59968F', '#0b0b0d')).toBeGreaterThanOrEqual(4.5);
  });
});
```

- [ ] **Step 4: Run the test to verify it fails**

Run: `npx vitest run lib/contrast.test.ts`
Expected: FAIL — `Cannot find module './contrast'`

- [ ] **Step 5: Implement the contrast utility**

Create `lib/contrast.ts`:
```ts
function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace('#', '');
  const r = parseInt(normalized.substring(0, 2), 16);
  const g = parseInt(normalized.substring(2, 4), 16);
  const b = parseInt(normalized.substring(4, 6), 16);
  return [r, g, b];
}

function channelLuminance(channel: number): number {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b);
}

export function contrastRatio(hexA: string, hexB: string): number {
  const luminanceA = relativeLuminance(hexA);
  const luminanceB = relativeLuminance(hexB);
  const lighter = Math.max(luminanceA, luminanceB);
  const darker = Math.min(luminanceA, luminanceB);
  return (lighter + 0.05) / (darker + 0.05);
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `npx vitest run lib/contrast.test.ts`
Expected: PASS (5 tests)

- [ ] **Step 7: Write the failing test for the Tailwind theme colors**

Create `tailwind.config.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { contrastRatio } from './lib/contrast';
import tailwindConfig from './tailwind.config';

describe('tailwind theme colors', () => {
  const colors = tailwindConfig.theme?.extend?.colors as Record<string, any>;

  it('defines the editorial palette', () => {
    expect(colors.paper).toBe('#fafafa');
    expect(colors.canvas).toBe('#0b0b0d');
    expect(colors.accent.DEFAULT).toBe('#59968F');
    expect(colors.accent.text).toBe('#3E6F69');
  });

  it('keeps the light-mode text accent at AA contrast against the paper background', () => {
    expect(contrastRatio(colors.accent.text, colors.paper)).toBeGreaterThanOrEqual(4.5);
  });
});
```

- [ ] **Step 8: Run the test to verify it fails**

Run: `npx vitest run tailwind.config.test.ts`
Expected: FAIL — `tailwindConfig.theme.extend.colors` is undefined (scaffold's default config has no custom colors yet)

- [ ] **Step 9: Implement the Tailwind theme**

Replace the contents of `tailwind.config.ts`:
```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: '#fafafa',
        ink: '#111111',
        canvas: '#0b0b0d',
        snow: '#eaeaea',
        accent: {
          DEFAULT: '#59968F',
          text: '#3E6F69',
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

Replace the contents of `app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-paper text-ink dark:bg-canvas dark:text-snow;
}
```

- [ ] **Step 10: Run the tests to verify they pass**

Run: `npx vitest run`
Expected: PASS (7 tests total)

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: add contrast utility and editorial Tailwind theme"
```

---

## Task 4: Site constants and project data

**Files:**
- Create: `lib/site.ts`, `lib/site.test.ts`, `lib/data/projects.ts`, `lib/data/projects.test.ts`

**Interfaces:**
- Produces: `site: { name, title, description, url, email, contactFormAction, social: { linkedin, github } }` — consumed by Tasks 11, 16, 17, 18, 19, 22, 23.
- Produces: `interface Project`, `projects: Project[]`, `getProjectBySlug(slug: string): Project | undefined` — consumed by Tasks 14, 15, 20, 21, 22.

- [ ] **Step 1: Write the failing test for site constants**

Create `lib/site.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { site } from './site';

describe('site constants', () => {
  it('has a valid https url', () => {
    expect(site.url.startsWith('https://')).toBe(true);
  });

  it('has the correct Formspree endpoint', () => {
    expect(site.contactFormAction).toBe('https://formspree.io/f/mqkvbqlw');
  });

  it('has the real contact email', () => {
    expect(site.email).toBe('moinuddinmd067@gmail.com');
  });

  it('has LinkedIn and GitHub social links', () => {
    expect(site.social.linkedin).toContain('linkedin.com');
    expect(site.social.github).toBe('https://github.com/MD-Moinuddin');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run lib/site.test.ts`
Expected: FAIL — `Cannot find module './site'`

- [ ] **Step 3: Implement site constants**

Create `lib/site.ts`:
```ts
export const site = {
  name: 'MD Moinuddin',
  title: 'MD Moinuddin — Frontend Engineer',
  description:
    'Frontend engineer with 4+ years building accessible, production web apps with Angular and React.',
  url: 'https://md-moinuddin.vercel.app',
  email: 'moinuddinmd067@gmail.com',
  contactFormAction: 'https://formspree.io/f/mqkvbqlw',
  social: {
    linkedin: 'https://www.linkedin.com/in/md-moinuddin-192057148/',
    github: 'https://github.com/MD-Moinuddin',
  },
} as const;
```

> `site.url` is a placeholder until the first Vercel deploy assigns the real `*.vercel.app` URL — Task 23 updates it once that's known.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run lib/site.test.ts`
Expected: PASS (4 tests)

- [ ] **Step 5: Write the failing test for project data**

Create `lib/data/projects.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { projects, getProjectBySlug } from './projects';

describe('projects data', () => {
  it('has a unique slug for every project', () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('has all 8 current projects', () => {
    expect(projects).toHaveLength(8);
  });

  it('gives every project a non-empty case study', () => {
    projects.forEach((project) => {
      expect(project.caseStudy.problem.length).toBeGreaterThan(0);
      expect(project.caseStudy.contribution.length).toBeGreaterThan(0);
      expect(project.caseStudy.outcome.length).toBeGreaterThan(0);
    });
  });

  it('points every coverImage at the migrated public/images/projects path', () => {
    projects.forEach((project) => {
      expect(project.coverImage.startsWith('/images/projects/')).toBe(true);
    });
  });

  it('finds a project by slug', () => {
    expect(getProjectBySlug('emporia')?.name).toBe('Emporia');
  });

  it('returns undefined for an unknown slug', () => {
    expect(getProjectBySlug('does-not-exist')).toBeUndefined();
  });
});
```

- [ ] **Step 6: Run the test to verify it fails**

Run: `npx vitest run lib/data/projects.test.ts`
Expected: FAIL — `Cannot find module './projects'`

- [ ] **Step 7: Implement project data**

Create `lib/data/projects.ts`:
```ts
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
```

- [ ] **Step 8: Run the tests to verify they pass**

Run: `npx vitest run lib/data/projects.test.ts`
Expected: PASS (6 tests)

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add site constants and project data"
```

---

## Task 5: Experience and skills data

**Files:**
- Create: `lib/data/experience.ts`, `lib/data/experience.test.ts`, `lib/data/skills.ts`, `lib/data/skills.test.ts`

**Interfaces:**
- Produces: `interface ExperienceEntry`, `experience: ExperienceEntry[]`, `formatRange(entry: ExperienceEntry): string` — consumed by Task 12.
- Produces: `interface SkillGroup`, `skillGroups: SkillGroup[]` — consumed by Task 13.

- [ ] **Step 1: Write the failing test for experience data**

Create `lib/data/experience.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { experience, formatRange } from './experience';

describe('experience data', () => {
  it('has at least one entry', () => {
    expect(experience.length).toBeGreaterThan(0);
  });

  it('gives every entry a role, company, and at least one highlight', () => {
    experience.forEach((entry) => {
      expect(entry.role.length).toBeGreaterThan(0);
      expect(entry.company.length).toBeGreaterThan(0);
      expect(entry.highlights.length).toBeGreaterThan(0);
    });
  });
});

describe('formatRange', () => {
  it('shows "Present" when there is no endDate', () => {
    expect(formatRange({ company: 'X', role: 'Y', startDate: '2022-01', highlights: [] })).toBe('2022 — Present');
  });

  it('shows the end year when endDate is set', () => {
    expect(
      formatRange({ company: 'X', role: 'Y', startDate: '2020-01', endDate: '2022-06', highlights: [] }),
    ).toBe('2020 — 2022');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run lib/data/experience.test.ts`
Expected: FAIL — `Cannot find module './experience'`

- [ ] **Step 3: Implement experience data**

Create `lib/data/experience.ts`:
```ts
export interface ExperienceEntry {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  highlights: string[];
}

// Placeholder entry — replace with real employer, dates, and highlights.
// (The user has confirmed real work history will be supplied after launch.)
export const experience: ExperienceEntry[] = [
  {
    company: 'Add your employer name here',
    role: 'Frontend Engineer',
    startDate: '2022-01',
    highlights: [
      'Add 1-2 sentences about your main responsibility or a notable project here.',
      'Add a measurable outcome or technology highlight here.',
    ],
  },
];

export function formatRange(entry: ExperienceEntry): string {
  const [startYear] = entry.startDate.split('-');
  const endLabel = entry.endDate ? entry.endDate.split('-')[0] : 'Present';
  return `${startYear} — ${endLabel}`;
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run lib/data/experience.test.ts`
Expected: PASS (4 tests)

- [ ] **Step 5: Write the failing test for skills data**

Create `lib/data/skills.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { skillGroups } from './skills';

describe('skillGroups', () => {
  it('has exactly 3 categories', () => {
    expect(skillGroups).toHaveLength(3);
  });

  it('has unique categories', () => {
    const categories = skillGroups.map((group) => group.category);
    expect(new Set(categories).size).toBe(categories.length);
  });

  it('gives every category at least one item', () => {
    skillGroups.forEach((group) => {
      expect(group.items.length).toBeGreaterThan(0);
    });
  });
});
```

- [ ] **Step 6: Run the test to verify it fails**

Run: `npx vitest run lib/data/skills.test.ts`
Expected: FAIL — `Cannot find module './skills'`

- [ ] **Step 7: Implement skills data**

Create `lib/data/skills.ts`:
```ts
export interface SkillGroup {
  category: 'Languages' | 'Frameworks' | 'Tools';
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { category: 'Languages', items: ['TypeScript', 'JavaScript', 'HTML5', 'CSS3 / Sass'] },
  { category: 'Frameworks', items: ['Angular', 'React', 'Next.js', 'Vue.js'] },
  { category: 'Tools', items: ['Spring Boot', 'WCAG 2.1', 'Git', 'Figma / Adobe XD'] },
];
```

- [ ] **Step 8: Run the tests to verify they pass**

Run: `npx vitest run lib/data/skills.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add experience and skills data"
```

---

## Task 6: Theme provider

**Files:**
- Create: `components/ThemeProvider.tsx`, `components/ThemeProvider.test.tsx`

**Interfaces:**
- Produces: `ThemeProvider({ children }): JSX.Element`, `useTheme(): { theme: 'light' | 'dark'; toggleTheme: () => void }` — consumed by Tasks 7, 18.

- [ ] **Step 1: Write the failing test**

Create `components/ThemeProvider.test.tsx`:
```tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeProvider';

function Consumer() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>toggle</button>
    </div>
  );
}

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.classList.remove('dark');
});

describe('ThemeProvider', () => {
  it('defaults to light theme', () => {
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('theme').textContent).toBe('light');
  });

  it('toggles to dark and applies the dark class to the html element', () => {
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByText('toggle'));
    expect(screen.getByTestId('theme').textContent).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('persists the chosen theme to localStorage', () => {
    render(
      <ThemeProvider>
        <Consumer />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByText('toggle'));
    expect(window.localStorage.getItem('portfolio-theme')).toBe('dark');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run components/ThemeProvider.test.tsx`
Expected: FAIL — `Cannot find module './ThemeProvider'`

- [ ] **Step 3: Implement the theme provider**

Create `components/ThemeProvider.tsx`:
```tsx
'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'portfolio-theme';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((previous) => (previous === 'dark' ? 'light' : 'dark'));
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run components/ThemeProvider.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add theme provider with localStorage persistence"
```

---

## Task 7: Theme toggle button

**Files:**
- Create: `components/ThemeToggle.tsx`, `components/ThemeToggle.test.tsx`

**Interfaces:**
- Consumes: `useTheme()` from Task 6.
- Produces: `ThemeToggle(): JSX.Element` — consumed by Task 8 (Navbar).

- [ ] **Step 1: Write the failing test**

Create `components/ThemeToggle.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from './ThemeProvider';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  it('labels itself for switching to dark mode when currently light', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );
    expect(screen.getByRole('button', { name: 'Switch to dark mode' })).toBeInTheDocument();
  });

  it('relabels itself after being clicked', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }));
    expect(screen.getByRole('button', { name: 'Switch to light mode' })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run components/ThemeToggle.test.tsx`
Expected: FAIL — `Cannot find module './ThemeToggle'`

- [ ] **Step 3: Implement the toggle**

Create `components/ThemeToggle.tsx`:
```tsx
'use client';

import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="rounded-full border border-ink/30 px-3 py-1 text-xs transition-colors dark:border-snow/30"
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run components/ThemeToggle.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add theme toggle button"
```

---

## Task 8: Skip link and navbar

**Files:**
- Create: `components/layout/SkipLink.tsx`, `components/layout/SkipLink.test.tsx`, `components/layout/Navbar.tsx`, `components/layout/Navbar.test.tsx`

**Interfaces:**
- Consumes: `ThemeToggle` from Task 7.
- Produces: `SkipLink(): JSX.Element`, `Navbar(): JSX.Element` — consumed by Task 18 (root layout).

- [ ] **Step 1: Write the failing test for SkipLink**

Create `components/layout/SkipLink.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SkipLink } from './SkipLink';

describe('SkipLink', () => {
  it('links to the #main landmark', () => {
    render(<SkipLink />);
    expect(screen.getByText('Skip to main content')).toHaveAttribute('href', '#main');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run components/layout/SkipLink.test.tsx`
Expected: FAIL — `Cannot find module './SkipLink'`

- [ ] **Step 3: Implement SkipLink**

Create `components/layout/SkipLink.tsx`:
```tsx
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent-text focus:px-4 focus:py-2 focus:text-paper"
    >
      Skip to main content
    </a>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run components/layout/SkipLink.test.tsx`
Expected: PASS (1 test)

- [ ] **Step 5: Write the failing test for Navbar**

Create `components/layout/Navbar.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  it('has an accessible primary navigation landmark', () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>,
    );
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
  });

  it('links to every homepage section', () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>,
    );
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '#about');
    expect(screen.getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '#experience');
    expect(screen.getByRole('link', { name: 'Skills' })).toHaveAttribute('href', '#skills');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact');
  });

  it('links the resume to the CV PDF in a new tab', () => {
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>,
    );
    const resumeLink = screen.getByRole('link', { name: 'Resume' });
    expect(resumeLink).toHaveAttribute('href', '/cv.pdf');
    expect(resumeLink).toHaveAttribute('target', '_blank');
  });
});
```

- [ ] **Step 6: Run the test to verify it fails**

Run: `npx vitest run components/layout/Navbar.test.tsx`
Expected: FAIL — `Cannot find module './Navbar'`

- [ ] **Step 7: Implement Navbar**

Create `components/layout/Navbar.tsx`:
```tsx
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur dark:border-snow/10 dark:bg-canvas/90">
      <nav aria-label="Primary" className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4 text-sm">
        <Link href="/" className="font-semibold tracking-widest">
          MD.
        </Link>
        <ul className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
          <li>
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="rounded-full border border-accent-text px-3 py-1 text-xs dark:border-accent">
              Resume
            </a>
          </li>
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
}
```

- [ ] **Step 8: Run the tests to verify they pass**

Run: `npx vitest run components/layout/Navbar.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add skip link and navbar"
```

---

## Task 9: Footer

**Files:**
- Create: `components/layout/Footer.tsx`, `components/layout/Footer.test.tsx`

**Interfaces:**
- Consumes: `site` from Task 4.
- Produces: `Footer(): JSX.Element` — consumed by Task 18.

- [ ] **Step 1: Write the failing test**

Create `components/layout/Footer.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('shows a mailto link with the real contact email', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'moinuddinmd067@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:moinuddinmd067@gmail.com',
    );
  });

  it('links to LinkedIn and GitHub', () => {
    render(<Footer />);
    expect(screen.getByLabelText('LinkedIn')).toHaveAttribute('href', 'https://www.linkedin.com/in/md-moinuddin-192057148/');
    expect(screen.getByLabelText('GitHub')).toHaveAttribute('href', 'https://github.com/MD-Moinuddin');
  });

  it('does not include the broken Xing link from the old site', () => {
    render(<Footer />);
    expect(screen.queryByLabelText('Xing')).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run components/layout/Footer.test.tsx`
Expected: FAIL — `Cannot find module './Footer'`

- [ ] **Step 3: Implement Footer**

Create `components/layout/Footer.tsx`:
```tsx
import { site } from '@/lib/site';

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: site.social.linkedin },
  { label: 'GitHub', href: site.social.github },
];

export function Footer() {
  return (
    <footer className="border-t border-ink/10 py-10 text-center text-sm dark:border-snow/10">
      <a href={`mailto:${site.email}`} className="underline">
        {site.email}
      </a>
      <ul className="mt-4 flex justify-center gap-4">
        {SOCIAL_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} aria-label={link.label} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-6 opacity-60">© {new Date().getFullYear()} {site.name}</p>
    </footer>
  );
}
```

This also fixes the audit finding that the old Xing icon pointed at `myaccount.google.com/personal-info` — it's dropped entirely rather than carried forward broken.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run components/layout/Footer.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add footer, drop the broken Xing link"
```

---

## Task 10: Scroll-reveal wrapper

**Files:**
- Create: `components/RevealOnScroll.tsx`, `components/RevealOnScroll.test.tsx`
- Modify: `package.json` (add `framer-motion` dependency)

**Interfaces:**
- Produces: `RevealOnScroll({ children, delay? }): JSX.Element` — consumed by Tasks 11, 12, 13, 15.

- [ ] **Step 1: Install Framer Motion**

Run:
```bash
npm install framer-motion
```

- [ ] **Step 2: Write the failing test**

Create `components/RevealOnScroll.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RevealOnScroll } from './RevealOnScroll';

describe('RevealOnScroll', () => {
  it('renders its children', () => {
    render(
      <RevealOnScroll>
        <p>reveal me</p>
      </RevealOnScroll>,
    );
    expect(screen.getByText('reveal me')).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npx vitest run components/RevealOnScroll.test.tsx`
Expected: FAIL — `Cannot find module './RevealOnScroll'`

- [ ] **Step 4: Implement the wrapper**

Create `components/RevealOnScroll.tsx`:
```tsx
'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
}

export function RevealOnScroll({ children, delay = 0 }: RevealOnScrollProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npx vitest run components/RevealOnScroll.test.tsx`
Expected: PASS (1 test)

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add Framer Motion scroll-reveal wrapper"
```

---

## Task 11: Hero section

**Files:**
- Create: `components/sections/Hero.tsx`, `components/sections/Hero.test.tsx`

**Interfaces:**
- Consumes: `RevealOnScroll` from Task 10.
- Produces: `Hero({ name, role, description }: { name: string; role: string; description: string }): JSX.Element` — consumed by Task 19.

- [ ] **Step 1: Write the failing test**

Create `components/sections/Hero.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';

describe('Hero', () => {
  it('renders the name, role, and description', () => {
    render(<Hero name="Jane Doe" role="Test Engineer" description="A description." />);
    expect(screen.getByRole('heading', { level: 1, name: 'Jane Doe' })).toBeInTheDocument();
    expect(screen.getByText('Test Engineer')).toBeInTheDocument();
    expect(screen.getByText('A description.')).toBeInTheDocument();
  });

  it('links its CTAs to the projects and contact sections', () => {
    render(<Hero name="Jane Doe" role="Test Engineer" description="A description." />);
    expect(screen.getByRole('link', { name: 'View projects' })).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run components/sections/Hero.test.tsx`
Expected: FAIL — `Cannot find module './Hero'`

- [ ] **Step 3: Implement Hero**

Create `components/sections/Hero.tsx`:
```tsx
import { RevealOnScroll } from '@/components/RevealOnScroll';

interface HeroProps {
  name: string;
  role: string;
  description: string;
}

export function Hero({ name, role, description }: HeroProps) {
  return (
    <section id="about" className="mx-auto max-w-2xl px-6 pb-16 pt-20">
      <RevealOnScroll>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-text dark:text-accent">{role}</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{name}</h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed opacity-80">{description}</p>
        <div className="mt-8 flex gap-4 text-sm">
          <a href="#projects" className="rounded-full bg-ink px-5 py-2 font-semibold text-paper dark:bg-snow dark:text-canvas">
            View projects
          </a>
          <a href="#contact" className="rounded-full border border-ink/30 px-5 py-2 dark:border-snow/30">
            Contact
          </a>
        </div>
      </RevealOnScroll>
    </section>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run components/sections/Hero.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add hero section"
```

---

## Task 12: Experience section

**Files:**
- Create: `components/sections/Experience.tsx`, `components/sections/Experience.test.tsx`

**Interfaces:**
- Consumes: `RevealOnScroll` from Task 10, `ExperienceEntry` and `formatRange` from Task 5.
- Produces: `Experience({ entries }: { entries: ExperienceEntry[] }): JSX.Element` — consumed by Task 19.

- [ ] **Step 1: Write the failing test**

Create `components/sections/Experience.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Experience } from './Experience';
import type { ExperienceEntry } from '@/lib/data/experience';

const entries: ExperienceEntry[] = [
  { company: 'Acme Co', role: 'Frontend Engineer', startDate: '2022-01', highlights: ['Shipped the checkout redesign.'] },
  { company: 'Beta Inc', role: 'Junior Developer', startDate: '2020-01', endDate: '2021-12', highlights: ['Built the first component library.'] },
];

describe('Experience', () => {
  it('renders every entry with its role, company, and date range', () => {
    render(<Experience entries={entries} />);
    expect(screen.getByText('Frontend Engineer · Acme Co')).toBeInTheDocument();
    expect(screen.getByText('2022 — Present')).toBeInTheDocument();
    expect(screen.getByText('Junior Developer · Beta Inc')).toBeInTheDocument();
    expect(screen.getByText('2020 — 2021')).toBeInTheDocument();
  });

  it('renders every highlight', () => {
    render(<Experience entries={entries} />);
    expect(screen.getByText('Shipped the checkout redesign.')).toBeInTheDocument();
    expect(screen.getByText('Built the first component library.')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run components/sections/Experience.test.tsx`
Expected: FAIL — `Cannot find module './Experience'`

- [ ] **Step 3: Implement Experience**

Create `components/sections/Experience.tsx`:
```tsx
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { formatRange, type ExperienceEntry } from '@/lib/data/experience';

interface ExperienceProps {
  entries: ExperienceEntry[];
}

export function Experience({ entries }: ExperienceProps) {
  return (
    <section id="experience" className="mx-auto max-w-2xl px-6 py-16">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] opacity-60">Experience</h2>
      <ol className="mt-8 space-y-10 border-l border-ink/10 pl-6 dark:border-snow/10">
        {entries.map((entry) => (
          <li key={`${entry.company}-${entry.startDate}`}>
            <RevealOnScroll>
              <p className="text-xs opacity-60">{formatRange(entry)}</p>
              <h3 className="mt-1 text-lg font-semibold">
                {entry.role} · {entry.company}
              </h3>
              <ul className="mt-2 space-y-1 text-sm opacity-80">
                {entry.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </RevealOnScroll>
          </li>
        ))}
      </ol>
    </section>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run components/sections/Experience.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add experience timeline section"
```

---

## Task 13: Skills section

**Files:**
- Create: `components/sections/Skills.tsx`, `components/sections/Skills.test.tsx`

**Interfaces:**
- Consumes: `RevealOnScroll` from Task 10, `SkillGroup` from Task 5.
- Produces: `Skills({ groups }: { groups: SkillGroup[] }): JSX.Element` — consumed by Task 19.

- [ ] **Step 1: Write the failing test**

Create `components/sections/Skills.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skills } from './Skills';
import type { SkillGroup } from '@/lib/data/skills';

const groups: SkillGroup[] = [
  { category: 'Languages', items: ['TypeScript', 'JavaScript'] },
  { category: 'Frameworks', items: ['Next.js'] },
];

describe('Skills', () => {
  it('renders each category heading', () => {
    render(<Skills groups={groups} />);
    expect(screen.getByText('Languages')).toBeInTheDocument();
    expect(screen.getByText('Frameworks')).toBeInTheDocument();
  });

  it('renders each skill tag', () => {
    render(<Skills groups={groups} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run components/sections/Skills.test.tsx`
Expected: FAIL — `Cannot find module './Skills'`

- [ ] **Step 3: Implement Skills**

Create `components/sections/Skills.tsx`:
```tsx
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
                <li key={item} className="rounded-md bg-ink/5 px-3 py-1 text-sm dark:bg-snow/10">
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
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run components/sections/Skills.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add skills section, replacing percentage bars with tags"
```

---

## Task 14: Project card

**Files:**
- Create: `components/ProjectCard.tsx`, `components/ProjectCard.test.tsx`

**Interfaces:**
- Consumes: `Project` from Task 4.
- Produces: `ProjectCard({ project }: { project: Project }): JSX.Element` — consumed by Tasks 15, 20.

- [ ] **Step 1: Write the failing test**

Create `components/ProjectCard.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectCard } from './ProjectCard';
import type { Project } from '@/lib/data/projects';

const project: Project = {
  slug: 'test-project',
  name: 'Test Project',
  title: 'A Test Project',
  summary: 'A project used only in tests.',
  stack: ['React', 'Next.js'],
  coverImage: '/images/projects/test.png',
  caseStudy: { problem: 'p', contribution: 'c', outcome: 'o' },
};

describe('ProjectCard', () => {
  it('links to the project case study page', () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/projects/test-project');
  });

  it('shows the project name and stack', () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('React · Next.js')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run components/ProjectCard.test.tsx`
Expected: FAIL — `Cannot find module './ProjectCard'`

- [ ] **Step 3: Implement ProjectCard**

Create `components/ProjectCard.tsx`:
```tsx
import Link from 'next/link';
import type { Project } from '@/lib/data/projects';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="border-t border-ink/10 py-6 first:border-t-0 dark:border-snow/10">
      <Link href={`/projects/${project.slug}`} className="group flex items-baseline justify-between gap-4">
        <span>
          <span className="block text-lg font-semibold group-hover:underline">{project.name}</span>
          <span className="mt-1 block text-sm opacity-60">{project.stack.join(' · ')}</span>
        </span>
        <span aria-hidden="true" className="opacity-40">→</span>
      </Link>
    </article>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run components/ProjectCard.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add project card"
```

---

## Task 15: Projects preview section

**Files:**
- Create: `components/sections/ProjectsPreview.tsx`, `components/sections/ProjectsPreview.test.tsx`

**Interfaces:**
- Consumes: `RevealOnScroll` from Task 10, `ProjectCard` from Task 14, `Project` from Task 4.
- Produces: `ProjectsPreview({ projects, limit? }: { projects: Project[]; limit?: number }): JSX.Element` — consumed by Task 19.

- [ ] **Step 1: Write the failing test**

Create `components/sections/ProjectsPreview.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectsPreview } from './ProjectsPreview';
import type { Project } from '@/lib/data/projects';

function makeProject(slug: string): Project {
  return {
    slug,
    name: slug,
    title: slug,
    summary: slug,
    stack: ['React'],
    coverImage: '/images/projects/test.png',
    caseStudy: { problem: 'p', contribution: 'c', outcome: 'o' },
  };
}

const sixProjects = ['a', 'b', 'c', 'd', 'e', 'f'].map(makeProject);

describe('ProjectsPreview', () => {
  it('shows only the first 4 projects by default', () => {
    render(<ProjectsPreview projects={sixProjects} />);
    expect(screen.getAllByRole('article')).toHaveLength(4);
  });

  it('links to the full projects list', () => {
    render(<ProjectsPreview projects={sixProjects} />);
    expect(screen.getByRole('link', { name: 'See all' })).toHaveAttribute('href', '/projects');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run components/sections/ProjectsPreview.test.tsx`
Expected: FAIL — `Cannot find module './ProjectsPreview'`

- [ ] **Step 3: Implement ProjectsPreview**

Create `components/sections/ProjectsPreview.tsx`:
```tsx
import Link from 'next/link';
import { ProjectCard } from '@/components/ProjectCard';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import type { Project } from '@/lib/data/projects';

interface ProjectsPreviewProps {
  projects: Project[];
  limit?: number;
}

export function ProjectsPreview({ projects, limit = 4 }: ProjectsPreviewProps) {
  const visible = projects.slice(0, limit);
  return (
    <section id="projects" className="mx-auto max-w-2xl px-6 py-16">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] opacity-60">Selected projects</h2>
        <Link href="/projects" className="text-sm underline">
          See all
        </Link>
      </div>
      <div className="mt-6">
        {visible.map((project) => (
          <RevealOnScroll key={project.slug}>
            <ProjectCard project={project} />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run components/sections/ProjectsPreview.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add projects preview section"
```

---

## Task 16: Contact section

**Files:**
- Create: `components/sections/Contact.tsx`, `components/sections/Contact.test.tsx`

**Interfaces:**
- Consumes: `site` from Task 4.
- Produces: `Contact(): JSX.Element` — consumed by Task 19.

- [ ] **Step 1: Write the failing test**

Create `components/sections/Contact.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Contact } from './Contact';

describe('Contact', () => {
  it('posts to the Formspree endpoint', () => {
    const { container } = render(<Contact />);
    const form = container.querySelector('form');
    expect(form).toHaveAttribute('action', 'https://formspree.io/f/mqkvbqlw');
    expect(form).toHaveAttribute('method', 'POST');
  });

  it('has labeled, required name/email/message fields', () => {
    render(<Contact />);
    expect(screen.getByLabelText('Full name')).toBeRequired();
    expect(screen.getByLabelText('Email address')).toBeRequired();
    expect(screen.getByLabelText('Message')).toBeRequired();
  });

  it('shows a mailto link with the real contact email', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: 'moinuddinmd067@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:moinuddinmd067@gmail.com',
    );
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run components/sections/Contact.test.tsx`
Expected: FAIL — `Cannot find module './Contact'`

- [ ] **Step 3: Implement Contact**

Create `components/sections/Contact.tsx`:
```tsx
import { site } from '@/lib/site';

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-2xl px-6 py-16">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] opacity-60">Contact</h2>
      <p className="mt-4 text-lg">
        Have a project or role in mind?{' '}
        <a href={`mailto:${site.email}`} className="underline">
          {site.email}
        </a>
      </p>
      <form action={site.contactFormAction} method="POST" className="mt-8 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 w-full rounded-md border border-ink/20 bg-transparent px-3 py-2 dark:border-snow/20"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-md border border-ink/20 bg-transparent px-3 py-2 dark:border-snow/20"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="mt-1 w-full rounded-md border border-ink/20 bg-transparent px-3 py-2 dark:border-snow/20"
          />
        </div>
        <button type="submit" className="rounded-full bg-ink px-6 py-2 font-semibold text-paper dark:bg-snow dark:text-canvas">
          Send message
        </button>
      </form>
    </section>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run components/sections/Contact.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add contact section"
```

---

## Task 17: Person JSON-LD

**Files:**
- Create: `components/PersonJsonLd.tsx`, `components/PersonJsonLd.test.tsx`

**Interfaces:**
- Consumes: `site` from Task 4.
- Produces: `PersonJsonLd(): JSX.Element` — consumed by Task 18.

- [ ] **Step 1: Write the failing test**

Create `components/PersonJsonLd.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { PersonJsonLd } from './PersonJsonLd';
import { site } from '@/lib/site';

describe('PersonJsonLd', () => {
  it('embeds a schema.org Person script with the site identity', () => {
    const { container } = render(<PersonJsonLd />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const data = JSON.parse(script!.innerHTML);
    expect(data['@type']).toBe('Person');
    expect(data.name).toBe(site.name);
    expect(data.sameAs).toContain(site.social.linkedin);
    expect(data.sameAs).toContain(site.social.github);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run components/PersonJsonLd.test.tsx`
Expected: FAIL — `Cannot find module './PersonJsonLd'`

- [ ] **Step 3: Implement PersonJsonLd**

Create `components/PersonJsonLd.tsx`:
```tsx
import { site } from '@/lib/site';

export function PersonJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    url: site.url,
    jobTitle: 'Frontend Engineer',
    email: site.email,
    sameAs: [site.social.linkedin, site.social.github],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run components/PersonJsonLd.test.tsx`
Expected: PASS (1 test)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Person JSON-LD structured data"
```

---

## Task 18: Root layout

**Files:**
- Modify: `app/layout.tsx`, `tailwind.config.ts`
- Create: `app/icon.svg`

**Interfaces:**
- Consumes: `ThemeProvider` (Task 6), `SkipLink`, `Navbar` (Task 8), `Footer` (Task 9), `PersonJsonLd` (Task 17), `site` (Task 4).

- [ ] **Step 1: Wire the `next/font` CSS variable into Tailwind's `font-sans` utility**

`next/font` only sets a `--font-sans` CSS variable on `<body>` — nothing uses it until Tailwind's `font-sans` utility is pointed at that variable. Modify `tailwind.config.ts`, adding `fontFamily` alongside the existing `colors` block inside `theme.extend`:
```ts
    extend: {
      colors: {
        paper: '#fafafa',
        ink: '#111111',
        canvas: '#0b0b0d',
        snow: '#eaeaea',
        accent: {
          DEFAULT: '#59968F',
          text: '#3E6F69',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
```

- [ ] **Step 2: Implement the root layout**

Replace the contents of `app/layout.tsx`:
```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SkipLink } from '@/components/layout/SkipLink';
import { PersonJsonLd } from '@/components/PersonJsonLd';
import { site } from '@/lib/site';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} font-sans`}>
        <ThemeProvider>
          <SkipLink />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <PersonJsonLd />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Add the favicon via Next.js's file-based icon convention**

Create `app/icon.svg`:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="6" fill="#111111"/>
  <text x="16" y="21" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#59968F" text-anchor="middle">M</text>
</svg>
```
Next.js automatically serves `app/icon.svg` as the site favicon — no `<link>` tag needed.

- [ ] **Step 4: Verify the app builds**

Run:
```bash
npm run build
```
Expected: build succeeds. (Root layout composes `<html>`/`<body>`, which isn't practical to unit-test with React Testing Library in jsdom — a successful build plus the component-level tests already covering `Navbar`/`Footer`/`ThemeProvider`/`SkipLink`/`PersonJsonLd` individually is the verification for this task.)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: wire up root layout with theme, nav, footer, JSON-LD, and favicon"
```

---

## Task 19: Home page

**Files:**
- Modify: `app/page.tsx`
- Create: `app/page.test.tsx`

**Interfaces:**
- Consumes: `Hero` (Task 11), `Experience` (Task 12), `Skills` (Task 13), `ProjectsPreview` (Task 15), `Contact` (Task 16), `site` (Task 4), `experience`/`skillGroups`/`projects` (Tasks 4/5).

- [ ] **Step 1: Write the failing test**

Create `app/page.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import HomePage from './page';

describe('HomePage', () => {
  it('renders every homepage section in order', () => {
    const { container } = render(<HomePage />);
    const sectionIds = Array.from(container.querySelectorAll('section')).map((section) => section.id);
    expect(sectionIds).toEqual(['about', 'experience', 'skills', 'projects', 'contact']);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run app/page.test.tsx`
Expected: FAIL — the scaffold's default `app/page.tsx` has no matching sections.

- [ ] **Step 3: Implement the home page**

Replace the contents of `app/page.tsx`:
```tsx
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
      <Hero name={site.name} role="Frontend Engineer" description={site.description} />
      <Experience entries={experience} />
      <Skills groups={skillGroups} />
      <ProjectsPreview projects={projects} limit={4} />
      <Contact />
    </>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run app/page.test.tsx`
Expected: PASS (1 test)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: compose the home page from all sections"
```

---

## Task 20: Projects list page

**Files:**
- Create: `app/projects/page.tsx`, `app/projects/page.test.tsx`

**Interfaces:**
- Consumes: `ProjectCard` (Task 14), `projects` (Task 4), `site` (Task 4).

- [ ] **Step 1: Write the failing test**

Create `app/projects/page.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProjectsPage, { metadata } from './page';
import { projects } from '@/lib/data/projects';

describe('ProjectsPage', () => {
  it('renders a card for every project', () => {
    render(<ProjectsPage />);
    expect(screen.getAllByRole('article')).toHaveLength(projects.length);
  });

  it('sets the page title to "Projects"', () => {
    expect(metadata.title).toBe('Projects');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run app/projects/page.test.tsx`
Expected: FAIL — `Cannot find module './page'`

- [ ] **Step 3: Implement the projects list page**

Create `app/projects/page.tsx`:
```tsx
import type { Metadata } from 'next';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/lib/data/projects';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Projects',
  description: `Case studies from ${site.name}'s recent work.`,
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">Projects</h1>
      <div className="mt-8">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run app/projects/page.test.tsx`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add projects list page"
```

---

## Task 21: Project case-study page

**Files:**
- Create: `app/projects/[slug]/page.tsx`, `app/projects/[slug]/page.test.tsx`

**Interfaces:**
- Consumes: `getProjectBySlug`, `projects` (Task 4), `site` (Task 4).

- [ ] **Step 1: Write the failing test**

Create `app/projects/[slug]/page.test.tsx`:
```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { projects } from '@/lib/data/projects';

vi.mock('next/image', () => ({
  default: ({ fill, ...rest }: Record<string, unknown>) => <img {...(rest as Record<string, unknown>)} />,
}));

vi.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('NEXT_NOT_FOUND');
  },
}));

import ProjectPage, { generateStaticParams, generateMetadata } from './page';

describe('generateStaticParams', () => {
  it('returns a param entry for every project', () => {
    const params = generateStaticParams();
    expect(params).toHaveLength(projects.length);
    expect(params).toContainEqual({ slug: 'emporia' });
  });
});

describe('generateMetadata', () => {
  it('uses the project name as the title', () => {
    const metadata = generateMetadata({ params: { slug: 'emporia' } });
    expect(metadata.title).toBe('Emporia');
  });
});

describe('ProjectPage', () => {
  it('renders the problem, contribution, and outcome for a known slug', () => {
    render(<ProjectPage params={{ slug: 'emporia' }} />);
    const emporia = projects.find((project) => project.slug === 'emporia')!;
    expect(screen.getByText(emporia.caseStudy.problem)).toBeInTheDocument();
    expect(screen.getByText(emporia.caseStudy.contribution)).toBeInTheDocument();
    expect(screen.getByText(emporia.caseStudy.outcome)).toBeInTheDocument();
  });

  it('shows a "View live" link when liveUrl is set', () => {
    render(<ProjectPage params={{ slug: 'emporia' }} />);
    expect(screen.getByRole('link', { name: 'View live' })).toHaveAttribute('href', 'https://emporia.bcc.gov.bd/');
  });

  it('shows a "View code" link only when githubUrl is set', () => {
    render(<ProjectPage params={{ slug: 'mogo' }} />);
    expect(screen.getByRole('link', { name: 'View code' })).toHaveAttribute(
      'href',
      'https://github.com/MD-Moinuddin/Mogo',
    );
  });

  it('calls notFound for an unknown slug', () => {
    expect(() => render(<ProjectPage params={{ slug: 'does-not-exist' }} />)).toThrow('NEXT_NOT_FOUND');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run "app/projects/[slug]/page.test.tsx"`
Expected: FAIL — `Cannot find module './page'`

- [ ] **Step 3: Implement the project case-study page**

Create `app/projects/[slug]/page.tsx`:
```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProjectBySlug, projects } from '@/lib/data/projects';
import { site } from '@/lib/site';

interface ProjectPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    openGraph: {
      title: `${project.name} — ${site.name}`,
      description: project.summary,
      images: [project.coverImage],
    },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-text dark:text-accent">
        {project.stack.join(' · ')}
      </p>
      <h1 className="mt-3 text-3xl font-bold">{project.name}</h1>
      <p className="mt-2 text-lg opacity-70">{project.title}</p>

      <div className="relative mt-8 aspect-video overflow-hidden rounded-lg">
        <Image src={project.coverImage} alt={`${project.name} screenshot`} fill className="object-cover" />
      </div>

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide opacity-60">Problem</h2>
          <p className="mt-2 leading-relaxed">{project.caseStudy.problem}</p>
        </section>
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide opacity-60">Contribution</h2>
          <p className="mt-2 leading-relaxed">{project.caseStudy.contribution}</p>
        </section>
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide opacity-60">Outcome</h2>
          <p className="mt-2 leading-relaxed">{project.caseStudy.outcome}</p>
        </section>
      </div>

      <div className="mt-10 flex gap-4 text-sm">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-ink px-5 py-2 font-semibold text-paper dark:bg-snow dark:text-canvas"
          >
            View live
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-ink/30 px-5 py-2 dark:border-snow/30">
            View code
          </a>
        )}
      </div>
    </article>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run "app/projects/[slug]/page.test.tsx"`
Expected: PASS (6 tests)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add project case-study page"
```

---

## Task 22: Sitemap and robots

**Files:**
- Create: `app/sitemap.ts`, `app/sitemap.test.ts`, `app/robots.ts`, `app/robots.test.ts`

**Interfaces:**
- Consumes: `projects` (Task 4), `site` (Task 4).

> The spec names `next-sitemap` as the tool for this; this task instead uses Next.js's built-in `app/sitemap.ts` / `app/robots.ts` file conventions, which generate the same `sitemap.xml` and `robots.txt` output natively with no extra dependency.

- [ ] **Step 1: Write the failing test for sitemap**

Create `app/sitemap.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import sitemap from './sitemap';
import { projects } from '@/lib/data/projects';
import { site } from '@/lib/site';

describe('sitemap', () => {
  it('includes the homepage and the projects list page', () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(site.url);
    expect(urls).toContain(`${site.url}/projects`);
  });

  it('includes every project case-study page', () => {
    const urls = sitemap().map((entry) => entry.url);
    projects.forEach((project) => {
      expect(urls).toContain(`${site.url}/projects/${project.slug}`);
    });
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run app/sitemap.test.ts`
Expected: FAIL — `Cannot find module './sitemap'`

- [ ] **Step 3: Implement sitemap**

Create `app/sitemap.ts`:
```ts
import type { MetadataRoute } from 'next';
import { projects } from '@/lib/data/projects';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/projects'].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${site.url}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes];
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run app/sitemap.test.ts`
Expected: PASS (2 tests)

- [ ] **Step 5: Write the failing test for robots**

Create `app/robots.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import robots from './robots';
import { site } from '@/lib/site';

describe('robots', () => {
  it('allows all crawlers', () => {
    const result = robots();
    expect(result.rules).toEqual({ userAgent: '*', allow: '/' });
  });

  it('points to the sitemap', () => {
    const result = robots();
    expect(result.sitemap).toBe(`${site.url}/sitemap.xml`);
  });
});
```

- [ ] **Step 6: Run the test to verify it fails**

Run: `npx vitest run app/robots.test.ts`
Expected: FAIL — `Cannot find module './robots'`

- [ ] **Step 7: Implement robots**

Create `app/robots.ts`:
```ts
import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 8: Run the tests to verify they pass**

Run: `npx vitest run app/robots.test.ts`
Expected: PASS (2 tests)

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add sitemap and robots.txt"
```

---

## Task 23: Final verification and deployment prep

**Files:**
- Modify: `lib/site.ts` (update `url` after the first Vercel deploy)

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: all tests across every task pass.

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: build succeeds with no type errors.

- [ ] **Step 3: Run the linter**

Run: `npm run lint`
Expected: no errors (warnings about the one placeholder experience entry are expected and fine).

- [ ] **Step 4: Push the branch and open a PR**

```bash
git push -u origin rebuild-nextjs
gh pr create --title "Rebuild portfolio with Next.js, TypeScript, and Tailwind" --body "Replaces the static jQuery/Bootstrap site per docs/superpowers/specs/2026-10-03-portfolio-rebuild-design.md. Fixes the missing viewport meta tag, missing SEO metadata, broken counter script, and the Xing link bug; removes ~8MB of unused images and the committed .idea/ folder; adds an Experience section, dark mode, and per-project case-study pages."
```

- [ ] **Step 5: Connect the repo to Vercel (manual, one-time)**

This step happens in the Vercel dashboard, not in code: sign in at vercel.com with the GitHub account that owns `MD-Moinuddin/My-Portfolio`, import the repo, and accept the auto-detected Next.js build settings. Vercel will build the `rebuild-nextjs` branch as a preview deployment and assign a `*.vercel.app` URL.

- [ ] **Step 6: Update the real site URL**

Once Vercel assigns the production URL, update `lib/site.ts`:
```ts
url: 'https://<the-actual-assigned-subdomain>.vercel.app',
```
Run `npx vitest run lib/site.test.ts tailwind.config.test.ts app/sitemap.test.ts app/robots.test.ts` to confirm nothing else depended on the placeholder value, then commit:
```bash
git add lib/site.ts
git commit -m "chore: set production site URL after first Vercel deploy"
git push
```

- [ ] **Step 7: Merge**

Once the Vercel preview looks right and the PR is reviewed, merge `rebuild-nextjs` into `main` — Vercel's GitHub integration will then auto-deploy `main` to production on every future push.
