import type { ExperienceData } from "@/types/portfolio";

/** Full-time frontend employment history. */
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
];
