import type { ExperienceData } from "@/types/portfolio";

/**
 * Experience data is split into two groups via the `kind` discriminator:
 *  - "job"      → Full-time employment at a company (startup, agency, etc.)
 *  - "freelance" → Independent client work done on the side / in the past.
 *
 * The Experience section renders each group under its own heading so
 * recruiters can clearly separate full-time roles from freelance projects.
 */
export const experienceData: ExperienceData[] = [
  // ───────────────────────────── JOB EXPERIENCE ─────────────────────────────
  {
    kind: "job",
    company: "Klakar",
    companyUrl: "https://klakar.com/",
    role: "Frontend Developer",
    period: "2025 — Present",
    location: "Gurugram, India",
    projectName: "Klakar — Network for Artists",
    projectUrl: "https://klakar.com/",
    current: true,
    summary:
      "Building the frontend of Klakar, a startup platform where creative professionals build standout portfolios, find collaborators, learn from working pros, and let AI handle the busywork. Working as a full-time Frontend Developer in a fast-moving startup environment, owning UI implementation end-to-end across product surfaces.",
    focusAreas: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Startup Frontend",
    ],
    highlights: [
      "Own and ship frontend features for Klakar's artist network product using Next.js, React, and TypeScript in a startup environment.",
      "Translate product requirements and Figma designs into responsive, accessible, and production-ready UI components with Tailwind CSS.",
      "Collaborate directly with founders and backend engineers to integrate APIs, shape product flows, and unblock delivery on tight startup timelines.",
      "Improve performance and Core Web Vitals through image optimization, code splitting, and modern Next.js App Router patterns.",
    ],
  },
  {
    kind: "job",
    company: "Dizivizi",
    companyUrl: "https://dizivizi.com/",
    role: "Frontend Developer",
    period: "2024 — 2025",
    location: "Remote, India",
    projectName: "Dizivizi — Video-location Platform",
    projectUrl: "https://dizivizi.com/",
    summary:
      "Worked on the frontend of Dizivizi, a video-sharing platform where users tag videos to map locations so others can discover content by place. Built and maintained responsive UI, interactive map experiences, and dynamic video player interfaces for web.",
    focusAreas: [
      "React.js",
      "JavaScript",
      "Interactive Maps",
      "Video Player UI",
      "Responsive Design",
    ],
    highlights: [
      "Implemented interactive map-based video discovery UI using React and JavaScript, letting users browse videos pinned to real-world locations.",
      "Built responsive video player and listing components for the Dizivizi web platform across desktop, tablet, and mobile breakpoints.",
      "Integrated backend APIs for video upload, geotagging, and feed rendering with clean loading and error states.",
      "Collaborated with the product team to refine UX flows for video tagging, search, and location-based discovery.",
    ],
  },

  // ───────────────────────────── FREELANCE WORK ─────────────────────────────
  {
    kind: "freelance",
    company: "Self-Employed",
    role: "Freelance Frontend Developer",
    period: "2024 — Present",
    location: "Gurugram, India",
    projectName: "Client Websites & Web Apps",
    current: true,
    summary:
      "Available for select freelance frontend work alongside my full-time role — building modern, responsive, and conversion-focused websites and web applications for clients across India. Pick up small to mid-sized projects where I can ship quickly and own the frontend end-to-end.",
    focusAreas: [
      "Next.js",
      "React.js",
      "Landing Pages",
      "API Integration",
      "Responsive Design",
    ],
    highlights: [
      "Delivered responsive marketing websites and landing pages for freelance clients using Next.js, React, Tailwind CSS, and modern frontend tooling.",
      "Shipped client web applications with API integration, dynamic data flows, and clean state management for real business use cases.",
      "Improved SEO readiness and Core Web Vitals for client sites through semantic HTML, image optimization, and performance-minded code.",
      "Managed end-to-end delivery — from client requirements and design handoff to production deploy — with clear communication throughout.",
    ],
  },
  {
    kind: "freelance",
    company: "Multiple Clients",
    role: "Frontend Developer",
    period: "2023 — 2024",
    location: "India",
    summary:
      "Earlier freelance frontend work — portfolio websites, business landing pages, and small web app builds. Focused on speed, usability, and modern frontend best practices while completing my degree.",
    focusAreas: [
      "Landing Pages",
      "Tailwind CSS",
      "Responsive UI",
      "Performance Optimization",
    ],
    highlights: [
      "Translated client briefs into clean frontend layouts and reusable UI sections for small business websites.",
      "Improved SEO and mobile usability with semantic HTML structure and responsive implementation.",
      "Supported multiple project types — from portfolio websites to dynamic business pages and custom UI builds.",
    ],
  },
];
