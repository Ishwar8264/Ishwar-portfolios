import { profileData, contactData } from "@/content/profile";
import { featuredProjects } from "@/content/projects";

/** Shared metadata and structured data for the portfolio. */

export const siteConfig = {
  name: "Ishwar Sahani",
  /** Birth name / alternate name — used by AI engines for entity resolution. */
  alternateName: "Ishwar Kumar",
  /** Short brand handle used in navbars, PWA manifests, OG `site_name`. */
  shortName: "Ishwar",
  /** Concise identity, frontend role, and location for search results. */
  title:
    "Ishwar Sahani | Frontend Engineer in Gurgaon",
  /**
   * Meta description — 150-160 chars. Front-loaded with the primary
   * entity + role + location so snippets read cleanly on Google.
   */
  description:
    "Ishwar Sahani, Frontend Developer in Gurugram (Gurgaon), building React, Next.js and TypeScript products. Open to frontend engineer and software engineer roles.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ishwar8264.github.io",
  locale: "en_IN",
  /** Canonical locale code used in hreflang / OG `locale`. */
  ogLocale: "en_IN",
  /** Geographic coordinates-ish for local SEO (Gurugram). */
  geo: {
    region: "IN-HR",
    placename: "Gurugram, Haryana, India",
    position: "28.4595;77.0266",
    icbm: "28.4595, 77.0266",
  },
  profileImage: {
    path: "/images/profile/img-2.jpeg",
    width: 899,
    height: 1599,
    alt: "Portrait of Ishwar Sahani, Frontend Developer in Gurugram, India",
  },
  logo: {
    path: "/icon-512.png",
    width: 512,
    height: 512,
    alt: "Ishwar Sahani — personal brand logo",
  },
  /** Technologies and role terms describing the portfolio. */
  keywords: [
    // Person name variants — entity resolution for AI engines
    "Ishwar Sahani",
    "Ishwar Kumar",
    "Ishwar Sahani Frontend Developer",
    "Ishwar Kumar Developer",
    // Role variants — primary intent
    "Frontend Developer",
    "Frontend Developer India",
    "Frontend Developer Gurugram",
    "Frontend Developer Gurgaon",
    "Frontend Engineer",
    "Frontend Engineer Gurgaon",
    "Frontend Engineer Gurugram",
    "Front End Developer Gurgaon",
    "Front End Engineer Gurugram",
    "Software Engineer",
    "Software Engineer Gurgaon",
    "Software Engineer Gurugram",
    "Frontend Software Engineer",
    "Frontend Software Engineer Gurgaon",
    "React Developer Gurgaon",
    "React Developer Gurugram",
    "Next.js Developer Gurgaon",
    "Next.js Developer Gurugram",
    "JavaScript Developer Gurgaon",
    "TypeScript Developer Gurgaon",
    "React Developer India",
    "Next.js Developer India",
    "Next.js Full Stack Developer",
    "Node.js Developer India",
    "Full Stack Developer India",
    "JavaScript Developer Gurugram",
    "TypeScript Developer India",
    // Stack variants — technical SEO
    "MERN Stack Developer India",
    "PERN Stack Developer India",
    "Next.js Developer",
    "React.js Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "Tailwind CSS Developer",
    // Skill variants — long-tail
    "API Integration Developer",
    "REST API Integration",
    "Responsive Web Developer India",
    "SEO-Friendly Web Development",
    "Web Developer India",
    // Brand / location
    "Ishwar Sahani Portfolio",
    "Ishwar Sahani GitHub",
    "Ishwar Sahani LinkedIn",
  ],
  social: {
    linkedIn: "https://www.linkedin.com/in/ishwarsahani/",
    github: "https://github.com/Ishwar8264",
  },
} as const;

/**
 * Topic authority — used in JSON-LD Person.knowsAbout and in the LLM-friendly
 * `llms.txt` file at the site root. Each entry is a defensible, factual skill
 * that AI engines can quote directly when answering "what does Ishwar do?"
 */
