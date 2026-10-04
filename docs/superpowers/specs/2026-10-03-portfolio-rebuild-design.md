# Portfolio Rebuild — Design Spec

**Date:** 2026-10-03
**Status:** Approved by user, pending implementation plan

## 1. Context

The current portfolio (`My-Portfolio` repo) is a static HTML/CSS/jQuery site built on Bootstrap 4 with five jQuery plugins (superslides, owl.carousel, easypiechart, typed.js, counterup). Audit findings that motivate this rebuild:

- Missing `<meta name="viewport">` — site does not render responsively on mobile.
- `js/jquery.counterup.min.js` is referenced in `index.html` but does not exist in `js/` (404, and the stat counters never animate).
- The Xing social icon links to `myaccount.google.com/personal-info`, not a real profile.
- No SEO metadata: no description, no Open Graph/Twitter cards, no favicon, no sitemap/robots.txt.
- ~8MB of unused images committed (`agency.jpg`, `sparkbit.png`, `lightspeed.png`, `MoGo.jpg`, `craft.jpg`, `profile-2.jpg`, `profile-3.jpg`, a duplicate `E-shopper.png`).
- `.idea/` (JetBrains project files) committed to git; no `.gitignore` exists.
- Accessibility gaps (empty `alt` on non-decorative images, no `aria-label`s on icon-only links, no skip-to-content link, `outline: 0` removing focus indicators) — notable given two listed projects are WCAG 2.1 accessibility work.
- Skills presented as self-rated percentage bars (subjective, dated pattern).
- Projects are thumbnail + live-demo link only — no case-study detail, no GitHub links, no work-experience timeline.
- Stack shown (Angular/Vue/jQuery) omits anything from the current React/TypeScript/Next.js generation that most 2025/2026 frontend job postings expect to see.

## 2. Goals

- Rebuild as a modern, fast, accessible, SEO-correct personal site that itself demonstrates current frontend practice.
- Fix all bugs/gaps listed above.
- Preserve the existing GitHub repo (`MD-Moinuddin/My-Portfolio`), its history, and its URL — this is a restructuring of that repo, not a new one.
- Ship a complete, live site now; defer deep content writing (full case studies, testimonials, blog) to a fast-follow pass.

## 3. Non-goals

- No CMS / headless content backend — content is small and personal; a typed data file is sufficient.
- No blog in this build.
- No testimonials section in this build.
- No internationalization (English only) in this build.
- No custom domain purchase/setup in this build (deploys to the default Vercel URL; domain can be attached later without further rebuild work).

## 4. Stack

- **Framework:** Next.js 14+, App Router, TypeScript.
- **Styling:** Tailwind CSS, class-based dark mode (`darkMode: 'class'`), toggle state persisted to `localStorage`.
- **Animation:** Framer Motion — scroll-triggered fade/slide-up reveals on section entry, and the dark-mode toggle transition. No cursor effects, no 3D/WebGL.
- **Fonts:** `next/font` (self-hosted), replacing the current Google Fonts CDN `<link>` tags.
- **Images:** `next/image` for every image — automatic WebP/AVIF conversion, lazy loading, responsive `sizes`.
- **Contact form:** Formspree (existing endpoint `https://formspree.io/f/mqkvbqlw`), restyled to match the new design. No backend code added.
- **Deployment:** Vercel, connected to the GitHub repo for auto-deploy on push to `main` and PR preview deployments. Default `*.vercel.app` URL for now; custom domain can be attached later with no code changes.

## 5. Repo strategy

Work happens on a new branch, `rebuild-nextjs`, inside the existing repo. The Next.js app is scaffolded at the repo root (the current static files — `index.html`, `css/`, `js/`, `img/` — are removed as part of the migration once their content/assets are ported into the new structure). Merge to `main` via PR once the site is verified working and deployed to a Vercel preview.

## 6. Information architecture / routing

- `/` — single scroll page, sections in order: Hero/About → Experience timeline → Skills → Projects preview (top 3-4 cards, "see all" link) → Contact.
- `/projects` — full list of all project case studies.
- `/projects/[slug]` — one dedicated case-study page per project (slugs: `emporia`, `pristine`, `arcade`, `bdjobs`, `zone`, `mogo`, `e-shopper`, `craft`). Each has its own `generateMetadata` (title, description, OG image) for correct link previews when shared individually.
- Resume stays a static PDF (`public/cv.pdf`), linked from the nav as "Download CV," opened in a new tab — unchanged behavior from today.

## 7. Content/data model

Plain typed TypeScript modules under `lib/data/`, no CMS, no MDX:

