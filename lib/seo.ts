import { profileData, contactData } from "@/content/profile";
import { servicesData } from "@/content/services";
import { featuredProjects } from "@/content/projects";

/**
 * Central SEO + GEO (Generative Engine Optimization) configuration.
 *
 * This file is the single source of truth for everything search-related:
 *  - Traditional SEO (Google, Bing, Yandex, DuckDuckGo)
 *  - Generative SEO / GEO (ChatGPT, Perplexity, Claude, Google AI Overviews)
 *  - Open Graph / Twitter Card
 *  - JSON-LD structured data (Person, WebSite, WebPage, BreadcrumbList,
 *    FAQPage, ProfessionalService, ItemList, Service, ImageObject)
 *
 * Design rules:
 *  - Every claim is factual and verifiable (no puffery) — AI engines penalize
 *    marketing-speak and reward clean, defensible statements.
 *  - Name variants (Ishwar / Ishwar Kumar / Ishwar Sahani) are explicitly
 *    listed so all three queries resolve to the same person.
 *  - Stack keywords (MERN, PERN, Next.js full stack, Node.js) are present in
 *    both the keywords array and the structured data `knowsAbout` field.
 */

export const siteConfig = {
  name: "Ishwar Sahani",
  /** Birth name / alternate name — used by AI engines for entity resolution. */
  alternateName: "Ishwar Kumar",
  /** Short brand handle used in navbars, PWA manifests, OG `site_name`. */
  shortName: "Ishwar",
  /**
   * SEO <title>. Includes the three highest-intent keyword phrases a
   * recruiter or founder would search for. Keep under 60 characters.
   */
  title:
    "Ishwar Sahani — Frontend Developer (Next.js, React, Node.js) | Gurugram",
  /**
   * Meta description — 150-160 chars. Front-loaded with the primary
   * entity + role + location so snippets read cleanly on Google.
   */
  description:
    "Ishwar Sahani (Ishwar Kumar) is a Frontend Developer in Gurugram, India specializing in Next.js, React, Node.js, and full-stack MERN/PERN development.",
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
  /**
   * Master keyword list — covers:
   *  - Person name variants (Ishwar, Ishwar Kumar, Ishwar Sahani)
   *  - Role variants (Frontend Developer, React Developer, Next.js Developer,
   *    Next.js Full Stack, Node.js Developer, Full Stack Developer)
   *  - Stack variants (MERN, PERN, Next.js, React, Node.js, TypeScript)
   *  - Location variants (Gurugram, India)
   *  - Skill variants (API Integration, Responsive Design)
   *  - Long-tail intent ("hire frontend developer india", etc.)
   *
   * Order matters — most important first. Used by Next.js Metadata API to
   * emit `<meta name="keywords">`. While Google largely ignores this tag,
   * Bing, Yandex, DuckDuckGo and several AI crawlers still read it.
   */
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
    "Hire Frontend Developer India",
    "Freelance Frontend Developer Gurugram",
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

function createHashId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const FAQ_ITEMS = [
  {
    question: "Who is Ishwar Sahani?",
    answer:
      "Ishwar Sahani (also known as Ishwar Kumar) is a Frontend Developer based in Gurugram, India. He works full-time at a startup where he builds product UI for platforms like Klakar and Dizivizi using Next.js, React, TypeScript, and Tailwind CSS. He also takes on selective freelance frontend projects.",
  },
  {
    question:
      "What technologies does Ishwar Sahani specialize in?",
    answer:
      "Ishwar Sahani specializes in Next.js, React.js, Node.js, TypeScript, JavaScript (ES2023+), Tailwind CSS, HTML5, and CSS3. He is comfortable across the MERN stack (MongoDB, Express, React, Node.js) and the PERN stack (PostgreSQL, Express, React, Node.js), with strong experience in REST API integration, responsive design, and SEO-friendly frontend architecture.",
  },
  {
    question:
      "Is Ishwar Sahani a Next.js full stack developer?",
    answer:
      "Yes. Ishwar works as a Next.js developer with full-stack capabilities — building frontend UI with Next.js App Router and React Server Components, integrating REST APIs on Node.js, and shipping production web applications end-to-end. He is comfortable across the MERN and PERN stacks.",
  },
  {
    question:
      "Is Ishwar Sahani available for freelance frontend work?",
    answer:
      "Yes. Alongside his full-time role, Ishwar takes selective freelance frontend projects from his base in Gurugram, India, working remotely with clients worldwide. Projects include responsive websites, web apps, performance audits, and ongoing website partnerships. Reach out via WhatsApp or email for fastest response.",
  },
  {
    question: "Where is Ishwar Sahani based?",
    answer:
      "Ishwar Sahani is based in Gurugram, Haryana, India. He works remotely with clients and teams worldwide, with availability aligned to IST (Indian Standard Time) business hours.",
  },
  {
    question:
      "How can I contact Ishwar Sahani for a frontend project?",
    answer:
      "The fastest way to reach Ishwar Sahani is via WhatsApp or email. Both channels are monitored personally during IST business hours, with replies typically under 4 hours. LinkedIn and GitHub are also open for professional inquiries.",
  },
  {
    question:
      "What projects has Ishwar Sahani shipped?",
    answer:
      "Ishwar has shipped responsive marketing websites, SaaS dashboards, learning platforms, productivity apps, and client web applications. Featured projects include Klakar (artist network), Dizivizi (video-location platform), Sandhee, MQUAD, Learning Network, and a Todos app — built with Next.js, React, and modern frontend tooling.",
  },
];

/**
 * Builds the full JSON-LD graph for the homepage.
 *
 * Schemas included:
 *  - WebSite         (site identity + search box)
 *  - WebPage         (this URL)
 *  - Person          (entity — Ishwar Sahani, with alternateName)
 *  - ItemList        (featured projects)
 *  - Service[]       (each service from content)
 *  - ProfessionalService  (parent service summary)
 *  - ImageObject     (logo)
 *  - BreadcrumbList  (nav context)
 *  - FAQPage         (question/answer pairs)
 *
 * Returns a plain object suitable for
 * `<script type="application/ld+json">`.
 */
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
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}#webpage`,
        url: pageUrl,
        name: siteConfig.title,
        description: siteConfig.description,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${siteUrl}#website` },
        about: { "@id": `${siteUrl}#person` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: profileImageUrl,
          width: siteConfig.profileImage.width,
          height: siteConfig.profileImage.height,
        },
        breadcrumb: { "@id": `${siteUrl}#breadcrumb` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}#profile-page`,
        url: pageUrl,
        name: `${siteConfig.name} — Frontend Developer Portfolio`,
        description: siteConfig.description,
        inLanguage: "en-IN",
        mainEntity: { "@id": `${siteUrl}#person` },
        isPartOf: { "@id": `${siteUrl}#website` },
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
          estimatedSalary: {
            "@type": "MonetaryAmountDistribution",
            name: "Frontend Developer salary in Gurugram, India",
            currency: "INR",
            median: 700000,
          },
        },
        worksFor: [
          {
            "@type": "Organization",
            name: "Klakar",
            url: "https://klakar.com/",
          },
        ],
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "Computer Science Engineering, India",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Gurugram",
          addressRegion: "Haryana",
          postalCode: "122001",
          addressCountry: "IN",
        },
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}#featured-projects`,
        name: "Featured projects by Ishwar Sahani",
        description:
          "Frontend projects shipped by Ishwar Sahani using Next.js, React, and TypeScript — including Klakar, Dizivizi, Sandhee, MQUAD, and Learning Network.",
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
      ...servicesData.map((service) => ({
        "@type": "Service",
        "@id": `${siteUrl}#service-${createHashId(service.title)}`,
        name: service.title,
        description: service.description,
        serviceType: service.keywords.join(", "),
        provider: { "@id": `${siteUrl}#person` },
        areaServed: [
          { "@type": "City", name: "Gurugram" },
          { "@type": "State", name: "Haryana" },
          { "@type": "Country", name: "India" },
        ],
      })),
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}#professional-service`,
        name: "Ishwar Sahani — Frontend Development Services",
        description:
          "Freelance frontend development services: Next.js, React, Node.js, MERN stack, PERN stack, API integration, responsive web design, and SEO-friendly web application development.",
        url: siteUrl,
        image: profileImageUrl,
        priceRange: "₹₹",
        currenciesAccepted: "INR, USD",
        paymentAccepted: "Cash, Bank Transfer, UPI",
        provider: { "@id": `${siteUrl}#person` },
        areaServed: [
          { "@type": "City", name: "Gurugram" },
          { "@type": "Country", name: "India" },
          { "@type": "Place", name: "Remote Worldwide" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Frontend Development Services",
          itemListElement: servicesData.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.description,
              keywords: service.keywords.join(", "),
            },
          })),
        },
      },
      {
        "@type": "ImageObject",
        "@id": `${siteUrl}#logo`,
        url: logoUrl,
        width: siteConfig.logo.width,
        height: siteConfig.logo.height,
        caption: siteConfig.logo.alt,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About",
            item: `${siteUrl}/#about`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Experience",
            item: `${siteUrl}/#experience`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Projects",
            item: `${siteUrl}/#projects`,
          },
          {
            "@type": "ListItem",
            position: 5,
            name: "Contact",
            item: `${siteUrl}/#contact`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}#faq`,
        mainEntity: FAQ_ITEMS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

export { FAQ_ITEMS };