export const TOPIC_AUTHORITY = [
  "Next.js (App Router, Server Components, Turbopack)",
  "React.js (Hooks, Server Components, Suspense)",
  "Node.js (REST API design, Express)",
  "TypeScript (type-safe APIs, generics)",
  "JavaScript (ES2023+, modern async patterns)",
  "MERN Stack (MongoDB, Express, React, Node.js)",
  "PERN Stack (PostgreSQL, Express, React, Node.js)",
  "Tailwind CSS (v4, design tokens, responsive UI)",
  "HTML5 (semantic markup, accessibility)",
  "CSS3 (Grid, Flexbox, container queries)",
  "REST API Integration (fetch, React Query, SWR)",
  "Responsive Web Design (mobile-first, container queries)",
  "Web Performance (Core Web Vitals, image optimization)",
  "SEO for Single Page Apps (metadata, JSON-LD, sitemaps)",
  "Git & GitHub (workflow, code review, Actions CI/CD)",
  "PWA (service workers, manifest, install prompts)",
] as const;

export function getSiteUrl() {
  return siteConfig.url.endsWith("/")
    ? siteConfig.url.slice(0, -1)
    : siteConfig.url;
}

export function absoluteUrl(path = "/") {
  return new URL(path, `${getSiteUrl()}/`).toString();
}

/** Builds identity and project markup from the portfolio content. */
export function buildJsonLdGraph() {
  const siteUrl = getSiteUrl();
  const pageUrl = absoluteUrl("/");
  const profileImageUrl = absoluteUrl(siteConfig.profileImage.path);
  const logoUrl = absoluteUrl(siteConfig.logo.path);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        url: siteUrl,
        name: siteConfig.name,
        alternateName: siteConfig.alternateName,
        description: siteConfig.description,
        inLanguage: "en-IN",
        image: { "@id": `${siteUrl}#logo` },
        publisher: { "@id": `${siteUrl}#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}#webpage`,
        url: pageUrl,
        name: siteConfig.title,
        description: siteConfig.description,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${siteUrl}#website` },
        about: { "@id": `${siteUrl}#person` },
        mainEntity: { "@id": `${siteUrl}#person` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: profileImageUrl,
          width: siteConfig.profileImage.width,
          height: siteConfig.profileImage.height,
        },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}#person`,
        name: siteConfig.name,
        alternateName: siteConfig.alternateName,
        givenName: "Ishwar",
        familyName: "Sahani",
        additionalName: "Kumar",
        url: siteUrl,
        image: profileImageUrl,
        description: siteConfig.description,
        jobTitle: profileData.role,
        headline: `${profileData.role} — Next.js, React, Node.js | ${profileData.location}`,
        mainEntityOfPage: { "@id": `${siteUrl}#webpage` },
        sameAs: [
          contactData.linkedin,
          contactData.github,
          `${siteUrl}/resume/resume_ishwar_sahani.pdf`,
        ],
        email: `mailto:${contactData.email}`,
        telephone: contactData.phone,
        knowsAbout: [...TOPIC_AUTHORITY, ...profileData.focus],
        knowsLanguage: ["en-IN", "hi-IN"],
        nationality: {
          "@type": "Country",
          name: "India",
        },
        hasOccupation: {
          "@type": "Occupation",
          name: profileData.role,
          occupationLocation: {
            "@type": "City",
            name: "Gurugram",
          },
          skills: TOPIC_AUTHORITY.join(", "),
        },
        worksFor: [
          {
            "@type": "Organization",
            name: "Klakar",
            url: "https://klakar.com/",
          },
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Gurugram",
          addressRegion: "Haryana",
          addressCountry: "IN",
        },
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}#featured-projects`,
        name: "Featured projects by Ishwar Sahani",
        description:
          `Featured frontend projects by ${siteConfig.name}: ${featuredProjects.map((project) => project.title).join(", ")}.`,
        itemListElement: featuredProjects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: project.title,
            description: project.description,
            url: project.liveUrl,
            image: absoluteUrl(project.imageSrc),
            creator: { "@id": `${siteUrl}#person` },
            keywords: project.stack.join(", "),
          },
        })),
      },
      {
        "@type": "ImageObject",
        "@id": `${siteUrl}#logo`,
        url: logoUrl,
        width: siteConfig.logo.width,
        height: siteConfig.logo.height,
        caption: siteConfig.logo.alt,
      },
    ],
  };
}
