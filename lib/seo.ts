export const siteConfig = {
  name: "Ishwar Sahani",
  shortName: "Ishwar",
  title: "Ishwar Sahani | Frontend Software Engineer Portfolio",
  description:
    "Portfolio of Ishwar Sahani, a frontend software engineer in Gurgaon building scalable Next.js, React, and TypeScript interfaces for startup products.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ishwar8264.github.io",
  locale: "en_IN",
  profileImage: {
    path: "/images/profile/img-2.jpeg",
    width: 899,
    height: 1599,
    alt: "Portrait of Ishwar Sahani",
  },
  logo: {
    path: "/icon-512.png",
    width: 512,
    height: 512,
    alt: "Ishwar Sahani logo",
  },
  keywords: [
    "Ishwar Sahani",
    "Frontend Software Engineer",
    "Frontend Engineer Portfolio",
    "Next.js Developer",
    "React TypeScript Developer",
    "Next.js App Router",
    "TypeScript",
    "React",
    "Tailwind CSS Developer",
    "UI Performance",
    "Startup Product Engineer",
    "Gurgaon Frontend Software Engineer",
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

export function absoluteUrl(path = "/") {
  return new URL(path, `${getSiteUrl()}/`).toString();
}
