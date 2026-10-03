# MD Moinuddin — Portfolio

Personal portfolio site for MD Moinuddin, a frontend engineer. Single-page editorial homepage
(about, experience, skills, projects, contact) plus a `/projects` index and a case-study page per
project.

## Stack

- **Next.js 16** (App Router, static generation) with **React 19**
- **TypeScript**
- **Tailwind CSS v4** (CSS-first config in `app/globals.css`)
- **Inter** via `next/font/google`
- **Framer Motion** for scroll reveals (respects `prefers-reduced-motion`)
- **Vitest** + **Testing Library** + **jsdom** for unit/component tests

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | What it does                                  |
| --------------- | --------------------------------------------- |
| `npm run dev`   | Start the dev server                          |
| `npm run build` | Production build (prerenders all static pages) |
| `npm start`     | Serve the production build                    |
| `npm test`      | Run the test suite once                       |
| `npm run test:watch` | Run tests in watch mode                  |
| `npm run lint`  | ESLint (`eslint-config-next`)                 |

## Project layout

```
app/                  Routes: homepage, /projects, /projects/[slug], sitemap, robots, OG image
components/           Section and layout components, each with a colocated *.test.tsx
components/sections/   Hero, Experience, Skills, ProjectsPreview, Contact
components/layout/     Navbar, Footer, SkipLink
lib/site.ts           Site-wide name, description, URL, email, social links
lib/data/             Content sources: projects, experience, skills
lib/theme-colors.ts   Color tokens, kept in sync with the @theme block in app/globals.css
public/               cv.pdf and project screenshots
```

## Content

Site metadata lives in `lib/site.ts`; page content lives in `lib/data/`. Adding a project to
`lib/data/projects.ts` is enough to generate its card, its case-study route, and its sitemap entry.
Themes are stored under the `portfolio-theme` localStorage key, with an inline script in the root
layout applying the saved/system theme before first paint.

## Deployment

Built for Vercel. `npm run build` produces a fully prerendered site; `lib/site.ts`'s `url` is the
canonical origin used for metadata, the sitemap, and `robots.txt`.
