# Ishwar Portfolios (Next.js)

Modern portfolio project built with Next.js App Router, Tailwind v4, and shadcn/ui.

## Run

```bash
pnpm dev
pnpm lint
pnpm build
```

## Deploy Flow

- Source of truth: `Ishwar8264/Ishwar-portfolios` (this repo).
- Live site repo: `Ishwar8264/Ishwar8264.github.io`.
- Auto deploy workflow: [`.github/workflows/deploy-user-pages.yml`](.github/workflows/deploy-user-pages.yml)
  - Trigger: push to `main`
  - Build: `pnpm build` (Next static export)
  - Publish target: `Ishwar8264/Ishwar8264.github.io` `main` branch

This disconnects the old manual HTML/CSS/JS publishing flow. Only this Next.js source repo should be edited.

## Architecture Goal

- Keep pages clean and SEO friendly.
- Use Server Components by default.
- Keep Client Components minimal and isolated.
- Pass data through props (no section should fetch its own random data flow).

## Folder Structure (Team Convention)

```txt
app/
  layout.tsx
  page.tsx                # clean composition only
  globals.css

components/
  ui/                     # shadcn primitives only
  home/
    index.tsx             # section container (server)
    hero.tsx              # server
    hero-anim.client.tsx  # client wrapper (if needed)
  about/
    index.tsx
  skills/
    index.tsx
  projects/
    index.tsx
    project-card.tsx
    project-filter.client.tsx
  contact/
    index.tsx
  shared/
    container.tsx
    section-title.tsx
    reveal.client.tsx

content/
  profile.ts
  skills.ts
  projects.ts
  experience.ts
  social.ts

lib/
  utils.ts
  content.ts              # selectors/filters/sorting helpers

types/
  content.ts
```

## Data Flow (Single Direction)

1. `content/*.ts` keeps static portfolio data.
2. `app/page.tsx` imports content and passes props to sections.
3. `components/<section>/index.tsx` receives typed props and renders UI.
4. If interaction is needed, server section uses a small `*.client.tsx` wrapper.

Rule: section components should be prop-driven and predictable.

## Server vs Client Rules

### Default

- Every component is Server Component unless there is a real client need.

### Use Client Component only when required

Use `"use client"` only for:

- `useState`, `useEffect`, `useRef`
- browser APIs (`window`, `document`, `localStorage`, `IntersectionObserver`)
- event-heavy UI (filters, tabs with local state, animated counters)

### Import direction

- Server -> Client: allowed
- Client -> Server: not allowed

## Client Wrapper Pattern (Recommended)

Use tiny client islands instead of converting full sections to client.

```tsx
// components/about/index.tsx (Server)
import Reveal from "@/components/shared/reveal.client";

export default function AboutSection({ title, summary }: { title: string; summary: string }) {
  return (
    <section id="about">
      <Reveal>
        <h2>{title}</h2>
        <p>{summary}</p>
      </Reveal>
    </section>
  );
}
```

## Clean Page Pattern (SEO + Maintainability)

`app/page.tsx` should stay minimal:

- Compose sections only.
- No heavy UI logic.
- No duplicated text/data.
- Keep metadata in `app/layout.tsx` (and section-level semantic headings).

Example pattern:

```tsx
import HomeSection from "@/components/home";
import AboutSection from "@/components/about";
import ProjectsSection from "@/components/projects";
import { profile, projects } from "@/content";

export default function Page() {
  return (
    <main>
      <HomeSection profile={profile} />
      <AboutSection profile={profile} />
      <ProjectsSection projects={projects} />
    </main>
  );
}
```

## Component Contract Rules

- Components should receive data via props.
- Avoid hidden dependencies inside section components.
- Define and export explicit types for props.
- Keep side effects only inside client wrappers.

## Future Dev Checklist

When adding a new section:

1. Add data in `content/*`.
2. Define/extend types in `types/*`.
3. Create section in `components/<section>/index.tsx` (server first).
4. Add `*.client.tsx` only if interaction is truly needed.
5. Compose section in `app/page.tsx`.

This keeps the codebase scalable, SEO-safe, and easy to maintain.