```ts
// lib/data/projects.ts
export interface Project {
  slug: string;
  title: string;
  name: string;            // e.g. "Emporia"
  summary: string;         // one-liner for cards/previews
  stack: string[];         // e.g. ["Angular 8", "Spring Boot", "WCAG 2.1"]
  coverImage: string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudy: {
    problem: string;       // placeholder text at launch, expanded in fast-follow
    contribution: string;
    outcome: string;
  };
}
```

```ts
// lib/data/experience.ts
export interface ExperienceEntry {
  company: string;
  role: string;
  startDate: string;       // ISO "YYYY-MM"
  endDate?: string;        // omitted = "Present"
  highlights: string[];    // placeholder entries if not yet supplied
}
```

```ts
// lib/data/skills.ts
export interface SkillGroup {
  category: "Languages" | "Frameworks" | "Tools";
  items: string[];         // rendered as tags/badges, no percentages
}
```

At launch, `caseStudy` fields and `experience.highlights` are seeded with the current one-line project blurbs / "4+ years experience" framing as honest placeholders — not fabricated detail — clearly written so they read as complete sentences, not "TODO" stubs, pending the fast-follow content pass.

## 8. Experience timeline section (new)

Added to the homepage (not present in the current site). Renders `lib/data/experience.ts` as a vertical timeline: company, role, date range, 1-2 highlight bullets per entry. Scaffolded now with placeholder entries if detailed work history isn't supplied before implementation starts; content refined in the fast-follow pass per the user's standing preference to restyle now and expand content later.

## 9. Design system

Direction: **Minimal Editorial**, approved via the visual brainstorming companion.

- **Theme:** Light by default (`#fafafa`-ish background, near-black text), dark mode via a visible toggle in the nav, class-based Tailwind dark variant, preference persisted in `localStorage` and respecting `prefers-color-scheme` on first visit.
- **Accent color:** Carry over the current teal (`#59968F`). Before finalizing, check contrast against the light background; if it fails WCAG AA for text use, darken it for text contexts while keeping the lighter value available for large decorative elements only.
- **Layout:** Single column, generous whitespace, large confident headings, hairline dividers between sections (as shown in the approved mockup) rather than filled card backgrounds. Projects render as a scannable list (title + stack + arrow) on the homepage preview, each linking to its full case-study page.
- **Typography:** One expressive sans-serif for headings (via `next/font`), system/sans for body — no more than two font families.

## 10. Animation

Framer Motion `whileInView` fade + slide-up (8-12px translate) on each major section, staggered slightly for list items (experience entries, skill tags, project rows). Toggle transition on theme switch is a simple CSS color transition, not a Framer Motion animation. No parallax, no cursor-follow, no 3D.

## 11. SEO / accessibility / performance

- Per-page `metadata` exports: title, description, Open Graph, Twitter card. Root layout sets site-wide defaults; `/projects/[slug]` overrides per project.
- `next-sitemap` for `sitemap.xml` + `robots.txt`.
- JSON-LD `Person` schema on the homepage (name, jobTitle, url, sameAs: LinkedIn/GitHub).
- Every image gets real descriptive `alt` text (empty `alt=""` only for genuinely decorative images).
- Semantic landmarks (`<nav>`, `<main>`, `<footer>`), a skip-to-content link, visible focus rings restored (no blanket `outline: 0`), `aria-label` on every icon-only link (social icons, theme toggle).
- Target: Lighthouse 90+ on Performance, Accessibility, Best Practices, and SEO.

## 12. Repo cleanup

As part of this branch:
- Delete `.idea/`.
- Delete unused images: `agency.jpg`, `sparkbit.png`, `lightspeed.png`, `MoGo.jpg`, `craft.jpg`, `profile-2.jpg`, `profile-3.jpg`, duplicate `E-shopper.png`.
- Add `.gitignore` covering `node_modules`, `.next`, `.vercel`, `.superpowers/`, `.env*.local`.
- Add `package.json` (via `create-next-app` scaffolding) with standard `dev`/`build`/`start`/`lint` scripts.

## 13. Fast-follow (explicitly deferred)

- Full written case studies (detailed problem/contribution/outcome per project, beyond the honest-placeholder text shipped at launch).
- Testimonials section.
- Blog/writing section.
- Custom domain.

## 14. Open items

None — all decisions in this spec were confirmed with the user during brainstorming, including the visual direction (approved via the visual brainstorming companion: Minimal Editorial over Bento Grid and Dev-core Terminal) and the Experience timeline section being in-scope for this build.
