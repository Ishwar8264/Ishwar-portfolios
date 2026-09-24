import type { ServiceData } from "@/types/portfolio";

/**
 * Services offered by Ishwar Sahani.
 *
 * Each entry is treated as a separate Service entity in JSON-LD
 * (see lib/seo.ts buildJsonLdGraph). Descriptions are fact-first and
 * keyword-rich for both traditional SEO and GEO (AI engines).
 */
export const servicesData: ServiceData[] = [
  {
    title: "Frontend Website Development",
    description:
      "Modern, responsive, and SEO-friendly websites built with Next.js, React, HTML5, CSS3, and Tailwind CSS. Delivered for startups, small businesses, and personal brands across Gurugram and India.",
    keywords: [
      "Frontend Development",
      "Responsive Websites",
      "SEO-Friendly Web Development",
      "Next.js Website",
      "React Website",
    ],
  },
  {
    title: "Next.js Full Stack Development",
    description:
      "Production web applications built end-to-end with Next.js App Router, React Server Components, Node.js APIs, and database integration. Full-stack delivery from UI to deploy on Vercel.",
    keywords: [
      "Next.js Full Stack",
      "Next.js Developer",
      "App Router",
      "Server Components",
      "Vercel Deployment",
    ],
  },
  {
    title: "MERN Stack Development",
    description:
      "Full-stack web apps using the MERN stack — MongoDB, Express.js, React.js, and Node.js. Includes REST API design, JWT authentication, and MongoDB schema modeling for production use.",
    keywords: [
      "MERN Stack Developer",
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "MERN Full Stack",
    ],
  },
  {
    title: "PERN Stack Development",
    description:
      "Relational full-stack applications using the PERN stack — PostgreSQL, Express.js, React.js, and Node.js. Includes schema design, REST APIs, and type-safe data flows.",
    keywords: [
      "PERN Stack Developer",
      "PostgreSQL",
      "Express.js",
      "React.js",
      "Node.js",
      "PERN Full Stack",
    ],
  },
  {
    title: "React.js Development",
    description:
      "Component-driven web applications and dashboards built with React.js, TypeScript, and modern hooks. Focused on reusable UI, performance, and maintainable code.",
    keywords: [
      "React Developer",
      "React.js Development",
      "TypeScript",
      "Component Architecture",
      "React Hooks",
    ],
  },
  {
    title: "Node.js Backend & API Integration",
    description:
      "REST API design and frontend integration using Node.js, Express, and modern fetch patterns. Covers authentication, error handling, and clean client-side data fetching with React Query or SWR.",
    keywords: [
      "Node.js Developer",
      "REST API Design",
      "API Integration",
      "Express.js",
      "JWT Authentication",
    ],
  },
  {
    title: "Tailwind CSS and Responsive UI",
    description:
      "Mobile-first layouts and design-system-driven UIs with Tailwind CSS v4. Polished responsive interfaces that improve usability, speed, and conversion across desktop, tablet, and mobile.",
    keywords: [
      "Tailwind CSS Developer",
      "Responsive Design",
      "UI Development",
      "Mobile-First",
      "Design System",
    ],
  },
];
