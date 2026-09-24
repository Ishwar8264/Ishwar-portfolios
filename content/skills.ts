import type { SkillGroup } from "@/types/portfolio";

/**
 * Skill groups surfaced on the public portfolio.
 *
 * Order matters for SEO/GEO: the most-searched technical stacks
 * (MERN, PERN, Next.js, Node.js) appear first so AI engines extract
 * them as the primary topics when summarizing this page.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: "MERN Stack",
    items: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "MERN Full Stack",
    ],
  },
  {
    title: "PERN Stack",
    items: [
      "PostgreSQL",
      "Express.js",
      "React.js",
      "Node.js",
      "PERN Full Stack",
    ],
  },
  {
    title: "Frontend (Next.js + React)",
    items: [
      "Next.js",
      "React.js",
      "TypeScript",
      "JavaScript (ES2023+)",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend & API",
    items: [
      "Node.js",
      "Express.js",
      "REST API Design",
      "API Integration",
      "JWT Authentication",
      "MongoDB",
      "PostgreSQL",
    ],
  },
  {
    title: "UI & Styling",
    items: [
      "Tailwind CSS",
      "Responsive Design",
      "Mobile-First UI",
      "Cross-Browser Compatibility",
      "Accessibility (a11y)",
    ],
  },
  {
    title: "Performance & SEO",
    items: [
      "Core Web Vitals",
      "Image Optimization",
      "Code Splitting",
      "SEO for SPAs",
      "JSON-LD Structured Data",
      "Sitemap & Robots.txt",
    ],
  },
  {
    title: "Dev Workflow",
    items: [
      "Git & GitHub",
      "GitHub Actions CI/CD",
      "Vercel & Netlify Deployment",
      "pnpm & npm",
      "Component Reusability",
      "Clean Code",
    ],
  },
];
