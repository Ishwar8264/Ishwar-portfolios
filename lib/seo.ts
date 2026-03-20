export const siteConfig = {
  name: "Ishwar Sahani",
  shortName: "Ishwar",
  title: "Ishwar Sahani | Frontend Engineer",
  description:
    "Modern portfolio of Ishwar Sahani, frontend software engineer focused on scalable UI architecture, performance, and startup product delivery.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ishwar8264.github.io",
  locale: "en_IN",
  keywords: [
    "Ishwar Sahani",
    "Frontend Engineer",
    "Frontend Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Tailwind CSS",
    "Zustand",
    "UI Performance",
    "Portfolio Website",
    "Gurgaon Frontend Engineer",
    "Klakar",
    "RiverHead Software",
  ],
  social: {
    linkedIn: "https://www.linkedin.com/in/ishwarsahani/",
    github: "https://github.com/Ishwar8264",
  },
} as const;

export function getSiteUrl() {
  return siteConfig.url.endsWith("/")
    ? siteConfig.url.slice(0, -1)
    : siteConfig.url;
}
