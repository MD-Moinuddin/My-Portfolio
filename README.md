# MD Moinuddin — Portfolio

Personal portfolio site for MD Moinuddin, a software engineer based in Bamberg, Germany.
Live at [md-moinuddin-portfolio.vercel.app](https://md-moinuddin-portfolio.vercel.app/).

A single-page homepage with these sections, in order: Hero, About, Experience, Education, Skills,
Selected projects, Master thesis, Recommendations, and Contact. It also has a `/projects` index, a
case-study page per project, and a `/thesis` page.

## Stack

- **Next.js 16** (App Router, static generation) with **React 19**
- **TypeScript**
- **Tailwind CSS v4** (CSS-first config in `app/globals.css`)
- **Inter** via `next/font/google`
- **Framer Motion** for scroll reveals (respects `prefers-reduced-motion`)
- **Vercel Analytics** for privacy-friendly visitor counts (no cookies)
- **Formspree** for the contact form
- **Vitest** + **Testing Library** + **jsdom** for unit/component tests

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

> Don't run `npm run build` or install packages while `npm run dev` is running: it can break the
> running dev server. Stop it and start it again afterwards.

## Scripts

| Command              | What it does                                   |
| -------------------- | ---------------------------------------------- |
| `npm run dev`        | Start the dev server                           |
| `npm run build`      | Production build (prerenders all static pages) |
| `npm start`          | Serve the production build                     |
| `npm test`           | Run the test suite once                        |
| `npm run test:watch` | Run tests in watch mode                        |
| `npm run lint`       | ESLint (`eslint-config-next`)                  |

## Project layout

```
app/                    Routes: homepage, /projects, /projects/[slug], /thesis, not-found,
                        sitemap, robots, generated share-preview (Open Graph) images
components/             Shared components, each with a colocated *.test.tsx
components/sections/    Hero, About, Experience, Education, Skills, ProjectsPreview, Thesis,
                        Recommendations, Contact
components/layout/      Navbar, Footer, SkipLink
lib/site.ts             Site-wide name, URL, email, location, languages, social links
lib/data/               Content sources: about, experience, education, skills, projects,
                        recommendations
lib/og.tsx              Builds the share-preview images
lib/theme-colors.ts     Color tokens, kept in sync with the @theme block in app/globals.css
public/                 cv.pdf, the portrait, and project screenshots
```

## Content

Site-wide details live in `lib/site.ts`; everything shown on the pages lives in `lib/data/`, so
updating the site is mostly a data edit:

- **New project:** add an entry to `lib/data/projects.ts` and a screenshot to
  `public/images/projects/`. That is enough to generate its card, its case-study page, its
  share-preview image, and its sitemap entry. The first four projects appear on the homepage.
- **Experience, education, skills, recommendations:** edit the matching file in `lib/data/`.
- **About text, photo, and facts** (location, languages, work authorization, availability):
  `lib/data/about.ts` and `public/images/about/`.
- **CV:** replace `public/cv.pdf`, keeping the same filename.

## Under the hood

- **Themes:** light and dark, stored under the `portfolio-theme` localStorage key. An inline script
  in the root layout applies the saved or system theme before first paint, so there is no flash.
- **SEO:** per-page titles and descriptions, canonical URLs, a sitemap, `robots.txt`, and
  schema.org `Person` structured data (name, location, languages, education, skills).
- **Share previews:** each project page and the thesis page gets a generated 1200×630 PNG
  (`opengraph-image.tsx`), because LinkedIn and X do not render SVG covers. LinkedIn caches
  previews; refresh one with its Post Inspector.
- **Accessibility:** skip link, semantic landmarks, keyboard-friendly tab lists, a contrast test
  for the color tokens (`lib/contrast.ts`), and reduced-motion support.
- **404 page:** `app/not-found.tsx`, rendered inside the normal layout and marked `noindex`.

## Deployment

Built for Vercel and deployed automatically from `master`. `npm run build` produces a fully
prerendered site. `lib/site.ts`'s `url` is the canonical origin used for metadata, canonical
tags, the sitemap, `robots.txt`, and the structured data, so update it if the domain changes.

Analytics: Vercel Analytics only records on the deployed site. Turn it on once under **Analytics**
in the Vercel project's dashboard; nothing is collected locally.
